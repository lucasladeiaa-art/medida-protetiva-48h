import {palco,diz} from './palco.js?v=20261123j3';
var G='https://consumidor.lucasladeia.com.br/artigos/';
var D=[
 ['ATRASO 1H','COMUNICAÇÃO','INTERNET E FONE','Voo atrasou mais de 1 hora?','A companhia deve garantir meios de comunicação.','quais-sao-os-direitos-do-passageiro-em-atraso-ou-cancelamento-de-voo'],
 ['ATRASO 2H','ALIMENTAÇÃO','VOUCHER/REFEIÇÃO','O atraso passou de 2 horas?','Você tem direito a alimentação adequada ao horário e à espera.','quais-sao-os-direitos-do-passageiro-em-atraso-ou-cancelamento-de-voo'],
 ['ATRASO 4H','HOSPEDAGEM','VOO OU REEMBOLSO','Mais de 4 horas esperando no aeroporto?','Você escolhe: outro voo, reembolso ou outro transporte. Se houver pernoite, hospedagem e traslado.','quais-sao-os-direitos-do-passageiro-em-atraso-ou-cancelamento-de-voo'],
 ['CANCELADO','REACOMODAÇÃO','OU REEMBOLSO','Seu voo foi cancelado?','Outro voo, reembolso integral ou outro transporte, à sua escolha.','meu-voo-foi-cancelado-quais-sao-meus-direitos'],
 ['BAGAGEM','EXTRAVIADA','7 DIAS NACIONAL','Sua mala não chegou?','A companhia tem até 7 dias, em voo nacional, e 21 dias, em internacional, para devolver.','minha-mala-nao-chegou-quanto-tempo-a-companhia-tem-para-devolver'],
 ['DESISTÊNCIA','EM ATÉ 24H','SEM MULTA','Comprou a passagem e se arrependeu?','Compra feita com 7 dias ou mais de antecedência pode ser desfeita em 24 horas, sem custo.','posso-desistir-da-passagem-aerea-em-24-horas-sem-multa'],
 ['OVERBOOKING','COMPENSAÇÃO','IMEDIATA','Impediram você de embarcar?','Por excesso de vendas, há compensação imediata, além de outro voo ou reembolso.','overbooking-fui-impedido-de-embarcar-quais-sao-meus-direitos']
];
var COL=16,AZ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ÇÃÉÊÍÓÚ ';
export default function(){
 var p=palco({casa:'ter',rotulo:'Painel de partidas do aeroporto',casaNome:'Consumidor',dica:'Toque o painel.'});
 var f=document.createElement('div');f.className='jg-fundo';f.style.backgroundImage='url('+new URL('../../img/real/consumidor2-720.webp',import.meta.url).href+')';p.cena.appendChild(f);
 var b=document.createElement('button');b.type='button';b.className='jg-painel';b.setAttribute('aria-label','Painel de partidas: mostrar um direito do passageiro');
 b.innerHTML='<div class="cab" aria-hidden="true"><span>PARTIDAS · DIREITOS</span><i></i></div>';
 var cel=[];for(var r=0;r<3;r++){var l=document.createElement('div');l.className='jg-linha';l.setAttribute('aria-hidden','true');for(var c=0;c<COL;c++){var s=document.createElement('span');s.className='jg-c'+(r===0?' am':'');s.textContent=' ';l.appendChild(s);cel.push(s)}b.appendChild(l)}
 p.cena.appendChild(b);
 var i=0,tm=[];p.fim(function(){tm.forEach(clearTimeout)});
 function mostra(){var d=D[i%D.length];i++;tm.forEach(clearTimeout);tm=[];
  var alvo=(d[0].padEnd(COL)+d[1].padEnd(COL)+d[2].padEnd(COL)).split('');
  cel.forEach(function(s,k){var fim=alvo[k]||' ';if(p.calmo){s.textContent=fim;return}var n=4+Math.floor(Math.random()*6)+(k%COL)*.4|0;
   for(var j=0;j<=n;j++)(function(j){tm.push(setTimeout(function(){s.textContent=j===n?fim:AZ[Math.random()*AZ.length|0];s.classList.remove('vira');void s.offsetWidth;s.classList.add('vira')},j*70+(k%COL)*18+Math.floor(k/COL)*60))})(j)});
  diz(p,'<h3>'+d[0]+'</h3><p>'+d[3]+'</p><small>'+d[4]+' Resolução ANAC nº 400/2016.</small><a href="'+G+d[5]+'.html" rel="noopener">Ler a resposta completa</a>');p.dica.style.opacity='0'}
 b.addEventListener('click',mostra);
 setTimeout(mostra,p.calmo?0:700);
 return p;
}
