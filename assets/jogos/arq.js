import {palco} from './palco.js?v=20261123j1';
var L=[[125,220],[228,316],[322,413],[418,510],[515,608],[612,700]],Y0=508,Y1=842,IW=768,IH=1024;
var C=[
 ['Os Irmãos Naves','Araguari, Minas Gerais · 1937','Sebastião e Joaquim Naves confessaram, sob tortura, a morte de um primo. Foram condenados. Em 1952, o suposto morto voltou vivo à cidade.','Confissão arrancada não é prova.'],
 ['Escola Base','São Paulo · 1994','Os donos de uma escola infantil foram acusados de abuso e condenados pelas manchetes. O inquérito foi arquivado por falta de provas; a reputação, não voltou.','Acusação não é sentença.'],
 ['Mota Coqueiro','Macaé, Rio de Janeiro · 1855','Fazendeiro enforcado por um crime cuja autoria logo passou a ser posta em dúvida. O caso pesou para que o Império deixasse de executar a pena de morte.','O erro judicial pode ser irreparável.'],
 ['Alfred Dreyfus','França · 1894','Capitão condenado por traição com base em documento forjado. Émile Zola denunciou o caso em “J’accuse”, e Dreyfus foi reabilitado em 1906.','A verdade pode demorar, mas a defesa não pode desistir.'],
 ['Miranda contra Arizona','Estados Unidos · 1966','A Suprema Corte decidiu que o preso deve ser avisado, antes do interrogatório, do direito ao silêncio e a um advogado.','Saber os próprios direitos é o primeiro deles.'],
 ['Gideon contra Wainwright','Estados Unidos · 1963','Sem dinheiro para advogado, Clarence Gideon escreveu à mão para a Suprema Corte. Ganhou o direito a um defensor e, no novo julgamento, foi absolvido.','Ninguém deve enfrentar uma acusação sozinho.']
];
export default function(){
 var p=palco({casa:'arq',rotulo:'Estante do arquivo com seis livros antigos',casaNome:'Arquivo do Baú',dica:'Puxe um livro da estante.'});
 var q=document.createElement('div');q.className='jg-quadro';q.innerHTML='<img alt="Estante antiga com livros de couro à luz de vela" decoding="async">';var src=p.img('arq.webp');q.firstChild.src=src;p.cena.appendChild(q);p.cena.style.setProperty('--amb','url('+q.firstChild.src+')');
 var pap=document.createElement('div');pap.className='jg-papel';pap.setAttribute('aria-live','polite');p.el.appendChild(pap);
 var aberto=null;
 function guarda(){if(!aberto)return;aberto.b.classList.remove('fora');aberto.v.classList.remove('on');pap.classList.remove('on');var b=aberto.b;aberto=null;b.focus({preventScroll:true})}
 L.forEach(function(x,i){var v=document.createElement('i');v.className='jg-vao';var b=document.createElement('button');b.type='button';b.className='jg-livro';
  var st='left:'+x[0]/IW*100+'%;top:'+Y0/IH*100+'%;width:'+(x[1]-x[0])/IW*100+'%;height:'+(Y1-Y0)/IH*100+'%';v.style.cssText=st;
  b.style.cssText=st+';background-image:url('+src+');background-size:'+IW/(x[1]-x[0])*100+'% '+IH/(Y1-Y0)*100+'%;background-position:'+x[0]/(IW-(x[1]-x[0]))*100+'% '+Y0/(IH-(Y1-Y0))*100+'%';
  b.setAttribute('aria-label','Puxar o livro: '+C[i][0]);
  b.addEventListener('click',function(){if(aberto&&aberto.b===b){guarda();return}guarda();aberto={b:b,v:v};v.classList.add('on');b.classList.add('fora');b.classList.add('lido');p.dica.style.opacity='0';
   var c=C[i];pap.innerHTML='<h3></h3><p class="ano"></p><p class="t"></p><p class="l"></p><button type="button">Devolver à estante</button>';pap.querySelector('h3').textContent=c[0];pap.querySelector('.ano').textContent=c[1];pap.querySelector('.t').textContent=c[2];pap.querySelector('.l').textContent=c[3];pap.querySelector('button').addEventListener('click',guarda);pap.classList.add('on')});
  q.appendChild(v);q.appendChild(b)});
 return p;
}
