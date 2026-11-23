(function(){
var d=document,w=window,sec=d.getElementById('mapa');if(!sec)return;
var mundo=sec.querySelector('.mundo'),palco=sec.querySelector('.palco'),barca=sec.querySelector('.barca'),layers=[].slice.call(sec.querySelectorAll('.L,.nevoa'));
var ficha=d.getElementById('ficha'),dica=sec.querySelector('.dica'),KEY='rp-travessia-ultima';
var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
var L={
crim:{n:'Direito Criminal',t:'I · Primeira margem',p:'Intimação, depoimento, acusação, inquérito e medida protetiva: o que cada momento significa.',a:[['Ver os textos','#fileira-acusado'],['Página Criminal','criminal/'],['Medida protetiva','#fileira-protetiva']]},
fam:{n:'Casa da Família',t:'II · Segunda margem',p:'Separação, guarda, convivência, pensão e partilha de bens.',a:[['Ver os textos','#fileira-familia'],['Página Família','familia/']]},
con:{n:'Conexão',t:'III · A lamparina',p:'Comece pela emoção que você sente agora: medo, raiva, culpa, vergonha.',a:[['Entrar na Conexão','conexao/'],['Saber mais','#conexao-convite']]},
arq:{n:'Arquivo do Baú',t:'IV · O baú',p:'Todos os artigos, guardados em um só lugar, e o Mundo em Disputa.',a:[['Ver as fileiras','#vitrine'],['Abrir o arquivo','artigos/'],['Mundo em Disputa','#fileira-disputa']]},
ter:{n:'Consumidor',t:'V · O cais',p:'Guia de direitos do consumidor e do passageiro: voo cancelado ou atrasado, mala extraviada, reembolso e plano de saúde.',a:[['Abrir o guia do consumidor','https://consumidor.lucasladeia.com.br/']],x:'Abre consumidor.lucasladeia.com.br'}
};
function rola(h){var t=d.querySelector(h);if(!t)return;t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});if(history.replaceState)history.replaceState(null,'',h)}
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function spot(id){return d.getElementById('sp-'+id)}
var cur=null;
function light(id,on){var s=spot(id);if(s)s.classList.toggle('on',on);var l=sec.querySelector('.lbl[data-for="'+id+'"]');if(l)l.classList.toggle('on',on)}
function center(id,smooth){var s=spot(id);if(!s)return;var r=s.querySelector('.perg,.hit').getBoundingClientRect();
 mundo.scrollTo({left:mundo.scrollLeft+r.left+r.width/2-bx(),behavior:smooth&&!reduce?'smooth':'auto'})}
function botoes(id,c){var ac=ficha.querySelector('.f-acoes');ac.textContent='';
 c.a.forEach(function(a,i){var e=d.createElement('a');e.className='btn '+(i?'btn-glass':'btn-primary');e.href=a[1];e.textContent=a[0];
  if(/^https?:/.test(a[1]))e.rel='noopener';e.addEventListener('click',function(ev){if(spot(id))set(KEY,id);if(a[1].charAt(0)==='#'){ev.preventDefault();close();rola(a[1])}});ac.appendChild(e)})}
function open(id,from){var c=L[id];if(!c)return;
 if(cur&&cur!==id)light(cur,false);cur=id;if(spot(id))light(id,true);
 ficha.querySelector('.f-tipo').textContent=c.t;ficha.querySelector('h2').textContent=c.n;
 var p=ficha.querySelector('.f-txt');p.textContent=c.p;botoes(id,c);
 var nt=ficha.querySelector('.f-nota');nt.textContent=c.x||'';nt.hidden=!c.x;
 ficha.classList.add('aberta');ficha.removeAttribute('aria-hidden');
 [].forEach.call(sec.querySelectorAll('.lugares button'),function(b){b.setAttribute('aria-pressed',b.dataset.go===id?'true':'false')});
 if(spot(id))set(KEY,id);
 if(from==='nav')center(id,true);
}
function close(){ficha.classList.remove('aberta');ficha.setAttribute('aria-hidden','true');if(cur)light(cur,false);cur=null;
 [].forEach.call(sec.querySelectorAll('.lugares button'),function(b){b.setAttribute('aria-pressed','false')})}
