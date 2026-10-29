// Query override tests the application's reduced-motion branch without changing OS settings.
const motionOverride=new URLSearchParams(location.search).get('motion')==='reduce';
if(motionOverride)document.documentElement.dataset.motion='reduce';
function motionReduced(){return motionOverride||matchMedia('(prefers-reduced-motion: reduce)').matches;}
if(motionOverride)document.querySelectorAll('a[href="index.html"],a[href="character.html"]').forEach(link=>link.href+='?motion=reduce');

const menu=document.querySelector('#primary-nav'),menuToggle=document.querySelector('#menu-toggle');
function closeMenu(){menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','メニューを開く');}
menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

function initHome(){
  const video=document.querySelector('#background-video'),button=document.querySelector('#motion-toggle');if(!video)return;
  let visible=true;
  function state(){const playing=!video.paused&&!video.ended;button.setAttribute('aria-pressed',String(playing));button.textContent=playing?'Ⅱ 背景映像を停止':'▶︎ 背景映像を再生';}
  const homeFrameReady=()=>{video.currentTime=Math.min(.1,video.duration||.1);if(!motionReduced()&&visible&&!document.hidden)video.play().catch(state);};video.addEventListener('loadedmetadata',homeFrameReady);if(video.readyState>=1)homeFrameReady();
  ['play','pause','ended'].forEach(event=>video.addEventListener(event,state));
  button.addEventListener('click',()=>{if(video.paused)video.play().catch(()=>{button.textContent='再生できません · もう一度';button.setAttribute('aria-pressed','false');});else video.pause();});
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)video.pause();});
  new IntersectionObserver(entries=>{visible=entries[0].intersectionRatio>=.15;if(!visible)video.pause();},{threshold:.15}).observe(document.querySelector('#home'));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});addEventListener('pagehide',()=>video.pause());state();
}

function initCharacters(){
  const track=document.querySelector('.ba-character-track'),stage=document.querySelector('.ba-character-window');if(!track)return;
  const students=[{name:'シロコ',cv:'小倉唯',year:'2年',birthday:'5月16日',height:'156cm',art:'shiroko.png',voice:'01.bd71aff1.wav'},{name:'ホシノ',cv:'花守ゆみり',year:'3年',birthday:'1月2日',height:'145cm',art:'hoshino.png',voice:'02.73ff260c.wav'},{name:'セリカ',cv:'大橋彩香',year:'1年',birthday:'6月25日',height:'153cm',art:'serika.png',voice:'03.83e84e04.wav'},{name:'ノノミ',cv:'三浦千幸',year:'2年',birthday:'9月1日',height:'160cm',art:'nonomi.png',voice:'04.99faa124.wav'}];
  let selected=0,playingVoice=null,playingButton=null;
  const buttons=[...document.querySelectorAll('button[data-student]')];
  function stopVoice(){if(playingVoice){if(window.AtlasAssets)window.AtlasAssets.pause(playingVoice);else playingVoice.pause();}if(playingButton){playingButton.setAttribute('aria-pressed','false');playingButton.setAttribute('aria-label',students[selected].name+'の公式ボイスを再生');}playingButton=null;}
  students.forEach((s,i)=>{const panel=document.createElement('article');panel.className='ba-student';panel.innerHTML=`<div class="ba-student-card"><img class="card-school" src="assets/school-abydos-card.png" alt="アビドス"><h2>${s.name}</h2><p>CV: ${s.cv}</p><dl><dt>学園</dt><dd>アビドス高等学校</dd><dt>学年</dt><dd>${s.year}</dd><dt>誕生日</dt><dd>${s.birthday}</dd><dt>身長</dt><dd>${s.height}</dd></dl><button class="student-voice" data-voice="${i}" aria-pressed="false" aria-label="${s.name}の公式ボイスを再生"><img src="assets/voice-label.png" alt="VOICE"><img src="assets/voice-microphone.png" alt=""></button></div><img class="ba-student-art" src="assets/${s.art}" alt="${s.name} 公式立ち絵">`;track.append(panel);const voiceButton=panel.querySelector('.student-voice');voiceButton.addEventListener('click',()=>{if(playingVoice&&!playingVoice.paused&&playingButton===voiceButton){stopVoice();return;}stopVoice();playingVoice=window.AtlasAssets?window.AtlasAssets.attach(new Audio(),'assets/'+s.voice):new Audio('assets/'+s.voice);playingButton=voiceButton;const currentAudio=playingVoice;currentAudio.addEventListener('ended',()=>{if(playingVoice===currentAudio)stopVoice();});(window.AtlasAssets?window.AtlasAssets.play(currentAudio):currentAudio.play()).then(()=>{if(playingVoice===currentAudio){voiceButton.setAttribute('aria-pressed','true');voiceButton.setAttribute('aria-label',s.name+'の公式ボイスを停止');}}).catch(()=>{if(playingVoice===currentAudio)stopVoice();});});});
  function select(n){stopVoice();selected=Math.max(0,Math.min(students.length-1,n));track.style.transform=`translate3d(${-selected*100}%,0,0)`;track.dataset.student=String(selected+1);[...track.children].forEach((panel,i)=>{panel.inert=i!==selected;panel.setAttribute('aria-hidden',String(i!==selected));});buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===selected)));document.querySelector('.ba-character-status').textContent=students[selected].name+' / '+(selected+1)+' of 4';}
  buttons.forEach((button,i)=>{button.addEventListener('click',()=>select(i));button.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(selected+(e.key==='ArrowRight'?1:-1));buttons[selected].focus();}});});
  stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(selected+(e.key==='ArrowRight'?1:-1));}});
  let touch=null;stage.addEventListener('touchstart',e=>touch=e.touches.length===1?e.touches[0].clientX:null,{passive:true});stage.addEventListener('touchend',e=>{if(touch!==null){const delta=e.changedTouches[0].clientX-touch;if(Math.abs(delta)>40)select(selected+(delta<0?1:-1));touch=null;}},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopVoice();});addEventListener('pagehide',stopVoice);select(0);
}
initHome();initCharacters();
