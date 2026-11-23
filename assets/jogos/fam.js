import {palco,diz} from './palco.js?v=20261123j1';
var J=[
 [.4766,.2754,.0469,.0352,'Guarda','A guarda se decide pelo que é melhor para os filhos, não por quem vence a briga.','guarda-e-convivencia-o-jogo-que-se-repete'],
 [.3776,.3496,.0573,.0801,'Convivência','O pai afastado do filho pode exigir a convivência na Justiça.','convivencia-com-o-filho-como-exigir'],
 [.5638,.3496,.0573,.0801,'Pensão','Guarda compartilhada não dispensa a pensão por si só.','guarda-compartilhada-paga-pensao'],
 [.3255,.5,.0547,.0781,'Partilha','Na comunhão parcial, divide-se o que foi construído durante a união.','comunhao-parcial-o-que-entra-na-partilha'],
 [.6224,.5,.0547,.0781,'Recomeço','Uma crise na família não é o fim da sua história.','medida-protetiva-intimacao-divorcio-como-atravessar-a-crise']
];
export default function(){
 var p=palco({casa:'fam',rotulo:'A casa da família à noite',casaNome:'Casa da Família',dica:'Acenda uma janela.'});
 var q=document.createElement('div');q.className='jg-quadro';q.innerHTML='<img alt="Casa de madeira à noite, com as janelas apagadas" decoding="async">';q.firstChild.src=p.img('fam.webp');p.cena.appendChild(q);p.cena.style.setProperty('--amb','url('+q.firstChild.src+')');
 var porta=document.createElement('i');porta.className='jg-porta';porta.style.cssText='left:42%;top:46%;width:16%;height:22%';q.appendChild(porta);
 var n=0;
 J.forEach(function(j){var b=document.createElement('button');b.type='button';b.className='jg-jan';b.style.cssText='left:'+j[0]*100+'%;top:'+j[1]*100+'%;width:'+j[2]*100+'%;height:'+j[3]*100+'%'+(j[4]==='Guarda'?';border-radius:50%':'');b.setAttribute('aria-label','Acender a janela: '+j[4]);b.appendChild(document.createElement('i'));
  b.addEventListener('click',function(){var nova=!b.classList.contains('acesa');b.classList.add('acesa');b.setAttribute('aria-pressed','true');if(nova)n++;
   p.dica.style.opacity=n?'0':'1';
   diz(p,'<h3>'+j[4]+'</h3><p>'+j[5]+'</p><a href="'+new URL('../../artigos/'+j[6]+'.html',import.meta.url).href+'">Ler</a>');
   if(n===J.length&&nova)setTimeout(function(){porta.classList.add('on');diz(p,'<h3>A casa acesa</h3><p>Cada janela é uma conversa. A porta fica aberta para a sua.</p><a href="'+new URL('../../familia/',import.meta.url).href+'">Entrar na Casa da Família</a>')},p.calmo?0:2600)});
  q.appendChild(b)});
 return p;
}
