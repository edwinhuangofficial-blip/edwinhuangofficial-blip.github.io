// Apply the saved preference, or the system theme on a first visit, before styles load.
(() => {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try {
    const saved = localStorage.getItem('edwin-portfolio-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch {
    // Use the system theme when browser storage is unavailable.
  }
  document.documentElement.dataset.theme = theme;
})();
