(() => {
  'use strict';

  const model = window.FANTASTIC_FOOD_FOLIO;
  const stageHost = document.querySelector('[data-folio-stages]');
  if (!model || !stageHost) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const localGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const localSet = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
  const localRemove = key => { try { localStorage.removeItem(key); return true; } catch { return false; } };

  const emptyStage = () => ({ response: '', caption: '', ready: false, importedFrom: [], importedValues: {} });
  const blankState = () => ({
    schema: model.schema,
    version: model.version,
    studentReference: '',
    updatedAt: null,
    migration: null,
    stages: Object.fromEntries(model.stages.map(stage => [stage.id, emptyStage()]))
  });

  const normaliseState = candidate => {
    const clean = blankState();
    if (!candidate || candidate.schema !== model.schema || candidate.version !== model.version) return clean;
    clean.studentReference = String(candidate.studentReference || '').slice(0, 80);
    clean.updatedAt = candidate.updatedAt || null;
    clean.migration = candidate.migration || null;
    model.stages.forEach(stage => {
      const saved = candidate.stages?.[stage.id] || {};
      clean.stages[stage.id] = {
        response: String(saved.response || ''),
        caption: String(saved.caption || ''),
        ready: Boolean(saved.ready),
        importedFrom: Array.isArray(saved.importedFrom) ? saved.importedFrom.map(String) : [],
        importedValues: saved.importedValues && typeof saved.importedValues === 'object'
          ? Object.fromEntries(Object.entries(saved.importedValues).map(([key, value]) => [String(key), String(value)]))
          : {}
      };
    });
    return clean;
  };

  const readState = () => {
    try {
      const raw = localGet(model.storageKey);
      return raw ? normaliseState(JSON.parse(raw)) : null;
    } catch {
      return blankState();
    }
  };

  const importEarlierResponses = state => {
    const imported = [];
    model.stages.forEach(stage => {
      const entry = state.stages[stage.id];
      const sources = stage.importKeys
        .map(key => [key, window.ffFoundationStore?.get(key) ?? localGet(key)])
        .filter(([, value]) => String(value || '').trim());
      if (!sources.length) return;
      const existingSegments = new Set(entry.response.split(/\n{2,}/).map(value => value.trim()).filter(Boolean));
      const addedValues = [];
      const changedKeys = [];
      sources.forEach(([key, rawValue]) => {
        const value = String(rawValue).trim();
        if (entry.importedValues[key] === value) return;
        entry.importedValues[key] = value;
        if (!entry.importedFrom.includes(key)) entry.importedFrom.push(key);
        changedKeys.push(key);
        if (!existingSegments.has(value)) {
          existingSegments.add(value);
          addedValues.push(value);
        }
      });
      if (!changedKeys.length) return;
      if (addedValues.length) entry.response = [entry.response.trim(), ...addedValues].filter(Boolean).join('\n\n');
      imported.push({ stageId: stage.id, sourceKeys: changedKeys, addedResponses: addedValues.length });
    });
    if (imported.length) {
      state.migration = {
        from: 'fantasticfood-foundation guided responses and activity evidence',
        migratedAt: new Date().toISOString(),
        imported
      };
    }
    return imported.length;
  };

  let state = readState();
  const firstRun = !state;
  if (!state) state = blankState();
  const importedCount = importEarlierResponses(state);

  const status = document.querySelector('[data-folio-status]');
  const message = document.querySelector('[data-folio-message]');
  const studentInput = document.querySelector('[data-folio-student]');
  const photoUrls = new Map();
  let saveTimer;

  const setMessage = (text, kind = '') => {
    message.textContent = text;
    message.dataset.kind = kind;
  };

  const saveState = (announcement = 'Saved on this device') => {
    state.updatedAt = new Date().toISOString();
    try {
      if (!localSet(model.storageKey, JSON.stringify(state))) throw new Error('Local storage unavailable');
      status.textContent = announcement;
      status.dataset.state = 'saved';
    } catch {
      status.textContent = 'Could not save. Download a backup now.';
      status.dataset.state = 'error';
    }
    renderProgress();
  };

  const queueSave = () => {
    status.textContent = 'Saving…';
    status.dataset.state = 'saving';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveState(), 250);
  };

  const openPhotoDb = () => new Promise((resolve, reject) => {
    const request = indexedDB.open(model.photoDatabase, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('photos')) db.createObjectStore('photos', { keyPath: 'stageId' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const photoAction = async (mode, record) => {
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('photos', mode === 'read' ? 'readonly' : 'readwrite');
      const store = tx.objectStore('photos');
      const request = mode === 'read' ? store.get(record) : mode === 'delete' ? store.delete(record) : store.put(record);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  };

  const getAllPhotos = async () => {
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('photos', 'readonly');
      const request = tx.objectStore('photos').getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  };

  const clearPhotos = async () => {
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('photos', 'readwrite');
      const request = tx.objectStore('photos').clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  };

  const stageStatus = (stageId, hasPhoto = false) => {
    const entry = state.stages[stageId];
    const responseLength = entry.response.trim().length;
    const captionLength = entry.caption.trim().length;
    const started = responseLength > 0 || captionLength > 0 || hasPhoto;
    const evidenceAdded = responseLength >= 40 && captionLength >= 20;
    const ready = evidenceAdded && entry.ready;
    return { started, evidenceAdded, ready };
  };

  const stageMarkup = stage => {
    const visualKey = stage.visual.match(/(m\d-s\d)\.svg$/)?.[1] || '';
    const visualPage = `visual.html?section=${encodeURIComponent(visualKey)}`;
    return `
    <article class="folio-stage" id="folio-${esc(stage.id)}" data-stage="${esc(stage.id)}">
      <header class="folio-stage-head">
        <div class="folio-stage-number" aria-hidden="true">${stage.number}</div>
        <div>
          <p class="folio-stage-kicker">Stage ${stage.number} · Module ${stage.module}</p>
          <h2>${esc(stage.title)}</h2>
          <p class="folio-stage-action">${esc(stage.action)}</p>
        </div>
        <span class="folio-stage-status" data-stage-status>Not started</span>
      </header>

      <div class="folio-stage-body">
        <figure class="folio-stage-visual">
          <div class="folio-mini-map" role="img" aria-label="${esc(stage.visualSteps.join(' then '))}">
            ${stage.visualSteps.map((step, index) => `<span><b>${index + 1}</b>${esc(step)}</span>`).join('<i aria-hidden="true">→</i>')}
          </div>
          <figcaption>${esc(stage.visualCaption)}</figcaption>
          <details class="folio-detailed-visual">
            <summary>View the detailed course visual</summary>
            <a href="${esc(visualPage)}" target="_blank" rel="noopener" aria-label="Open ${esc(stage.title)} visual at full size">
              <img src="${esc(stage.visual)}" alt="${esc(stage.visualAlt)}" loading="lazy" decoding="async">
            </a>
            <p><a href="${esc(visualPage)}" target="_blank" rel="noopener">Open detailed visual in a new tab</a></p>
          </details>
        </figure>

        <div class="folio-stage-guide">
          <section><h3>Why this matters</h3><p>${esc(stage.why)}</p></section>
          <section><h3>Evidence to collect</h3><p>${esc(stage.evidence)}</p></section>
        </div>

        <div class="folio-field">
          <label for="${esc(stage.id)}-response">${esc(stage.prompt)}</label>
          <textarea id="${esc(stage.id)}-response" data-folio-field="response" rows="7" placeholder="Write your response here…"></textarea>
        </div>

        <details class="support folio-support">
          <summary>I’m struggling — help me start</summary>
          <p>Choose the evidence that best answers the prompt, explain what it shows, then check that your claim is specific.</p>
          <ul>${stage.starters.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
        </details>

        <div class="folio-field">
          <label for="${esc(stage.id)}-caption">Evidence note or photo caption</label>
          <p>${esc(stage.captionPrompt)}</p>
          <textarea id="${esc(stage.id)}-caption" data-folio-field="caption" rows="4" placeholder="What does this evidence prove?"></textarea>
        </div>

        <section class="folio-photo no-print-controls" aria-labelledby="${esc(stage.id)}-photo-title">
          <h3 id="${esc(stage.id)}-photo-title">Add one useful image <span>(optional)</span></h3>
          <p>${esc(stage.photoHint)}</p>
          <p class="folio-privacy"><strong>Privacy:</strong> no faces, student names, email addresses, school IDs or submission screens.</p>
          <div class="folio-photo-actions no-print">
            <label class="button quiet folio-file-button" for="${esc(stage.id)}-photo">Choose or replace image</label>
            <input class="visually-hidden" id="${esc(stage.id)}-photo" type="file" accept="image/jpeg,image/png,image/webp" data-photo-input>
            <button class="button secondary" type="button" data-photo-remove hidden>Remove image</button>
          </div>
          <p class="folio-photo-message" data-photo-message aria-live="polite"></p>
          <figure class="folio-photo-preview" data-photo-preview hidden>
            <img alt="Student evidence for ${esc(stage.title)}">
            <figcaption data-photo-caption></figcaption>
          </figure>
        </section>

        <footer class="folio-stage-footer">
          <a href="${esc(stage.moduleLink)}">Return to related Module ${stage.module} learning</a>
          <span>Course sources: ${stage.sourceIds.map(esc).join(', ')}</span>
          <label class="folio-review-check"><input type="checkbox" data-stage-ready> Ready for teacher review</label>
          <p data-ready-help>Add a response of at least 40 characters and an evidence note of at least 20 characters before marking this ready.</p>
        </footer>
      </div>
    </article>`;
  };

  stageHost.innerHTML = model.stages.map(stageMarkup).join('');
  studentInput.value = state.studentReference;

  const photoExists = stageId => !document.querySelector(`[data-stage="${stageId}"] [data-photo-preview]`).hidden;

  const updateStageStatus = stageId => {
    const card = document.querySelector(`[data-stage="${stageId}"]`);
    const summary = stageStatus(stageId, photoExists(stageId));
    const badge = card.querySelector('[data-stage-status]');
    const checkbox = card.querySelector('[data-stage-ready]');
    checkbox.disabled = !summary.evidenceAdded;
    if (!summary.evidenceAdded && checkbox.checked) {
      checkbox.checked = false;
      state.stages[stageId].ready = false;
    }
    badge.textContent = summary.ready ? 'Ready for review' : summary.evidenceAdded ? 'Evidence added' : summary.started ? 'Started' : 'Not started';
    badge.dataset.state = summary.ready ? 'ready' : summary.evidenceAdded ? 'evidence' : summary.started ? 'started' : 'empty';
    card.dataset.progress = badge.dataset.state;
    card.querySelector('[data-ready-help]').textContent = summary.evidenceAdded
      ? 'Use this when the evidence is accurate and ready for your teacher to review.'
      : 'Add a response of at least 40 characters and an evidence note of at least 20 characters before marking this ready.';
  };

  function renderProgress() {
    const summaries = model.stages.map(stage => stageStatus(stage.id, photoExists(stage.id)));
    const started = summaries.filter(item => item.started).length;
    const evidence = summaries.filter(item => item.evidenceAdded).length;
    const ready = summaries.filter(item => item.ready).length;
    model.stages.forEach(stage => updateStageStatus(stage.id));
    document.querySelector('[data-count-started]').textContent = started;
    document.querySelector('[data-count-evidence]').textContent = evidence;
    document.querySelector('[data-count-ready]').textContent = ready;
    document.querySelector('[data-folio-progress-label]').textContent = `${evidence} of ${model.stages.length} stages have evidence`;
    document.querySelector('[data-folio-progress-help]').textContent = ready
      ? `${ready} ${ready === 1 ? 'stage is' : 'stages are'} marked ready for teacher review.`
      : 'Add a response and evidence note to move a stage to Evidence added.';
    document.querySelector('[data-folio-progress-bar]').style.width = `${Math.round((evidence / model.stages.length) * 100)}%`;
  }

  const showPhoto = (stageId, record) => {
    const card = document.querySelector(`[data-stage="${stageId}"]`);
    const preview = card.querySelector('[data-photo-preview]');
    const img = preview.querySelector('img');
    const remove = card.querySelector('[data-photo-remove]');
    if (photoUrls.has(stageId)) URL.revokeObjectURL(photoUrls.get(stageId));
    const url = URL.createObjectURL(record.blob);
    photoUrls.set(stageId, url);
    img.src = url;
    preview.querySelector('[data-photo-caption]').textContent = record.name || 'Student evidence image';
    preview.hidden = false;
    remove.hidden = false;
    updateStageStatus(stageId);
    renderProgress();
  };

  const hidePhoto = stageId => {
    const card = document.querySelector(`[data-stage="${stageId}"]`);
    if (photoUrls.has(stageId)) URL.revokeObjectURL(photoUrls.get(stageId));
    photoUrls.delete(stageId);
    card.querySelector('[data-photo-preview]').hidden = true;
    card.querySelector('[data-photo-preview] img').removeAttribute('src');
    card.querySelector('[data-photo-remove]').hidden = true;
    updateStageStatus(stageId);
    renderProgress();
  };

  const loadPhotos = async () => {
    for (const stage of model.stages) {
      try {
        const record = await photoAction('read', stage.id);
        if (record?.blob) showPhoto(stage.id, record);
      } catch {
        document.querySelector(`[data-stage="${stage.id}"] [data-photo-message]`).textContent = 'Photo storage is unavailable in this browser.';
      }
    }
  };

  document.querySelectorAll('[data-stage]').forEach(card => {
    const stageId = card.dataset.stage;
    const entry = state.stages[stageId];
    const response = card.querySelector('[data-folio-field="response"]');
    const caption = card.querySelector('[data-folio-field="caption"]');
    const ready = card.querySelector('[data-stage-ready]');
    response.value = entry.response;
    caption.value = entry.caption;
    ready.checked = entry.ready;

    [response, caption].forEach(control => control.addEventListener('input', () => {
      entry[control.dataset.folioField] = control.value;
      if (entry.ready && (entry.response.trim().length < 40 || entry.caption.trim().length < 20)) entry.ready = false;
      queueSave();
      updateStageStatus(stageId);
    }));

    ready.addEventListener('change', () => {
      entry.ready = ready.checked;
      saveState(ready.checked ? 'Marked ready for teacher review' : 'Review status updated');
    });

    card.querySelector('[data-photo-input]').addEventListener('change', async event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const photoMessage = card.querySelector('[data-photo-message]');
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        photoMessage.textContent = 'Choose a JPG, PNG or WebP image.';
        event.target.value = '';
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        photoMessage.textContent = 'Choose an image smaller than 8 MB.';
        event.target.value = '';
        return;
      }
      try {
        const record = { stageId, blob: file, name: file.name, type: file.type, size: file.size, updatedAt: new Date().toISOString() };
        await photoAction('write', record);
        showPhoto(stageId, record);
        photoMessage.textContent = 'Image saved on this device.';
        saveState('Image saved on this device');
      } catch {
        photoMessage.textContent = 'This image could not be saved. Download a backup of your written work.';
      }
      event.target.value = '';
    });

    card.querySelector('[data-photo-remove]').addEventListener('click', async () => {
      if (!confirm(`Remove the saved image from Stage ${model.stages.find(stage => stage.id === stageId).number}?`)) return;
      try {
        await photoAction('delete', stageId);
        hidePhoto(stageId);
        card.querySelector('[data-photo-message]').textContent = 'Image removed from this device.';
        saveState('Image removed');
      } catch {
        card.querySelector('[data-photo-message]').textContent = 'The image could not be removed.';
      }
    });
  });

  studentInput.addEventListener('input', () => {
    state.studentReference = studentInput.value.slice(0, 80);
    queueSave();
  });

  const blobToDataUrl = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

  const dataUrlToBlob = async dataUrl => {
    const response = await fetch(dataUrl);
    return response.blob();
  };

  const downloadJson = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  document.querySelector('[data-folio-backup]').addEventListener('click', async () => {
    try {
      saveState('Preparing backup…');
      const photos = await getAllPhotos();
      const packedPhotos = [];
      for (const photo of photos) {
        packedPhotos.push({
          stageId: photo.stageId,
          name: photo.name,
          type: photo.type,
          size: photo.size,
          updatedAt: photo.updatedAt,
          dataUrl: await blobToDataUrl(photo.blob)
        });
      }
      const backup = {
        backupType: 'fantastic-food-folio-backup',
        schema: model.schema,
        version: model.version,
        exportedAt: new Date().toISOString(),
        state,
        photos: packedPhotos
      };
      const safeRef = state.studentReference.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
      downloadJson(backup, `fantastic-food-folio${safeRef ? `-${safeRef}` : ''}.json`);
      setMessage(`Backup downloaded with ${packedPhotos.length} saved ${packedPhotos.length === 1 ? 'image' : 'images'}.`, 'success');
      status.textContent = 'Backup downloaded';
    } catch {
      setMessage('The backup could not be created. Try printing to PDF and tell your teacher.', 'error');
    }
  });

  const validPhotoBackup = photo => photo && model.stages.some(stage => stage.id === photo.stageId)
    && typeof photo.dataUrl === 'string' && /^data:image\/(jpeg|png|webp);base64,/.test(photo.dataUrl);

  document.querySelector('[data-folio-restore]').addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const backup = JSON.parse(await file.text());
      if (backup.backupType !== 'fantastic-food-folio-backup' || backup.schema !== model.schema || backup.version !== model.version || !backup.state) {
        throw new Error('Wrong backup type');
      }
      if (!Array.isArray(backup.photos) || !backup.photos.every(validPhotoBackup)) throw new Error('Invalid photo data');
      if (!confirm('Restore this backup? It will replace the current folio text and saved folio images on this device.')) return;
      state = normaliseState(backup.state);
      await clearPhotos();
      for (const photo of backup.photos) {
        const blob = await dataUrlToBlob(photo.dataUrl);
        await photoAction('write', { stageId: photo.stageId, blob, name: photo.name, type: photo.type, size: blob.size, updatedAt: photo.updatedAt });
      }
      if (!localSet(model.storageKey, JSON.stringify(state))) throw new Error('Local storage unavailable');
      setMessage('Backup restored. Reloading the folio…', 'success');
      location.reload();
    } catch {
      setMessage('That file is not a valid Fantastic Food folio backup. Nothing was replaced.', 'error');
    } finally {
      event.target.value = '';
    }
  });

  document.querySelector('[data-folio-reset]').addEventListener('click', async () => {
    if (!confirm('Reset this folio? This removes only the Fantastic Food folio text and folio images saved on this device. Module answers and activity work are not removed.')) return;
    try {
      if (!localRemove(model.storageKey)) throw new Error('Local storage unavailable');
      await clearPhotos();
      setMessage('Folio reset. Reloading…', 'success');
      location.reload();
    } catch {
      setMessage('The folio could not be fully reset. Download a backup and tell your teacher.', 'error');
    }
  });

  document.querySelector('[data-folio-print]').addEventListener('click', () => window.print());

  if (importedCount) {
    saveState(`New course evidence was brought into ${importedCount} folio ${importedCount === 1 ? 'stage' : 'stages'}`);
    setMessage(`Added new course evidence to ${importedCount} folio ${importedCount === 1 ? 'stage' : 'stages'}. Existing folio writing and the original activity responses were not changed.`, 'success');
  } else if (firstRun) {
    saveState('New folio ready');
  }

  renderProgress();
  loadPhotos();

  window.addEventListener('beforeunload', () => {
    photoUrls.forEach(url => URL.revokeObjectURL(url));
  });
})();
