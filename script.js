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
