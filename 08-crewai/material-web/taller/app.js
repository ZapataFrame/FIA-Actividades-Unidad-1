/* === Taller CrewAI — Navegación y lógica === */
const iconArrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const iconCopy='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

/* Portada (slide 0) */
const slides=[{
  title:'Tu primer equipo de agentes de IA',
  chapter:'Inicio',
  render:()=>'<div class="hero">'
    +'<h1>Taller CrewAI<span class="accent">.</span></h1>'
    +'<p class="hero-sub">Construye tu primer <span class="accent">equipo de agentes</span> de IA con modelos locales.</p>'
    +'<p class="lead">Guía paso a paso con CrewAI, Ollama y Serper.</p>'
    +'<button class="start-btn" data-next>Comenzar '+iconArrow+'</button>'
    +'<p class="hero-meta">Taller práctico · ~1 hora · Septiembre 2026</p>'
    +'</div>'
}];

slides.push(...makeSlides());

let current=0;let indexOpen=false;
const stage=document.getElementById('stage');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');

function navigate(n,updateHash){
  if(updateHash===undefined)updateHash=true;
  current=Math.min(Math.max(Number.isFinite(n)?Math.trunc(n):0,0),slides.length-1);
  var s=slides[current];
  stage.innerHTML='<section class="slide" aria-label="'+(current+1)+'. '+s.title+'">'+s.render()+'</section>';
  stage.scrollTop=0;
  document.getElementById('counter').textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
  document.getElementById('progress').style.width=((current+1)/slides.length*100)+'%';
  document.getElementById('chapter').textContent=s.chapter;
  prevBtn.disabled=current===0;
  nextBtn.disabled=current===slides.length-1;
  document.title=(current+1)+'. '+s.title+' — Taller CrewAI';
  document.getElementById('announcement').textContent='Diapositiva '+(current+1)+' de '+slides.length+': '+s.title;
  if(updateHash)history.replaceState(null,'','#'+(current+1));
  renderIndex();
}

function renderIndex(){
  var html='';
  for(var i=0;i<slides.length;i++){
    html+='<button class="index-item" data-slide="'+i+'"'+(i===current?' aria-current="page"':'')+'><span>'+String(i+1).padStart(2,'0')+'</span>'+slides[i].title+'</button>';
  }
  document.getElementById('index-items').innerHTML=html;
}

function toggleIndex(force){
  indexOpen=force!==undefined?force:!indexOpen;
  document.getElementById('slide-index').hidden=!indexOpen;
  document.getElementById('index-toggle').setAttribute('aria-expanded',String(indexOpen));
  stage.inert=indexOpen;
  if(indexOpen)document.getElementById('close-index').focus();
  else document.getElementById('index-toggle').focus();
}

function toast(msg){
  var el=document.getElementById('toast');
  el.textContent=msg;el.hidden=false;
  clearTimeout(toast.t);toast.t=setTimeout(function(){el.hidden=true},4000);
}

function toggleFullscreen(){
  try{
    if(document.fullscreenElement)document.exitFullscreen();
    else if(document.documentElement.requestFullscreen)document.documentElement.requestFullscreen();
    else toast('Usa F11 para pantalla completa.');
  }catch(e){toast('No se pudo activar pantalla completa.');}
}

/* Copy code to clipboard */
function copyCode(btn){
  var code=btn.closest('.code-block').querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(function(){
    btn.classList.add('copied');
    btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7" stroke-width="2"/></svg>';
    setTimeout(function(){
      btn.classList.remove('copied');
      btn.innerHTML=iconCopy;
    },2000);
  }).catch(function(){toast('No se pudo copiar. Selecciona el texto manualmente.');});
}

/* Event listeners */
prevBtn.addEventListener('click',function(){navigate(current-1)});
nextBtn.addEventListener('click',function(){navigate(current+1)});
document.getElementById('index-toggle').addEventListener('click',function(){toggleIndex()});
document.getElementById('close-index').addEventListener('click',function(){toggleIndex(false)});
document.getElementById('fullscreen').addEventListener('click',toggleFullscreen);

document.addEventListener('click',function(e){
  var b=e.target.closest('[data-next],[data-slide]');
  if(b){
    if(b.hasAttribute('data-next'))navigate(current+1);
    else{navigate(Number(b.dataset.slide));toggleIndex(false);}
    return;
  }
  var copyBtn=e.target.closest('.copy-btn');
  if(copyBtn){copyCode(copyBtn);return;}
  /* Tabs */
  var tabBtn=e.target.closest('.tab-btn');
  if(tabBtn){
    var group=tabBtn.closest('.tab-group');
    var btns=group.querySelectorAll('.tab-btn');
    var panels=group.querySelectorAll('.tab-panel');
    for(var i=0;i<btns.length;i++)btns[i].classList.remove('active');
    for(var j=0;j<panels.length;j++)panels[j].classList.remove('active');
    tabBtn.classList.add('active');
    document.getElementById(tabBtn.dataset.tab).classList.add('active');
  }
});

document.addEventListener('keydown',function(e){
  if(e.altKey||e.ctrlKey||e.metaKey||e.target.matches('input,textarea,select'))return;
  if(e.key==='Escape'&&indexOpen){toggleIndex(false);return}
  if(e.key.toLowerCase()==='i'){e.preventDefault();toggleIndex();return}
  if(e.key.toLowerCase()==='f'){e.preventDefault();toggleFullscreen();return}
  if(indexOpen)return;
  if(e.target.closest('button,a')&&[' ','Enter'].indexOf(e.key)!==-1)return;
  if(['ArrowRight','ArrowDown','PageDown',' '].indexOf(e.key)!==-1){e.preventDefault();navigate(current+1)}
  if(['ArrowLeft','ArrowUp','PageUp'].indexOf(e.key)!==-1){e.preventDefault();navigate(current-1)}
  if(e.key==='Home'){e.preventDefault();navigate(0)}
  if(e.key==='End'){e.preventDefault();navigate(slides.length-1)}
});

window.addEventListener('hashchange',function(){navigate((Number(location.hash.slice(1))||1)-1,false)});
document.addEventListener('fullscreenchange',function(){
  document.getElementById('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Salir de pantalla completa':'Pantalla completa');
});

var touchStart=null;
stage.addEventListener('touchstart',function(e){touchStart=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});
stage.addEventListener('touchend',function(e){
  if(!touchStart||e.target.closest('button,a,pre,details'))return;
  var dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;
  if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.6)navigate(current+(dx<0?1:-1));
  touchStart=null;
},{passive:true});

navigate((Number(location.hash.slice(1))||1)-1);
