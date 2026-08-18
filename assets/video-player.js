(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  const poster = video => `
    <button class="video-poster" type="button" data-video-play aria-label="Play ${esc(video.title)}">
      <img src="${esc(video.thumbnail)}" alt="" loading="lazy" decoding="async">
      <span class="video-play-badge" aria-hidden="true"><span class="video-play-icon">▶</span> Play video</span>
    </button>`;

  const card = (video, options = {}) => {
    const root = options.root || '';
    const showSectionLink = options.showSectionLink !== false;
    const sectionLink = showSectionLink
      ? `<a class="video-theory-link" href="${esc(root + video.theoryUrl)}">Open matched theory section</a>`
      : `<a class="video-theory-link" href="${esc(root + 'videos.html#video-' + video.section)}">Open in the video library</a>`;
    return `<article class="video-card" id="video-${esc(video.section)}" data-video-card data-youtube="${esc(video.youtubeId)}" data-video-title="${esc(video.title)}">
      <div class="video-card-media" data-video-host>${poster(video)}</div>
      <div class="video-card-copy">
        <p class="video-topic">Module ${video.module} · ${esc(video.weeks)}</p>
        <h3>${esc(video.title)}</h3>
        <p class="video-channel">${esc(video.channel)}</p>
        <p>${esc(video.purpose)}</p>
        <p class="video-watch-for"><strong>Watch for:</strong> ${esc(video.watchFor)}</p>
        <div class="video-actions">${sectionLink}<a href="${esc(video.url)}" target="_blank" rel="noopener">Open in YouTube</a></div>
      </div>
    </article>`;
  };

  const videoFor = cardElement => window.FANTASTIC_FOOD_VIDEOS?.bySection?.[cardElement.id.replace(/^video-/, '')];

  const bindCard = cardElement => {
    const trigger = cardElement.querySelector('[data-video-play]');
    if (!trigger || trigger.dataset.bound === 'true') return;
    trigger.dataset.bound = 'true';
    const play = () => {
      const video = videoFor(cardElement);
      const host = cardElement.querySelector('[data-video-host]');
      if (!video || !host) return;
      cardElement.dataset.playing = 'true';
      host.innerHTML = `<div class="video-active">
        <div class="video-embed"><iframe src="${esc(video.embed)}?autoplay=1&rel=0" title="${esc(video.title)}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
        <button class="video-close" type="button" data-video-close>Close / stop video</button>
      </div>`;
      const close = host.querySelector('[data-video-close]');
      close?.focus();
      close?.addEventListener('click', () => restore(cardElement, true));
    };
    trigger.addEventListener('click', play);
    trigger.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      play();
    });
  };

  const restore = (cardElement, focus = false) => {
    const video = videoFor(cardElement);
    const host = cardElement.querySelector('[data-video-host]');
    if (!video || !host) return;
    delete cardElement.dataset.playing;
    host.innerHTML = poster(video);
    bindCard(cardElement);
    if (focus) host.querySelector('[data-video-play]')?.focus();
  };

  const bind = (scope = document) => scope.querySelectorAll('[data-video-card]').forEach(bindCard);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const playing = document.querySelector('[data-video-card][data-playing="true"]');
    if (playing) {
      event.preventDefault();
      restore(playing, true);
    }
  });

  window.ffVideo = { card, bind, restore };
})();
