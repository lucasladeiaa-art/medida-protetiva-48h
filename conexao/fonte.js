(function(){
var V=[["Isto é uma ordem: sê firme e corajoso. Não te atemorizes, não tenhas medo, porque o Senhor está contigo em qualquer parte para onde fores.","Js 1,9","josue/1/"],["O Senhor é meu pastor, nada me faltará.","Sl 22,1","salmos/22/"],["Ainda que eu atravesse o vale escuro, nada temerei, pois estais comigo. Vosso bordão e vosso báculo são o meu amparo.","Sl 22,4","salmos/22/"],["O Senhor é minha luz e minha salvação, a quem temerei? O Senhor é o protetor de minha vida, de quem terei medo?","Sl 26,1","salmos/26/"],["Espera no Senhor e sê forte! Fortifique-se o teu coração e espera no Senhor!","Sl 26,14","salmos/26/"],["Deus é nosso refúgio e nossa força; mostrou-se nosso amparo nas tribulações.","Sl 45,2","salmos/45/"],["O meu socorro virá do Senhor, criador do céu e da terra.","Sl 120,2","salmos/120/"],["O Senhor está perto dos contritos de coração, e salva os que têm o espírito abatido.","Sl 33,19","salmos/33/"],["Porque a sua indignação dura apenas um momento, enquanto sua benevolência é para toda a vida. Pela tarde, vem o pranto, mas, de manhã, volta a alegria.","Sl 29,6","salmos/29/"],["Depõe no Senhor os teus cuidados, porque ele será teu sustentáculo; não permitirá jamais que vacile o justo.","Sl 54,23","salmos/54/"],["O Senhor faz justiça, dá o direito aos oprimidos.","Sl 102,6","salmos/102/"],["Esperei no Senhor com toda a confiança. Ele se inclinou para mim, ouviu meus brados.","Sl 39,2","salmos/39/"],["Nada temas, porque estou contigo, não lances olhares desesperados, pois eu sou teu Deus; eu te fortaleço e venho em teu socorro, eu te amparo com minha destra vitoriosa.","Is 41,10","isaias/41/"],["Se tiveres de atravessar a água, estarei contigo. E os rios não te submergirão; se caminhares pelo fogo, não te queimarás, e a chama não te consumirá.","Is 43,2","isaias/43/"],["Cessai de fazer o mal, aprendei a fazer o bem. Respeitai o direito, protegei o oprimido; fazei justiça ao órfão, defendei a viúva.","Is 1,17","isaias/1/"],["Bem conheço os desígnios que mantenho para convosco – oráculo do Senhor –, desígnios de prosperidade e não de calamidade, de vos garantir um futuro e uma esperança.","Jr 29,11","jeremias/29/"],["É graças ao Senhor que não fomos aniquilados, porque não se esgotou sua piedade.","Lm 3,22","lamentacoes/3/"],["Já te foi dito, ó homem, o que convém, o que o Senhor reclama de ti: que pratiques a justiça, que ames a bondade, e que andes com humildade diante do teu Deus.","Mq 6,8","miqueias/6/"],["Bem-aventurados os que têm fome e sede de justiça, porque serão saciados!","Mt 5,6","sao-mateus/5/"],["Vinde a mim, vós todos que estais aflitos sob o fardo, e eu vos aliviarei.","Mt 11,28","sao-mateus/11/"],["Deixo-vos a paz, dou-vos a minha paz. Não vo-la dou como o mundo a dá. Não se perturbe o vosso coração, nem se atemorize!","Jo 14,27","sao-joao/14/"],["Referi-vos essas coisas para que tenhais a paz em mim. No mundo haveis de ter aflições. Coragem! Eu venci o mundo.","Jo 16,33","sao-joao/16/"],["Que diremos depois disso? Se Deus é por nós, quem será contra nós?","Rm 8,31","romanos/8/"],["Não te deixes vencer pelo mal, mas triunfa do mal com o bem.","Rm 12,21","romanos/12/"],["Tudo posso naquele que me conforta.","Fl 4,13","filipenses/4/"],["Pois Deus não nos deu um espírito de timidez, mas de fortaleza, de amor e de sabedoria.","2Tm 1,7","ii-timoteo/1/"],["Coragem! E sede fortes. Nada vos atemorize, e não os temais, porque é o Senhor, vosso Deus, que marcha à vossa frente: ele não vos deixará nem vos abandonará.","Dt 31,6","deuteronomio/31/"],["Mas as almas dos justos estão na mão de Deus, e nenhum tormento os tocará.","Sb 3,1","sabedoria/3/"],["Em tudo somos oprimidos, mas não sucumbimos. Vivemos em completa penúria, mas não desesperamos.","2Cor 4,8","ii-corintios/4/"],["Bem-aventurados os pacíficos, porque serão chamados filhos de Deus!","Mt 5,9","sao-mateus/5/"],["Confiai-lhe todas as vossas preocupações, porque ele tem cuidado de vós.","1Pd 5,7","i-sao-pedro/5/"],["Não temerá notícias funestas, porque seu coração está firme e confiante no Senhor.","Sl 111,7","salmos/111/"],["Como a luz, fará brilhar a tua justiça; e como o sol do meio-dia, o teu direito.","Sl 36,6","salmos/36/"]];
var f=document.getElementById("fonte-vida");
if(!f)return;
var b=f.querySelector(".fv-agua"),
    c=f.querySelector(".fv-cena"),
    verso=f.querySelector(".fv-verso"),
    tEl=f.querySelector(".fv-verso blockquote p"),
    rEl=f.querySelector(".fv-ref a"),
    ord=[],k=0,i;
for(i=0;i<V.length;i++)ord.push(i);
for(i=ord.length-1;i>0;i--){
  var j=Math.floor(Math.random()*(i+1)),x=ord[i];
  ord[i]=ord[j];ord[j]=x;
}

var canvas=document.createElement("canvas");
canvas.className="fv-mar";
canvas.setAttribute("aria-hidden","true");
c.insertBefore(canvas,b);
var ctx=canvas.getContext("2d",{alpha:true});
var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var dpr=1,W=1,H=1,raf=0,visible=true,t0=performance.now();
var ripples=[],parts=[],drops=[];

function resize(){
  var rec=c.getBoundingClientRect();
  dpr=Math.min(1.6, window.devicePixelRatio||1);
  W=Math.max(2,Math.round(rec.width*dpr));
  H=Math.max(2,Math.round(rec.height*dpr));
  if(canvas.width!==W||canvas.height!==H){
    canvas.width=W;canvas.height=H;
  }
  canvas.style.width=rec.width+"px";
  canvas.style.height=rec.height+"px";
}

function basin(){return {cx:W*0.515,cy:H*0.585,rx:W*0.255,ry:H*0.165};}
function spout(){return {x:W*0.476,y:H*0.228,tx:W*0.505,ty:H*0.505};}

function seedJet(){
  var s=spout();
  if(drops.length>28)return;
  drops.push({
    p:Math.random()*0.12,
    spd:0.55+Math.random()*0.35,
    wob:(Math.random()-0.5)*0.012,
    r:(0.6+Math.random()*1.1)*dpr,
    a:0.35+Math.random()*0.5
  });
}

function spawnRipple(x,y,amp){
  ripples.push({x:x,y:y,born:performance.now(),amp:amp||1});
  var n=reduce?0:16+Math.floor(Math.random()*8);
  for(var i=0;i<n;i++){
    var ang=-Math.PI/2+(Math.random()-0.5)*1.2;
    var sp=0.08+Math.random()*0.22;
    parts.push({
      x:x,y:y,
      vx:Math.cos(ang)*sp*dpr,
      vy:Math.sin(ang)*sp*dpr*1.4,
      life:1,
      dec:0.007+Math.random()*0.01,
      r:(1+Math.random()*2.2)*dpr,
      gold:Math.random()
    });
  }
}

function draw(now){
  raf=0;
  if(!visible)return;
  resize();
  var t=(now-t0)/1000;
  ctx.clearRect(0,0,W,H);
  var ba=basin(),s=spout();

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(ba.cx,ba.cy,ba.rx,ba.ry,0,0,Math.PI*2);
  ctx.clip();

  /* caustics / living surface */
  var g=ctx.createRadialGradient(ba.cx,ba.cy-ba.ry*0.2,ba.rx*0.1,ba.cx,ba.cy,ba.rx);
  g.addColorStop(0,"rgba(200,220,255,0.05)");
  g.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=g;
  ctx.fillRect(ba.cx-ba.rx,ba.cy-ba.ry,ba.rx*2,ba.ry*2);

  ctx.globalCompositeOperation="lighter";
  for(i=0;i<5;i++){
    var ph=t*0.45+i*1.17;
    var yy=ba.cy+Math.sin(ph)*ba.ry*0.38;
    var xx=ba.cx+Math.cos(ph*0.7)*ba.rx*0.08;
    ctx.beginPath();
    ctx.ellipse(xx,yy,ba.rx*(0.48-i*0.06),ba.ry*(0.10+0.02*Math.sin(ph+i)),0,0,Math.PI*2);
    ctx.strokeStyle="rgba(210,230,255,"+(0.028+0.022*Math.sin(ph))+")";
    ctx.lineWidth=0.9*dpr;
    ctx.stroke();
  }

  /* moon reflection shimmer */
  var mx=W*0.618+Math.sin(t*0.45)*W*0.006;
  var my=H*0.598+Math.cos(t*0.38)*H*0.005;
  var moon=ctx.createRadialGradient(mx,my,0,mx,my,W*0.055);
  moon.addColorStop(0,"rgba(255,255,245,0.55)");
  moon.addColorStop(0.35,"rgba(210,230,255,0.18)");
  moon.addColorStop(1,"rgba(210,230,255,0)");
  ctx.fillStyle=moon;
  ctx.beginPath();
  ctx.ellipse(mx,my,W*0.038,H*0.022,0,0,Math.PI*2);
  ctx.fill();
  /* lamp warmth in the water, left */
  var lx=W*0.30+Math.sin(t*0.9)*W*0.004;
  var ly=H*0.55;
  var lamp=ctx.createRadialGradient(lx,ly,0,lx,ly,W*0.10);
  lamp.addColorStop(0,"rgba(255,210,130,0.16)");
  lamp.addColorStop(1,"rgba(255,180,80,0)");
  ctx.fillStyle=lamp;
  ctx.beginPath();ctx.arc(lx,ly,W*0.10,0,Math.PI*2);ctx.fill();

  /* real concentric ripples */
  var still=[];
  for(i=0;i<ripples.length;i++){
    var rp=ripples[i];
    var age=(now-rp.born)/1000;
    if(age>2.6)continue;
    still.push(rp);
    var k=age/2.6;
    var rad= (20+age*140)*dpr*rp.amp;
    var alpha=Math.max(0,(1-k)*(0.55*rp.amp));
    ctx.beginPath();
    ctx.ellipse(rp.x,rp.y,rad,rad*0.42,0,0,Math.PI*2);
    ctx.strokeStyle="rgba(255,236,200,"+alpha+")";
    ctx.lineWidth=(1.6-k)*dpr;
    ctx.stroke();
    if(age>0.12){
      ctx.beginPath();
      ctx.ellipse(rp.x,rp.y,rad*0.72,rad*0.30,0,0,Math.PI*2);
      ctx.strokeStyle="rgba(180,210,255,"+alpha*0.55+")";
      ctx.lineWidth=dpr;
      ctx.stroke();
    }
  }
  ripples=still;
  ctx.restore();

  /* falling jet, drawn over the clipped water */
  ctx.globalCompositeOperation="lighter";
  if(!reduce){
    if(Math.random()<0.7)seedJet();
    var live=[];
    for(i=0;i<drops.length;i++){
      var d=drops[i];
      d.p+=d.spd*0.016;
      if(d.p>=1){
        /* splash at impact */
        if(visible){
          var ix=s.x+(s.tx-s.x), iy=s.y+(s.ty-s.y);
          ripples.push({x:ix+d.wob*W,y:iy,born:now,amp:0.22});
        }
        continue;
      }
      var ease=d.p*d.p;
      var dx=s.x+(s.tx-s.x)*d.p+Math.sin(t*6+d.wob*40)*d.wob*W;
      var dy=s.y+(s.ty-s.y)*ease;
      ctx.beginPath();
      ctx.arc(dx,dy,d.r,0,Math.PI*2);
      ctx.fillStyle="rgba(235,245,255,"+(d.a*(1-d.p*0.3))+")";
      ctx.fill();
      /* sparkle */
      if(d.p>0.15&&d.p<0.85&&Math.random()>0.6){
        ctx.beginPath();
        ctx.arc(dx+d.r,dy,d.r*0.5,0,Math.PI*2);
        ctx.fillStyle="rgba(255,255,255,0.45)";
        ctx.fill();
      }
      live.push(d);
    }
    drops=live;
    /* continuous thread of the jet */
    ctx.beginPath();
    ctx.moveTo(s.x,s.y);
    var midX=(s.x+s.tx)/2+Math.sin(t*3)*W*0.004;
    var midY=(s.y+s.ty)/2;
    ctx.quadraticCurveTo(midX,midY,s.tx,s.ty);
    ctx.strokeStyle="rgba(220,235,255,0.28)";
    ctx.lineWidth=1.2*dpr;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s.x,s.y);
    ctx.quadraticCurveTo(midX,midY,s.tx,s.ty);
    ctx.strokeStyle="rgba(255,255,255,0.16)";
    ctx.lineWidth=0.6*dpr;
    ctx.stroke();
  }

  /* rising luminous particles */
  var plive=[];
  for(i=0;i<parts.length;i++){
    var p=parts[i];
    p.x+=p.vx; p.y+=p.vy; p.vy-=0.012*dpr; p.life-=p.dec;
    if(p.life<=0)continue;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);
    ctx.fillStyle=p.gold>0.45
      ? "rgba(255,224,160,"+(0.7*p.life)+")"
      : "rgba(220,235,255,"+(0.7*p.life)+")";
    ctx.fill();
    plive.push(p);
  }
  parts=plive;
  ctx.globalCompositeOperation="source-over";

  if(!reduce && visible) raf=requestAnimationFrame(draw);
}

