(function () {
  var d = document, w = window, body = d.body;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = w.matchMedia && w.matchMedia('(hover: none)').matches;

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

  var media = d.querySelector('.hero-media'), inner = d.querySelector('.hero-inner'), ticking = false;
  function para() {
    ticking = false;
    var y = w.scrollY, h = hero ? hero.offsetHeight : 1;
    body.classList.toggle('is-scrolled', y > 40 || !heroOn);
    if (reduce || !heroOn || y > h) return;
    if (media) media.style.transform = 'translate3d(0,' + (y * .32).toFixed(1) + 'px,0) scale(' + (1 + y / h * .06).toFixed(3) + ')';
    if (inner) { inner.style.transform = 'translate3d(0,' + (y * .14).toFixed(1) + 'px,0)'; inner.style.opacity = Math.max(0, 1 - y / (h * .75)).toFixed(3); }
  }
  w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(para); } }, { passive: true });
  para();

  var hooks = [].slice.call(d.querySelectorAll('[data-hooks] span')), hi = 0;
  if (hooks.length) {
    hooks[0].classList.add('on');
    if (!reduce) setInterval(function () {
      if (d.hidden || !heroOn) return;
      var a = hooks[hi]; hi = (hi + 1) % hooks.length; var b = hooks[hi];
      a.classList.remove('on'); a.classList.add('off');
      b.classList.remove('off'); void b.offsetWidth; b.classList.add('on');
      setTimeout(function () { a.classList.remove('off'); }, 700);
    }, 3200);
  }

  var flash = d.querySelector('.hero-flash');
  if (flash && !reduce) setInterval(function () {
    if (d.hidden || !heroOn || Math.random() > .5) return;
    flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
  }, 9000);

  var rev = [].slice.call(d.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in w && !reduce) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rev.forEach(function (el) { ro.observe(el); });
  } else rev.forEach(function (el) { el.classList.add('in'); });

  function arrows(row) {
    var rail = row.querySelector('.rail'), p = row.querySelector('.rn.prev'), n = row.querySelector('.rn.next');
    if (!rail || !p || !n) return;
    function upd() { p.disabled = rail.scrollLeft < 8; n.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8; }
    [p, n].forEach(function (b) { b.addEventListener('click', function () { rail.scrollBy({ left: +b.dataset.dir * rail.clientWidth * .8, behavior: reduce ? 'auto' : 'smooth' }); }); });
    rail.addEventListener('scroll', function () { requestAnimationFrame(upd); }, { passive: true }); upd();
    w.addEventListener('resize', upd);
  }
  d.querySelectorAll('.row').forEach(arrows);

  var posters = function () { return [].slice.call(d.querySelectorAll('.rail .poster')); };
  if (touch && 'IntersectionObserver' in w) {
    var active = null, queued = false;
    function setOn(p) {
      if (p === active) return;
      if (active) active.classList.remove('is-on');
      active = p; if (p) p.classList.add('is-on');
    }
    function pickCenter() {
      queued = false;
      var vh = w.innerHeight, vw = w.innerWidth, cy = vh * .5, cx = vw * .5, best = null, bs = 1e9;
      posters().forEach(function (p) {
        var r = p.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw || !r.width) return;
        var visW = Math.min(r.right, vw) - Math.max(r.left, 0);
        if (visW / r.width < .7) return;
        var dy = Math.abs((r.top + r.bottom) / 2 - cy);
        if (dy > r.height * .55) return;
        var sc = dy + Math.abs((r.left + r.right) / 2 - cx) * .5;
        if (sc < bs) { bs = sc; best = p; }
      });
      setOn(best);
    }
    function queue() { if (!queued) { queued = true; requestAnimationFrame(pickCenter); } }
    w.addEventListener('scroll', queue, { passive: true });
    w.addEventListener('resize', queue);
    d.querySelectorAll('.rail').forEach(function (rail) { rail.addEventListener('scroll', queue, { passive: true }); });
    w.addEventListener('load', queue); queue();
  }

  var KEY = 'rp-continue', rowC = d.getElementById('fileira-continue'), railC = d.getElementById('continueRail');
  function load() { try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v.slice(0, 8))); } catch (e) {} }
  function fmt(t) { try { return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(new Date(t)); } catch (e) { return ''; } }
  function render() {
    if (!rowC || !railC) return;
    var list = load(), html = 0; railC.textContent = '';
    list.forEach(function (it) {
      var src = d.querySelector('.row:not(.row--continue) .poster[data-id="' + (it.id || '').replace(/[^a-z0-9-]/gi, '') + '"]');
      if (!src) return;
      var li = src.parentElement.cloneNode(true), p = li.querySelector('.poster');
      p.classList.remove('is-on'); li.querySelector('img').loading = 'lazy';
      var go = li.querySelector('.p-go'); if (go) go.textContent = 'Continuar';
      var s = d.createElement('span'); s.className = 'p-seen'; s.textContent = 'Aberto em ' + fmt(it.t); p.appendChild(s);
      railC.appendChild(li); html++;
    });
    rowC.hidden = html === 0;
  }
  d.addEventListener('click', function (e) {
    var p = e.target.closest && e.target.closest('.poster'); if (!p) return;
    var id = p.getAttribute('data-id'); var list = load().filter(function (x) { return x.id !== id; });
    list.unshift({ id: id, t: Date.now() }); save(list);
  });
  var clr = d.getElementById('continueClear');
  if (clr) clr.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch (e) {} render(); });
  w.addEventListener('pageshow', render);
  render();

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
    if (touch && ts - last < 30) return; last = ts;
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
