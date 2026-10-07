/* The renderer, geometry, palette and three responsive presets are first-party
   Stripe extracts. This file only connects their lifecycle to this local page. */
(()=>{
  const host=document.querySelector('.single-wave');
  const canvas=document.querySelector('#stripe-wave');
  const button=document.querySelector('#wave-toggle');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let wave=null,visible=true,userPaused=false,failed=false;
  const fallback=()=>{host.classList.add('single-wave--fallback');canvas.dataset.motionStatus='fallback';button.hidden=true;};
  const menuOpen=()=>!document.querySelector('.mega').hidden||!!document.querySelector('dialog[open]');
  function sync(){
    if(failed||reduce.matches){if(wave&&!wave.paused)wave.paused=true;fallback();return;}
    if(!wave){init();return;}
    host.classList.remove('single-wave--fallback');
    if(wave.loaded)button.hidden=false;
    const paused=userPaused||!visible||document.hidden||menuOpen();
    // The original setter records pause timestamps. Reassigning true while
    // already paused would clear its saved timestamp and jump on resume.
    if(wave.paused!==paused)wave.paused=paused;
    canvas.dataset.motionStatus=paused?'paused':'running';
    button.textContent=userPaused?'▶':'Ⅱ';
    button.setAttribute('aria-label',userPaused?'Play background animation':'Pause background animation');
    button.setAttribute('aria-pressed',String(userPaused));
  }
  function init(){
    try{
      const {Controller,configs}=window.StripeWaveStudy;
      wave=new Controller(canvas,{wideConfig:configs.wide,mediumConfig:configs.medium,smallConfig:configs.small,paletteUrl:'assets/wave-palette.webp',onError:()=>{failed=true;fallback();}});
      const render=wave.updateAndRender;
      let frames=0;
      wave.updateAndRender=t=>{
        render(t);
        if(!wave.paused&&wave.loaded){
          canvas.dataset.motionFrame=String(++frames);
          canvas.dataset.motionTime=String(wave.waveMesh?.time??0);
        }
      };
      wave.onLoadReady(()=>{button.hidden=false;canvas.dataset.motionReady='true';sync();});
      wave.initScene();
      sync();
    }catch(error){failed=true;canvas.dataset.motionError=error.message;fallback();}
  }
  button.addEventListener('click',()=>{userPaused=!userPaused;sync();});
  new IntersectionObserver(rows=>{visible=rows[0].isIntersecting;sync();},{rootMargin:'20px 0px',threshold:0}).observe(document.querySelector('.hero'));
  new MutationObserver(sync).observe(document.querySelector('header'),{attributes:true,subtree:true,attributeFilter:['hidden','aria-expanded']});
  document.querySelectorAll('dialog').forEach(dialog=>new MutationObserver(sync).observe(dialog,{attributes:true,attributeFilter:['open']}));
  document.addEventListener('visibilitychange',sync);
  reduce.addEventListener('change',sync);
  addEventListener('pagehide',()=>wave?.dispose(),{once:true});
  sync();
})();
