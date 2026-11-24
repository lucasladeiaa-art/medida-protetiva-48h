import {palco,diz} from './palco.js?v=20261124j5';
var J=[
 [.4766,.2754,.0469,.0352,'Guarda do filho: o que fazer quando a briga começa?','Cada mensagem trocada agora pode pesar na decisão sobre a guarda.','guarda-e-convivencia-o-jogo-que-se-repete','<circle cx="15" cy="14" r="4"/><path d="M9 40V28q0-7 6-7t6 7v12zM23 40v-8q0-4 4-4t4 4v8z"/><circle cx="27" cy="24" r="3"/><path d="M20 29l5 2" stroke="#000" stroke-width="2"/>'],
 [.3776,.3496,.0573,.0801,'Ela está impedindo de ver meu filho. O que faço?','O direito de convivência com o filho pode ser exigido na Justiça.','convivencia-com-o-filho-como-exigir','<circle cx="12" cy="15" r="4"/><path d="M6 40V27q0-7 6-7t6 7v13zM24 40v-9q0-4 4-4t4 4v9z"/><circle cx="28" cy="24" r="3"/><path d="M17 27l8 3" stroke="#000" stroke-width="2.4"/>'],
 [.5638,.3496,.0573,.0801,'Guarda compartilhada: ainda tenho que pagar pensão?','Guarda compartilhada não dispensa a pensão por si só.','guarda-compartilhada-paga-pensao','<circle cx="16" cy="17" r="4"/><path d="M10 40V29q0-6 6-6t6 6v11zM4 32h32v2H4zM24 29l8-1 .5 3-8 1z"/>'],
 [.3255,.5,.0547,.0781,'O que entra na divisão de bens no divórcio?','Na comunhão parcial, divide-se o que foi construído durante a união.','comunhao-parcial-o-que-entra-na-partilha','<circle cx="9" cy="17" r="3.5"/><circle cx="31" cy="17" r="3.5"/><path d="M4 40V29q0-5 5-5t5 5v11zM26 40V29q0-5 5-5t5 5v11zM12 30h16v2H12z"/>'],
 [.6224,.5,.0547,.0781,'Saí de casa: perco a guarda ou o imóvel?','Entenda o que acontece com os filhos e com o imóvel depois que você sai.','medida-protetiva-sai-de-casa-guarda-imovel','<circle cx="17" cy="13" r="4"/><path d="M11 40V26q0-6 6-6t6 6v14zM25 30h8v9h-8zM27 30v-2h4v2h-1v-1h-2v1z"/>']
];
export default function(){
 var p=palco({casa:'fam',rotulo:'A casa da família à noite',casaNome:'Casa da Família',dica:'Acenda uma janela.'});
 var q=document.createElement('div');q.className='jg-quadro';q.innerHTML='<img alt="Casa de madeira à noite, com as janelas apagadas" decoding="async">';q.firstChild.src=p.img('fam.webp');p.cena.appendChild(q);p.cena.style.setProperty('--amb','url('+q.firstChild.src+')');
 var porta=document.createElement('i');porta.className='jg-porta';porta.style.cssText='left:42%;top:46%;width:16%;height:22%';q.appendChild(porta);
 var n=0;
 J.forEach(function(j){var b=document.createElement('button');b.type='button';b.className='jg-jan';b.style.cssText='left:'+j[0]*100+'%;top:'+j[1]*100+'%;width:'+j[2]*100+'%;height:'+j[3]*100+'%'+(j===J[0]?';border-radius:50%':'');b.setAttribute('aria-label','Acender a janela: '+j[4]);b.appendChild(document.createElement('i'));var sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('viewBox','0 0 40 40');sv.setAttribute('class','jg-som');sv.setAttribute('aria-hidden','true');sv.setAttribute('preserveAspectRatio','xMidYMax meet');sv.innerHTML=j[7];b.appendChild(sv);
  b.addEventListener('click',function(){var nova=!b.classList.contains('acesa');b.classList.add('acesa');b.setAttribute('aria-pressed','true');if(nova)n++;
   p.dica.style.opacity=n?'0':'1';
   diz(p,'<h3>Casa da Família</h3><p>'+j[4]+'</p><small>'+j[5]+'</small><a href="'+new URL('../../artigos/'+j[6]+'.html',import.meta.url).href+'">Ler a resposta</a>');
   if(n===J.length&&nova)setTimeout(function(){porta.classList.add('on');diz(p,'<h3>A casa acesa</h3><p>Cada janela é uma conversa. A porta fica aberta para a sua.</p><a href="'+new URL('../../familia/',import.meta.url).href+'">Entrar na Casa da Família</a>')},p.calmo?0:2600)});
  q.appendChild(b)});
 return p;
}
