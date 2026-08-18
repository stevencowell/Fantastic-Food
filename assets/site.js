(() => {
  const prefix = document.body.dataset.root || '';
  const current = document.body.dataset.page || 'course';
  const links = [
    ['course', 'Course', `${prefix}index.html`],
    ['modules', 'Modules', `${prefix}index.html#modules`],
    ['activities', 'Activities', `${prefix}activities/index.html`],
    ['videos', 'Video learning', `${prefix}videos.html`],
    ['folio', 'My folio', `${prefix}folio.html`],
    ['assessment', 'Assessment', `${prefix}assessment.html`],
    ['resources', 'Resources', `${prefix}resources.html`]
  ];
  const nav = document.querySelector('[data-site-nav]');
  if (nav) {
    nav.innerHTML = `<div class="nav-inner"><a class="brand" href="${prefix}index.html"><span class="brand-mark">FF</span><span>Fantastic Food</span></a><div class="nav-links" aria-label="Course destinations">${links.map(([id,label,href]) => `<a href="${href}"${id===current?' aria-current="page"':''}>${label}</a>`).join('')}<a class="main-menu" href="https://stevencowell.github.io/Main-Page/">Main Menu</a></div></div>`;
  }

  const storage = (() => {
    try { return window.localStorage; } catch { return null; }
  })();
  const fallback = new Map();
  window.ffFoundationStore = {
    get(key) { return storage ? storage.getItem(key) : (fallback.get(key) ?? null); },
    set(key, value) { storage ? storage.setItem(key, String(value)) : fallback.set(key, String(value)); },
    remove(key) { storage ? storage.removeItem(key) : fallback.delete(key); },
    entries() {
      if (storage) return Object.keys(storage).filter(k => k.startsWith('fantasticfood-foundation:')).map(k => [k, storage.getItem(k)]);
      return [...fallback.entries()];
    }
  };

  document.querySelectorAll('[data-save]').forEach(control => {
    const key = `fantasticfood-foundation:${control.dataset.save}`;
    control.value = ffFoundationStore.get(key) || '';
    const status = control.closest('.response,.activity-form,.panel')?.querySelector('.saved');
    let timer;
    control.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        ffFoundationStore.set(key, control.value);
        if (status) status.textContent = 'Saved on this device';
        document.dispatchEvent(new Event('ff-foundation:saved'));
      }, 250);
    });
  });
})();
