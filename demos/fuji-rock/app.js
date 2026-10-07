// A query override makes the reduced-motion branch reviewable without changing browser settings.
const motionOverride=new URLSearchParams(location.search).get('motion')==='reduce';
if(motionOverride)document.documentElement.dataset.motion='reduce';
function motionReduced(){return motionOverride||matchMedia('(prefers-reduced-motion: reduce)').matches;}
const base=['wtdrdF0xM8yaZQoCtKBNOnud4e7Zf5LgOWNPfXVJ','4AS4QwyCS1efKr65S46uaPdnyKlI2c2PJ46xsn4s','aTIiCxTF0FbTasM3Dpxb7B9pdYwG5HI5l4x2tLfj'];let photo=0,photoPaused=motionReduced(),photoVisible=true,photoTimer=null;const heroPicture=document.querySelector('.photo-hero picture'),photoPause=document.querySelector('#photo-pause');function show(n){const next=(n+3)%3;if(next!==photo&&!motionReduced()){const old=heroPicture.cloneNode(true);old.removeAttribute('id');old.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));old.className='photo-outgoing';old.setAttribute('aria-hidden','true');heroPicture.after(old);old.animate([{opacity:1},{opacity:0}],{duration:800,easing:'cubic-bezier(.25,1,.5,1)'}).onfinish=()=>old.remove();}photo=next;document.querySelector('#hero-mobile').srcset='assets/'+base[photo]+'sp.jpg';document.querySelector('#hero-image').src='assets/'+base[photo]+'pc.jpg';document.querySelector('#hero-image').alt='FUJI ROCK 2026 現地写真 '+(photo+1);document.querySelectorAll('[data-photo]').forEach(x=>x.setAttribute('aria-pressed',Number(x.dataset.photo)===photo));document.querySelector('#photo-status').textContent=(photo+1)+' / 3';heroPicture.dataset.photo=String(photo+1);}function autoplay(){clearInterval(photoTimer);if(!photoPaused&&photoVisible&&!document.hidden&&!motionReduced())photoTimer=setInterval(()=>show(photo+1),3600);photoPause.disabled=motionReduced();photoPause.textContent=photoPaused?'▶':'Ⅱ';photoPause.setAttribute('aria-pressed',String(photoPaused));photoPause.setAttribute('aria-label',photoPaused?'写真の自動切替を再開':'写真の自動切替を停止');}function manual(n){show(n);photoPaused=true;autoplay();}photoPause.onclick=()=>{photoPaused=!photoPaused;autoplay();};document.querySelector('#photo-prev').onclick=()=>manual(photo-1);document.querySelector('#photo-next').onclick=()=>manual(photo+1);document.querySelectorAll('[data-photo]').forEach(x=>x.onclick=()=>manual(Number(x.dataset.photo)));document.querySelector('.photo-hero').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();manual(photo+(e.key==='ArrowRight'?1:-1));}});new IntersectionObserver(es=>{photoVisible=es[0].isIntersecting;autoplay();},{threshold:.15}).observe(document.querySelector('.photo-hero'));document.addEventListener('visibilitychange',autoplay);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{if(motionReduced())photoPaused=true;autoplay();});autoplay();
const loader=document.querySelector('#loader');
loader.hidden=false; document.body.classList.add('is-loading');
function loaded(){
  document.body.classList.remove('is-loading');
  document.body.classList.add('is-loaded');
  if(motionReduced()){loader.hidden=true;return;}
  loader.animate([{opacity:1},{opacity:0}],{duration:1200,easing:'linear'}).onfinish=()=>loader.hidden=true;
}
if(window.CaseLoading)window.CaseLoading.ready.then(loaded);else if(document.readyState==='complete')loaded();else addEventListener('load',loaded,{once:true});
const menu=document.querySelector('#mega-menu'),toggle=document.querySelector('#menu-toggle');
const menuPanel=document.createElement('div');menuPanel.className='menu-panel';
while(menu.firstChild)menuPanel.append(menu.firstChild);menu.append(menuPanel);
let menuToken=0,menuAnimation=null;
function setMenu(open){
  const token=++menuToken;
  const current=menuAnimation?{opacity:getComputedStyle(menuPanel).opacity,transform:getComputedStyle(menuPanel).transform}:null;
  menuAnimation?.cancel();
  toggle.setAttribute('aria-expanded',String(open));
  toggle.querySelector('span').textContent=open?'CLOSE':'MENU';
  document.body.classList.toggle('menu-open',open);
  document.querySelector('main').inert=open;document.querySelector('footer').inert=open;
  if(open)menu.hidden=false;
  if(motionReduced()){menu.hidden=!open;return;}
  const a={opacity:0,transform:innerWidth<=768?'scale(.88) rotate3d(0,-.5,0,1rad)':'scale(.88) rotate3d(.5,0,0,1rad)'},b={opacity:1,transform:'scale(1) rotate3d(0,0,0,0)'};
  menuAnimation=menuPanel.animate([current||(open?a:b),open?b:a],{duration:400,easing:'ease',fill:'both'});
  menuAnimation.onfinish=()=>{if(token===menuToken&&!open)menu.hidden=true;};
}
toggle.onclick=()=>setMenu(toggle.getAttribute('aria-expanded')!=='true');
document.querySelector('#menu-close').onclick=()=>{setMenu(false);toggle.focus();};
menu.querySelectorAll('a').forEach(x=>x.addEventListener('click',()=>setMenu(false)));
const languages=document.querySelector('#languages'),languageToggle=document.querySelector('#language-toggle');
let langAnimation=null,langOpen=false;
function setLanguages(open){
  langOpen=open;langAnimation?.cancel();languageToggle.setAttribute('aria-expanded',String(open));
  if(open)languages.hidden=false;
  if(motionReduced()){languages.hidden=!open;return;}
  const height=languages.scrollHeight;
  langAnimation=languages.animate(open?[{height:'0px',opacity:0},{height:height+'px',opacity:1}]:[{height:height+'px',opacity:1},{height:'0px',opacity:0}],{duration:400,easing:open?'cubic-bezier(.87,0,.13,1)':'cubic-bezier(.16,1,.3,1)'});
  langAnimation.onfinish=()=>{if(!langOpen)languages.hidden=true;};
}
languageToggle.onclick=()=>setLanguages(!langOpen);
languages.addEventListener('pointerleave',()=>setLanguages(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!menu.hidden){setMenu(false);toggle.focus();}if(langOpen){setLanguages(false);languageToggle.focus();}}});
let touchStart=null;
addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('.featured,.photo-controls,input,select,textarea')){touchStart=null;return;}touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>=70&&Math.abs(dx)>Math.abs(dy)*1.2)setMenu(toggle.getAttribute('aria-expanded')!=='true');},{passive:true});
const pickup=document.querySelector('.pickup'),marker=document.createElement('div');marker.className='pickup-marker';pickup.before(marker);
let lastY=scrollY;
function pickupScroll(){
  const fixed=scrollY>=marker.offsetTop;
  marker.style.height=fixed?pickup.offsetHeight+'px':'0px';
  pickup.classList.toggle('is-fixed',fixed);
  pickup.classList.toggle('is-show',fixed&&scrollY>=marker.offsetTop+60&&scrollY<lastY);
  lastY=scrollY;
}
addEventListener('scroll',pickupScroll,{passive:true});addEventListener('resize',pickupScroll);pickupScroll();
const viewport=document.querySelector('.featured-window'),track=document.querySelector('#featured-track'),features=[...track.children],count=features.length;
let feature=0,featureSlot=count,featurePaused=motionReduced(),featureVisible=false,featureTimer=null,featureBusy=false;
const featurePause=document.querySelector('#feature-pause');
function cloneFeature(node){const clone=node.cloneNode(true);clone.inert=true;clone.setAttribute('aria-hidden','true');clone.removeAttribute('id');clone.tabIndex=-1;return clone;}
features.forEach(x=>track.prepend(cloneFeature(features[count-1-features.indexOf(x)])));
features.forEach(x=>track.append(cloneFeature(x)));
function positionFeature(animate){
  const item=track.children[featureSlot];
  const x=viewport.clientWidth/2-item.offsetLeft-item.offsetWidth/2;
  track.style.transition=animate&&!motionReduced()?'transform 600ms cubic-bezier(.25,1,.5,1)':'none';
  track.style.transform='translateX('+x+'px)';
  viewport.dataset.feature=String(feature+1);document.querySelector('#feature-status').textContent='特集 '+(feature+1)+' / '+count;
}
function featureMove(delta){
  if(featureBusy)return;feature=(feature+delta+count)%count;featureSlot+=delta;featureBusy=!motionReduced();positionFeature(true);
  if(!featureBusy){featureSlot=count+feature;positionFeature(false);}
}
track.addEventListener('transitionend',e=>{if(e.propertyName!=='transform')return;featureBusy=false;if(featureSlot<count||featureSlot>=2*count){featureSlot=count+feature;positionFeature(false);}});
function featureAutoplay(){clearInterval(featureTimer);if(!featurePaused&&featureVisible&&!document.hidden&&!motionReduced())featureTimer=setInterval(()=>featureMove(1),3600);featurePause.disabled=motionReduced();featurePause.setAttribute('aria-pressed',String(featurePaused));featurePause.setAttribute('aria-label',featurePaused?'特集の自動切替を再開':'特集の自動切替を停止');featurePause.textContent=featurePaused?'▶':'Ⅱ';}
featurePause.onclick=()=>{featurePaused=!featurePaused;featureAutoplay();};
document.querySelector('#feature-prev').onclick=()=>featureMove(-1);document.querySelector('#feature-next').onclick=()=>featureMove(1);
viewport.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();featureMove(e.key==='ArrowRight'?1:-1);}});
let swipeStart=null;viewport.addEventListener('touchstart',e=>swipeStart={x:e.touches[0].clientX,y:e.touches[0].clientY},{passive:true});
viewport.addEventListener('touchend',e=>{if(!swipeStart)return;const dx=e.changedTouches[0].clientX-swipeStart.x,dy=e.changedTouches[0].clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.2)featureMove(dx<0?1:-1);},{passive:true});
new IntersectionObserver(es=>{featureVisible=es[0].isIntersecting;featureAutoplay();},{threshold:.15}).observe(viewport);
document.addEventListener('visibilitychange',featureAutoplay);
addEventListener('resize',()=>{featureBusy=false;featureSlot=count+feature;positionFeature(false);});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{if(motionReduced()){featurePaused=true;featureBusy=false;featureSlot=count+feature;positionFeature(false);}featureAutoplay();});
positionFeature(false);featureAutoplay();
