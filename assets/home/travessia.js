(function(){
var d=document,w=window,sec=d.getElementById('mapa');if(!sec)return;
var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
var cenas=[].slice.call(sec.querySelectorAll('.cena')),IDS=cenas.map(function(c){return c.dataset.id});
var nav=[].slice.call(sec.querySelectorAll('.lugares button[data-go]'));
var porta=sec.querySelector('.umbral'),placa=porta.querySelector('small'),brincar=sec.querySelector('.brincar'),bt=brincar.querySelector('span'),hud=sec.querySelector('.hud'),topo=d.querySelector('header');
var barcaImg=sec.querySelector('.barca image.rl');if(barcaImg&&barcaImg.getAttribute('data-src')){barcaImg.setAttribute('href',barcaImg.getAttribute('data-src'));barcaImg.removeAttribute('data-src')}
var KEY='rp-travessia-ultima',CK='rp-constelacao',idx=0,via=0,tc=0;
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function cena(i){return cenas[i]}
function carrega(c){if(!c)return;[].forEach.call(c.querySelectorAll('[data-srcset]'),function(n){n.setAttribute('srcset',n.getAttribute('data-srcset'));n.removeAttribute('data-srcset')})}
function rotula(){var c=cena(idx);placa.textContent=c.dataset.t;porta.href=c.dataset.href;
 bt.textContent=c.dataset.acao;brincar.setAttribute('aria-label',c.dataset.acao+' — '+c.dataset.t);
 nav.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.go===c.dataset.id?'true':'false')});sec.dataset.ativo=c.dataset.id}
function chega(anima){rotula();estrela(cena(idx).dataset.id);set(KEY,cena(idx).dataset.id);carrega(cena(idx+1));carrega(cena(idx-1));
 if(anima&&!reduce){sec.classList.remove('chegou');void sec.offsetWidth;sec.classList.add('chegou');clearTimeout(tc);tc=setTimeout(function(){sec.classList.remove('chegou')},2800)}
 var m=jogos[cena(idx).dataset.id];if(m&&!cena(idx).dataset.link)(w.requestIdleCallback||setTimeout)(function(){motor(cena(idx).dataset.id)})}
function vai(i){if(i<0||i>=cenas.length||i===idx&&!via)return;var de=idx;idx=i;carrega(cena(i));clearTimeout(via);
 cenas.forEach(function(c,k){c.classList.toggle('on',k===i)});
 if(reduce){chega(false);return}
 sec.classList.toggle('para-tras',i<de);sec.classList.add('viajando');var t=1500;
 nav.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.go===cena(i).dataset.id?'true':'false')});
 via=setTimeout(function(){via=0;sec.classList.remove('viajando');chega(true)},t)}
nav.forEach(function(b){b.addEventListener('click',function(){vai(IDS.indexOf(b.dataset.go))})});
var x0=null,y0=0;
sec.addEventListener('touchstart',function(e){if(e.target.closest('.hud,a,button'))return;x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
sec.addEventListener('touchend',function(e){if(x0==null)return;var t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4)vai(Math.max(0,Math.min(cenas.length-1,idx+(dx<0?1:-1))))},{passive:true});
sec.addEventListener('keydown',function(e){if(e.target.closest('input,textarea'))return;if(e.key==='ArrowRight')vai(Math.min(cenas.length-1,idx+1));else if(e.key==='ArrowLeft')vai(Math.max(0,idx-1))});
var JB=(d.currentScript&&d.currentScript.src)||location.href,JG={},jogos={prot:'crim',crim:1,fam:1,arq:1,ter:1};
function motor(id){if(typeof jogos[id]==='string')id=jogos[id];if(!JG[id])JG[id]=import(new URL('../jogos/'+id+'.js?v=20261123j3',JB).href);return JG[id]}
function joga(e){var c=cena(idx);if(sec.classList.contains('viajando'))return;if(e)e.preventDefault();if(c.dataset.link){location.href=c.dataset.link;return}motor(c.dataset.id).then(function(m){m.default(c.dataset.id)}).catch(function(){})}
brincar.addEventListener('click',joga);
sec.querySelector('.mergulhar').addEventListener('click',function(){motor('mar').then(function(m){m.default()}).catch(function(){})});
porta.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();var h=porta.href;porta.classList.add('aberta');setTimeout(function(){location.href=h},reduce?0:700)});
w.addEventListener('pageshow',function(){porta.classList.remove('aberta')});
var ceuV=[];try{ceuV=JSON.parse(get(CK)||'[]')||[]}catch(e){ceuV=[]}
function astro(){var cs=sec.querySelector('.constelacao');if(!cs)return;[].forEach.call(cs.querySelectorAll('.est'),function(e){e.classList.toggle('acesa',ceuV.indexOf(e.getAttribute('data-id'))>=0)});[].forEach.call(cs.querySelectorAll('line'),function(l){l.classList.toggle('acesa',ceuV.indexOf(l.getAttribute('data-a'))>=0&&ceuV.indexOf(l.getAttribute('data-b'))>=0)});cs.classList.toggle('vista',ceuV.length>0);cs.classList.toggle('completa',ceuV.length>=IDS.length)}
function estrela(id){if(ceuV.indexOf(id)>=0)return;ceuV.push(id);set(CK,JSON.stringify(ceuV));astro();var e=sec.querySelector('.constelacao .est[data-id="'+id+'"]');if(e){e.classList.add('nasce');setTimeout(function(){e.classList.remove('nasce')},2400)}}
var luaEl=sec.querySelector('.lua'),luaCv=luaEl.querySelector('canvas'),luaImg=null,luaR=0;
function mede(){var W=sec.clientWidth,H=sec.clientHeight,sr=sec.getBoundingClientRect(),hb=topo?Math.max(0,topo.getBoundingClientRect().bottom-sr.top):0,r,x,y;
 if(W<900){r=Math.max(30,Math.min(42,W*.1));x=W-r-Math.max(14,W*.05);y=hb+r+16}
 else{r=Math.max(46,Math.min(70,H*.07));x=W*.78;y=hb+r+44}
 sec.style.setProperty('--lx',Math.round(x)+'px');sec.style.setProperty('--ly',Math.round(y)+'px');sec.style.setProperty('--lr',Math.round(r)+'px');luaR=r;pintaLua();
 sec.style.setProperty('--hud',hud.offsetHeight+'px');desenha()}
