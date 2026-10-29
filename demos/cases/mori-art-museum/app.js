// A query override makes the reduced-motion branch reviewable without changing browser settings.
const motionOverride=new URLSearchParams(location.search).get('motion')==='reduce';
if(motionOverride)document.documentElement.dataset.motion='reduce';
function motionReduced(){return motionOverride||matchMedia('(prefers-reduced-motion: reduce)').matches;}
const menuButton=document.querySelector('#menu-toggle'),mobileNav=document.querySelector('#mobile-nav');let menuToken=0,menuAnim=null;
function setMenu(open){
  const token=++menuToken,from=menuAnim?{transform:getComputedStyle(mobileNav).transform}:null;menuAnim?.cancel();
  menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');menuButton.textContent=open?'×':'☰︎';document.body.classList.toggle('menu-open',open);
  document.querySelector('main').inert=open;document.querySelector('footer').inert=open;
  if(open)mobileNav.hidden=false;
  if(motionReduced()){mobileNav.hidden=!open;return;}
  const a={transform:'translateX(100%)'},b={transform:'translateX(0)'};menuAnim=mobileNav.animate([from||(open?a:b),open?b:a],{duration:330,easing:'cubic-bezier(.47,0,.745,.715)',fill:'both'});
  menuAnim.onfinish=()=>{if(token===menuToken&&!open)mobileNav.hidden=true;};
}
document.querySelector('#mobile-close').onclick=()=>{setMenu(false);menuButton.focus()};
menuButton.onclick=()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true');mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
const languageButton=document.querySelector('#language-toggle'),languages=document.querySelector('#languages');languageButton.onclick=()=>{languages.hidden=!languages.hidden;languageButton.setAttribute('aria-expanded',!languages.hidden);};document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!mobileNav.hidden){setMenu(false);menuButton.focus();}if(!languages.hidden){languages.hidden=true;languageButton.setAttribute('aria-expanded','false');languageButton.focus();}}});document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{let count=0;const value=button.dataset.filter;document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=value!=='all'&&item.dataset.category!==value;if(!item.hidden)count++;});document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',x===button));document.querySelector('#filter-status').textContent=count+'件を表示';}));

const head=document.querySelector('.head'),headMarker=document.createElement('div');headMarker.className='head-marker';head.before(headMarker);
const museumLogo=document.querySelector('.museum-logo img'),pageTop=document.querySelector('.top');let headerToken=0,headerAnim=null;
const normalLogo='assets/mam_logo.svg',compactLogo='assets/mam_logo_small.svg';let logoThreshold=headMarker.offsetTop+130;
let targetCompact=false,normalHeaderHeight=head.offsetHeight;
function headerScroll(){
  logoThreshold=headMarker.offsetTop+130;
  if(!head.classList.contains('is-compact'))normalHeaderHeight=head.offsetHeight;
  if(!languages.hidden){languages.hidden=true;languageButton.setAttribute('aria-expanded','false');}
  const compact=innerWidth>760&&scrollY>logoThreshold,was=head.classList.contains('is-compact');
  if(compact!==targetCompact){targetCompact=compact;const token=++headerToken;headerAnim?.cancel();
    if(compact){headMarker.style.height=normalHeaderHeight+'px';head.classList.add('is-compact');museumLogo.src=compactLogo;if(!motionReduced())headerAnim=head.animate([{transform:'translateY(-100%)'},{transform:'translateY(0)'}],{duration:120,easing:'ease-out'});}
    else if(was&&!motionReduced()){headerAnim=head.animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],{duration:80,easing:'ease-out'});headerAnim.onfinish=()=>{if(token!==headerToken)return;head.classList.remove('is-compact');headMarker.style.height='0px';museumLogo.src=normalLogo;};}
    else{head.classList.remove('is-compact');headMarker.style.height='0px';museumLogo.src=normalLogo;}
  }
  const topVisible=scrollY>(innerWidth>760?logoThreshold:innerHeight/2);pageTop.classList.toggle('visible',topVisible);pageTop.tabIndex=topVisible?0:-1;pageTop.setAttribute('aria-hidden',String(!topVisible));
  const footer=document.querySelector('footer'),atFooter=footer.getBoundingClientRect().top<innerHeight;pageTop.classList.toggle('in-footer',atFooter);
}
addEventListener('scroll',headerScroll,{passive:true});addEventListener('resize',headerScroll);headerScroll();
