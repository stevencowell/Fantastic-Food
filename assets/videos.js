(() => {
  const host = document.querySelector('[data-video-library]');
  const manifest = window.FANTASTIC_FOOD_VIDEOS;
  if (!host || !manifest || !window.ffVideo) return;
  const modules = [...new Set(manifest.entries.map(entry => entry.module))];
  host.innerHTML = modules.map(moduleNumber => {
    const videos = manifest.entries.filter(entry => entry.module === moduleNumber);
    const first = videos[0];
    return `<section class="video-library-group" aria-labelledby="video-module-${moduleNumber}">
      <header class="video-library-heading">
        <p class="eyebrow">Module ${moduleNumber} · ${first.weeks}</p>
        <h2 id="video-module-${moduleNumber}">${first.moduleTitle}</h2>
        <p>Three videos matched to the three named theory sections in this module.</p>
      </header>
      <div class="video-library-grid">${videos.map(video => window.ffVideo.card(video, {root: ''})).join('')}</div>
    </section>`;
  }).join('');
  window.ffVideo.bind(host);
})();
