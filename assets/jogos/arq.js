import {palco} from './palco.js?v=20261124j5';
var L=[[125,220],[228,316],[322,413],[418,510],[515,608],[612,700]],Y0=508,Y1=842,IW=768,IH=1024;
var C=[
 ['Confessaram um crime sob tortura. O “morto” voltou vivo.','Irmãos Naves · Araguari (MG), 1937','Sebastião e Joaquim Naves confessaram, sob tortura, a morte de um primo. Foram condenados. Em 1952, o suposto morto voltou vivo à cidade.','Confissão arrancada não é prova.','intimado-depor-delegacia-direito-ao-silencio','Fui intimado para depor. Sou obrigado a ir?'],
 ['Acusados pelas manchetes, sem prova.','Escola Base · São Paulo, 1994','Os donos de uma escola infantil foram acusados de abuso e condenados pela imprensa. O inquérito foi arquivado por falta de provas; a reputação não voltou.','Acusação não é sentença.','acusado-falsamente-o-que-fazer-antes-de-depor','Fui acusado falsamente: o que fazer antes de depor'],
 ['Enforcado por um crime que talvez não cometeu.','Mota Coqueiro · Macaé (RJ), 1855','Fazendeiro enforcado por um crime cuja autoria logo passou a ser posta em dúvida. O caso pesou para que o Império deixasse de executar a pena de morte.','O erro judicial pode ser irreparável.','prisao-preventiva-sem-condenacao','Posso ser preso sem ter sido condenado?'],
 ['Condenado por causa de um documento forjado.','Alfred Dreyfus · França, 1894','Capitão condenado por traição com base em documento forjado. Émile Zola denunciou o caso em “J’accuse”, e Dreyfus foi reabilitado em 1906.','A verdade pode demorar, mas a defesa não pode desistir.','perfil-falso-ou-conversa-forjada-quando-entra-a-pericia','Conversa forjada: quando entra a perícia?'],
 ['Preso, ninguém avisou que ele podia ficar calado.','Miranda contra Arizona · Estados Unidos, 1966','A Suprema Corte decidiu que o preso deve ser avisado, antes do interrogatório, do direito ao silêncio e a um advogado.','Saber os próprios direitos é o primeiro deles.','como-consultar-inquerito-policial','Como descobrir o que já existe contra mim?'],
 ['Sem dinheiro para advogado, escreveu à mão para a Suprema Corte.','Gideon contra Wainwright · Estados Unidos, 1963','Clarence Gideon pediu um defensor e ganhou esse direito. No novo julgamento, foi absolvido.','Ninguém deve enfrentar uma acusação sozinho.','citacao-criminal-o-que-acontece-prazo-para-defesa','Recebi uma citação criminal. E agora?']
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
  b.setAttribute('aria-label','Puxar o livro: '+C[i][1]);
  b.addEventListener('click',function(){if(aberto&&aberto.b===b){guarda();return}guarda();aberto={b:b,v:v};v.classList.add('on');b.classList.add('fora');b.classList.add('lido');p.dica.style.opacity='0';
   var c=C[i];pap.innerHTML='<h3></h3><p class="ano"></p><p class="t"></p><p class="l"></p><a class="lk"></a><button type="button">Devolver à estante</button>';var lk=pap.querySelector('.lk');lk.textContent=c[5];lk.href=new URL('../../artigos/'+c[4]+'.html',import.meta.url).href;pap.querySelector('h3').textContent=c[0];pap.querySelector('.ano').textContent=c[1];pap.querySelector('.t').textContent=c[2];pap.querySelector('.l').textContent=c[3];pap.querySelector('button').addEventListener('click',guarda);pap.classList.add('on')});
  q.appendChild(v);q.appendChild(b)});
 return p;
}