function pintaLua(){if(!luaImg||!luaR)return;var q=Math.min(w.devicePixelRatio||1,2),n=Math.round(luaR*2*q);if(luaCv.width!==n){luaCv.width=n;luaCv.height=n}var c=luaCv.getContext('2d');if(!c)return;c.clearRect(0,0,n,n);c.drawImage(luaImg,0,0,n,n);luaEl.classList.add('pronto')}
var tela=sec.querySelector('.cosmos'),ceu=null;
function desenha(){if(!tela||!ceu)return;var r=Math.min(w.devicePixelRatio||1,2),W=sec.clientWidth,H=sec.clientHeight,iw=ceu.naturalWidth||ceu.width,ih=ceu.naturalHeight||ceu.height,k=Math.max(W/iw,H/ih);
 tela.width=Math.round(W*r);tela.height=Math.round(H*r);var c=tela.getContext('2d');if(!c)return;c.drawImage(ceu,Math.round((W-iw*k)/2*r),Math.round((H-ih*k)/2*r),Math.round(iw*k*r),Math.round(ih*k*r));tela.classList.add('pronto')}
function bitmap(src,f){if(w.createImageBitmap&&w.fetch)fetch(src).then(function(r){return r.blob()}).then(function(b){return createImageBitmap(b)}).then(f).catch(function(){});else{var im=new Image();im.decoding='async';im.onload=function(){f(im)};im.src=src}}
function acende(){sec.classList.add('viva');bitmap('img/ceu/lua-320.webp',function(b){luaImg=b;pintaLua()});var r=Math.min(w.devicePixelRatio||1,2),need=Math.max(sec.clientWidth,sec.clientHeight)*r;
 bitmap('img/ceu/cosmos-800.webp',function(b){ceu=b;desenha();if(need>800)setTimeout(function(){bitmap(need>1800?'img/ceu/cosmos-2560.webp':'img/ceu/cosmos-1600.webp',function(b2){ceu=b2;desenha()})},1500)});
 cenas.forEach(carrega)}
['pointerdown','touchstart','keydown','wheel','scroll'].forEach(function(t){w.addEventListener(t,function(){sec.classList.add('tocou')},{once:true,passive:true})});
var rt=0;w.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(mede,120)});
if('IntersectionObserver'in w)new IntersectionObserver(function(es){sec.classList.toggle('fora',!es[0].isIntersecting)}).observe(sec);
var last=get(KEY),li=IDS.indexOf(last);if(li>0){cenas[0].classList.remove('on');idx=li;carrega(cena(li));cena(li).classList.add('on')}
mede();chega(true);astro();if(d.fonts&&d.fonts.ready)d.fonts.ready.then(mede);
if(d.readyState==='complete')setTimeout(acende,300);else w.addEventListener('load',function(){(w.requestIdleCallback||function(f){setTimeout(f,300)})(acende)});
})();
