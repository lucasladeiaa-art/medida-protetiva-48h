(function () {
  "use strict";
  function boot() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var root = document.documentElement;
    function el(tag, cls) {
      var n = document.createElement(tag);
      n.className = cls;
      n.setAttribute("aria-hidden", "true");
      return n;
    }
    var sheet = document.querySelector('link[href*="home-v2.css"]') || document.querySelector('link[href*="artigos.css"]');
    if (sheet && !document.querySelector('link[href*="refugio.css"]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = sheet.href.indexOf("home-v2.css") >= 0
        ? new URL("../refugio.css", sheet.href).href
        : new URL("../assets/refugio.css", sheet.href).href;
      document.head.appendChild(link);
    }
    document.body.appendChild(el("div", "refugio-fog"));
    document.body.appendChild(el("div", "refugio-grain"));
    var extra = document.getElementById("loop-extra-title");
    if (extra) {
      var box = extra.closest(".loop-leia") || extra.parentElement;
      if (box) box.classList.add("refugio-farol");
    }
    if (reduce) return;

    document.body.appendChild(el("div", "refugio-lamp"));
    document.body.appendChild(el("div", "refugio-lantern"));
    var cv = el("canvas", "refugio-dust");
    document.body.appendChild(cv);

    try {
      if (!sessionStorage.getItem("refugio-chegou")) {
        sessionStorage.setItem("refugio-chegou", "1");
        document.body.classList.add("refugio-in");
        setTimeout(function () { document.body.classList.remove("refugio-in"); }, 980);
      }
    } catch (err) {}

    function once(sel, cls, th) {
      var nodes = document.querySelectorAll(sel);
      if (!nodes.length || !("IntersectionObserver" in window)) return;
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add(cls); io.unobserve(en.target); }
        });
      }, { threshold: th });
      for (var i = 0; i < nodes.length; i++) io.observe(nodes[i]);
    }
    once(".art-hero h1, .post-head h1", "refugio-wake", 0.35);
    once(".refugio-farol", "is-sweep", 0.4);

    var ctx = cv.getContext("2d", { alpha: true });
    var W = 0, H = 0, parts = [];
    var tx = 0, ty = 0, x = 0, y = 0;
    var running = false, last = 0, raf = 0;

    function resize() {
      W = innerWidth;
      H = innerHeight;
      cv.width = W;
      cv.height = H;
      tx = x = W * 0.5;
      ty = y = H * 0.16;
      parts = [];
      for (var i = 0; i < 18; i++) {
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.5 + Math.random() * 1.25,
          vx: -0.12 + Math.random() * 0.24,
          vy: -0.16 - Math.random() * 0.3,
          a: 0.16 + Math.random() * 0.34
        });
      }
    }
    resize();
    addEventListener("resize", resize, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var reach = Math.min(W, H) * 0.7;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
        var dx = p.x - x, dy = p.y - y, d = Math.sqrt(dx * dx + dy * dy);
        var vis = 1 - d / reach;
        if (vis <= 0) continue;
        ctx.beginPath();
        ctx.fillStyle = "rgba(232,214,255," + (p.a * vis * 0.5) + ")";
        ctx.arc(p.x, p.y, p.r, 0, 6.283185307179586);
        ctx.fill();
      }
    }

    function loop() {
      if (document.hidden) { running = false; raf = 0; return; }
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      root.style.setProperty("--rx", x + "px");
      root.style.setProperty("--ry", y + "px");
      draw();
      if (performance.now() - last > 2400 && Math.abs(tx - x) < 0.6 && Math.abs(ty - y) < 0.6) {
        document.body.classList.remove("refugio-lit");
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    }

    function kick(nx, ny) {
      tx = nx;
      ty = ny;
      last = performance.now();
      document.body.classList.add("refugio-lit");
      if (!running) { running = true; raf = requestAnimationFrame(loop); }
    }

    addEventListener("pointermove", function (e) { kick(e.clientX, e.clientY); }, { passive: true });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        document.body.classList.remove("refugio-lit");
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      }
    });

    document.addEventListener("pointerdown", function (e) {
      var card = e.target.closest(".poster,.a-card,.loop-card,.featured,.loop-prox-card");
      if (!card) return;
      var s = document.createElement("span");
      s.className = "refugio-ripple";
      var r = card.getBoundingClientRect();
      s.style.left = (e.clientX - r.left) + "px";
      s.style.top = (e.clientY - r.top) + "px";
      card.appendChild(s);
      setTimeout(function () { s.remove(); }, 720);
    }, { passive: true });
  }
  if (document.readyState === "complete") boot();
  else addEventListener("load", boot);
})();
