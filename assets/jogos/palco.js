var V='20261124j5';
var calmo=matchMedia('(prefers-reduced-motion: reduce)').matches;
function css(){if(document.getElementById('jg-css'))return;var l=document.createElement('link');l.id='jg-css';l.rel='stylesheet';l.href=new URL('jogos.css?v='+V,import.meta.url).href;document.head.appendChild(l)}
export function palco(o){
 css();
 var volta=document.activeElement,el=document.createElement('div');
 el.className='jg jg-'+o.casa;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',o.rotulo);
 el.innerHTML='<div class="jg-cena"></div><header class="jg-topo"><p class="jg-casa"></p><p class="jg-dica"></p></header><div class="jg-msg" aria-live="polite"></div><button class="jg-x" type="button" aria-label="Voltar ao rio"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
 el.querySelector('.jg-casa').textContent=o.casaNome;el.querySelector('.jg-dica').textContent=o.dica;
 document.body.appendChild(el);document.documentElement.classList.add('jg-aberto');
 var fins=[];function fecha(){if(!el.isConnected)return;fins.forEach(function(f){try{f()}catch(e){}});el.classList.remove('vivo');document.removeEventListener('keydown',tecla);document.documentElement.classList.remove('jg-aberto');setTimeout(function(){el.remove();if(volta&&volta.focus)volta.focus({preventScroll:true})},calmo?0:500)}
 function tecla(e){if(e.key==='Escape')fecha();if(e.key==='Tab'){var f=[].filter.call(el.querySelectorAll('button,a[href],[tabindex="0"]'),function(n){return n.offsetParent!==null});if(!f.length)return;var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}}
 document.addEventListener('keydown',tecla);el.querySelector('.jg-x').addEventListener('click',fecha);
 requestAnimationFrame(function(){el.classList.add('vivo');el.querySelector('.jg-x').focus({preventScroll:true})});
 return {el:el,cena:el.querySelector('.jg-cena'),msg:el.querySelector('.jg-msg'),dica:el.querySelector('.jg-dica'),calmo:calmo,fim:function(f){fins.push(f)},fecha:fecha,img:function(n){return new URL('../../img/jogos/'+n,import.meta.url).href}};
}
export function diz(p,html){var m=p.msg;m.classList.remove('on');clearTimeout(m._t);m._t=setTimeout(function(){m.innerHTML=html;m.classList.add('on')},calmo?0:220)}
