(function () {
  'use strict';
  try { iniciar(); } catch (erro) { reserva(); }

  function canonica() {
    var l = document.querySelector('link[rel="canonical"]');
    return (l && l.href) || location.href.split('#')[0].split('?')[0];
  }

  function reserva() {
    var box = document.querySelector('[data-share]');
    if (!box) return;
    var url = canonica();
    var titulo = document.title || url;
    var wa = 'https://wa.me/?text=' + encodeURIComponent(titulo + '\n' + url);
    box.innerHTML = '<p style="text-align:center;margin:1.5rem 0"><a href="' + wa + '" target="_blank" rel="noopener">Enviar a um amigo</a> · <button type="button" id="cmp-fb-copy" style="cursor:pointer">Copiar link</button></p>';
    var b = document.getElementById('cmp-fb-copy');
    if (b) b.onclick = function () { copiarTexto(url); b.textContent = 'Link copiado'; };
  }

  function copiarTexto(texto) {
    var ok = false;
    try {
      var ta = document.createElement('textarea');
      ta.value = texto;
      ta.setAttribute('readonly', '');
      ta.setAttribute('aria-hidden', 'true');
      ta.style.cssText = 'position:fixed;left:0;top:0;width:2px;height:2px;opacity:0.01;z-index:1';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, texto.length);
      ok = document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) {}
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(texto).then(function () {}, function () {});
        ok = true;
      }
    } catch (e2) {}
    return ok;
  }

  function limpa(t) { return (t || '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); }

  function iniciar() {
    if (!document.querySelector('article')) return;
    var host = location.hostname;
    var GUIA = /^consumidor\./.test(host) || document.body.classList.contains('gp');
    var T = GUIA ? {
      bg: '#0B0D1C', ink: '#EEF0FF', muted: '#A3A9CF', accent: '#F5C977',
      glow1: 'rgba(141,184,255,.22)', glow2: 'rgba(245,201,119,.10)', line: 'rgba(160,170,255,.30)',
      marca: 'Guia do Passageiro', dominio: 'consumidor.lucasladeia.com.br', kickerFont: 'ui-monospace, Menlo, monospace',
      logo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#F5C977" stroke-width="2"/><path d="M9 25c6-1 12-5 18-14" fill="none" stroke="#F5C977" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3.2"/><path fill="#F5C977" d="M27.6 9.2l3.6-1.1-1.1 3.6-2.2 1.2 1.4 5.2-1.5 1-2.6-4.3-2.6 1.5.3 1.9-1 .7-1.1-2.5-2.5-1.1.7-1 1.9.3 1.5-2.6-4.3-2.6 1-1.5 5.2 1.4z"/><circle cx="9" cy="25" r="2" fill="#F5C977"/></svg>'
    } : {
      bg: '#160F0B', ink: '#F6EFE3', muted: 'rgba(246,239,227,.70)', accent: '#E7D5B5',
      glow1: 'rgba(122,36,51,.42)', glow2: 'rgba(231,213,181,.08)', line: 'rgba(231,213,181,.32)',
      marca: 'Lucas Brito Ladeia', dominio: 'lucasladeia.com.br', kickerFont: '"Source Sans 3", system-ui, sans-serif',
      logo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none"><ellipse cx="128" cy="150" rx="78" ry="72" fill="#8B5CF6" opacity=".28"/> <ellipse cx="128" cy="152" rx="52" ry="50" fill="#C084FC" opacity=".22"/> <path fill="#1C1F2E" stroke="#E8EDF8" stroke-width="7" stroke-linejoin="round" d="M78 108C78 28 178 28 178 108h-26C152 58 104 58 104 108Z"/> <path fill="#1C1F2E" stroke="#E8EDF8" stroke-width="7" stroke-linejoin="round" fill-rule="evenodd" d="M74 92c6-22 26-34 54-34s48 12 54 34l10 22H64l10-22Zm-12 22h132v86c0 14-12 24-26 24H88c-14 0-26-10-26-24V114Zm22 14h88c10 0 16 6 16 16v58c0 10-6 16-16 16H84c-10 0-16-6-16-16v-58c0-10 6-16 16-16Z"/> <rect x="72" y="132" width="112" height="82" rx="12" fill="#2A1848"/> <path fill="#C41E0A" d="M128 128c-26 32-32 56 0 80 32-24 26-48 0-80z"/> <path fill="#FF8A14" d="M128 138c-18 26-22 48 0 66 22-18 18-40 0-66z"/> <path fill="#FFE566" d="M128 150c-11 18-12 34 0 48 12-14 11-30 0-48z"/> <ellipse cx="128" cy="184" rx="10" ry="13" fill="#FFF6C8"/> <path fill="#1C1F2E" stroke="#E8EDF8" stroke-width="7" stroke-linejoin="round" d="M58 212h140l8 14c3 8-4 14-14 14H64c-10 0-17-6-14-14l8-14Z"/></svg>'
    };

    var meta = function (p) {
      var m = document.querySelector('meta[property="' + p + '"]');
      return m ? m.content : '';
    };
    var canon = canonica();
    var h1 = document.querySelector('article h1, h1');
    var titulo = limpa(meta('og:title') || (h1 && h1.textContent) || document.title);
    var leadEl = document.querySelector('.post-lead, .md-lead, .lead');
    var resumo = limpa((leadEl && leadEl.textContent) || meta('og:description'));
    var linha = limpa(meta('og:description') || resumo);
    var corte = linha.search(/[.!?](\s|$)/);
    if (corte > 30 && corte < 150) linha = linha.slice(0, corte + 1);
    else if (linha.length > 150) linha = linha.slice(0, 147).replace(/\s+\S*$/, '') + '…';
    var tagEl = document.querySelector('article .tag, .post-head .tag, .md-selo');
    var area = limpa(tagEl && tagEl.textContent);
    var slug = document.body.getAttribute('data-slug') || (location.pathname.split('/').pop() || 'artigo').replace(/\.html?$/, '');
    var curto = canon.replace(/^https?:\/\/(www\.)?/, '').replace(/\/index\.html?$/, '/').replace(/\.html?$/, '');
    var coverEl = document.querySelector('.post-cover img, article figure img, .md-capa img');
    var capaSrc = coverEl ? (coverEl.currentSrc || coverEl.src) : '';
    if (!capaSrc) capaSrc = meta('og:image');
    var posterEl = document.querySelector('.md-head-poster img');
    var posterSrc = posterEl ? (posterEl.currentSrc || posterEl.src) : '';
    var ua = navigator.userAgent || '';
    var interno = /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|Line\/|Twitter|TikTok|BytedanceWebview|musical_ly|Pinterest|Snapchat|LinkedInApp|GSA\/|\[FB|IABMV|; wv\)/i.test(ua);
    var amigoHref = 'https://wa.me/?text=' + encodeURIComponent(titulo + '\n' + canon);

    var css = GUIA
      ? '.cmp{--c-ink:#EEF0FF;--c-mut:#A3A9CF;--c-acc:#F5C977;--c-line:rgba(160,170,255,.28);--c-bg:rgba(255,255,255,.04);--c-sheet:#10132A}'
      : '.cmp{--c-ink:#F6EFE3;--c-mut:rgba(246,239,227,.66);--c-acc:#E7D5B5;--c-line:rgba(231,213,181,.30);--c-bg:rgba(231,213,181,.05);--c-sheet:#1C130E}';
    css += '.cmp{max-width:46rem;margin:2.6rem auto 2.2rem;padding:1.4rem 1.25rem 1.25rem;border-top:1px solid var(--c-line);border-bottom:1px solid var(--c-line);text-align:center;position:relative;z-index:2}' +
      '.cmp-eyebrow{margin:0 0 .9rem;font-size:.74rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--c-acc)}' +
      '.cmp-row{display:flex;flex-wrap:wrap;gap:.65rem;justify-content:center}' +
      '.cmp button,.cmp a.cmp-btn{-webkit-appearance:none;appearance:none;cursor:pointer}' +
      '.cmp-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:48px;padding:.75rem 1.25rem;border-radius:999px;border:1px solid var(--c-line);background:var(--c-bg);color:var(--c-ink);font:600 1rem/1.1 "Source Sans 3",system-ui,-apple-system,sans-serif;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;text-decoration:none;box-sizing:border-box}' +
      '.cmp-btn:hover{border-color:var(--c-acc)}.cmp-btn:active{transform:scale(.97)}' +
      '.cmp-btn svg{width:1.15em;height:1.15em;flex:none;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}' +
      '.cmp-btn span{pointer-events:none}' +
      '.cmp-btn.cmp-main{background:var(--c-acc);border-color:var(--c-acc);color:#14100c}' +
      '.cmp-btn[aria-busy="true"]{opacity:.7}' +
      '.cmp-msg{min-height:1.2em;margin:.8rem 0 0;font-size:.92rem;color:var(--c-mut)}' +
      '.cmp-prev{display:block;margin:1rem auto 0;width:160px;max-width:42%;border-radius:12px;border:1px solid var(--c-line);box-shadow:0 12px 30px rgba(0,0,0,.4)}' +
      '.cmp-topo{display:flex;gap:.5rem;margin-top:1rem;flex-wrap:wrap}' +
      '.cmp-topo .cmp-btn{min-height:44px;padding:.5rem .95rem;font-size:.92rem}' +
      '.cmp-topo .cmp-btn.cmp-main{background:var(--c-bg);color:var(--c-ink);border-color:var(--c-line)}' +
      '.cmp-topo .cmp-msg{flex-basis:100%;margin:.2rem 0 0;text-align:left}' +
      'body.cmp-aberto{overflow:hidden}' +
      '.cmp-folha{position:fixed;inset:0;z-index:400;display:flex;align-items:flex-end;justify-content:center;max-width:none;margin:0;padding:0;border:0}' +
      '.cmp-folha[hidden]{display:none}' +
      '.cmp-folha-bg{position:absolute;inset:0;background:rgba(0,0,0,.55);cursor:pointer}' +
      '.cmp-folha-card{position:relative;width:100%;max-width:32rem;max-height:88vh;overflow:auto;-webkit-overflow-scrolling:touch;background:var(--c-sheet,#1C130E);color:var(--c-ink);border-radius:22px 22px 0 0;padding:1.15rem 1.25rem calc(1.4rem + env(safe-area-inset-bottom,0px));box-shadow:0 -16px 50px rgba(0,0,0,.45);font-family:"Source Sans 3",system-ui,-apple-system,sans-serif;text-align:left}' +
      '.cmp-folha-handle{width:42px;height:4px;border-radius:999px;background:var(--c-line);margin:0 auto .85rem}' +
      '.cmp-folha-fechar{position:absolute;top:.7rem;right:.7rem;width:44px;height:44px;border:0;border-radius:999px;background:transparent;color:var(--c-ink);font-size:1.6rem;line-height:1;cursor:pointer}' +
      '.cmp-folha-card h2{margin:0 2.2rem .35rem 0;font:600 1.25rem/1.25 Fraunces,Georgia,serif}' +
      '.cmp-folha-tit{margin:0 0 .2rem;color:var(--c-mut);font-size:.95rem;line-height:1.35}' +
      '.cmp-inapp{margin:.6rem 0 0;padding:.75rem .9rem;border-radius:12px;background:rgba(255,255,255,.06);border:1px solid var(--c-line);color:var(--c-ink);font-size:.95rem}' +
      '.cmp-inapp[hidden]{display:none}' +
      '.cmp-destaque{display:grid;gap:.7rem;margin:1rem 0}' +
      '.cmp-destaque .cmp-btn{width:100%;min-height:52px;font-size:1.05rem}' +
      '.cmp-mais{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;margin:.2rem 0 0}' +
      '.cmp-mais .cmp-btn{min-height:46px;padding:.55rem .5rem;font-size:.95rem}' +
      '.cmp-story-area{margin-top:1rem;text-align:center}' +
      '.cmp-story-area[hidden]{display:none}' +
      '.cmp-folha .cmp-msg{text-align:center}' +
      '.cmp-hint{margin:.7rem 0 0;font-size:.92rem;color:var(--c-mut)}';
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var IC_SHARE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"/><path d="M7.5 7.5 12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
    var IC_STORY = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="3"/><circle cx="12" cy="10.5" r="3"/><path d="M9 16.5h6"/></svg>';
    var IC_COPY = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    var IC_AMIGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.4-5A8.5 8.5 0 1 1 21 12z"/><path d="M9 11.5h6M9 14.5h4"/></svg>';

    var box = document.querySelector('[data-share]');
    if (!box) {
      box = document.createElement('div');
      box.setAttribute('data-share', '');
      var art = document.querySelector('article');
      var after = art.querySelector('.post-after, aside.author');
      if (after && after.parentNode === art) art.insertBefore(box, after);
      else art.appendChild(box);
    }
    box.className = 'compartilhar cmp';
    box.innerHTML =
      '<p class="cmp-eyebrow">Compartilhe este artigo</p>' +
      '<div class="cmp-row">' +
        '<button type="button" class="cmp-btn cmp-main" data-acao="abrir">' + IC_SHARE + '<span>Compartilhar</span></button>' +
        '<button type="button" class="cmp-btn" data-acao="story">' + IC_STORY + '<span>Story do Instagram</span></button>' +
      '</div>' +
      '<p class="cmp-msg" role="status" aria-live="polite"></p>';

    var head = document.querySelector('.post-head-inner, .post-head, .md-head');
    if (head && !head.querySelector('.cmp-topo')) {
      var topo = document.createElement('div');
      topo.className = 'cmp cmp-topo';
      topo.style.cssText = 'max-width:none;margin:1rem 0 0;padding:0;border:0;text-align:left';
      topo.innerHTML =
        '<button type="button" class="cmp-btn cmp-main" data-acao="abrir">' + IC_SHARE + '<span>Compartilhar</span></button>' +
        '<button type="button" class="cmp-btn" data-acao="story">' + IC_STORY + '<span>Story</span></button>' +
        '<p class="cmp-msg" role="status" aria-live="polite"></p>';
      head.appendChild(topo);
    }

    var esc = function (t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
    var folha = document.createElement('div');
    folha.className = 'cmp cmp-folha';
    folha.setAttribute('hidden', '');
    folha.setAttribute('role', 'dialog');
    folha.setAttribute('aria-modal', 'true');
    folha.setAttribute('aria-labelledby', 'cmp-folha-t');
    folha.innerHTML =
      '<div class="cmp-folha-bg" data-acao="fechar"></div>' +
      '<div class="cmp-folha-card">' +
        '<div class="cmp-folha-handle"></div>' +
        '<button type="button" class="cmp-folha-fechar" data-acao="fechar" aria-label="Fechar">×</button>' +
        '<h2 id="cmp-folha-t">Compartilhar</h2>' +
        '<p class="cmp-folha-tit">' + esc(titulo) + '</p>' +
        '<p class="cmp-inapp"' + (interno ? '' : ' hidden') + '>Dentro do app, use Copiar link. Para o story com imagem, abra a página no navegador: toque em ⋯ e depois em Abrir no navegador.</p>' +
        '<div class="cmp-destaque">' +
          '<button type="button" class="cmp-btn cmp-main" data-acao="copiar">' + IC_COPY + '<span>Copiar link</span></button>' +
          '<a class="cmp-btn" data-rede="amigo" href="' + esc(amigoHref) + '" target="_blank" rel="noopener">' + IC_AMIGO + '<span>Enviar a um amigo</span></a>' +
          '<button type="button" class="cmp-btn" data-acao="story">' + IC_STORY + '<span>Story do Instagram</span></button>' +
        '</div>' +
        '<div class="cmp-mais">' +
          '<a class="cmp-btn" data-rede="telegram" target="_blank" rel="noopener" href="' + esc('https://t.me/share/url?url=' + encodeURIComponent(canon) + '&text=' + encodeURIComponent(titulo)) + '">Telegram</a>' +
          '<a class="cmp-btn" data-rede="x" target="_blank" rel="noopener" href="' + esc('https://x.com/intent/post?text=' + encodeURIComponent(titulo) + '&url=' + encodeURIComponent(canon)) + '">X</a>' +
          '<a class="cmp-btn" data-rede="email" href="' + esc('mailto:?subject=' + encodeURIComponent(titulo) + '&body=' + encodeURIComponent(titulo + '\n\n' + canon)) + '">E-mail</a>' +
        '</div>' +
        '<div class="cmp-story-area" hidden>' +
          '<img class="cmp-prev" alt="Imagem do artigo para o story" width="160" height="284">' +
          '<p class="cmp-hint">No story, cole o link no adesivo Link. Se a imagem não abriu sozinha, toque em Compartilhar imagem ou segure a imagem para salvar.</p>' +
          '<div class="cmp-row" style="margin-top:.8rem">' +
            '<button type="button" class="cmp-btn cmp-main" data-acao="enviar-img">' + IC_SHARE + '<span>Compartilhar imagem</span></button>' +
            '<button type="button" class="cmp-btn" data-acao="baixar-img">Salvar imagem</button>' +
          '</div>' +
        '</div>' +
        '<p class="cmp-msg" role="status" aria-live="polite"></p>' +
      '</div>';
    document.body.appendChild(folha);

    var msgFolha = folha.querySelector('.cmp-folha-card > .cmp-msg');
    var storyArea = folha.querySelector('.cmp-story-area');
    var storyImg = folha.querySelector('.cmp-prev');
    var btnEnviarImg = folha.querySelector('[data-acao="enviar-img"]');
    var ultimoFoco = null, msgAlvo = null, msgTimer = null;

    function msg(t) {
      var alvos = [msgFolha];
      if (msgAlvo && msgAlvo !== msgFolha) alvos.push(msgAlvo);
      for (var i = 0; i < alvos.length; i++) alvos[i].textContent = t || '';
      clearTimeout(msgTimer);
      if (t) msgTimer = setTimeout(function () {
        if (msgAlvo && msgAlvo !== msgFolha) msgAlvo.textContent = '';
      }, 9000);
    }

    function abrirFolha() {
      if (!folha.hasAttribute('hidden')) return;
      ultimoFoco = document.activeElement;
      folha.removeAttribute('hidden');
      document.body.classList.add('cmp-aberto');
      var first = folha.querySelector('[data-acao="copiar"]');
      if (first) first.focus();
    }

    function fecharFolha() {
      folha.setAttribute('hidden', '');
      document.body.classList.remove('cmp-aberto');
      msgFolha.textContent = '';
      if (ultimoFoco && ultimoFoco.focus) {
        try { ultimoFoco.focus(); } catch (e) {}
      }
    }

    var W = 1080, H = 1920, storyFile = null, storyBlob = null, storyUrl = null, gerando = null;
    var nomeArq = 'story-' + slug + '.png';

    function carregaImg(src) {
      return new Promise(function (ok) {
        if (!src) return ok(null);
        var im = new Image();
        im.decoding = 'async';
        im.onload = function () { ok(im); };
        im.onerror = function () { ok(null); };
        im.src = src;
      });
    }
    function linhas(ctx, texto, max) {
      var pal = texto.split(/\s+/), out = [], cur = '';
      for (var i = 0; i < pal.length; i++) {
        var t = cur ? cur + ' ' + pal[i] : pal[i];
        if (ctx.measureText(t).width > max && cur) { out.push(cur); cur = pal[i]; }
        else cur = t;
      }
      if (cur) out.push(cur);
      return out;
    }
    function corta(ctx, ls, n, max) {
      if (ls.length <= n) return ls;
      ls = ls.slice(0, n);
      var u = ls[n - 1];
      while (u && ctx.measureText(u + '…').width > max) u = u.replace(/\s*\S+$/, '');
      ls[n - 1] = u + '…';
      return ls;
    }
    function espacado(ctx, texto, x, y, esp) {
      for (var i = 0; i < texto.length; i++) {
        ctx.fillText(texto[i], x, y);
        x += ctx.measureText(texto[i]).width + esp;
      }
    }
    function gerar() {
      if (gerando) return gerando;
      gerando = Promise.all([
        document.fonts && document.fonts.load ? Promise.all([
          document.fonts.load('600 80px Fraunces'),
          document.fonts.load('400 40px "Source Sans 3"'),
          document.fonts.load('700 30px "Source Sans 3"')
        ]).catch(function () {}) : null,
        carregaImg(capaSrc),
        carregaImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(T.logo)),
        carregaImg(posterSrc)
      ]).then(function (r) {
        var capa = r[1], logo = r[2], poster = r[3];
        var c = document.createElement('canvas');
        c.width = W; c.height = H;
        var x = c.getContext('2d');
        x.fillStyle = T.bg; x.fillRect(0, 0, W, H);
        var g = x.createRadialGradient(W * .85, 0, 0, W * .85, 0, W * 1.1);
        g.addColorStop(0, T.glow1); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = g; x.fillRect(0, 0, W, H);
        g = x.createRadialGradient(0, H, 0, 0, H, W);
        g.addColorStop(0, T.glow2); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = g; x.fillRect(0, 0, W, H);
        var capaH = poster ? 980 : 860;
        if (capa) {
          try {
            var s = Math.max(W / capa.naturalWidth, capaH / capa.naturalHeight);
            var cw = capa.naturalWidth * s, ch = capa.naturalHeight * s;
            x.save(); x.beginPath(); x.rect(0, 0, W, capaH); x.clip();
            if (poster) { x.filter = 'blur(22px)'; x.globalAlpha = .35; }
            else x.globalAlpha = .92;
            x.drawImage(capa, (W - cw) / 2, (capaH - ch) / 2, cw, ch);
            x.restore(); x.filter = 'none';
          } catch (e) {}
        }
        g = x.createLinearGradient(0, 0, 0, capaH);
        g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(.3, 'rgba(0,0,0,0)');
        g.addColorStop(.62, 'rgba(0,0,0,.15)'); g.addColorStop(1, T.bg);
        x.fillStyle = g; x.fillRect(0, 0, W, capaH + 2);
        if (poster) {
          try {
            var ph = 640, pw = Math.round(ph * poster.naturalWidth / poster.naturalHeight);
            var px = (W - pw) / 2, py = 300;
            x.save(); x.shadowColor = 'rgba(0,0,0,.6)'; x.shadowBlur = 50; x.shadowOffsetY = 20;
            x.fillStyle = '#000'; x.fillRect(px, py, pw, ph); x.restore();
            x.drawImage(poster, px, py, pw, ph);
            x.strokeStyle = T.line; x.lineWidth = 2; x.strokeRect(px, py, pw, ph);
          } catch (e) {}
        }
        var M = 96, y = 230;
        if (logo) {
          var lh = GUIA ? 76 : 92, lw = GUIA ? 76 : 92;
          x.drawImage(logo, M - 6, y - lh + 16, lw, lh);
        }
        x.textBaseline = 'alphabetic';
        x.fillStyle = T.ink; x.font = '700 36px "Source Sans 3", system-ui, sans-serif';
        x.fillText(GUIA ? T.marca : 'Lucas Brito Ladeia · OAB/MA 16.091', M + 106, y - 22);
        x.fillStyle = T.muted; x.font = '400 29px "Source Sans 3", system-ui, sans-serif';
        x.fillText(GUIA ? 'Lucas Brito Ladeia · OAB/MA 16.091' : 'Advogado', M + 106, y + 16);
        y = capaH + 10;
        if (area) {
          x.fillStyle = T.accent; x.font = '700 30px ' + T.kickerFont;
          x.fillRect(M, y - 11, 46, 3);
          espacado(x, area.toUpperCase(), M + 66, y, 5);
        }
        var max = W - M * 2, fs = 92, ls;
        for (; fs >= 56; fs -= 4) {
          x.font = '600 ' + fs + 'px Fraunces, Georgia, serif';
          ls = linhas(x, titulo, max);
          if (ls.length <= 5) break;
        }
        ls = corta(x, ls, 6, max);
        x.fillStyle = T.ink; y += 40 + fs;
        for (var i = 0; i < ls.length; i++) { x.fillText(ls[i], M, y); y += Math.round(fs * 1.14); }
        var rn = resumo.toLowerCase().replace(/[^a-zà-ú0-9]+/g, ' ').slice(0, 40), tn = titulo.toLowerCase().replace(/[^a-zà-ú0-9]+/g, ' ');
        if (resumo && tn.indexOf(rn.slice(0, 24)) < 0 && y < 1440) {
          x.font = '400 38px "Source Sans 3", system-ui, sans-serif';
          x.fillStyle = T.muted;
          var n = Math.max(1, Math.min(3, Math.floor((1520 - y) / 52)));
          var lr = corta(x, linhas(x, resumo, max), n, max);
          y += 22;
          for (i = 0; i < lr.length; i++) { x.fillText(lr[i], M, y + 14); y += 52; }
        }
        var fy = 1660;
        x.strokeStyle = T.line; x.lineWidth = 2;
        x.beginPath(); x.moveTo(M, fy - 90); x.lineTo(W - M, fy - 90); x.stroke();
        x.fillStyle = T.muted; x.font = '400 30px "Source Sans 3", system-ui, sans-serif';
        x.fillText('Leia o artigo completo em', M, fy - 30);
        x.fillStyle = T.accent;
        var fu = 46, lu = [curto];
        for (; fu >= 36; fu -= 2) {
          x.font = '700 ' + fu + 'px "Source Sans 3", system-ui, sans-serif';
          if (x.measureText(curto).width <= max) break;
        }
        if (fu < 36) {
          fu = 40; x.font = '700 40px "Source Sans 3", system-ui, sans-serif';
          var corteU = curto.lastIndexOf('/') + 1;
          lu = [curto.slice(0, corteU), curto.slice(corteU)];
          while (x.measureText(lu[1]).width > max && fu > 30) { fu -= 2; x.font = '700 ' + fu + 'px "Source Sans 3", system-ui, sans-serif'; }
        }
        for (i = 0; i < lu.length; i++) x.fillText(lu[i], M, fy + 26 + i * Math.round(fu * 1.25));
        return new Promise(function (ok) { c.toBlob(function (b) { ok(b); }, 'image/png'); });
      }).then(function (b) {
        if (!b) throw new Error('sem imagem');
        storyBlob = b;
        try { storyFile = new File([b], nomeArq, { type: 'image/png', lastModified: Date.now() }); }
        catch (e) { storyFile = null; }
        if (storyUrl) URL.revokeObjectURL(storyUrl);
        storyUrl = URL.createObjectURL(b);
        storyImg.src = storyUrl;
        return b;
      });
      gerando.then(function () {}, function () { gerando = null; });
      return gerando;
    }

    function podeArquivo() {
      try { return !!(storyFile && !interno && navigator.canShare && navigator.canShare({ files: [storyFile] })); }
      catch (e) { return false; }
    }

    function baixarImagem() {
      if (!storyUrl) return false;
      var a = document.createElement('a');
      a.href = storyUrl;
      a.download = nomeArq;
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    }

    function compartilharNativo(dados) {
      return new Promise(function (ok) {
        if (interno || typeof navigator.share !== 'function') { ok('falhou'); return; }
        try {
          if (navigator.canShare && !navigator.canShare(dados)) { ok('falhou'); return; }
          var ret = navigator.share(dados);
          if (!ret || typeof ret.then !== 'function') { ok('ok'); return; }
          ret.then(function () { ok('ok'); }, function (e) {
            ok(e && e.name === 'AbortError' ? 'cancelou' : 'falhou');
          });
        } catch (e) { ok('falhou'); }
      });
    }

    var AVISO_STORY = 'Link copiado: cole no adesivo Link do story';
    var AVISO_SALVA = 'Imagem salva e link copiado: no story, cole o link no adesivo Link';

    function enviarImagem() {
      return compartilharNativo({ files: [storyFile], title: titulo }).then(function (r) {
        if (r === 'falhou') {
          storyArea.removeAttribute('hidden');
          abrirFolha();
        }
        return r;
      });
    }

    function acaoStory(ev) {
      var el = ev && ev.currentTarget;
      msgAlvo = (el && el.closest('.cmp') && el.closest('.cmp').querySelector('.cmp-msg')) || msgFolha;
      var copiou = copiarTexto(canon);
      msg(copiou ? AVISO_STORY : 'Preparando a imagem do story…');
      if (el) el.setAttribute('aria-busy', 'true');
      gerar().then(function () {
        if (el) el.removeAttribute('aria-busy');
        if (podeArquivo()) {
          enviarImagem().then(function (r) {
            if (r === 'falhou') msg(copiou ? AVISO_STORY + '. Toque em Compartilhar imagem.' : 'Toque em Compartilhar imagem.');
            else if (copiou) msg(AVISO_STORY);
          });
        } else {
          btnEnviarImg.setAttribute('hidden', '');
          var dica = folha.querySelector('.cmp-hint');
          if (dica) dica.textContent = 'No story, cole o link no adesivo Link. Se a imagem não baixou, segure a imagem para salvar.';
          var salvou = baixarImagem();
          storyArea.removeAttribute('hidden');
          abrirFolha();
          msg(salvou && copiou ? AVISO_SALVA : (copiou ? AVISO_STORY + '. Segure a imagem para salvar.' : 'Segure a imagem para salvar e use Copiar link.'));
        }
      }, function () {
        if (el) el.removeAttribute('aria-busy');
        abrirFolha();
        msg(copiou ? 'Não deu para montar a imagem agora. Link copiado.' : 'Não deu para montar a imagem agora. Use Copiar link.');
      });
    }

    function acaoEnviarImg() {
      copiarTexto(canon);
      if (!podeArquivo()) { baixarImagem(); msg(AVISO_SALVA); return; }
      enviarImagem().then(function (r) {
        msg(r === 'falhou' ? AVISO_SALVA : AVISO_STORY);
        if (r === 'falhou') baixarImagem();
      });
    }

    function acaoBaixarImg() {
      var copiou = copiarTexto(canon);
      if (baixarImagem()) msg(copiou ? AVISO_SALVA : 'Imagem salva. Use Copiar link para o adesivo Link.');
    }

    function acaoAbrir(ev) {
      var el = ev && ev.currentTarget;
      msgAlvo = (el && el.closest('.cmp') && el.closest('.cmp').querySelector('.cmp-msg')) || msgFolha;
      if (interno || typeof navigator.share !== 'function') { abrirFolha(); return; }
      compartilharNativo({ title: titulo, text: linha, url: canon }).then(function (r) {
        if (r === 'falhou') abrirFolha();
      });
    }

    function acaoCopiar(ev) {
      var el = ev && ev.currentTarget;
      msgAlvo = msgFolha;
      var ok = copiarTexto(canon);
      msg(ok ? 'Link copiado' : canon);
      if (el && ok) {
        var sp = el.querySelector('span');
        if (sp) {
          sp.textContent = 'Link copiado';
          setTimeout(function () { sp.textContent = 'Copiar link'; }, 2500);
        }
      }
    }

    function noToque(el, fn) {
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        fn(ev);
      });
    }

    var botoes = document.querySelectorAll('.cmp [data-acao]');
    for (var i = 0; i < botoes.length; i++) {
      (function (el) {
        var acao = el.getAttribute('data-acao');
        if (acao === 'abrir') noToque(el, acaoAbrir);
        else if (acao === 'story') {
          noToque(el, acaoStory);
          el.addEventListener('pointerdown', function () { gerar().then(function () {}, function () {}); });
        }
        else if (acao === 'copiar') noToque(el, acaoCopiar);
        else if (acao === 'fechar') noToque(el, fecharFolha);
        else if (acao === 'enviar-img') noToque(el, acaoEnviarImg);
        else if (acao === 'baixar-img') noToque(el, acaoBaixarImg);
      })(botoes[i]);
    }

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !folha.hasAttribute('hidden')) fecharFolha();
    });
  }
})();
