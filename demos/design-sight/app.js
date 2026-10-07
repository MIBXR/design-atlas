// A query override makes the reduced-motion branch reviewable without changing browser settings.
const motionOverride=new URLSearchParams(location.search).get('motion')==='reduce';
if(motionOverride)document.documentElement.dataset.motion='reduce';
function motionReduced(){return motionOverride||matchMedia('(prefers-reduced-motion: reduce)').matches;}
const posters=[{image:'slide_hojoki-thumb-1280xauto-8283.jpg',alt:'方丈記に学ぶ — 生きるを編み直す小さな建築',url:'https://www.2121designsight.jp/program/hojoki/'},{image:'A-POC_2121_G3_2026_JAXAproject_KV_W1280H720px_ToGO-thumb-1280xauto-8340.jpg',alt:'TYPE-XVII JAXA project by A-POC ABLE ISSEY MIYAKE',url:'https://www.2121designsight.jp/gallery3/type_xvii/'}];let poster=0,posterPaused=motionReduced(),posterVisible=true,timer=null;const posterImage=document.querySelector('#poster-image'),posterSection=document.querySelector('.poster'),posterPause=document.querySelector('#poster-pause');
function show(n){const next=(n+posters.length)%posters.length;if(next!==poster&&!motionReduced()){const old=posterImage.cloneNode(true);old.removeAttribute('id');old.className='poster-outgoing';old.setAttribute('aria-hidden','true');posterImage.after(old);old.animate([{opacity:1},{opacity:0}],{duration:1000,easing:'ease'}).onfinish=()=>old.remove();}poster=next;const p=posters[poster];posterImage.src='assets/'+p.image;posterImage.alt=p.alt;document.querySelector('#poster-link').href=p.url;document.querySelector('#poster-status').textContent=`${poster+1} / 2 — ${p.alt}`;document.querySelectorAll('[data-poster]').forEach(x=>x.setAttribute('aria-pressed',Number(x.dataset.poster)===poster));posterSection.dataset.poster=String(poster+1);}
function autoplay(){clearInterval(timer);if(!posterPaused&&!document.hidden&&posterVisible&&!motionReduced())timer=setInterval(()=>show(poster+1),6000);posterPause.disabled=motionReduced();posterPause.setAttribute('aria-pressed',String(posterPaused));posterPause.textContent=posterPaused?'▶':'Ⅱ';posterPause.setAttribute('aria-label',posterPaused?'海報の自動切替を再開':'海報の自動切替を停止');}posterPause.onclick=()=>{posterPaused=!posterPaused;autoplay();};function manual(n){show(n);posterPaused=true;autoplay();}document.querySelector('#poster-next').onclick=()=>manual(poster+1);document.querySelector('#poster-prev').onclick=()=>manual(poster-1);document.querySelectorAll('[data-poster]').forEach(x=>x.onclick=()=>manual(Number(x.dataset.poster)));posterSection.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();manual(poster+(e.key==='ArrowRight'?1:-1));}});posterSection.addEventListener('focusin',()=>{clearInterval(timer);});posterSection.addEventListener('focusout',()=>autoplay());new IntersectionObserver(es=>{posterVisible=es[0].isIntersecting;autoplay();},{threshold:.15}).observe(posterSection);document.addEventListener('visibilitychange',autoplay);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{if(motionReduced())posterPaused=true;autoplay();});autoplay();
const loader=document.querySelector('#entry-loader');loader.hidden=false;document.body.classList.add('sight-loading');
function loaded(){const done=()=>{loader.hidden=true;document.body.classList.remove('sight-loading');};if(motionReduced()){done();return;}loader.animate([{opacity:1},{opacity:0}],{duration:300,easing:'linear'}).onfinish=done;}
if(window.CaseLoading)window.CaseLoading.ready.then(loaded);else if(document.readyState==='complete')loaded();else addEventListener('load',loaded,{once:true});
const toggle=document.querySelector('#menu-toggle'),menu=document.querySelector('#mobile-menu');let savedScroll=0;
function setMenu(open){
  menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
  document.body.classList.toggle('sight-menu-open',open);document.querySelector('main').inert=open;document.querySelector('footer').inert=open;
  if(open){savedScroll=scrollY;document.body.style.position='fixed';document.body.style.top=-savedScroll+'px';document.body.style.width='100%';}
  else{document.body.style.position='';document.body.style.top='';document.body.style.width='';scrollTo({top:savedScroll,behavior:'instant'});}
}
toggle.onclick=()=>setMenu(menu.hidden);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setMenu(false);toggle.focus();}});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
const foldMedia=matchMedia('(max-width:760px)');
document.querySelectorAll('.column').forEach(column=>{
  const articles=[...column.querySelectorAll(':scope>article')],keep=column.id==='gallery12'?2:1;
  if(articles.length<=keep)return;
  const button=document.createElement('button');button.className='read-more';button.type='button';button.setAttribute('aria-expanded','false');button.textContent='もっと見る';column.append(button);
  let expanded=false;function update(){articles.forEach((x,i)=>x.hidden=foldMedia.matches&&!expanded&&i>=keep);button.hidden=!foldMedia.matches;button.setAttribute('aria-expanded',String(expanded));button.textContent=expanded?'折りたたむ':'もっと見る';}
  button.onclick=()=>{expanded=!expanded;update();};foldMedia.addEventListener('change',update);update();
});
const pageTop=document.querySelector('.top');function scrollState(){const show=scrollY>100;pageTop.classList.toggle('visible',show);pageTop.tabIndex=show?0:-1;pageTop.setAttribute('aria-hidden',String(!show));}addEventListener('scroll',scrollState,{passive:true});scrollState();
