import {palco,diz} from './palco.js?v=20261124j5';
var CR=[
 ['Fui intimado para depor. Sou obrigado a ir?','Você pode ficar calado diante da autoridade. Calar não é confessar.','Constituição, art. 5º, LXIII','../../artigos/intimado-depor-delegacia-direito-ao-silencio.html'],
 ['Fui acusado falsamente. O que fazer antes de depor?','O que você disser agora pesa no processo inteiro. Organize os fatos antes de falar.','','../../artigos/acusado-falsamente-o-que-fazer-antes-de-depor.html'],
 ['Recebi uma citação criminal. E agora?','A citação abre o prazo da defesa. Não deixe o tempo correr.','','../../artigos/citacao-criminal-o-que-acontece-prazo-para-defesa.html'],
 ['A polícia levou meu celular. Pode ler tudo?','Saiba o que a busca autoriza e o que pode ser questionado.','','../../artigos/policia-levou-meu-celular-pode-acessar-minhas-conversas.html'],
 ['Posso ser preso sem ter sido condenado?','Ninguém é considerado culpado antes da sentença definitiva.','Constituição, art. 5º, LVII','../../artigos/prisao-preventiva-sem-condenacao.html']
];
var PR=[
 ['Recebi uma medida protetiva. E agora?','As primeiras 48 horas pesam muito. Veja o que fazer e o que evitar.','','../../artigos/medida-protetiva-primeiras-48-horas.html'],
 ['Fui intimado e mandei mensagem. E agora?','Não mande mais nada. Entenda o risco e o próximo passo.','','../../artigos/recebi-intimacao-e-mandei-mensagem-medida-protetiva.html'],
 ['Posso ver meu filho com medida protetiva?','A medida não apaga a relação com o filho, mas tem regras que precisam ser respeitadas.','','../../artigos/posso-ver-meu-filho-com-medida-protetiva.html'],
 ['Como contestar a medida? Existe prazo?','Há caminho para apresentar a sua versão e as suas provas.','','../../artigos/como-contestar-medida-protetiva-prazo-para-defesa.html'],
 ['Fui ameaçada hoje. Como pedir uma medida protetiva?','O pedido pode ser feito na delegacia, e o juiz precisa decidir com rapidez.','','../../artigos/fui-ameacada-como-pedir-medida-protetiva.html']
];
function url(u){return new URL(u,import.meta.url).href}
function carrega(s){return new Promise(function(ok,no){var i=new Image();i.decoding='async';i.onload=function(){ok(i)};i.onerror=no;i.src=s})}
export default function(qual){
 var prot=qual==='prot',FR=prot?PR:CR;
 var p=palco({casa:'crim',rotulo:prot?'Vidro molhado diante da delegacia':'Vidro molhado diante do fórum',casaNome:prot?'Medida Protetiva':'Direito Criminal',dica:'Passe o dedo no vidro.'});
 var cv=document.createElement('canvas');p.cena.appendChild(cv);
 var txt=document.createElement('p');txt.className='jg-vidro-txt';txt.setAttribute('aria-hidden','true');p.el.appendChild(txt);
 var M=document.createElement('canvas'),mx=M.getContext('2d');
 var W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,innerWidth<700?1.25:1.5),vivo=true,idx=0,mostrou=false,sujo=true,gl=null,raf=0,t0=performance.now();
 function tam(){W=innerWidth;H=innerHeight;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);M.width=128;M.height=Math.max(64,Math.round(128*H/W));mx.fillStyle='#000';mx.fillRect(0,0,M.width,M.height);sujo=true;if(gl)gl.viewport(0,0,cv.width,cv.height)}
 tam();addEventListener('resize',tam);p.fim(function(){vivo=false;cancelAnimationFrame(raf);removeEventListener('resize',tam)});
 var ult=null;
 function pinta(x,y){var sx=x/W*M.width,sy=y/H*M.height,r=M.width*.15;function d(px,py){var g=mx.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.6,'rgba(255,255,255,.85)');g.addColorStop(1,'rgba(255,255,255,0)');mx.fillStyle=g;mx.beginPath();mx.arc(px,py,r,0,7);mx.fill()}
  if(ult){var dx=sx-ult[0],dy=sy-ult[1],n=Math.ceil(Math.hypot(dx,dy)/(r*.35));for(var i=1;i<=n;i++)d(ult[0]+dx*i/n,ult[1]+dy*i/n)}else d(sx,sy);ult=[sx,sy];sujo=true}
 cv.addEventListener('pointerdown',function(e){cv.setPointerCapture(e.pointerId);ult=null;pinta(e.clientX,e.clientY);p.dica.style.opacity='.0'});
 cv.addEventListener('pointermove',function(e){if(e.buttons||e.pointerType==='touch')pinta(e.clientX,e.clientY)});
 cv.addEventListener('pointerup',function(){ult=null});
 cv.setAttribute('role','img');cv.setAttribute('aria-label','Vidro de carro coberto de chuva; ao fundo, o fórum iluminado à noite');
 var vez=document.createElement('button');vez.type='button';vez.className='jg-sr';vez.textContent='Limpar o vidro';vez.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';p.el.appendChild(vez);
 vez.addEventListener('click',function(){mx.fillStyle='#fff';mx.fillRect(0,0,M.width,M.height);sujo=true});
 function frac(){var d=mx.getImageData(0,0,M.width,M.height).data,s=0;for(var i=0;i<d.length;i+=16)if(d[i]>110)s++;return s/(d.length/16)}

 var tf=setInterval(function(){if(!vivo){clearInterval(tf);return}
  if(!p.calmo){mx.fillStyle='rgba(0,0,0,.028)';mx.fillRect(0,0,M.width,M.height);sujo=true}
  var f=frac();
  if(!mostrou&&f>.2){mostrou=true;var a=FR[idx%FR.length];txt.textContent=a[0];txt.classList.add('on');diz(p,'<p>'+a[1]+'</p>'+(a[2]?'<small>'+a[2]+'</small>':'')+'<a href="'+url(a[3])+'">Ler a resposta</a>')}
  else if(mostrou&&f<.05){mostrou=false;idx++;txt.classList.remove('on');p.msg.classList.remove('on')}
 },300);
 p.fim(function(){clearInterval(tf)});
 Promise.all([carrega(p.img(prot?'prot.webp':'crim.webp')),carrega(p.img(prot?'prot-b.webp':'crim-b.webp'))]).then(function(im){
  if(!vivo)return;
  if(!p.calmo)try{gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'})}catch(e){gl=null}
  if(gl&&shader(im))return;
  gl=null;dois(im)
 });
 function capa(iw,ih){var s=Math.max(W/iw,H/ih);return [(W-iw*s)/2,(H-ih*s)/2,iw*s,ih*s]}
 function dois(im){var c=cv.getContext('2d'),F=document.createElement('canvas'),fx=F.getContext('2d');
  function quadro(){if(!vivo)return;if(sujo){sujo=false;var r=capa(900,1200);c.setTransform(dpr,0,0,dpr,0,0);c.drawImage(im[0],r[0],r[1],r[2],r[3]);F.width=cv.width;F.height=cv.height;fx.setTransform(dpr,0,0,dpr,0,0);fx.drawImage(im[1],r[0],r[1],r[2],r[3]);fx.fillStyle='rgba(10,16,30,.35)';fx.fillRect(0,0,W,H);fx.globalCompositeOperation='destination-out';fx.drawImage(M,0,0,W,H);fx.globalCompositeOperation='source-over';c.setTransform(1,0,0,1,0,0);c.drawImage(F,0,0)}raf=requestAnimationFrame(quadro)}
  quadro()}
 function shader(im){
  var vs='attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}';
  var fs=['#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 v;uniform sampler2D S,B,K;uniform float T;uniform vec2 R;uniform vec4 C;',
  'float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
  'vec2 im(vec2 q){return (q*R-C.xy)/C.zw;}',
  'vec3 est(vec2 uv,float sc,float t){vec2 a=vec2(R.x/R.y,1.);vec2 p=uv*a*sc;vec2 id=floor(p);vec2 f=fract(p)-.5;float n=h(id);vec2 o=(vec2(h(id+3.1),h(id+7.7))-.5)*.7;float vida=fract(t*.04+n*7.);float r=(.05+.17*n*n)*smoothstep(0.,.08,vida)*step(.42,n);vec2 d=f-o;float m=r>.004?1.-smoothstep(r*.55,r,length(d*vec2(1.,1.15))):0.;return vec3(d/max(r,.001)*m,m);}',
  'vec3 corre(vec2 uv,float t){float cols=7.*R.x/R.y;vec2 p=uv*vec2(cols,1.);float id=floor(p.x);float n=h(vec2(id,4.));if(n<.55)return vec3(0.);float x=fract(p.x)-.5+sin(uv.y*9.+n*6.)*.08;float y=fract(uv.y+t*(.05+.09*n)+n);float yy=y-.5;float hd=(1.-smoothstep(.05,.09,length(vec2(x,yy*cols*.55))));float tr=(1.-smoothstep(0.,.06,abs(x)))*smoothstep(-.02,.0,yy)*(1.-smoothstep(0.,.45,yy))*.6;return vec3(vec2(x*3.,yy)*hd,max(hd,tr*.35));}',
  'void main(){vec2 uv=v;float t=T;float w=texture2D(K,vec2(uv.x,1.-uv.y)).r;',
  'vec3 a=est(uv,13.,t);vec3 b=est(uv+.37,27.,t*1.3);vec3 c=corre(uv,t);',
  'vec2 n=a.xy*.9+b.xy*.6+c.xy;float m=clamp(a.z+b.z*.8+c.z,0.,1.);float ww=smoothstep(.15,.85,w);',
  'vec2 off=-n*.06*(1.-ww);vec3 nit=texture2D(S,im(uv+off)).rgb;vec3 emb=texture2D(B,im(uv)).rgb*1.05+vec3(.025,.03,.045);',
  'float neb=(1.-ww)*(1.-m);vec3 col=mix(nit,emb,neb);',
  'vec3 N=normalize(vec3(n,.7));float rim=smoothstep(.55,1.,length(n));col*=1.-.4*rim*m*(1.-ww);col+=pow(max(0.,dot(N,normalize(vec3(-.35,.55,1.)))),40.)*.5*m*(1.-ww);',
  'float vg=(1.-smoothstep(.35,1.25,length((uv-.5)*vec2(1.,1.2))));col*=.7+.3*vg;gl_FragColor=vec4(col,1.);}'].join('\n');
  function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return gl.getShaderParameter(o,gl.COMPILE_STATUS)?o:null}
  var a=sh(gl.VERTEX_SHADER,vs),b=sh(gl.FRAGMENT_SHADER,fs);if(!a||!b)return false;
  var pr=gl.createProgram();gl.attachShader(pr,a);gl.attachShader(pr,b);gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return false;gl.useProgram(pr);
  var bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);var la=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(la);gl.vertexAttribPointer(la,2,gl.FLOAT,false,0,0);
  function tx(u,src,i){var t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+u);gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src);[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(function(k){gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE)});gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.uniform1i(gl.getUniformLocation(pr,i),u);return t}
  tx(0,im[0],'S');tx(1,im[1],'B');gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);var km=tx(2,M,'K');
  var uT=gl.getUniformLocation(pr,'T'),uR=gl.getUniformLocation(pr,'R'),uC=gl.getUniformLocation(pr,'C');
  gl.viewport(0,0,cv.width,cv.height);
  function quadro(n){if(!vivo)return;if(document.hidden){raf=requestAnimationFrame(quadro);return}
   var r=capa(900,1200);gl.uniform2f(uR,W,H);gl.uniform4f(uC,r[0],H-r[1]-r[3],r[2],r[3]);gl.uniform1f(uT,(n-t0)/1000);
   if(sujo){sujo=false;gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,km);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,M)}
   gl.drawArrays(gl.TRIANGLE_STRIP,0,4);raf=requestAnimationFrame(quadro)}
  raf=requestAnimationFrame(quadro);return true}
 return p;
}
