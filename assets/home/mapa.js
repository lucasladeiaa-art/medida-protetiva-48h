(function(){
var d=document,w=window,sec=d.getElementById('mapa');if(!sec)return;
var mundo=sec.querySelector('.mundo'),palco=sec.querySelector('.palco'),barca=sec.querySelector('.barca'),layers=[].slice.call(sec.querySelectorAll('.L,.nevoa'));
var dica=sec.querySelector('.dica'),KEY='rp-travessia-ultima',IDS=['crim','fam','con','arq','ter'];
var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
function rola(h){var t=d.querySelector(h);if(!t)return;t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});if(history.replaceState)history.replaceState(null,'',h)}
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function spot(id){return d.getElementById('sp-'+id)}
function lbl(id){return sec.querySelector('.lbl[data-for="'+id+'"]')}
function meio(id){var r=spot(id).querySelector('.perg').getBoundingClientRect();return r.left+r.width/2-sec.getBoundingClientRect().left}
var cur=null,vistos=[];
function light(id,on){var s=spot(id);if(s)s.classList.toggle('on',on);var l=lbl(id);if(l)l.classList.toggle('on',on)}
var prog=0;
var via=null;function para(){if(via){via=null;sec.classList.remove('viajando')}}
function center(id,smooth,fim){if(!spot(id))return;prog=Date.now();var de=mundo.scrollLeft,ate=Math.max(0,Math.min(mundo.scrollWidth-mundo.clientWidth,de+meio(id)-bx())),dist=Math.abs(ate-de);
 if(!smooth||reduce||dist<8){para();mundo.scrollLeft=ate;if(fim)fim();return}
 var dur=Math.max(1400,Math.min(4600,dist*3.2)),t0=0,me={};via=me;sec.classList.add('viajando');
 function passo(t){if(via!==me)return;if(!t0)t0=t;var k=Math.min(1,(t-t0)/dur),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;prog=Date.now();mundo.scrollLeft=de+(ate-de)*e;
  if(k<1)requestAnimationFrame(passo);else{para();if(fim)fim();queue()}}
 requestAnimationFrame(passo)}
['wheel','touchstart'].forEach(function(t){mundo.addEventListener(t,function(){if(via){para();queue()}},{passive:true})});
function open(id,from){if(IDS.indexOf(id)<0)return;
 if(cur&&cur!==id)light(cur,false);set(KEY,id);
 [].forEach.call(sec.querySelectorAll('.lugares button'),function(b){b.setAttribute('aria-pressed',b.dataset.go===id?'true':'false')});
 function chega(){cur=id;light(id,true);queue()}
 if(cabe()){cur=null;alvo=meio(id);chega()}else{if(cur)cur=null;center(id,true,chega)}queue();
}
function close(){if(cur)light(cur,false);cur=null;queue();
 [].forEach.call(sec.querySelectorAll('.lugares button'),function(b){b.setAttribute('aria-pressed','false')})}
