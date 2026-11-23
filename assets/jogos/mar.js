import {palco} from './palco.js?v=20261123j1';
var V='20261123m1',IW=1280,IH=720;
var AREA={'criminal':'Criminal','familia':'Família','medida-protetiva':'Medida protetiva','cac':'CAC','mundo-em-disputa':'Mundo em Disputa'};
var BAUS=[[300,664],[515,640],[700,690],[880,652],[1085,694]];
var NAUS=[
 {id:'arq',x:300,y:420,nx:300,ny:150,nome:'Arquivo do Baú',linha:'Todos os textos, por área, guardados no casco.',href:'../../artigos/',acao:'Entrar no naufrágio'},
 {id:'md',x:960,y:420,nx:960,ny:190,nome:'Mundo em Disputa',linha:'Casos reais que dividiram o público, contados com a lei na mão.',href:'../../mundo-em-disputa/',acao:'Entrar no naufrágio'}
];
function u(n){return new URL(n,import.meta.url).href}
function im(n){return u('../../img/mar/'+n)}
function css(){if(document.getElementById('mr-css'))return;var l=document.createElement('link');l.id='mr-css';l.rel='stylesheet';l.href=u('mar.css?v='+V);document.head.appendChild(l)}
function carrega(s){return new Promise(function(ok,no){var i=new Image();i.decoding='async';i.onload=function(){ok(i)};i.onerror=no;i.src=s})}
function data(d){var m=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];var p=(d||'').split('-');return p.length===3?(+p[2])+' de '+m[+p[1]-1]+' de '+p[0]:''}
export default function(){
 css();
 var p=palco({casa:'mar',rotulo:'Mergulho no fundo do rio, entre baús e naufrágios',casaNome:'O mergulho',dica:'Toque na água para nadar.'});
 var calmo=p.calmo,el=p.el,cena=p.cena;
 var mundo=document.createElement('div');mundo.className='mr-mundo';mundo.style.backgroundImage='url('+im('oceano.webp')+')';cena.appendChild(mundo);
 var gc=document.createElement('canvas');gc.className='mr-gl';gc.setAttribute('aria-hidden','true');cena.appendChild(gc);
 var obj=document.createElement('div');obj.className='mr-obj';cena.appendChild(obj);
 var fc=document.createElement('canvas');fc.className='mr-vida';fc.setAttribute('aria-hidden','true');cena.appendChild(fc);
 var fx=fc.getContext('2d');
 var mg=document.createElement('img');mg.className='mr-mergulhador';mg.alt='';mg.src=im('mergulhador.webp');mg.decoding='async';obj.appendChild(mg);
 var lampada=document.createElement('i');lampada.className='mr-lampada';lampada.setAttribute('aria-hidden','true');obj.appendChild(lampada);
 var carta=document.createElement('div');carta.className='mr-carta';carta.setAttribute('aria-live','polite');el.appendChild(carta);
 var W=0,H=0,k=1,cam=0,camY=0,camA=0,dpr=Math.min(window.devicePixelRatio||1,innerWidth<700?1.25:1.5),vivo=true,t0=performance.now(),tl=t0,raf=0,gl=null,desenhaGL=null;
 var dv={x:640,y:-90,vx:0,vy:0,dir:1,tx:560,ty:300,inc:0,w:260,alvo:null},seg=false;
 var baus=[],naus=[],perto=null,aberto=null;
 function tam(){W=cena.clientWidth;H=cena.clientHeight;k=Math.max(H/IH,W/IW);camY=(IH*k-H)*.62;
  mundo.style.width=IW*k+'px';mundo.style.height=IH*k+'px';
  fc.width=Math.round(W*dpr);fc.height=Math.round(H*dpr);gc.width=Math.round(W*dpr);gc.height=Math.round(H*dpr);
  dv.w=Math.min(250,W*.52/k);mg.style.width=dv.w*k+'px';
  baus.forEach(function(b){b.el.style.left=b.x*k+'px';b.el.style.top=b.y*k+'px';b.el.style.width=Math.max(56,78*k)+'px'});
  naus.forEach(function(n){n.hw=0;n.el.style.left=n.x*k+'px';n.el.style.top=n.y*k+'px';n.nm.style.left=n.nx*k+'px';n.nm.style.top=n.ny*k+'px'});
  if(gl)gl.viewport(0,0,gc.width,gc.height)}
 function camAlvo(){var o=aberto||dv.alvo,x=o?(dv.x+o.x)/2*k:dv.x*k+dv.dir*W*.08;return Math.max(0,Math.min(IW*k-W,x-W*.5))}
 function tela(cx,cy){return [(cx+cam)/k,(cy+camY)/k]}
 function limita(){dv.tx=Math.max(90,Math.min(IW-90,dv.tx));dv.ty=Math.max(120,Math.min(600,dv.ty))}
 cena.addEventListener('pointerdown',function(e){if(e.target.closest('button,a'))return;var r=cena.getBoundingClientRect(),q=tela(e.clientX-r.left,e.clientY-r.top);dv.tx=q[0];dv.ty=q[1];dv.alvo=null;limita();seg=true;susto(q[0],q[1]);p.dica.style.opacity='0';fechaCarta();try{cena.setPointerCapture(e.pointerId)}catch(_){}});
 cena.addEventListener('pointermove',function(e){if(!seg)return;var r=cena.getBoundingClientRect(),q=tela(e.clientX-r.left,e.clientY-r.top);dv.tx=q[0];dv.ty=q[1];limita()});
 cena.addEventListener('pointerup',function(){seg=false});cena.addEventListener('pointercancel',function(){seg=false});
 function tecla(e){var d={ArrowLeft:[-60,0],ArrowRight:[60,0],ArrowUp:[0,-45],ArrowDown:[0,45]}[e.key];if(!d||e.target.closest&&e.target.closest('.mr-carta'))return;e.preventDefault();dv.tx=dv.x+d[0]*1.6;dv.ty=dv.y+d[1]*1.6;dv.alvo=null;limita();p.dica.style.opacity='0'}
 document.addEventListener('keydown',tecla);p.fim(function(){document.removeEventListener('keydown',tecla)});
 function fechaCarta(){if(!aberto)return;carta.classList.remove('on');if(aberto.tipo==='bau')aberto.el.classList.remove('aberto');aberto=null}
 function mostra(o){fechaCarta();aberto=o;dv.dir=o.x>dv.x?1:-1;p.dica.style.opacity='0';
  if(o.tipo==='bau'){o.el.classList.add('aberto');var a=o.a;carta.innerHTML='<p class="mr-k"></p><h3></h3><p class="mr-r"></p><div class="mr-acoes"><a></a><button type="button">Fechar o baú</button></div>';carta.querySelector('.mr-k').textContent=(AREA[a.area]||'Texto')+(a.date?' · '+data(a.date):'');carta.querySelector('h3').textContent=a.title;carta.querySelector('.mr-r').textContent=a.summary||'';var l=carta.querySelector('a');l.href=u('../../artigos/'+a.slug+'.html');l.textContent='Ler o artigo'}
  else{carta.innerHTML='<p class="mr-k">Naufrágio</p><h3></h3><p class="mr-r"></p><div class="mr-acoes"><a></a><button type="button">Voltar à água</button></div>';carta.querySelector('h3').textContent=o.n.nome;carta.querySelector('.mr-r').textContent=o.n.linha;var b=carta.querySelector('a');b.href=u(o.n.href);b.textContent=o.n.acao}
  carta.querySelector('button').addEventListener('click',function(){var f=aberto&&aberto.el;fechaCarta();if(f)f.focus({preventScroll:true})});
  carta.classList.toggle('alto',o.tipo==='bau');carta.classList.add('on')}
 function vai(o,x,y){dv.tx=x;dv.ty=y;limita();dv.alvo=o;p.dica.style.opacity='0';if(calmo){dv.x=dv.tx;dv.y=dv.ty}}
 NAUS.forEach(function(n){var b=document.createElement('button');b.type='button';b.className='mr-nau';b.setAttribute('aria-label','Naufrágio: '+n.nome);b.innerHTML='<i></i>';obj.appendChild(b);
  var nm=document.createElement('p');nm.className='mr-nome';nm.setAttribute('aria-hidden','true');nm.textContent=n.nome;obj.appendChild(nm);
  var o={tipo:'nau',n:n,el:b,nm:nm,x:n.x,y:n.y,nx:n.nx,ny:n.ny};naus.push(o);
  b.addEventListener('click',function(e){e.stopPropagation();vai(o,n.x+(n.x<640?140:-140),n.y-40)})});
 function poeBaus(lista){lista.slice(0,BAUS.length).forEach(function(a,i){var b=document.createElement('button');b.type='button';b.className='mr-bau';b.setAttribute('aria-label','Abrir o baú: '+a.title);
  b.innerHTML='<img class="f" alt="" decoding="async"><img class="a" alt="" decoding="async"><i></i>';b.querySelector('.f').src=im('bau-f.webp');b.querySelector('.a').src=im('bau-a.webp');obj.appendChild(b);
  var o={tipo:'bau',a:a,el:b,x:BAUS[i][0],y:BAUS[i][1]};baus.push(o);
  b.addEventListener('click',function(e){e.stopPropagation();if(aberto===o){fechaCarta();return}vai(o,o.x-(o.x>dv.x?1:-1)*dv.w*.66,o.y-80)})});tam()}
 fetch(u('../../artigos/artigos.json')).then(function(r){return r.json()}).then(function(j){j=(j||[]).filter(function(a){return a&&a.slug&&a.title}).sort(function(a,b){return (b.date||'').localeCompare(a.date||'')});poeBaus(j)}).catch(function(){});
 tam();addEventListener('resize',tam);p.fim(function(){vivo=false;cancelAnimationFrame(raf);removeEventListener('resize',tam)});
 if(calmo){dv.x=dv.tx;dv.y=dv.ty}
 cam=camAlvo();
 var peixes=[],neve=[],bolhas=[],sustos=[];
 function susto(x,y){sustos.push({x:x,y:y,t:performance.now()})}
 if(!calmo){for(var c=0;c<2;c++){var cx=c?880:420,cy=c?250:330;for(var i=0;i<16;i++)peixes.push({x:cx+Math.random()*120-60,y:cy+Math.random()*80-40,vx:(Math.random()-.5)*20,vy:(Math.random()-.5)*8,s:6+Math.random()*4,g:c,f:Math.random()*6})}
  for(var j=0;j<3;j++)peixes.push({x:200+Math.random()*900,y:180+Math.random()*300,vx:(Math.random()-.5)*10,vy:0,s:16+Math.random()*7,g:2+j,f:Math.random()*6});
  for(var n=0;n<70;n++)neve.push({x:Math.random()*IW,y:Math.random()*IH,z:.4+Math.random()*.8,r:.6+Math.random()*1.2,f:Math.random()*6})}
 function lamp(){var ox=dv.dir*dv.w*.47,oy=dv.w*.3067*.43,th=dv.inc*dv.dir,c=Math.cos(th),s=Math.sin(th);var lx=dv.dir*Math.cos(dv.inc),ly=Math.sin(dv.inc)+.12,ln=Math.hypot(lx,ly);return {x:dv.x+ox*c-oy*s,y:dv.y+ox*s+oy*c,dx:lx/ln,dy:ly/ln}}
 function cone(L,x,y){var dx=x-L.x,dy=y-L.y,d=Math.hypot(dx,dy)||1,c=(dx*L.dx+dy*L.dy)/d;var a=Math.max(0,Math.min(1,(c-.8)/.17));return a*Math.exp(-d/320)+Math.exp(-d/24)*.5}
 var fr=0;function passo(n){if(!vivo)return;fr++;raf=requestAnimationFrame(passo);if(document.hidden){tl=n;return}var dt=Math.min(.05,(n-tl)/1000);tl=n;var t=(n-t0)/1000;
  if(calmo){dv.x=dv.tx;dv.y=dv.ty;dv.vx=0;dv.vy=0}else{var ax=(dv.tx-dv.x)*2.4-dv.vx*2.6,ay=(dv.ty-dv.y)*2.4-dv.vy*2.6;dv.vx+=ax*dt;dv.vy+=ay*dt;var sp=Math.hypot(dv.vx,dv.vy),mx=260;if(sp>mx){dv.vx*=mx/sp;dv.vy*=mx/sp}dv.x+=dv.vx*dt;dv.y+=dv.vy*dt}
  if(dv.vx>14)dv.dir=1;else if(dv.vx<-14)dv.dir=-1;else if(Math.abs(dv.tx-dv.x)>40)dv.dir=dv.tx>dv.x?1:-1;
  if(aberto&&Math.hypot(dv.vx,dv.vy)<60)dv.dir=aberto.x>dv.x?1:-1;var inc=Math.max(-.35,Math.min(.35,dv.vy/Math.max(80,Math.abs(dv.vx)+80)*.8));dv.inc+=(inc-dv.inc)*Math.min(1,dt*3);
  var ca=camAlvo();cam=calmo?ca:cam+(ca-cam)*Math.min(1,dt*2.2);
  var bob=calmo?0:Math.sin(t*1.3)*4;
  mundo.style.transform='translate3d('+(-cam)+'px,'+(-camY)+'px,0)';obj.style.transform=mundo.style.transform;
  var dW=dv.w*k,dH=dW*.3067;mg.style.transform='translate3d('+(dv.x*k-dW/2)+'px,'+(dv.y*k-dH/2+bob)+'px,0) rotate('+(dv.inc*57.3*dv.dir)+'deg) scaleX('+dv.dir+')';
  var L=lamp();lampada.style.transform='translate3d('+(L.x*k)+'px,'+(L.y*k+bob)+'px,0)';
  var np=null,nd=1e9;baus.concat(naus).forEach(function(o){var d=Math.hypot(o.x-dv.x,(o.y-60)-dv.y);var lit=cone(L,o.x,o.y-30);o.el.style.setProperty('--luz',Math.min(1,lit*1.6).toFixed(2));if(d<nd){nd=d;np=o}});
  naus.forEach(function(o){if(!o.hw||(fr%30===0))o.hw=o.nm.offsetWidth*.56+16;var hw=o.hw,X=o.nx*k-cam,c=Math.max(hw,Math.min(W-hw,X));o.nm.style.left=(c+cam)+'px'});var pt=nd<230?np:null;if(pt!==perto){if(perto)perto.el.classList.remove('perto'),perto.nm&&perto.nm.classList.remove('perto');perto=pt;if(perto)perto.el.classList.add('perto'),perto.nm&&perto.nm.classList.add('perto')}
  if(dv.alvo&&Math.hypot(dv.tx-dv.x,dv.ty-dv.y)<46){var o=dv.alvo;dv.alvo=null;mostra(o)}
  if(desenhaGL)desenhaGL(t,L);
  vida(t,dt,L,bob)}
 function vida(t,dt,L,bob){fx.setTransform(1,0,0,1,0,0);fx.clearRect(0,0,fc.width,fc.height);if(calmo)return;var s=dpr;fx.setTransform(s,0,0,s,0,0);
  var agora=performance.now();sustos=sustos.filter(function(q){return agora-q.t<1500});
  neve.forEach(function(q){q.y+=dt*(4+q.z*5);q.x+=Math.sin(t*.5+q.f)*dt*3;if(q.y>IH)q.y=0;var sx=q.x*k-cam*q.z,sy=q.y*k-camY;sx=((sx%(IW*k))+IW*k)%(IW*k);if(sx>W+4)return;var l=cone(L,q.x+(cam-cam*q.z)/k,q.y);fx.fillStyle='rgba('+(190+60*l|0)+','+(215+30*l|0)+',230,'+Math.min(.85,.16+l*1.4).toFixed(3)+')';fx.beginPath();fx.arc(sx,sy,q.r*(1+l),0,6.283);fx.fill()});
  var G={};peixes.forEach(function(f){(G[f.g]=G[f.g]||[]).push(f)});
  peixes.forEach(function(f){var gr=G[f.g],cx=0,cy=0,ax=0,ay=0,sx=0,sy=0;gr.forEach(function(o){cx+=o.x;cy+=o.y;ax+=o.vx;ay+=o.vy;if(o!==f){var d=Math.hypot(o.x-f.x,o.y-f.y);if(d<f.s*2.4){sx+=(f.x-o.x)/(d||1);sy+=(f.y-o.y)/(d||1)}}});var n=gr.length;cx/=n;cy/=n;ax/=n;ay/=n;
   var fxv=(cx-f.x)*.25+(ax-f.vx)*.5+sx*14+Math.sin(t*.3+f.g*2)*8,fyv=(cy-f.y)*.25+(ay-f.vy)*.5+sy*14+Math.cos(t*.23+f.g)*4;
   var dd=Math.hypot(f.x-dv.x,f.y-dv.y);if(dd<150){fxv+=(f.x-dv.x)/dd*260*(1-dd/150);fyv+=(f.y-dv.y)/dd*260*(1-dd/150)}
   sustos.forEach(function(q){var d=Math.hypot(f.x-q.x,f.y-q.y);if(d<170){var a=(1-(agora-q.t)/1500)*(1-d/170)*520;fxv+=(f.x-q.x)/(d||1)*a;fyv+=(f.y-q.y)/(d||1)*a}});
   if(f.x<60)fxv+=60;if(f.x>IW-60)fxv-=60;if(f.y<110)fyv+=50;if(f.y>560)fyv-=60;
   f.vx+=fxv*dt;f.vy+=fyv*dt;var sp=Math.hypot(f.vx,f.vy),mx=f.g>1?34:70;if(sp>mx){f.vx*=mx/sp;f.vy*=mx/sp}if(sp<8){f.vx+=(f.vx>=0?1:-1)*4}
   f.x+=f.vx*dt;f.y+=f.vy*dt;f.f+=dt*(4+sp*.12);
   var X=f.x*k-cam,Y=f.y*k-camY;if(X<-40||X>W+40)return;var a=Math.atan2(f.vy,f.vx),S=f.s*k*.9,l=Math.min(1,cone(L,f.x,f.y)*1.8);
   fx.save();fx.translate(X,Y);fx.rotate(a);var w=Math.sin(f.f)*.35;
   var big=f.g>1,r=((big?52:118)+(big?60:120)*l)|0,g=((big?64:138)+(big?50:90)*l)|0,b=((big?72:150)+(big?30:40)*l)|0,al=big?.7:.78;
   fx.fillStyle='rgba('+r+','+g+','+b+','+al+')';fx.beginPath();fx.ellipse(0,0,S,S*.3,0,0,6.283);fx.fill();
   fx.beginPath();fx.moveTo(-S*.85,0);fx.lineTo(-S*1.45,-S*.32+w*S*.3);fx.lineTo(-S*1.45,S*.32+w*S*.3);fx.closePath();fx.fill();
   fx.fillStyle='rgba(235,242,246,'+(.12+l*.5).toFixed(2)+')';fx.beginPath();fx.ellipse(S*.1,-S*.08,S*.6,S*.07,0,0,6.283);fx.fill();fx.restore()});
  var bc=bolhas.length<40&&Math.random()<dt*3.2;if(bc){var mx2=dv.x+dv.dir*dv.w*.36,my2=dv.y-dv.w*.3067*.06;for(var z=0;z<2+(Math.random()*3|0);z++)bolhas.push({x:mx2+Math.random()*6,y:my2,r:1.2+Math.random()*2.4,v:40+Math.random()*30,f:Math.random()*6})}
  bolhas=bolhas.filter(function(q){q.y-=q.v*dt;q.v+=dt*12;q.x+=Math.sin(t*6+q.f)*dt*14;q.r+=dt*.4;return q.y>-10});
  fx.lineWidth=1;bolhas.forEach(function(q){var X=q.x*k-cam,Y=q.y*k-camY+(q.y>dv.y-30?bob:0),R=q.r*k*.8;fx.strokeStyle='rgba(220,238,248,.55)';fx.beginPath();fx.arc(X,Y,R,0,6.283);fx.stroke();fx.fillStyle='rgba(255,255,255,.5)';fx.beginPath();fx.arc(X-R*.35,Y-R*.35,R*.28,0,6.283);fx.fill()})}
 carrega(im('oceano.webp')).then(function(img){if(!vivo)return;if(calmo)return;try{gl=gc.getContext('webgl',{antialias:false,alpha:true,premultipliedAlpha:false,powerPreference:'low-power'})}catch(e){gl=null}if(gl&&!sombra(img)){gl=null}if(gl)el.classList.add('mr-gl-ok')});
 function sombra(img){
  var vs='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var fs=['#ifdef GL_FRAGMENT_PRECISION_HIGH','precision highp float;','#else','precision mediump float;','#endif',
  'uniform sampler2D S;uniform float T;uniform vec2 R;uniform vec4 O;uniform vec4 L;',
  'float cau(vec2 p,float t){vec2 i=p;float c=1.;for(int n=0;n<4;n++){float tt=t*(1.-(3.5/float(n+1)));i=p+vec2(cos(tt-i.x)+sin(tt+i.y),sin(tt-i.y)+cos(tt+i.x));c+=1./length(vec2(p.x/(sin(i.x+tt)/.005),p.y/(cos(i.y+tt)/.005)));}c/=4.;c=clamp(1.17-pow(c,1.4),0.,1.);return pow(c,8.);}',
  'void main(){vec2 q=vec2(gl_FragCoord.x,R.y-gl_FragCoord.y);vec2 iu=(q+O.xy)/O.zw;',
  'iu+=vec2(sin(iu.y*38.+T*1.1),cos(iu.x*29.+T*.9))*.0011;',
  'vec3 col=texture2D(S,iu).rgb;',
  'float sea=smoothstep(.62,.9,iu.y);float c=cau(iu*vec2(9.,5.)*6.2831,T*.35);col+=col*vec3(.75,.95,1.)*c*.55*sea;',
  'vec2 d=iu-vec2(.52,-.15);float an=atan(d.x,d.y);float ry=.5+.5*sin(an*31.+T*.35)*sin(an*17.-T*.23);ry=pow(ry,4.)*(1.-smoothstep(.05,.85,iu.y));col+=vec3(.42,.62,.72)*ry*.16;',
  'vec2 lv=q-L.xy;float ds=length(lv);float ca=dot(lv/max(ds,.001),L.zw);float cn=smoothstep(.8,.97,ca)*exp(-ds/(R.y*.42));float hl=exp(-ds/(R.y*.03));',
  'col+=col*vec3(1.5,1.15,.8)*cn*2.6+vec3(1.,.82,.58)*(hl*.55+cn*.045);',
  'float vg=1.-smoothstep(.45,1.15,length((q/R-.5)*vec2(1.1,1.)));col*=.62+.38*vg;gl_FragColor=vec4(col,1.);}'].join('\n');
  function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return gl.getShaderParameter(o,gl.COMPILE_STATUS)?o:null}
  var a=sh(gl.VERTEX_SHADER,vs),b=sh(gl.FRAGMENT_SHADER,fs);if(!a||!b)return false;
  var pr=gl.createProgram();gl.attachShader(pr,a);gl.attachShader(pr,b);gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return false;gl.useProgram(pr);
  var bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);var la=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(la);gl.vertexAttribPointer(la,2,gl.FLOAT,false,0,0);
  var tx=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tx);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.uniform1i(gl.getUniformLocation(pr,'S'),0);
  var uT=gl.getUniformLocation(pr,'T'),uR=gl.getUniformLocation(pr,'R'),uO=gl.getUniformLocation(pr,'O'),uL=gl.getUniformLocation(pr,'L');
  gl.viewport(0,0,gc.width,gc.height);
  desenhaGL=function(t,L){var s=gc.width/W;gl.uniform1f(uT,t);gl.uniform2f(uR,gc.width,gc.height);gl.uniform4f(uO,cam*s,camY*s,IW*k*s,IH*k*s);gl.uniform4f(uL,(L.x*k-cam)*s,(L.y*k-camY)*s,L.dx,L.dy);gl.drawArrays(gl.TRIANGLE_STRIP,0,4)};
  return true}
 raf=requestAnimationFrame(passo);
 return p;
}
