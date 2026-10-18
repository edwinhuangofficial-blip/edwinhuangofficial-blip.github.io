const links = [...document.querySelectorAll('nav a')];
const sections = links.map(link => document.querySelector(link.hash));
let scheduled = false;
function updateNavigation() {
  let current = sections[0];
  for (const section of sections) if (section.getBoundingClientRect().top <= Math.min(innerHeight * .35, 250)) current = section;
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1);
  for (const link of links) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); } }, { passive: true });
addEventListener('resize', updateNavigation);
updateNavigation();

const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme) {
  const selected = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = selected;
  themeToggle.setAttribute('aria-checked', String(selected === 'dark'));
  document.querySelector('meta[name="theme-color"]').content = selected === 'dark' ? '#030712' : '#f7f9fc';
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem('edwin-portfolio-theme', next);
  } catch {
    // Storage restrictions should not prevent changing the current theme.
  }
});
window.addEventListener('storage', event => {
  if (event.key === 'edwin-portfolio-theme' || event.key === null) applyTheme(event.newValue);
});
