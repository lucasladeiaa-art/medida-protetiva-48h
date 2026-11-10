(function () {
  'use strict';

  var btn = document.getElementById('buscaBtn');
  if (!btn) return;

  var AREA = {
    'medida-protetiva': 'Medida protetiva',
    familia: 'Família',
    criminal: 'Criminal',
    cac: 'CAC',
    'mundo-em-disputa': 'Mundo em Disputa'
  };

  var script = document.querySelector('script[src*="busca.js"]');
  var root = '';
  if (script) {
    root = String(script.getAttribute('src') || '').replace(/assets\/busca\.js(\?.*)?$/, '');
  }

  var catalog = null;
  var lastFocus = null;
  var painel, campo, lista, status, caixa;

  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function injectCss() {
    if (document.getElementById('busca-css')) return;
    var css = document.createElement('style');
    css.id = 'busca-css';
    css.textContent = [
      '.busca-btn{display:inline-grid;place-items:center;width:2.6rem;height:2.6rem;flex:none;padding:0;border-radius:12px;border:1px solid rgba(231,213,181,.28);background:rgba(255,255,255,.05);color:currentColor;cursor:pointer;line-height:0}',
      '.busca-btn:hover,.busca-btn[aria-expanded="true"]{background:rgba(201,169,106,.16);border-color:rgba(201,169,106,.45)}',
      '.busca-btn:focus-visible{outline:2px solid #e2c99a;outline-offset:2px}',
      '.busca-btn svg{display:block}',
      '.sala-escura .busca-btn,.hs .busca-btn,.home .busca-btn{color:inherit}',
      '.busca-painel{position:fixed;inset:0;z-index:80;background:rgba(5,6,14,.62);padding:5.5rem .8rem 1.5rem;display:flex;align-items:flex-start;justify-content:center}',
      '.busca-painel[hidden]{display:none}',
      '.busca-caixa{width:min(36rem,100%);background:#0b0d1c;color:#f1f0ec;border:1px solid rgba(231,213,181,.22);border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.45);padding:1rem;max-height:min(32rem,calc(100dvh - 6.5rem));overflow:auto}',
      '.busca-topo{display:flex;gap:.5rem;align-items:center}',
      '.busca-topo input[type="search"]{flex:1;min-width:0;min-height:2.75rem;border-radius:10px;border:1px solid rgba(231,213,181,.28);background:rgba(255,255,255,.04);color:#f1f0ec;font:500 1rem/1.3 inherit;padding:.55rem .85rem}',
      '.busca-topo input[type="search"]::placeholder{color:#aab0c0}',
      '.busca-topo input[type="search"]:focus{outline:2px solid #e2c99a;outline-offset:1px;border-color:#e2c99a}',
      '.busca-fechar{width:2.75rem;height:2.75rem;flex:none;border:0;border-radius:10px;background:transparent;color:#e2c99a;font-size:1.6rem;line-height:1;cursor:pointer}',
      '.busca-fechar:focus-visible{outline:2px solid #e2c99a;outline-offset:2px}',
      '.busca-status{margin:.7rem .15rem 0;font-size:.85rem;color:#aab0c0}',
      '.busca-lista{list-style:none;margin:.35rem 0 0;padding:0}',
      '.busca-lista a{display:block;padding:.7rem .65rem;border-radius:10px;text-decoration:none;color:#f1f0ec}',
      '.busca-lista a:hover,.busca-lista a:focus{background:rgba(201,169,106,.14);outline:none}',
      '.busca-lista a:focus-visible{outline:2px solid #e2c99a;outline-offset:-2px}',
      '.busca-kicker{display:block;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:#e2c99a;margin-bottom:.15rem}',
      '.busca-titulo{display:block;font-weight:600;line-height:1.35}',
      '.busca-resumo{display:block;margin-top:.2rem;font-size:.88rem;line-height:1.4;color:#c5c8d4}',
      '@media (max-width:640px){.busca-painel{padding:4.75rem .55rem 1rem}.busca-caixa{border-radius:14px;max-height:calc(100dvh - 5.5rem)}}'
    ].join('');
    document.head.appendChild(css);
  }

  function build() {
    if (painel) return;
    injectCss();
    painel = document.createElement('div');
    painel.id = 'busca-painel';
    painel.className = 'busca-painel';
    painel.hidden = true;
    painel.setAttribute('role', 'dialog');
    painel.setAttribute('aria-label', 'Buscar artigos');
    painel.setAttribute('aria-modal', 'true');
    painel.innerHTML = '<div class="busca-caixa">' +
      '<div class="busca-topo">' +
      '<input id="buscaCampo" type="search" aria-label="Buscar" placeholder="Buscar nos artigos" autocomplete="off" enterkeyhint="search" aria-controls="busca-lista">' +
      '<button type="button" class="busca-fechar" aria-label="Fechar busca">&times;</button>' +
      '</div>' +
      '<p class="busca-status" role="status" aria-live="polite"></p>' +
      '<ul id="busca-lista" class="busca-lista" role="listbox" aria-label="Resultados da busca"></ul>' +
      '</div>';
    document.body.appendChild(painel);
    caixa = painel.querySelector('.busca-caixa');
    campo = painel.querySelector('#buscaCampo');
    lista = painel.querySelector('#busca-lista');
    status = painel.querySelector('.busca-status');
    painel.querySelector('.busca-fechar').addEventListener('click', close);
    painel.addEventListener('click', function (e) {
      if (e.target === painel) close();
    });
    campo.addEventListener('input', render);
  }

  function haystack(a) {
    return norm([
      a.title,
      a.summary,
      a.tagline,
      a.posterTitle,
      AREA[a.area] || a.area,
      String(a.slug || '').replace(/-/g, ' ')
    ].join(' '));
  }

  function load() {
    if (catalog) return Promise.resolve(catalog);
    return fetch(root + 'artigos/artigos.json', { credentials: 'same-origin', cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) {
        if (!Array.isArray(list)) list = list && Array.isArray(list.artigos) ? list.artigos : [];
        catalog = list.filter(function (a) {
          return a && a.slug && a.title && AREA[a.area];
        }).map(function (a) {
          return {
            title: a.title,
            slug: a.slug,
            summary: a.summary || '',
            area: a.area,
            label: AREA[a.area] || a.area,
            hay: haystack(a)
          };
        });
        return catalog;
      })
      .catch(function () {
        catalog = [];
        return catalog;
      });
  }

  function render() {
    if (!catalog) return;
    var q = norm(campo.value).trim();
    var tokens = q ? q.split(/\s+/).filter(Boolean) : [];
    lista.innerHTML = '';
    if (!tokens.length) {
      status.textContent = 'Digite para buscar nos artigos da Rede de Proteção.';
      return;
    }
    var hits = catalog.filter(function (a) {
      return tokens.every(function (t) { return a.hay.indexOf(t) !== -1; });
    });
    if (!hits.length) {
      status.textContent = 'Nenhum artigo encontrado.';
      return;
    }
    status.textContent = hits.length === 1 ? '1 artigo encontrado.' : hits.length + ' artigos encontrados.';
    var frag = document.createDocumentFragment();
    hits.forEach(function (a, i) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      var link = document.createElement('a');
      link.href = root + 'artigos/' + a.slug + '.html';
      link.id = 'busca-opt-' + i;
      var k = document.createElement('span');
      k.className = 'busca-kicker';
      k.textContent = a.label;
      var t = document.createElement('span');
      t.className = 'busca-titulo';
      t.textContent = a.title;
      link.appendChild(k);
      link.appendChild(t);
      if (a.summary) {
        var r = document.createElement('span');
        r.className = 'busca-resumo';
        r.textContent = a.summary.length > 160 ? a.summary.slice(0, 157) + '…' : a.summary;
        link.appendChild(r);
      }
      li.appendChild(link);
      frag.appendChild(li);
    });
    lista.appendChild(frag);
  }

  function open() {
    build();
    lastFocus = document.activeElement;
    painel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    campo.value = '';
    lista.innerHTML = '';
    status.textContent = 'Carregando os artigos…';
    campo.focus();
    load().then(function () {
      if (painel.hidden) return;
      render();
    });
  }

  function close() {
    if (!painel || painel.hidden) return;
    painel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    else btn.focus();
  }

  function toggle() {
    if (painel && !painel.hidden) close();
    else open();
  }

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    toggle();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && painel && !painel.hidden) {
      e.preventDefault();
      close();
    }
  });
})();
