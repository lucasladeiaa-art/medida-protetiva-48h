/* Rede de Proteção · sala Criminal (prévia)
   Chuva em canvas leve, parallax, trailers dos cartazes e "Continue de onde parou" (só localStorage, nada é enviado).
   Respeita prefers-reduced-motion e pausa tudo fora da tela. */
(function () {
  var d = document, w = window, body = d.body;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = w.matchMedia && w.matchMedia('(hover: none)').matches;

  /* ano, menu e medição de cliques no WhatsApp (mesmo comportamento do theme.js) */
  d.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  var btn = d.getElementById('menuBtn'), nav = d.getElementById('nav-mobile');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  if (nav) nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); btn && btn.setAttribute('aria-expanded', 'false'); } });
  d.querySelectorAll('[data-cta^="whatsapp"]').forEach(function (el) {
    el.addEventListener('click', function () { if (w.dataLayer) w.dataLayer.push({ event: 'whatsapp_click', cta_id: el.getAttribute('data-cta') }); });
  });

  /* header de vidro + WhatsApp flutuante depois do herói */
  var hero = d.querySelector('.hero'), fab = d.querySelector('.fab-wa'), heroOn = true;
  if (hero && 'IntersectionObserver' in w) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        heroOn = e.isIntersecting;
        body.classList.toggle('is-scrolled', w.scrollY > 40 || !e.isIntersecting);
        if (fab) fab.classList.toggle('fab-hidden', e.intersectionRatio > .35);
      });
    }, { threshold: [0, .35, .6] }).observe(hero);
  }

  w.addEventListener('scroll', function () { body.classList.toggle('is-scrolled', w.scrollY > 40 || !heroOn); }, { passive: true });
  /* entrada suave das fileiras */
  var rev = [].slice.call(d.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in w && !reduce) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rev.forEach(function (el) { ro.observe(el); });
  } else rev.forEach(function (el) { el.classList.add('in'); });

  /* chuva no herói: canvas leve, pausa fora da tela */
  var cv = d.getElementById('rain');
  if (!cv || reduce || !cv.getContext) return;
  var ctx = cv.getContext('2d'), drops = [], beads = [], W = 0, H = 0, dpr = Math.min(w.devicePixelRatio || 1, 1.5), run = false, raf = 0, last = 0;
  function mk(any) { return { x: Math.random() * (W + 80) - 40, y: any ? Math.random() * H : -30, l: 12 + Math.random() * 26, v: 9 + Math.random() * 9, a: .05 + Math.random() * .16 }; }
  function size() {
    var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(touch ? 70 : 140, Math.round(W * H / 9000)); drops = [];
    for (var i = 0; i < n; i++) drops.push(mk(true));
    beads = []; var b = Math.min(touch ? 14 : 28, Math.round(W / 45));
    for (var j = 0; j < b; j++) beads.push({ x: Math.random() * W, y: Math.random() * H, r: .8 + Math.random() * 1.9, v: .2 + Math.random() * .6, w: Math.random() * 400 });
  }
  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (touch && ts - last < 30) return; last = ts; /* ~30 fps no celular */
    ctx.clearRect(0, 0, W, H); ctx.lineWidth = 1; ctx.lineCap = 'round';
    for (var i = 0; i < drops.length; i++) {
      var dr = drops[i];
      ctx.strokeStyle = 'rgba(190,200,255,' + dr.a + ')';
      ctx.beginPath(); ctx.moveTo(dr.x, dr.y); ctx.lineTo(dr.x - dr.l * .14, dr.y + dr.l); ctx.stroke();
      dr.y += dr.v * (touch ? 1.8 : 1); dr.x -= dr.v * .14 * (touch ? 1.8 : 1);
      if (dr.y > H) drops[i] = mk(false);
    }
    for (var j = 0; j < beads.length; j++) {
      var b = beads[j];
      if (b.w > 0) b.w--; else { b.y += b.v; if (Math.random() < .01) b.w = 60 + Math.random() * 200; }
      if (b.y > H + 5) { b.y = -5; b.x = Math.random() * W; }
      ctx.fillStyle = 'rgba(210,220,255,.22)'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.arc(b.x - b.r * .3, b.y - b.r * .3, b.r * .35, 0, 6.283); ctx.fill();
    }
  }
  function start() { if (!run) { run = true; raf = requestAnimationFrame(frame); } }
  function stop() { run = false; cancelAnimationFrame(raf); }
  size();
  var rt; w.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
  if ('IntersectionObserver' in w) new IntersectionObserver(function (es) { es.forEach(function (e) { e.isIntersecting && !d.hidden ? start() : stop(); }); }).observe(cv);
  else start();
  d.addEventListener('visibilitychange', function () { d.hidden ? stop() : (heroOn && start()); });
})();