d.addEventListener('pointerdown',function(e){if(cur&&!e.target.closest('.spot,.lugares,.entrar'))close()});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&cur)close()});
[].forEach.call(sec.querySelectorAll('.entrar'),function(a){a.addEventListener('click',function(){var g=a.closest('.lbl');if(g)set(KEY,g.dataset.for)})});
var moved=false;
[].forEach.call(sec.querySelectorAll('.spot'),function(s){
 var id=s.dataset.id;
 s.addEventListener('click',function(e){if(moved)return;e.stopPropagation();open(id)});
 s.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(id)}});
});
[].forEach.call(sec.querySelectorAll('.lugares button'),function(b){b.addEventListener('click',function(){open(b.dataset.go,'nav')})});
var spots=[].slice.call(sec.querySelectorAll('.spot'));
var cabe=function(){return mundo.scrollWidth<=mundo.clientWidth+4};
var mx=0,my=0,alvo=null,bpos=null,q=false,vis=true;
function bx(){return bpos==null?sec.clientWidth*(cabe()?.18:.5):bpos}
function paint(){q=false;var sx=mundo.scrollLeft,py=Math.min(w.scrollY,sec.offsetHeight),W=sec.clientWidth,H=sec.clientHeight;
 if(!reduce)layers.forEach(function(l){l.style.setProperty('--sx',sx);l.style.setProperty('--mx',mx.toFixed(3));l.style.setProperty('--my',(my+py/40).toFixed(3))});
 if(cabe()&&alvo!=null){var cur0=bx();bpos=cur0+(alvo-cur0)*.12;if(Math.abs(alvo-bpos)>.5)queue()}else if(!cabe())bpos=null;
 var s=Math.max(palco.clientWidth/2600,H/1000);
 var cw=Math.max(W,H*1.6),mxs=mundo.scrollWidth-mundo.clientWidth,cx=mxs>4?-(sx/mxs)*(cw-W):(W-cw)/2;
 if(cw!==ultW){ultW=cw;sec.style.setProperty('--cw',Math.round(cw)+'px');desenha()}sec.style.setProperty('--cx',Math.round(cx)+'px');sec.style.setProperty('--at',Math.round(H-300*s)+'px');
 barca.style.setProperty('--bw',Math.round(240*s)+'px');barca.style.setProperty('--bb',Math.round((1000-712)*s)+'px');barca.style.setProperty('--bx',Math.round(bx())+'px');
 if(dica)dica.textContent=cabe()?'Mova o cursor para conduzir a barca':'Arraste para atravessar';var b=bx(),lim=Math.min(150,W*.2),near=null;
 spots.forEach(function(sp){var id=sp.dataset.id,c=meio(id),dd=Math.abs(c-b);if(dd<lim&&(!near||dd<near.d))near={id:id,d:dd}});
 if(via)near=null;var at=cur||(near&&near.id)||'',gap=Math.max(200,500*s);
 spots.forEach(function(sp){var dd=Math.abs(meio(sp.dataset.id)-b),rv=Math.max(0,Math.min(1,1-(dd-lim)/(gap*.95)));if(sp.dataset.id===at)rv=1;rv=Math.round(rv*20)/20;if(sp._rv!==rv){sp._rv=rv;sp.style.setProperty('--rev',rv)}if(rv>0)sobe(sp)});
 spots.forEach(function(sp){var id=sp.dataset.id,on=id===at,l=lbl(id);sp.classList.toggle('perto',on);if(l){l.classList.toggle('perto',on);var a=l.querySelector('.entrar');if(a)a.setAttribute('tabindex',on?'0':'-1')}});
 var sr=sec.getBoundingClientRect();[].forEach.call(sec.querySelectorAll('.lbl'),function(l){var r=l.querySelector('rect').getBoundingClientRect();l.classList.toggle('borda',l.dataset.for!==at&&(r.left<sr.left+4||r.right>sr.right-4))});
 if(sec.dataset.ativo!==at){if(at)sec.dataset.ativo=at;else delete sec.dataset.ativo}
 if(at&&vistos.indexOf(at)<0){vistos.push(at);sec.dataset.luz=vistos.length}
}
function tam(src){var r=Math.min(w.devicePixelRatio||1,2),big=palco.clientWidth*r>3600&&sec.clientWidth>=900;return src.replace('%',/agua/.test(src)?(big?'1280':'640'):(big?'1280':'720'))}
function troca(im){var ds=im.getAttribute('data-src');if(!ds)return;im.removeAttribute('data-src');var src=tam(ds);if(im.getAttribute('href')===src)return;var p=new Image();p.decoding='async';p.onload=function(){im.setAttribute('href',src)};p.src=src}
var pronto=false;function sobe(sp){if(!pronto)return;var im=sp.querySelector('image[data-src]');if(im)troca(im)}
function base(){pronto=true;sec.classList.add('agua-ok');[].forEach.call(sec.querySelectorAll('.barca image'),troca);queue()}
function arma(){var f=false;function v(){if(f)return;f=true;base()}setTimeout(v,2500);['pointerdown','scroll','keydown','wheel','touchstart'].forEach(function(t){w.addEventListener(t,v,{once:true,passive:true})})}
if(d.readyState==='complete')arma();else w.addEventListener('load',arma);
var tela=sec.querySelector('.cosmos'),ultW=0,ceu=null;
function desenha(){if(!tela||!ceu)return;var r=Math.min(w.devicePixelRatio||1,2),cw=ultW||sec.clientWidth,H=sec.clientHeight,ih=(ceu.naturalHeight||ceu.height)*cw/(ceu.naturalWidth||ceu.width);
 tela.width=Math.round(cw*r);tela.height=Math.round(H*r);var c=tela.getContext('2d');if(!c)return;c.drawImage(ceu,0,0,Math.round(cw*r),Math.round(ih*r));tela.classList.add('pronto')}
function carrega(src,fim){function ok(b){ceu=b;(w.requestAnimationFrame||setTimeout)(function(){desenha();if(fim)fim()})}
 if(w.createImageBitmap&&w.fetch)fetch(src).then(function(r){return r.blob()}).then(function(b){return createImageBitmap(b)}).then(ok).catch(function(){});
 else{var im=new Image();im.decoding='async';im.onload=function(){ok(im)};im.src=src}}
function acendeLua(){var f=function(b){luaImg=b;(w.requestAnimationFrame||setTimeout)(pintaLua)};
 if(w.createImageBitmap&&w.fetch)fetch('img/ceu/lua-320.webp').then(function(r){return r.blob()}).then(function(b){return createImageBitmap(b)}).then(f).catch(function(){});
 else{var im=new Image();im.decoding='async';im.onload=function(){f(im)};im.src='img/ceu/lua-320.webp'}}
