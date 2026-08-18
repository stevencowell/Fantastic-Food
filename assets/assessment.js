(() => {
  document.querySelectorAll('[data-print-notice]').forEach(button => {
    button.addEventListener('click', () => window.print());
  });
})();
