// Mobil menyu
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
const closeMenu = () => {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
};
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
// Close on Esc, on a click outside the header, and when growing past the mobile breakpoint
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    burger.focus();
  }
});
document.addEventListener('click', e => {
  if (nav.classList.contains('open') && !e.target.closest('.header')) closeMenu();
});
matchMedia('(min-width:1025px)').addEventListener('change', e => e.matches && closeMenu());

// Aktiv menyu havolasi (scroll bo'yicha)
const links = [...nav.querySelectorAll('a[href^="#"]')];
const sections = links.map(l => document.querySelector(l.getAttribute('href')));
// A clicked link stays active until the scroll ends or the user scrolls by hand;
// otherwise the page-bottom rule below would select "Aloqa" after clicking "Ishlarimiz"
let locked = false;
links.forEach(l => l.addEventListener('click', () => {
  locked = true;
  links.forEach(x => x.classList.toggle('active', x === l));
}));
['scrollend', 'wheel', 'touchstart', 'keydown'].forEach(t => addEventListener(t, () => { locked = false; }, { passive: true }));
function updateActive() {
  if (locked) return;
  let current = 0;
  sections.forEach((s, i) => {
    if (s && s.getBoundingClientRect().top <= innerHeight * 0.45) current = i;
  });
  // The last section (#aloqa) is too short to reach the 45% line, so the page bottom selects it
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = sections.length - 1;
  links.forEach((l, i) => l.classList.toggle('active', i === current));
}
addEventListener('scroll', updateActive, { passive: true });
addEventListener('resize', updateActive);
updateActive();

document.getElementById('year').textContent = new Date().getFullYear();