function play(){
  if(reduce||raf||!visible)return;
  raf=requestAnimationFrame(draw);
}

function onda(e){
  resize();
  var q=c.getBoundingClientRect();
  var x,y;
  if(e&&typeof e.clientX==="number"){
    x=(e.clientX-q.left)*dpr;
    y=(e.clientY-q.top)*dpr;
  }else{
    var s=spout();
    x=s.tx; y=s.ty;
  }
  if(!reduce){
    spawnRipple(x,y,1.25);
    spawnRipple(x,y,0.7);
  }
}

function aplica(v){
  tEl.textContent=v[0];
  rEl.textContent=v[1];
  rEl.href="https://www.bibliacatolica.com.br/biblia-ave-maria/"+v[2];
}
function mostra(e){
  var v=V[ord[k%V.length]];
  k++;
  onda(e);
  if(f.classList.contains("tocou") && !reduce && verso){
    verso.classList.add("is-troca");
    setTimeout(function(){
      aplica(v);
      verso.classList.remove("is-troca");
    }, 260);
  }else{
    aplica(v);
    f.classList.add("tocou");
  }
  b.setAttribute("aria-label","Tocar a água da fonte de novo, para outra passagem");
  play();
}

b.addEventListener("click",mostra);

if(!reduce){
  resize();
  for(i=0;i<12;i++)seedJet();
  if(typeof IntersectionObserver==="function"){
    var io=new IntersectionObserver(function(entries){
      visible=entries[0]&&entries[0].isIntersecting;
      if(visible)play();
    },{threshold:0.12});
    io.observe(c);
  }else{
    visible=true;play();
  }
  window.addEventListener("resize",function(){resize();play();},{passive:true});
}
})();
