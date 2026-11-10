(function () {
  "use strict";
  function boot() {
    if (window.__refugioOn) return;
    window.__refugioOn = 1;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var root = document.documentElement;
    function el(tag, cls) {
      var n = document.createElement(tag);
      n.className = cls;
      n.setAttribute("aria-hidden", "true");
      return n;
    }
    var cssLink = document.querySelector('link[href*="refugio.css"]');
    if (!cssLink) {
      cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      var src = "";
      var scripts = document.getElementsByTagName("script");
      for (var si = 0; si < scripts.length; si++) {
        if (scripts[si].src && scripts[si].src.indexOf("refugio.js") >= 0) { src = scripts[si].src; break; }
      }
      var href = src ? new URL("refugio.css", src).href : "/assets/refugio.css";
      cssLink.href = href.split("?")[0] + "?v=20261110acesa";
      document.head.appendChild(cssLink);
    }
    document.body.appendChild(el("div", "refugio-fog"));
    document.body.appendChild(el("div", "refugio-grain"));
    var extra = document.getElementById("loop-extra-title");
    if (extra) {
      var box = extra.closest(".loop-leia") || extra.parentElement;
      if (box) box.classList.add("refugio-farol");
    }
    var capaSel = ".poster,.a-card,.loop-card,.featured,.loop-prox-card,.rcard,.case,.gp-book,.fita,.vhs,.ponte-guia-card,.entrada-card,.guias-media,.porta";
    var coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    var bloomTick = 0;
    var capaPals = ["ambar","queimado","vermelho","magenta","violeta","cobalto","ciano","esmeralda","lima","dourado","salmao"];
    var capaMap = {
      "ela-me-mandou-mensagem-ou-terceiro-medida-protetiva":"magenta",
      "existe-audiencia-na-medida-protetiva":"cobalto",
      "pessoa-que-pediu-a-medida-protetiva-desistiu":"lima",
      "como-preservar-conversas-e-documentar-ameacas":"ciano",
      "como-contestar-medida-protetiva-prazo-para-defesa":"vermelho",
      "fui-ameacada-como-pedir-medida-protetiva":"violeta",
      "posso-apresentar-provas-depois-da-medida-protetiva":"esmeralda",
      "ele-descumpriu-a-medida-protetiva-o-que-fazer":"queimado",
      "como-pedir-revogacao-ou-revisao-de-medida-protetiva":"ambar",
      "descumpri-medida-protetiva-e-agora":"salmao",
      "medida-protetiva-primeiras-48-horas":"dourado",
      "posso-ver-meu-filho-com-medida-protetiva":"ciano",
      "medida-protetiva-aparece-em-antecedentes-concurso-emprego-viagem":"cobalto",
      "ela-chegou-no-mesmo-lugar-medida-protetiva":"magenta",
      "pg-48h":"lima",
      "pg-protetiva":"esmeralda",
      "como-recuperar-bens-apreendidos":"queimado",
      "prisao-preventiva-sem-condenacao":"vermelho",
      "mandado-de-busca-e-apreensao-o-que-a-policia-pode-fazer":"violeta",
      "policia-levou-meu-celular-pode-acessar-minhas-conversas":"ciano",
      "whatsapp-fora-de-contexto-como-demonstrar":"esmeralda",
      "como-consultar-inquerito-policial":"cobalto",
      "citacao-criminal-o-que-acontece-prazo-para-defesa":"salmao",
      "recebi-intimacao-e-mandei-mensagem-medida-protetiva":"magenta",
      "intimado-depor-delegacia-direito-ao-silencio":"dourado",
      "acusado-falsamente-o-que-fazer-antes-de-depor":"lima",
      "ex-ficou-com-a-casa-aluguel-uso-exclusivo":"ambar",
      "uniao-estavel-sem-contrato-o-que-acontece-com-o-patrimonio":"dourado",
      "comunhao-parcial-o-que-entra-na-partilha":"esmeralda",
      "pensao-nao-paga-como-exigir-na-justica":"vermelho",
      "convivencia-com-o-filho-como-exigir":"salmao",
      "pensao-atrasada-posso-ser-preso-em-quantos-dias":"queimado",
      "pensao-acaba-aos-18-ou-aos-21":"cobalto",
      "guarda-compartilhada-paga-pensao":"lima",
      "medida-protetiva-sai-de-casa-guarda-imovel":"ciano",
      "perdi-o-emprego-e-pago-pensao-o-que-fazer":"violeta",
      "moro-no-exterior-preciso-voltar-brasil":"cobalto",
      "pg-familia":"ambar",
      "cac-investigado-ou-reu-perco-cr-e-armas":"queimado",
      "cac-medida-protetiva-acervo-registro":"cobalto",
      "pg-cac":"dourado",
      "caso-nvidia-cadeia-de-custodia-prova-digital":"ciano",
      "depp-heard-dois-tribunais-dois-veredictos":"magenta",
      "pg-disputa":"dourado"
    };
    var capaGrafica = {
      "caso-nvidia-cadeia-de-custodia-prova-digital": 1,
      "depp-heard-dois-tribunais-dois-veredictos": 1,
      "pg-disputa": 1, "pg-cac": 1, "pg-48h": 1, "pg-protetiva": 1, "pg-familia": 1
    };
    var capaRotulo = {
      "ela-me-mandou-mensagem-ou-terceiro-medida-protetiva":"Posso responder?",
      "existe-audiencia-na-medida-protetiva":"Vai ter audiência?",
      "pessoa-que-pediu-a-medida-protetiva-desistiu":"Ela quer retirar a queixa",
      "como-preservar-conversas-e-documentar-ameacas":"Como guardar os prints",
      "como-contestar-medida-protetiva-prazo-para-defesa":"Qual o prazo da defesa?",
      "fui-ameacada-como-pedir-medida-protetiva":"Onde eu peço isso?",
      "posso-apresentar-provas-depois-da-medida-protetiva":"Ainda posso juntar provas?",
      "ele-descumpriu-a-medida-protetiva-o-que-fazer":"Como eu registro isso?",
      "como-pedir-revogacao-ou-revisao-de-medida-protetiva":"Quero rever a medida",
      "descumpri-medida-protetiva-e-agora":"O que pode me acontecer?",
      "medida-protetiva-primeiras-48-horas":"O que faço agora?",
      "posso-ver-meu-filho-com-medida-protetiva":"Como ficam as visitas?",
      "medida-protetiva-aparece-em-antecedentes-concurso-emprego-viagem":"Aparece na minha certidão?",
      "ela-chegou-no-mesmo-lugar-medida-protetiva":"Tenho que ir embora?",
      "pg-48h":"Recebi a intimação. E agora?",
      "pg-protetiva":"O que eu preciso cumprir?",
      "como-recuperar-bens-apreendidos":"Quando devolvem o que levaram?",
      "prisao-preventiva-sem-condenacao":"Prisão antes do julgamento?",
      "mandado-de-busca-e-apreensao-o-que-a-policia-pode-fazer":"O que podem fazer aqui?",
      "policia-levou-meu-celular-pode-acessar-minhas-conversas":"Podem ler minhas conversas?",
      "whatsapp-fora-de-contexto-como-demonstrar":"A conversa foi recortada",
      "como-consultar-inquerito-policial":"O que existe contra mim?",
      "citacao-criminal-o-que-acontece-prazo-para-defesa":"Qual é o prazo agora?",
      "recebi-intimacao-e-mandei-mensagem-medida-protetiva":"A mensagem já conta?",
      "intimado-depor-delegacia-direito-ao-silencio":"Posso ficar calado?",
      "acusado-falsamente-o-que-fazer-antes-de-depor":"Como me preparar para depor?",
      "ex-ficou-com-a-casa-aluguel-uso-exclusivo":"Posso pedir o aluguel?",
      "uniao-estavel-sem-contrato-o-que-acontece-com-o-patrimonio":"Como ficam os bens?",
      "comunhao-parcial-o-que-entra-na-partilha":"O que entra na partilha?",
      "pensao-nao-paga-como-exigir-na-justica":"Como exigir o pagamento?",
      "convivencia-com-o-filho-como-exigir":"Como exigir as visitas?",
      "moro-no-exterior-preciso-voltar-brasil":"Preciso voltar ao Brasil?",
      "pensao-atrasada-posso-ser-preso-em-quantos-dias":"A prisão é automática?",
      "pensao-acaba-aos-18-ou-aos-21":"A pensão acaba aos 18?",
      "guarda-compartilhada-paga-pensao":"Isso elimina a pensão?",
      "medida-protetiva-sai-de-casa-guarda-imovel":"Perco casa ou guarda?",
      "perdi-o-emprego-e-pago-pensao-o-que-fazer":"Preciso pedir a revisão?",
      "pg-familia":"Casa, filhos e bens",
      "cac-investigado-ou-reu-perco-cr-e-armas":"Perco as minhas armas?",
      "cac-medida-protetiva-acervo-registro":"Recebi medida e tenho armas",
      "pg-cac":"E o meu acervo?",
      "caso-nvidia-cadeia-de-custodia-prova-digital":"A prova digital está intacta?",
      "depp-heard-dois-tribunais-dois-veredictos":"Por que os veredictos divergem?",
      "pg-disputa":"O que mudaria no Brasil?"
    };
    var capaNovo = {
      "ela-me-mandou-mensagem-ou-terceiro-medida-protetiva":1,
      "depp-heard-dois-tribunais-dois-veredictos":1,
      "caso-nvidia-cadeia-de-custodia-prova-digital":1
    };
    var rowNomes = {
      "t-protetiva":"Chegou uma medida. E agora?",
      "t-medida-protetiva":"Chegou uma medida. E agora?",
      "t-acusado":"Me acusaram. Por onde começo?",
      "t-criminal":"Me acusaram. Por onde começo?",
      "t-familia":"A casa, os filhos, o que fica",
      "t-cac":"Sou CAC. O que pode mudar?",
      "t-disputa":"O que o país discute",
      "t-mundo-em-disputa":"O que o país discute"
    };
    var capaTema = {
      "caminho-protetiva":"magenta",
      "caminho-criminal":"cobalto",
      "caminho-cac":"queimado",
      "caminho-familia":"ambar",
      "intimacao":"dourado",
      "acusacao":"lima",
      "busca":"violeta",
      "inquerito":"cobalto",
      "ponte-guia":"ciano",
      "pg-guias":"lima"
    };

    function capaSlug(el) {
      var id = el.getAttribute("data-id");
      if (id) return id;
      if (el.id && (capaMap[el.id] || capaTema[el.id] || capaRotulo[el.id])) return el.id;
      var host = el.closest("[id]");
      if (host && host.id && (capaMap[host.id] || capaTema[host.id])) return host.id;
      if (el.classList.contains("ponte-guia-card")) return "ponte-guia";
      if (el.classList.contains("guias-media")) return "pg-guias";
      if (el.classList.contains("gp-book")) {
        var img = el.querySelector("img");
        var src = img ? (img.getAttribute("src") || "") : "";
        if (/protetiva/.test(src)) return "pg-protetiva";
        if (/cac/.test(src)) return "pg-cac";
        if (/familia/.test(src)) return "pg-familia";
      }
      var href = el.getAttribute("href") || "";
      if (!href) {
        var inner = el.querySelector("a[href*='artigos/'], a[href$='.html']");
        if (inner) href = inner.getAttribute("href") || "";
      }
      var m = href.match(/([^/]+?)(?:\.html)?(?:#.*)?$/);
      return m ? m[1] : "";
    }
    function inferCapa(slug) {
      if (capaMap[slug]) return capaMap[slug];
      if (capaTema[slug]) return capaTema[slug];
      var s = slug;
      if (/whatsapp|conversas|provas|inquerito|digital/.test(s)) return "ciano";
      if (/prisao|preso/.test(s)) return "vermelho";
      if (/casa|imovel/.test(s)) return "ambar";
      if (/filho|guarda/.test(s)) return "salmao";
      if (/pensao/.test(s)) return "dourado";
      if (/patrimonio|partilha|uniao/.test(s)) return "esmeralda";
      if (/mensagem|ela-/.test(s)) return "magenta";
      if (/cac|arma/.test(s)) return "queimado";
      return "cobalto";
    }
    function capaForbidden(res, i) {
      var f = {};
      if (i > 0) f[res[i - 1]] = 1;
      if (i >= 3) f[res[i - 3]] = 1;
      if (i >= 4) f[res[i - 4]] = 1;
      if (i >= 5) f[res[i - 5]] = 1;
      return f;
    }
    function assignGrid(prefers) {
      var n = prefers.length;
      var res = new Array(n);
      var used = {};
      function orderFor(i) {
        var counts = {};
        var o = 0;
        for (; o < n; o++) if (res[o]) counts[res[o]] = (counts[res[o]] || 0) + 1;
        var pref = prefers[i];
        var rest = capaPals.filter(function (p) { return p !== pref; });
        rest.sort(function (a, b) { return (counts[a] || 0) - (counts[b] || 0); });
        return pref ? [pref].concat(rest) : rest;
      }
      function okSet() {
        var set = {};
        var k = 0;
        for (; k < n; k++) set[res[k]] = 1;
        return n < 5 || Object.keys(set).length >= 5;
      }
      function bt(i) {
        if (i === n) return okSet();
        var forb = capaForbidden(res, i);
        var order = orderFor(i);
        var o = 0;
        for (; o < order.length; o++) {
          var p = order[o];
          if (forb[p]) continue;
          res[i] = p;
          if (bt(i + 1)) return true;
        }
        res[i] = "";
        return false;
      }
      if (bt(0)) return res;
      for (var i = 0; i < n; i++) res[i] = capaPals[i % capaPals.length];
      return res;
    }
    function setCapa(el, pal) {
      var prev = el.getAttribute("data-capa");
      if (prev && prev !== pal) el.classList.remove("capa-" + prev);
      el.setAttribute("data-capa", pal);
      el.classList.add("capa-" + pal);
    }
    function decorateCard(el, slug) {
      if (capaGrafica[slug] || el.classList.contains("fita") || el.classList.contains("vhs")) el.classList.add("capa-grafica");
      var rotuloOk = el.classList.contains("poster") || el.classList.contains("a-card") || el.classList.contains("loop-card") || el.classList.contains("entrada-card") || el.classList.contains("featured");
      if (rotuloOk && !el.querySelector(".p-marca") && capaRotulo[slug] && !capaGrafica[slug]) {
        var marca = document.createElement("span");
        marca.className = "p-marca";
        marca.setAttribute("aria-hidden", "true");
        marca.textContent = capaRotulo[slug];
        el.appendChild(marca);
      }
      if (capaNovo[slug] && !el.querySelector(".p-badge")) {
        var badge = document.createElement("span");
        badge.className = "p-badge";
        badge.textContent = "Novo";
        el.classList.add("has-badge");
        el.appendChild(badge);
      }
    }
    function nomeFileiras() {
      Object.keys(rowNomes).forEach(function (id) {
        var h = document.getElementById(id);
        if (!h || h.getAttribute("data-nome-fileira")) return;
        var num = h.querySelector(".row-num");
        var small = h.querySelector("small");
        h.setAttribute("data-nome-fileira", "1");
        h.textContent = "";
        if (num) h.appendChild(num);
        h.appendChild(document.createTextNode(rowNomes[id]));
        if (small) h.appendChild(small);
        var row = h.closest(".row");
        if (row) {
          var label = rowNomes[id];
          row.querySelectorAll(".rn").forEach(function (btn) {
            var dir = btn.getAttribute("data-dir");
            var verb = dir === "-1" ? "Voltar na fileira " : "Avançar na fileira ";
            btn.setAttribute("aria-label", verb + label);
          });
        }
      });
    }
    function tintAll() {
      nomeFileiras();
      var nodes = document.querySelectorAll(capaSel);
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var slug = capaSlug(el);
        decorateCard(el, slug);
        if (!el.getAttribute("data-capa")) {
          setCapa(el, inferCapa(slug));
        }
      }
      var rails = document.querySelectorAll(".rail, .loop-cards, .row-track, .entrada-rail, .case-grid, .routes, .loc-shelf, .gp-catalogo");
      for (var r = 0; r < rails.length; r++) {
        var cards = rails[r].querySelectorAll(capaSel);
        if (cards.length < 2) continue;
        if (rails[r].getAttribute("data-capas-ok") === String(cards.length)) continue;
        rails[r].setAttribute("data-capas-ok", String(cards.length));
        var prefers = [];
        var c = 0;
        for (; c < cards.length; c++) prefers.push(inferCapa(capaSlug(cards[c])));
        var assigned = assignGrid(prefers);
        for (c = 0; c < cards.length; c++) setCapa(cards[c], assigned[c]);
      }
    }
    function markTema() {
      var path = location.pathname || "";
      var tema = "";
      if (/\/medida-protetiva-48h(\/|$)/.test(path)) tema = "violeta";
      else if (/\/medida-protetiva(\/|$)/.test(path)) tema = "magenta";
      else if (/\/familia(\/|$)/.test(path)) tema = "ambar";
      else if (/\/criminal(\/|$)/.test(path)) tema = "cobalto";
      else if (/\/cac(\/|$)/.test(path)) tema = "queimado";
      else if (/\/pensao(\/|$)/.test(path)) tema = "dourado";
      else if (/\/uniao-estavel(\/|$)/.test(path)) tema = "esmeralda";
      else if (/\/(materiais|guias)(\/|$)/.test(path)) tema = "lima";
      else if (/\/mundo-em-disputa(\/|$)/.test(path)) tema = "ciano";
      if (tema) document.body.setAttribute("data-tema", tema);
    }
    function enhanceEntryLists() {
      var lists = document.querySelectorAll(".page-content ul");
      for (var u = 0; u < lists.length; u++) {
        var ul = lists[u];
        if (ul.getAttribute("data-entrada-rail")) continue;
        var items = ul.children;
        if (items.length < 3) continue;
        var links = [];
        var ok = true;
        for (var i = 0; i < items.length; i++) {
          var a = items[i].querySelector(":scope > a[href]");
          if (!a) { ok = false; break; }
          var href = a.getAttribute("href") || "";
          if (href.indexOf("artigos/") === -1) { ok = false; break; }
          links.push(a);
        }
        if (!ok || links.length < 3) continue;
        ul.setAttribute("data-entrada-rail", "1");
        ul.classList.add("entrada-rail");
        for (var j = 0; j < links.length; j++) {
          var a2 = links[j];
          var title = a2.textContent.replace(/\s+/g, " ").trim();
          var href2 = a2.getAttribute("href") || "";
          var sm = href2.match(/([^/]+?)(?:\.html)?(?:#.*)?$/);
          var slug = sm ? sm[1] : "";
          a2.classList.add("entrada-card");
          a2.textContent = "";
          if (slug) {
            var img = document.createElement("img");
            img.src = "../assets/home/capas/" + slug + ".webp";
            img.alt = "";
            img.width = 480;
            img.height = 640;
            img.loading = "lazy";
            img.decoding = "async";
            img.addEventListener("error", function () { if (this.parentNode) this.parentNode.classList.add("sem-capa"); this.remove(); });
            a2.appendChild(img);
          }
          var tspan = document.createElement("span");
          tspan.className = "entrada-card-t";
          tspan.textContent = title;
          a2.appendChild(tspan);
        }
      }
    }
    function injectPonte() {
      if (document.querySelector(".ponte-guia--rodape")) return;
      var footer = document.querySelector("footer");
      if (!footer) return;
      var box = document.createElement("div");
      box.className = "ponte-guia ponte-guia--rodape";
      box.setAttribute("data-tema", "ciano");
      var a = document.createElement("a");
      a.className = "ponte-guia-card";
      a.setAttribute("data-id", "ponte-guia");
      a.href = "https://consumidor.lucasladeia.com.br/";
      a.rel = "noopener";
      a.innerHTML = '<span class="ponte-guia-marca">O voo</span><span class="ponte-guia-kicker">Outra sala da casa</span><span class="ponte-guia-title">Se a questão é o voo, o caminho é o Guia do Passageiro.</span>';
      box.appendChild(a);
      var legal = footer.querySelector(".footer-legal, .legal, .disc");
      var slot = legal ? (legal.closest(".wrap") || legal) : null;
      if (slot && slot.parentNode === footer) footer.insertBefore(box, slot);
      else footer.appendChild(box);
    }
    var painting = false;
    var mo0 = null;
    function paintRede() {
      if (painting) return;
      painting = true;
      if (mo0) mo0.disconnect();
      markTema();
      enhanceEntryLists();
      injectPonte();
      tintAll();
      setTimeout(function () {
        painting = false;
        if (mo0) mo0.observe(document.body, { childList: true, subtree: true });
      }, 0);
    }
    paintRede();
    if (window.MutationObserver) {
      var moTimer0 = 0;
      mo0 = new MutationObserver(function () {
        if (painting || moTimer0) return;
        moTimer0 = setTimeout(function () { moTimer0 = 0; paintRede(); }, 200);
      });
      mo0.observe(document.body, { childList: true, subtree: true });
    }
    if (reduce) return;

    document.body.appendChild(el("div", "refugio-lamp"));
    document.body.appendChild(el("div", "refugio-lantern"));
    var chama = el("div", "refugio-chama");
    chama.setAttribute("aria-hidden", "true");
    chama.appendChild(document.createElement("i"));
    document.body.appendChild(chama);
    var useDust = !coarse && innerWidth >= 720;
    var cv = el("canvas", "refugio-dust");
    if (useDust) document.body.appendChild(cv);
    else cv = null;

    var ctx = cv ? cv.getContext("2d", { alpha: true }) : null;
    var W = 0, H = 0, parts = [];
    var tx = 0, ty = 0, x = 0, y = 0;
    var running = false, last = 0, raf = 0;

    function resize() {
      W = innerWidth;
      H = innerHeight;
      useDust = !coarse && W >= 720;
      if (cv) { cv.width = W; cv.height = H; }
      tx = x = W * 0.5;
      ty = y = Math.min(150, H * 0.18);
      parts = [];
      for (var i = 0; i < 32; i++) {
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.7 + Math.random() * 1.7,
          vx: -0.14 + Math.random() * 0.28,
          vy: -0.18 - Math.random() * 0.32,
          a: 0.28 + Math.random() * 0.5
        });
      }
    }
    resize();
    addEventListener("resize", resize, { passive: true });

    function lightCard(card) {
      if (!card || card.classList.contains("refugio-bloom")) return;
      var lume = card.querySelector(".capa-lume");
      if (!lume) {
        lume = document.createElement("span");
        lume.className = "capa-lume";
        lume.setAttribute("aria-hidden", "true");
        card.appendChild(lume);
      }
      card.classList.add("refugio-bloom");
      requestAnimationFrame(function () { lume.classList.add("is-on"); });
    }

    function bloomAt(nx, ny, center) {
      var nodes = document.querySelectorAll(capaSel);
      if (!nodes.length) return;
      var cx0 = center ? W * 0.5 : nx;
      var cy0 = center ? H * 0.48 : ny;
      var reach = Math.min(W, H) * (center ? 0.55 : 0.42);
      var reach2 = reach * reach;
      var best = null, bestD = 1e9;
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > H || r.right < 0 || r.left > W) continue;
        var vis = Math.min(r.bottom, H) - Math.max(r.top, 0);
        if (vis < Math.min(80, r.height * 0.28)) continue;
        var cx = (r.left + r.right) / 2;
        var cy = (r.top + r.bottom) / 2;
        var d = (cx - cx0) * (cx - cx0) + (cy - cy0) * (cy - cy0);
        if (d < bestD) { bestD = d; best = el; }
      }
      if (!center && bestD > reach2) best = null;
      if (best) lightCard(best);
    }

    function onScrollBloom() {
      if (bloomTick) return;
      bloomTick = requestAnimationFrame(function () {
        bloomTick = 0;
        if (coarse) bloomAt(W * 0.5, H * 0.48, true);
      });
    }
    addEventListener("scroll", onScrollBloom, { passive: true });

    function draw() {
      if (!ctx || !useDust) return;
      ctx.clearRect(0, 0, W, H);
      var reach = Math.min(W, H) * 0.85;
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
        ctx.fillStyle = "rgba(255,200,120," + (p.a * vis * 0.8) + ")";
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
      bloomAt(x, y, false);
      if (performance.now() - last > 2400 && Math.abs(tx - x) < 0.6 && Math.abs(ty - y) < 0.6) {
        document.body.classList.remove("refugio-lit");
        if (ctx) ctx.clearRect(0, 0, W, H);
        running = false;
        raf = 0;
        if (coarse) bloomAt(W * 0.5, H * 0.48, true);
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

    function startArrival() {
      try {
        if (sessionStorage.getItem("refugio-chegou")) return;
        sessionStorage.setItem("refugio-chegou", "1");
      } catch (err) {}
      document.body.classList.add("refugio-in");
      setTimeout(function () { document.body.classList.remove("refugio-in"); }, 1600);
    }

    function afterCss(fn) {
      if (!cssLink) { fn(); return; }
      var done = false;
      function go() { if (done) return; done = true; fn(); }
      cssLink.addEventListener("load", go);
      if (cssLink.sheet) go();
      setTimeout(go, 400);
    }
    function startCarry() {
      var c = document.querySelector(".hero-chama");
      var nx, ny;
      if (c) {
        var r = c.getBoundingClientRect();
        nx = r.left + r.width / 2;
        ny = r.top + r.height * 0.62;
      } else if (W) {
        nx = W * 0.76;
        ny = Math.min(H * 0.68, H * 0.72);
      } else return;
      x = tx = nx;
      y = ty = ny;
      root.style.setProperty("--rx", x + "px");
      root.style.setProperty("--ry", y + "px");
    }
    afterCss(function () { startArrival(); startCarry(); });

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
    once("#hero-title, .art-hero h1, .post-head h1", "refugio-wake", 0.35);
    once(".refugio-farol", "is-sweep", 0.4);

    function lightCovers() {
      var nodes = document.querySelectorAll(capaSel);
      if (!nodes.length || !("IntersectionObserver" in window)) return;
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          lightCard(en.target);
          io.unobserve(en.target);
        });
      }, { threshold: 0.22, rootMargin: "0px 0px -8% 0px" });
      for (var i = 0; i < nodes.length; i++) io.observe(nodes[i]);
    }
    lightCovers();
    document.addEventListener("pointerover", function (e) {
      var card = e.target && e.target.closest && e.target.closest(capaSel);
      if (card) lightCard(card);
    }, { passive: true });

    addEventListener("pointermove", function (e) { kick(e.clientX, e.clientY); }, { passive: true });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        document.body.classList.remove("refugio-lit");
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        if (ctx) ctx.clearRect(0, 0, W, H);
      }
    });

    document.addEventListener("pointerdown", function (e) {
      kick(e.clientX, e.clientY);
      bloomAt(e.clientX, e.clientY, false);
      var card = e.target.closest(capaSel);
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
