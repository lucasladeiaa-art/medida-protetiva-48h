document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('nav-mobile');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
}
document.querySelectorAll('[data-cta^="whatsapp"]').forEach((el) => {
  el.addEventListener('click', () => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'whatsapp_click', cta_id: el.getAttribute('data-cta') });
    }
  });
});
// Esconde o botão flutuante do WhatsApp enquanto a capa (que já tem o botão) está visível
(function () {
  const hero = document.querySelector('.hero-v2');
  const fab = document.querySelector('.fab-wa');
  if (!hero || !fab || !('IntersectionObserver' in window)) return;
  new IntersectionObserver((entries) => {
    entries.forEach((e) => fab.classList.toggle('fab-hidden', e.isIntersecting));
  }, { threshold: 0.02 }).observe(hero);
})();
// Capa v3 (home): header mínimo até sair da capa; gancho que alterna as situações e acende o cartão
(function () {
  const hero = document.querySelector('.hero-v3');
  if (!hero) return;
  const body = document.body;
  const fab = document.querySelector('.fab-wa');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        body.classList.toggle('is-scrolled', !e.isIntersecting);
        if (fab) fab.classList.toggle('fab-hidden', e.isIntersecting);
      });
    }, { rootMargin: '-64px 0px 0px 0px', threshold: 0 }).observe(hero);
  }
  const hook = hero.querySelector('[data-hook]');
  const cards = Array.from(hero.querySelectorAll('.sit-card'));
  if (!hook || !cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0, paused = false;
  const show = (n) => {
    hook.classList.add('is-out');
    setTimeout(() => {
      hook.textContent = cards[n].dataset.hookText;
      hook.classList.remove('is-out');
      cards.forEach((c, k) => c.classList.toggle('is-lit', k === n));
      const list = cards[n].closest('[data-cards]');
      if (list && list.scrollWidth > list.clientWidth + 4) {
        list.scrollTo({ left: cards[n].parentElement.offsetLeft - list.firstElementChild.offsetLeft, behavior: 'smooth' });
      }
    }, 450);
  };
  cards.forEach((c) => {
    c.addEventListener('mouseenter', () => { paused = true; cards.forEach((x) => x.classList.remove('is-lit')); });
    c.addEventListener('mouseleave', () => { paused = false; });
    c.addEventListener('touchstart', () => { paused = true; }, { passive: true });
  });
  setTimeout(() => cards[0].classList.add('is-lit'), 1800);
  setInterval(() => { if (paused || document.hidden) return; i = (i + 1) % cards.length; show(i); }, 3200);
})();
