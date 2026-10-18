// Apply a saved choice before styles load; new browsers start in dark mode.
(() => {
  let theme = 'dark';
  try {
    if (localStorage.getItem('edwin-portfolio-theme') === 'light') theme = 'light';
  } catch {
    // The switch still works when browser storage is unavailable.
  }
  document.documentElement.dataset.theme = theme;
})();
