import {palco,diz} from './palco.js?v=20261123j3';
var J=[
 [.4766,.2754,.0469,.0352,'Guarda do filho: o que fazer quando a briga começa?','Cada mensagem trocada agora pode pesar na decisão sobre a guarda.','guarda-e-convivencia-o-jogo-que-se-repete'],
 [.3776,.3496,.0573,.0801,'Ela está impedindo de ver meu filho. O que faço?','O direito de convivência com o filho pode ser exigido na Justiça.','convivencia-com-o-filho-como-exigir'],
 [.5638,.3496,.0573,.0801,'Guarda compartilhada: ainda tenho que pagar pensão?','Guarda compartilhada não dispensa a pensão por si só.','guarda-compartilhada-paga-pensao'],
 [.3255,.5,.0547,.0781,'O que entra na divisão de bens no divórcio?','Na comunhão parcial, divide-se o que foi construído durante a união.','comunhao-parcial-o-que-entra-na-partilha'],
 [.6224,.5,.0547,.0781,'Saí de casa: perco a guarda ou o imóvel?','Entenda o que acontece com os filhos e com o imóvel depois que você sai.','medida-protetiva-sai-de-casa-guarda-imovel']
];
export default function(){
 var p=palco({casa:'fam',rotulo:'A casa da família à noite',casaNome:'Casa da Família',dica:'Acenda uma janela.'});
 var q=document.createElement('div');q.className='jg-quadro';q.innerHTML='<img alt="Casa de madeira à noite, com as janelas apagadas" decoding="async">';q.firstChild.src=p.img('fam.webp');p.cena.appendChild(q);p.cena.style.setProperty('--amb','url('+q.firstChild.src+')');
 var porta=document.createElement('i');porta.className='jg-porta';porta.style.cssText='left:42%;top:46%;width:16%;height:22%';q.appendChild(porta);
 var n=0;
 J.forEach(function(j){var b=document.createElement('button');b.type='button';b.className='jg-jan';b.style.cssText='left:'+j[0]*100+'%;top:'+j[1]*100+'%;width:'+j[2]*100+'%;height:'+j[3]*100+'%'+(j===J[0]?';border-radius:50%':'');b.setAttribute('aria-label','Acender a janela: '+j[4]);b.appendChild(document.createElement('i'));
  b.addEventListener('click',function(){var nova=!b.classList.contains('acesa');b.classList.add('acesa');b.setAttribute('aria-pressed','true');if(nova)n++;
   p.dica.style.opacity=n?'0':'1';
   diz(p,'<h3>Casa da Família</h3><p>'+j[4]+'</p><small>'+j[5]+'</small><a href="'+new URL('../../artigos/'+j[6]+'.html',import.meta.url).href+'">Ler a resposta</a>');
   if(n===J.length&&nova)setTimeout(function(){porta.classList.add('on');diz(p,'<h3>A casa acesa</h3><p>Cada janela é uma conversa. A porta fica aberta para a sua.</p><a href="'+new URL('../../familia/',import.meta.url).href+'">Entrar na Casa da Família</a>')},p.calmo?0:2600)});
  q.appendChild(b)});
 return p;
}
