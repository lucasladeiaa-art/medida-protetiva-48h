/* Artigos · lê artigos.json e monta a listagem (fileiras por área) e os relacionados no artigo */
(function () {
  'use strict';
  var AREAS = [
    { key: 'medida-protetiva', label: 'Medida protetiva', fallback: '../img/medida-protetiva.webp' },
    { key: 'familia', label: 'Família', fallback: '../img/familia.webp' },
    { key: 'criminal', label: 'Criminal', fallback: '../img/hero-sit-cac.webp' },
    { key: 'passageiro', label: 'Passageiro', fallback: '../img/passageiro.webp' },
    { key: 'cac', label: 'CAC', fallback: '../img/cac.webp' }
  ];
  var AREA = {}; AREAS.forEach(function (a) { AREA[a.key] = a; });

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmtDate(iso) {
    var d = new Date(iso + 'T12:00:00');
    return isNaN(d) ? '' : d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function cover(a) { return a.cover ? a.cover : (AREA[a.area] ? AREA[a.area].fallback : '../img/medida-protetiva.webp'); }
  function card(a, eager) {
    var area = AREA[a.area] || { label: a.area };
    return '<li><a class="a-card" href="' + esc(a.slug) + '.html">' +
      '<img src="' + esc(cover(a)) + '" alt="" width="1200" height="675" loading="' + (eager ? 'eager' : 'lazy') + '">' +
      '<span class="tag">' + esc(area.label) + '</span>' +
      '<h3>' + esc(a.title) + '</h3>' +
      (a.summary ? '<p>' + esc(a.summary) + '</p>' : '') +
      '<span class="a-meta"><span>' + esc(fmtDate(a.date)) + '</span>' + (a.reading ? '<span>' + esc(a.reading) + ' min de leitura</span>' : '') + '</span>' +
      '</a></li>';
  }
  function load() {
    return fetch('artigos.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) {
        if (!Array.isArray(list)) list = list && Array.isArray(list.artigos) ? list.artigos : [];
        return list.filter(function (a) { return a && a.slug && a.title && AREA[a.area]; })
          .sort(function (x, y) { return String(y.date).localeCompare(String(x.date)); });
      }).catch(function () { return []; });
  }
  function bindRowNav(root) {
    root.querySelectorAll('[data-row]').forEach(function (row) {
      var track = row.querySelector('.row-track'), nav = row.querySelector('.row-nav');
      var fit = function () { if (nav) nav.style.visibility = track.scrollWidth > track.clientWidth + 4 ? '' : 'hidden'; };
      fit(); window.addEventListener('resize', fit);
      row.querySelectorAll('[data-dir]').forEach(function (b) {
        b.addEventListener('click', function () { track.scrollBy({ left: track.clientWidth * 0.9 * Number(b.dataset.dir), behavior: 'smooth' }); });
      });
    });
  }

  /* Listagem */
  var listing = document.querySelector('[data-artigos-listagem]');
  if (listing) {
    load().then(function (list) {
      var featured = document.querySelector('[data-destaque]');
      var empty = document.querySelector('[data-vazio]');
      var chips = document.querySelector('[data-chips]');
      if (!list.length) { empty.hidden = false; listing.hidden = true; if (featured) featured.hidden = true; return; }
      var f = list[0], fa = AREA[f.area];
      featured.innerHTML = '<a class="featured" href="' + esc(f.slug) + '.html">' +
        '<img src="' + esc(cover(f)) + '" alt="" width="1600" height="900" loading="eager" fetchpriority="high">' +
        '<div class="featured-body"><div class="featured-kicker"><span class="tag">Mais recente · ' + esc(fa.label) + '</span><span>' + esc(fmtDate(f.date)) + (f.reading ? ' · ' + esc(f.reading) + ' min de leitura' : '') + '</span></div>' +
        '<h2>' + esc(f.title) + '</h2>' + (f.summary ? '<p>' + esc(f.summary) + '</p>' : '') +
        '<span class="btn btn-primary">Ler o artigo <span aria-hidden="true">→</span></span></div></a>';
      featured.hidden = false;
      var html = '', chipHtml = '';
      AREAS.forEach(function (area) {
        var items = list.filter(function (a) { return a.area === area.key; });
        if (!items.length) return;
        chipHtml += '<a class="chip" href="#area-' + area.key + '">' + esc(area.label) + '</a>';
        html += '<section class="row" id="area-' + area.key + '" data-row aria-labelledby="t-' + area.key + '">' +
          '<div class="row-head"><h2 id="t-' + area.key + '">' + esc(area.label) + '<small>' + items.length + (items.length === 1 ? ' artigo' : ' artigos') + '</small></h2>' +
          '<div class="row-nav"><button type="button" data-dir="-1" aria-label="Anteriores">←</button><button type="button" data-dir="1" aria-label="Próximos">→</button></div></div>' +
          '<ul class="row-track">' + items.map(function (a, i) { return card(a, i < 3); }).join('') + '</ul></section>';
      });
      listing.innerHTML = html;
      if (chips) { chips.innerHTML = chipHtml; chips.hidden = false; }
      bindRowNav(listing);
    });
  }

  /* Relacionados (página de artigo) */
  var related = document.querySelector('[data-relacionados]');
  if (related) {
    var slug = document.body.dataset.slug, area = document.body.dataset.area;
    load().then(function (list) {
      var others = list.filter(function (a) { return a.slug !== slug; });
      var same = others.filter(function (a) { return a.area === area; });
      var rest = others.filter(function (a) { return a.area !== area; });
      var pick = same.concat(rest).slice(0, 6);
      if (!pick.length) return;
      related.querySelector('.row-track').innerHTML = pick.map(function (a) { return card(a, false); }).join('');
      related.hidden = false;
      bindRowNav(related);
    });
  }
})();