function acende(){acendeLua();sec.classList.add('viva');var r=Math.min(w.devicePixelRatio||1,2),need=Math.max(sec.clientWidth,sec.clientHeight*1.6)*r,feito=false;
 function mais(){if(feito)return;feito=true;carrega(need>1800?'img/ceu/cosmos-2560.webp':'img/ceu/cosmos-1600.webp')}
 carrega('img/ceu/cosmos-800.webp',function(){setTimeout(mais,6000);['pointerdown','pointermove','scroll','keydown'].forEach(function(t){w.addEventListener(t,mais,{once:true,passive:true})})})}
if(d.readyState==='complete')setTimeout(acende,300);else w.addEventListener('load',function(){(w.requestIdleCallback||function(f){setTimeout(f,300)})(acende)});
function queue(){if(!q&&vis){q=true;requestAnimationFrame(paint)}}
mundo.addEventListener('scroll',function(){if(cur&&Date.now()-prog>1200)close();queue();if(dica&&mundo.scrollLeft>20)dica.classList.add('fora')},{passive:true});
w.addEventListener('scroll',queue,{passive:true});
sec.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=sec.getBoundingClientRect();mx=(e.clientX-r.left)/r.width*2-1;my=(e.clientY-r.top)/r.height*2-1;
 if(cabe()&&!cur){alvo=Math.max(r.width*.08,Math.min(r.width*.86,e.clientX-r.left));if(dica)dica.classList.add('fora')}queue()});
var fab=d.querySelector('.fab-wa');
if('IntersectionObserver'in w)new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(fab)fab.classList.toggle('fab-hidden',vis);sec.classList.toggle('fora',!vis);if(vis)queue();else if(cur)close()}).observe(sec);
var down=null;
mundo.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||cabe())return;down={x:e.clientX,s:mundo.scrollLeft};moved=false});
w.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-down.x;if(Math.abs(dx)>5){moved=true;mundo.classList.add('arrasto')}mundo.scrollLeft=down.s-dx});
w.addEventListener('pointerup',function(){down=null;mundo.classList.remove('arrasto');setTimeout(function(){moved=false},0)});
var luaEl=sec.querySelector('.lua'),luaCv=luaEl&&luaEl.querySelector('canvas'),luaImg=null,luaR=0,intro=d.querySelector('.mapa-intro');
function lua(){if(!luaEl)return;var W=sec.clientWidth,H=sec.clientHeight,sr=sec.getBoundingClientRect(),wr=intro?intro.querySelector('.wrap')||intro:null,ib=0,it=60,tr=0;
 if(wr){var k=wr.lastElementChild||wr,a=wr.firstElementChild||wr,rg;ib=k.getBoundingClientRect().bottom-sr.top;it=a.getBoundingClientRect().top-sr.top;
  if(d.createRange){rg=d.createRange();rg.selectNodeContents(a);tr=rg.getBoundingClientRect().right-sr.left}}
 var r,x,y;if(W<900){r=Math.max(34,Math.min(46,W*.105));x=W-r-Math.max(12,W*.04);y=ib+r*(W<380?.35:.55)}
 else{r=Math.max(50,Math.min(76,H*.075));x=Math.max(W*.64,tr+r+40);y=it+r}
 sec.style.setProperty('--lx',Math.round(x)+'px');sec.style.setProperty('--ly',Math.round(y)+'px');sec.style.setProperty('--lr',Math.round(r)+'px');luaR=r;pintaLua()}
function pintaLua(){if(!luaCv||!luaImg||!luaR)return;var q=Math.min(w.devicePixelRatio||1,2),n=Math.round(luaR*2*q);if(luaCv.width!==n){luaCv.width=n;luaCv.height=n}
 var c=luaCv.getContext('2d');if(!c)return;c.clearRect(0,0,n,n);c.drawImage(luaImg,0,0,n,n);luaEl.classList.add('pronto')}
function size(){palco.style.setProperty('--mh',sec.clientHeight+'px');lua()}
size();w.addEventListener('resize',function(){size();queue()});if(d.fonts&&d.fonts.ready)d.fonts.ready.then(lua);
var last=get(KEY);
if(last&&IDS.indexOf(last)>=0&&spot(last)){var pin=sec.querySelector('.pin[data-for="'+last+'"]');if(pin)pin.classList.add('vis');
 var bt=sec.querySelector('.lugares button[data-go="'+last+'"]');if(bt)bt.classList.add('ultimo');
 if(cabe())bpos=alvo=meio(last);else center(last,false)}
var ir=sec.querySelector('.ir-artigos');if(ir)ir.addEventListener('click',function(e){e.preventDefault();if(cur)close();rola('#vitrine')});
paint();
})();