ficha.querySelector('.f-x').addEventListener('click',close);
d.addEventListener('pointerdown',function(e){if(cur&&!ficha.contains(e.target)&&!e.target.closest('.spot,.lugares'))close()});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&cur)close()});
var moved=false;
[].forEach.call(sec.querySelectorAll('.spot'),function(s){
 var id=s.dataset.id;
 s.addEventListener('click',function(e){if(moved)return;e.stopPropagation();open(id)});
 s.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(id)}});
 s.addEventListener('mouseenter',function(){light(id,true)});s.addEventListener('mouseleave',function(){if(cur!==id)light(id,false)});
 s.addEventListener('focus',function(){light(id,true)});s.addEventListener('blur',function(){if(cur!==id)light(id,false)});
});
[].forEach.call(sec.querySelectorAll('.lugares button'),function(b){b.addEventListener('click',function(){open(b.dataset.go,'nav')})});
var spots=[].slice.call(sec.querySelectorAll('.spot'));
var cabe=function(){return mundo.scrollWidth<=mundo.clientWidth+4};
var mx=0,my=0,alvo=null,bpos=null,q=false,vis=true;
function bx(){return bpos==null?sec.clientWidth*(cabe()?.18:.5):bpos}
function paint(){q=false;var sx=mundo.scrollLeft,py=Math.min(w.scrollY,sec.offsetHeight),W=sec.clientWidth,H=sec.clientHeight;
 if(!reduce)layers.forEach(function(l){l.style.setProperty('--sx',sx);l.style.setProperty('--mx',mx.toFixed(3));l.style.setProperty('--my',(my+py/40).toFixed(3))});
 if(cabe()&&alvo!=null){var cur0=bx();bpos=cur0+(alvo-cur0)*.12;if(Math.abs(alvo-bpos)>.5)queue()}else if(!cabe())bpos=null;
 var s=Math.max(palco.clientWidth/1600,H/1000);
 barca.style.setProperty('--bw',Math.round(240*s)+'px');barca.style.setProperty('--bb',Math.round((1000-712)*s)+'px');barca.style.setProperty('--bx',Math.round(bx())+'px');
 if(dica)dica.textContent=cabe()?'Mova o cursor para conduzir a barca':'Arraste para atravessar';var b=bx(),lim=Math.min(150,W*.2);
 spots.forEach(function(sp){var r=sp.querySelector('.perg').getBoundingClientRect(),c=r.left+r.width/2-sec.getBoundingClientRect().left,on=Math.abs(c-b)<lim;
  sp.classList.toggle('perto',on);var l=sec.querySelector('.lbl[data-for="'+sp.dataset.id+'"]');if(l)l.classList.toggle('perto',on)});
}
function queue(){if(!q&&vis){q=true;requestAnimationFrame(paint)}}
mundo.addEventListener('scroll',function(){queue();if(dica&&mundo.scrollLeft>20)dica.classList.add('fora')},{passive:true});
w.addEventListener('scroll',queue,{passive:true});
sec.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=sec.getBoundingClientRect();mx=(e.clientX-r.left)/r.width*2-1;my=(e.clientY-r.top)/r.height*2-1;
 if(cabe()){alvo=Math.max(r.width*.08,Math.min(r.width*.86,e.clientX-r.left));if(dica)dica.classList.add('fora')}queue()});
var fab=d.querySelector('.fab-wa');
if('IntersectionObserver'in w)new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(fab)fab.classList.toggle('fab-hidden',vis);if(vis)queue();else if(cur)close()}).observe(sec);
var down=null;
mundo.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||cabe())return;down={x:e.clientX,s:mundo.scrollLeft};moved=false});
w.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-down.x;if(Math.abs(dx)>5){moved=true;mundo.classList.add('arrasto')}mundo.scrollLeft=down.s-dx});
w.addEventListener('pointerup',function(){down=null;mundo.classList.remove('arrasto');setTimeout(function(){moved=false},0)});
function size(){palco.style.setProperty('--mh',sec.clientHeight+'px');}
size();w.addEventListener('resize',function(){size();queue()});
var last=get(KEY);
if(last&&L[last]&&spot(last)){var pin=sec.querySelector('.pin[data-for="'+last+'"]');if(pin)pin.classList.add('vis');
 var bt=sec.querySelector('.lugares button[data-go="'+last+'"]');if(bt)bt.classList.add('ultimo');
 if(cabe()){var r=spot(last).querySelector('.perg').getBoundingClientRect();bpos=alvo=r.left+r.width/2-sec.getBoundingClientRect().left}else center(last,false)}
var ir=sec.querySelector('.ir-artigos');if(ir)ir.addEventListener('click',function(e){e.preventDefault();if(cur)close();rola('#vitrine')});
paint();
})();
