(function () {
  "use strict";
  var K = "rede-lidos";
  var NEXT = { agora: "defesa", defesa: "resolver", resolver: "resolver" };
  var TAG = {
    "medida-protetiva": "Medida protetiva",
    familia: "Família",
    criminal: "Criminal",
    cac: "CAC"
  };
  function read() {
    try {
      var x = JSON.parse(localStorage.getItem(K) || "[]");
      return Array.isArray(x) ? x : [];
    } catch (e) {
      return [];
    }
  }
  function write(a) {
    try {
      localStorage.setItem(K, JSON.stringify(a.slice(-50)));
    } catch (e) {}
  }
  function mark(slug) {
    var a = read();
    if (slug && a.indexOf(slug) < 0) {
      a.push(slug);
      write(a);
    }
    return a;
  }
  function score(seed, c) {
    var n = 0;
    if (c.p === seed.p) n += 4;
    if (c.e === seed.e) n += 2;
    if (c.m === NEXT[seed.m]) n += 3;
    else if (c.m === seed.m) n += 1;
    if (c.x === seed.x) n += 3;
    return n;
  }
  function pick(seed, all, ban, n) {
    var ranked = all.filter(function (c) { return c.s !== seed.s && ban.indexOf(c.s) < 0; })
      .map(function (c) { return { c: c, n: score(seed, c) }; })
      .filter(function (x) { return x.n > 0; })
      .sort(function (a, b) { return b.n - a.n || (a.c.t < b.c.t ? -1 : 1); });
    var same = ranked.filter(function (x) { return x.c.x === seed.x; });
    var other = ranked.filter(function (x) { return x.c.x !== seed.x; });
    return same.concat(other).slice(0, n).map(function (x) { return x.c; });
  }
  function fill(a, item) {
    a.href = item.s + ".html";
    var img = a.querySelector("img");
    if (img) {
      img.src = item.i || ("img/" + item.s + ".webp");
      img.alt = item.l || "";
      img.width = 640;
      img.height = 360;
      img.loading = "lazy";
      img.decoding = "async";
    }
    var tag = a.querySelector(".loop-card-tag");
    if (tag) tag.textContent = TAG[item.a] || item.a || "";
    var rd = a.querySelector(".loop-card-read");
    if (rd && item.r) rd.textContent = String(item.r) + " min";
    var t = a.querySelector(".loop-card-title");
    if (t) t.textContent = item.t;
    if (!img && !t) a.textContent = item.t;
  }
  var root = document.querySelector("[data-continuar]");
  if (!root) return;
  var slug = root.getAttribute("data-slug") || "";
  var lidos = mark(slug);
  var cards = [].slice.call(root.querySelectorAll("a.loop-card, a.loop-prox-card, a.loop-ctx-link"));
  var shown = cards.map(function (a) {
    return (a.getAttribute("href") || "").replace(/^.*\//, "").replace(/\.html$/, "");
  });
  var stale = cards.filter(function (a) {
    var s = (a.getAttribute("href") || "").replace(/^.*\//, "").replace(/\.html$/, "");
    return s && s !== slug && lidos.indexOf(s) >= 0;
  });
  if (!stale.length) return;
  function run() {
    fetch("../dados/biblioteca.json", { credentials: "same-origin" }).then(function (r) {
      return r.ok ? r.json() : null;
    }).then(function (data) {
      var all = data && data.artigos ? data.artigos : [];
      if (!all.length) return;
      var seed = null;
      for (var i = 0; i < all.length; i++) {
        if (all[i].s === slug) { seed = all[i]; break; }
      }
      if (!seed) return;
      var ban = shown.concat(lidos);
      var extras = pick(seed, all, ban, stale.length);
      extras.forEach(function (item, i) {
        if (stale[i]) {
          fill(stale[i], item);
          shown.push(item.s);
        }
      });
    }).catch(function () {});
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      if (!ents[0] || !ents[0].isIntersecting) return;
      io.disconnect();
      run();
    }, { rootMargin: "280px 0px" });
    io.observe(root);
  } else {
    run();
  }
})();
