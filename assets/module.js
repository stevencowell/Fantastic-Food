(() => {
  const moduleNumber = Number(document.body.dataset.module);
  const course = window.FANTASTIC_FOOD;
  const moduleData = course?.modules?.find(item => item.id === moduleNumber);
  const host = document.querySelector('[data-module-content]');
  if (!moduleData || !host) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const visuals = {
    'm1-s1': {src:'assets/visuals/m1-s1.svg', alt:'Diagram for Ready to Work Safely in Food Technology: a simple decision pathway linking teacher directions, noticing a possible hazard, stopping when unsure and asking for guidance.', caption:'Visual summary: a simple decision pathway linking teacher directions, noticing a possible hazard, stopping when unsure and asking for guidance.'},
    'm1-s2': {src:'assets/visuals/m1-s2.svg', alt:'Diagram for Personal Hygiene for Safe Food Work: a simple hygiene decision pathway: begin with the directed hygiene routine, work carefully, notice when hygiene may have been interrupted, stop, restore hygiene according to teacher directions, then return to food work.', caption:'Visual summary: begin with the directed hygiene routine, work carefully, notice when hygiene may have been interrupted, stop, restore hygiene according to teacher directions, then return to food work.'},
    'm1-s3': {src:'assets/visuals/m1-s3.svg', alt:'Diagram for Kitchen Hygiene, Hazards and Washing Up: a simple comparison between noticing a possible hazard and noticing an unhygienic behaviour, with both pathways leading to stopping, reporting or asking when unsure, then following teacher directions.', caption:'Visual summary: possible hazards and unhygienic behaviour are different observations, but both lead to stopping, reporting or asking when unsure, then following teacher directions.'},
    'm2-s1': {src:'assets/visuals/m2-s1.svg', alt:'Diagram for Reading Recipes: Scones and Savoury Twists: identify the title, find ingredients and quantities, locate equipment information when supplied, read the full method, notice the sequence, then check the current recipe while working.', caption:'Visual summary: identify the recipe title, ingredients, quantities and supplied equipment information; read the full method and keep checking the current recipe while working.'},
    'm2-s2': {src:'assets/visuals/m2-s2.svg', alt:'Diagram for Accurate Measuring and Managing a Practical: read the current quantity and unit, select a suitable provided measuring tool, measure carefully, pause to check, then combine only when the information has been confirmed.', caption:'Visual summary: read the quantity and unit, select a suitable provided tool, measure carefully, pause to check, then combine only after confirming the information.'},
    'm2-s3': {src:'assets/visuals/m2-s3.svg', alt:'Diagram for The Six Essential Nutrients: carbohydrates and fats connect with energy, protein with growth and repair, vitamins and minerals with body processes, and water with hydration and body functions; foods can provide more than one nutrient.', caption:'Visual summary: the six nutrient groups connect to broad body roles, while foods may provide more than one nutrient.'},
    'm3-s1': {src:'assets/visuals/m3-s1.svg', alt:'Diagram for Workflow Planning in the Kitchen: a workflow map linking the finished result to preparation, dependent tasks, logical sequencing, purposeful use of waiting time, progress checks and final clean-up.', caption:'Visual summary: plan backwards from the finished result, organise dependent tasks and sequence, use waiting time purposefully, check progress and complete clean-up.'},
    'm3-s2': {src:'assets/visuals/m3-s2.svg', alt:'Diagram for The Australian Guide to Healthy Eating and Adolescent Needs: the five food groups as parts of an overall eating pattern, with water as the preferred drink, connecting variety across groups with broad adolescent needs.', caption:'Visual summary: variety across the five Australian Guide to Healthy Eating food groups and water as the preferred drink support broad adolescent needs.'},
    'm3-s3': {src:'assets/visuals/m3-s3.svg', alt:'Diagram for Recipe Modification: Bread Cases and Garlic Cheese Flatbread: identify a goal, propose one teacher-permitted change, predict possible effects, produce the idea, then evaluate the result against the original goal.', caption:'Visual summary: identify a goal, propose one teacher-permitted change, predict possible effects, produce the idea and evaluate it against the original goal.'},
    'm4-s1': {src:'assets/visuals/m4-s1.svg', alt:'Diagram for Planning a Balanced Lunchbox: link the intended user and school day with variety across the five food groups, consideration of water, practicality and a final whole-lunchbox review.', caption:'Visual summary: connect the intended user and school day with five-group variety, water, practicality and a final whole-lunchbox review.'},
    'm4-s2': {src:'assets/visuals/m4-s2.svg', alt:'Diagram for Food Orders and Practical Organisation: identify required items and quantities, check names and amounts, find missing or duplicated entries, confirm each planned use, then connect the completed order to practical workflow.', caption:'Visual summary: check required items, quantities, names, missing or duplicated entries and planned uses before connecting the food order to practical workflow.'},
    'm4-s3': {src:'assets/visuals/m4-s3.svg', alt:'Diagram for Coconut Balls Practical and Healthier Fast-Food Redesign: define the user and purpose, set criteria, propose a teacher-permitted change, predict possible effects, gather evidence if tested, compare the result with the criteria and identify an improvement.', caption:'Visual summary: define the user and purpose, set criteria, propose a permitted change, predict effects, gather evidence, evaluate and improve.'},
    'm5-s1': {src:'assets/visuals/m5-s1.svg', alt:'Diagram for Fibre and Water for Healthy Bodies: fibre from a range of plant-food groups supports normal digestive function, while water supports hydration and normal body functions; both connect with variety rather than a single product.', caption:'Visual summary: fibre and water have connected but different roles within a varied overall eating pattern.'},
    'm5-s2': {src:'assets/visuals/m5-s2.svg', alt:'Diagram for Fettuccine Carbonara: Sequencing and Safe Workflow: read the complete current recipe, identify dependent steps, sequence tasks, monitor progress, stop and ask when uncertain, then evaluate and complete clean-up.', caption:'Visual summary: read the complete current recipe, identify dependencies, sequence tasks, monitor progress, ask when uncertain, then evaluate and clean up.'},
    'm5-s3': {src:'assets/visuals/m5-s3.svg', alt:'Diagram for Evaluating Food Solutions and Course Learning: a website evaluation pathway linking adolescent audience and purpose, home and title-page planning, suitable content, appeal, ease of use, evidence and one improvement.', caption:'Visual summary: connect audience and purpose with page planning, suitable content, appeal, ease of use, evidence and one improvement.'}
  };
  const root = document.body.dataset.root || '';
  document.querySelector('[data-module-summary]').textContent = moduleData.summary;
  const jumps = document.querySelector('[data-section-jumps]');
  jumps.innerHTML = moduleData.sections.map((section,index) => `<li><a href="#${esc(section.key)}"><span>Section ${index+1}</span><br>${esc(section.title)}</a></li>`).join('');

  const renderVisual = section => {
    const visual = visuals[section.key];
    if (visual) return `<figure class="concept-visual"><a class="concept-visual-link" href="${root}visual.html?section=${encodeURIComponent(section.key)}" target="_blank" rel="noopener" aria-label="Open ${esc(section.title)} diagram at full size"><img src="${root}${visual.src}" alt="${esc(visual.alt)}" loading="lazy" decoding="async"></a><figcaption>${esc(visual.caption)} <a href="${root}visual.html?section=${encodeURIComponent(section.key)}" target="_blank" rel="noopener">Open larger</a></figcaption></figure>`;
    return `<div class="concept-visual visual-error" role="status"><strong>This visual could not be loaded.</strong><p>Use the explanation above and tell your teacher if the problem continues.</p></div>`;
  };
  const renderVideo = section => {
    const video = window.FANTASTIC_FOOD_VIDEOS?.bySection?.[section.key];
    if (!video || !window.ffVideo) return `<aside class="video-slot video-gap"><h3>Video unavailable</h3><p>Use the explanation and visual, then tell your teacher that this matched video could not be loaded.</p></aside>`;
    return `<aside class="video-slot" aria-label="Video learning for ${esc(section.title)}"><h3>Video learning</h3>${window.ffVideo.card(video, {root, showSectionLink:false})}</aside>`;
  };
  const renderAlignment = section => {
    const outcomes = section.outcomeMapping?.currentSyllabusOutcomes || [];
    return `<aside class="learning-alignment" aria-label="Learning alignment for ${esc(section.title)}"><div><strong>Taught content</strong><p>${esc(section.purpose)}</p></div><div><strong>Current NSW outcomes</strong><ul class="outcome-chips">${outcomes.map(code => `<li>${esc(code)}</li>`).join('')}</ul></div></aside>`;
  };
  const responseSupport = section => `<details class="support"><summary>I’m struggling — help me plan this response</summary><p><strong>What is this asking?</strong> ${esc(section.theory_help || 'Use the explanation in this section to make and support a clear point.')}</p><p><strong>Read → Select → Explain → Check</strong></p><ol><li>Return to <a href="#${esc(section.help_target || section.key)}">the most useful explanation</a>.</li><li>Select the most relevant idea or evidence.</li><li>Explain how it answers the question in your own words.</li><li>Check that your answer is specific and does not simply copy the theory.</li></ol>${section.sentence_starters?.length ? `<p><strong>Sentence starter:</strong> ${esc(section.sentence_starters[0])}</p>` : ''}</details>`;

  host.innerHTML = moduleData.sections.map((section,index) => {
    const taughtWithVisual = section.theory_html.replace('</section>', `</section>${renderVisual(section)}`);
    return `<article class="learning-cycle" id="${esc(section.key)}"><header class="cycle-head"><p class="eyebrow" style="color:#cf5b43">Module ${moduleNumber} · Section ${index+1}</p><h2>${esc(section.title)}</h2><p>${esc(section.purpose)}</p></header>${renderAlignment(section)}<div class="theory-copy">${taughtWithVisual}</div>${renderVideo(section)}<details class="checks"><summary>Knowledge check · 10 questions</summary><div class="check-body">${section.questions.map((question,qIndex) => `<fieldset class="question"><legend>${qIndex+1}. ${esc(question.prompt)}</legend>${question.options.map((option,oIndex) => `<label class="option"><input type="radio" name="${esc(section.key)}-q${qIndex}" value="${oIndex}"> ${esc(option.text)}</label>`).join('')}<p class="feedback" aria-live="polite"></p></fieldset>`).join('')}</div></details><section class="response"><h3>Guided written response</h3><p>${esc(section.written_prompt)}</p>${responseSupport(section)}<label for="response-${esc(section.key)}">Your response</label><textarea id="response-${esc(section.key)}" data-save="response:${esc(section.key)}"></textarea><p class="saved">Not yet saved</p></section></article>`;
  }).join('');

  window.ffVideo?.bind(host);

  const correctIndex = question => question.options.findIndex(option => option.correct);
  moduleData.sections.forEach(section => section.questions.forEach((question,qIndex) => {
    const inputs = [...document.querySelectorAll(`[name="${section.key}-q${qIndex}"]`)];
    const box = inputs[0]?.closest('.question');
    if (!box) return;
    const key = `fantasticfood-foundation:check:${section.key}:${qIndex}`;
    const saved = ffFoundationStore.get(key);
    if (saved !== null) inputs[Number(saved)]?.setAttribute('checked','checked');
    inputs.forEach(input => input.addEventListener('change', () => {
      ffFoundationStore.set(key, input.value);
      const chosen = question.options[Number(input.value)];
      const correct = Number(input.value) === correctIndex(question);
      const feedback = box.querySelector('.feedback');
      feedback.innerHTML = `${esc(chosen.feedback || (correct ? 'Correct.' : 'Return to this section and try again.'))}${correct ? '' : ` <a href="#${esc(section.key)}">Return to the explanation</a>.`}`;
      feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
      updateProgress();
    }));
  }));

  document.querySelectorAll('[data-save^="response:"]').forEach(control => {
    const key = `fantasticfood-foundation:${control.dataset.save}`;
    control.value = ffFoundationStore.get(key) || '';
    let timer;
    control.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        ffFoundationStore.set(key, control.value);
        control.closest('.response').querySelector('.saved').textContent = 'Saved on this device';
        updateProgress();
      }, 250);
    });
  });
  function updateProgress() {
    const checks = moduleData.sections.flatMap(section => section.questions.map((_,qIndex) => ffFoundationStore.get(`fantasticfood-foundation:check:${section.key}:${qIndex}`) !== null));
    const responses = moduleData.sections.map(section => Boolean((ffFoundationStore.get(`fantasticfood-foundation:response:${section.key}`) || '').trim()));
    const completed = [...checks,...responses].filter(Boolean).length;
    const total = checks.length + responses.length;
    const percent = Math.round(completed / total * 100);
    document.querySelector('[data-progress-bar]').style.width = `${percent}%`;
    document.querySelector('[data-progress-label]').textContent = `${percent}% complete · ${completed} of ${total} learning steps saved`;
  }
  document.querySelector('[data-reset-module]')?.addEventListener('click', () => {
    if (!confirm(`Reset all saved checks and written responses for Module ${moduleNumber}?`)) return;
    moduleData.sections.forEach(section => {
      section.questions.forEach((_,qIndex) => ffFoundationStore.remove(`fantasticfood-foundation:check:${section.key}:${qIndex}`));
      ffFoundationStore.remove(`fantasticfood-foundation:response:${section.key}`);
    });
    location.reload();
  });
  updateProgress();
})();
