/* Independent implementation of observed homepage interactions; no official runtime or trackers. */
(() => {
  const $ = selector => document.querySelector(selector);
  const root = document.documentElement;
  const video = $('#hero-video');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let motionEnabled = !reduced.matches;
  let lastTrigger = null;
  const groups = [
    {id:'io',title:'Material at Google I/O 2026',rows:[[
      ['mpmb3q7e-homepage1.png','The I/O update for Material','Discover the latest direction for expressive, adaptive interfaces.','https://m3.material.io/blog/whats-new-at-io26']
    ],[
      ['mpmbh0do-homepage2.png','Compose leads Material on Android','Find the migration guidance and platform direction from the Material team.','https://m3.material.io/blog/material-is-compose-first'],
      ['mpmbr5ty-homepage3.png','Explore I/O 2026','Visit the conference programme for announcements, talks, and technical sessions.','https://io.google/2026/']
    ]]},
    {id:'expressive',title:'M3 Expressive: Design with emotion',description:'Color, motion, components, typography, and shape form a connected system. Explore the official resources behind this expressive direction.',rows:[[
      ['mncu38ac-home1.png','Design resources in Figma','A starting point for prototyping with the updated expressive styles and components.','https://www.figma.com/community/file/1035203688168086460'],
      ['mncu5a6f-home.png','Meet the physics motion system','Explore schemes and tokens for consistent movement across a product.','https://m3.material.io/styles/motion/overview']
    ],[
      ['mncu6xu7-home2.png','A broader vocabulary of shapes','Compare the shape families and their role in expressive interfaces.','https://m3.material.io/styles/shape/overview-principles'],
      ['mncu7vjc-home3.png','A guide to the expressive update','Understand what changed and how the pieces work together.','https://m3.material.io/blog/building-with-m3-expressive'],
      ['mpmc1ezt-homepage4.png','The story of Google Sans Flex','Read the design decisions behind a flexible typographic family.','https://design.google/library/google-sans-flex-font']
    ]]},
    {id:'components',title:'Expressive components',rows:[[
      ['mncuan2l-home5.png','Toolbar patterns','Keep frequently used actions together, with controls suited to their context.','https://m3.material.io/components/toolbars/overview'],
      ['mncuj9kj-home6.png','A primary action, with alternatives','See how a connected button and menu organise related choices.','https://m3.material.io/components/split-button/overview']
    ],[
      ['mncukpj9-home7.png','Progress with an expressive rhythm','Explore status indicators whose shape communicates ongoing work.','https://m3.material.io/components/progress-indicators/overview'],
      ['mnculsfx-home8.png','Connected button actions','Learn how neighbouring actions form a responsive group.','https://m3.material.io/components/button-groups/overview'],
      ['mncug5qb-home9.png','The component update in context','Review the set of new and revised expressive components.','https://m3.material.io/blog/building-with-m3-expressive#what-rsquo-s-in-the-update']
    ]]},
    {id:'practice',title:'Put expressive ideas into practice',rows:[[
      ['mncunw7s-home10.png','Implementing the motion schemes','Read the theming guidance and how the motion APIs fit together.','https://m3.material.io/blog/m3-expressive-motion-theming'],
      ['mncup23w-home11.png','A practical session from I/O','Watch the official talk about applying expressive design to products.','https://io.google/2025/explore/technical-session-24']
    ]]},
    {id:'stories',title:'Stories from the design teams',rows:[[
      ['mpme6ojb-homepage5.png','Updates from Material','Explore articles, guidance, and examples from the team.','https://m3.material.io/blog'],
      ['mpmebssm-homepage6.png','Design at Google','Read about the people and decisions behind Google’s design work.','https://design.google/']
    ]]},
    {id:'next',title:'Choose where to begin',rows:[[
      ['mpmewref-m3-social.jpg','Start your Material journey','Find introductory guidance and resources for your first project.','https://m3.material.io/get-started'],
      ['mpmf99wi-m3-social.jpg','Prototype with the Figma kit','Use the official styles and components as a design starting point.','https://www.figma.com/community/file/1035203688168086460']
    ],[
      ['mpmfahpc-m3-social.jpg','Build on your platform','Find the implementation libraries and platform documentation.','https://m3.material.io/develop']
    ]]}
  ];
  function card([image,title,description,url]) {
    const a = document.createElement('a');
    a.className = 'resource-card action'; a.href = url; a.target = '_blank'; a.rel = 'noopener';
    const img = document.createElement('img'); img.className = 'card-image'; img.src = 'assets/'+image; img.alt = ''; img.loading = 'lazy';
    const copy = document.createElement('div'); copy.className = 'card-copy';
    const heading = document.createElement('h3'); heading.textContent = title;
    const p = document.createElement('p'); p.textContent = description;
    copy.append(heading,p); a.append(img,copy); return a;
  }
  groups.forEach(group => {
    const section = document.createElement('section'); section.className = 'content-section'; section.id = group.id;
    const heading = document.createElement('div'); heading.className = 'section-heading';
    const h2 = document.createElement('h2'); h2.textContent = group.title; heading.append(h2);
    if(group.description){const p=document.createElement('p');p.textContent=group.description;heading.append(p)}
    section.append(heading);
    group.rows.forEach((row,index)=>{const el=document.createElement('div');el.className='cards-row'+(row.length===3?' triple':'')+(group.id==='io'&&index===0?' feature':'');row.forEach(c=>el.append(card(c)));section.append(el)});
    $('#sections').append(section);
  });
  const directories = {
    'Develop':[['Platform overview','https://m3.material.io/develop'],['Android','https://m3.material.io/develop/android/mdc-android'],['Compose','https://m3.material.io/develop/android/jetpack-compose'],['Flutter','https://m3.material.io/develop/flutter'],['Web','https://m3.material.io/develop/web']],
    'Foundations':[['Foundations overview','https://m3.material.io/foundations'],['Accessibility','https://m3.material.io/foundations/accessible-design/overview'],['Layout','https://m3.material.io/foundations/layout/overview']],
    'Styles':[['Styles overview','https://m3.material.io/styles'],['Color system','https://m3.material.io/styles/color/system/overview'],['Elevation','https://m3.material.io/styles/elevation/overview'],['Icons','https://m3.material.io/styles/icons/overview'],['Motion physics system','https://m3.material.io/styles/motion/overview'],['Shape','https://m3.material.io/styles/shape/overview-principles'],['Typography','https://m3.material.io/styles/typography/overview']],
    'Components':[['Component directory','https://m3.material.io/components'],['Toolbars','https://m3.material.io/components/toolbars/overview'],['Split button','https://m3.material.io/components/split-button/overview'],['Progress indicators','https://m3.material.io/components/progress-indicators/overview'],['Button groups','https://m3.material.io/components/button-groups/overview']]
  };
  const icons = {Home:'material_design','Get started':'apps',Develop:'code',Foundations:'book',Styles:'palette',Components:'add_circle',Blog:'pages'};
  function openDirectory(name,trigger){
    lastTrigger=trigger; $('#directory-title').textContent=name||'Main menu'; $('#directory-links').replaceChildren();
    const rows=name?directories[name]:[['Home','#main'],['Get started','https://m3.material.io/get-started'],['Develop',null],['Foundations',null],['Styles',null],['Components',null],['Blog','https://m3.material.io/blog']];
    rows.forEach(([label,url])=>{
      const el=document.createElement(url?'a':'button'); el.className='action';
      if(url){el.href=url;if(url.startsWith('https:')){el.target='_blank';el.rel='noopener'}else{el.classList.add('active');el.addEventListener('click',closeDirectory)}}
      else{el.type='button';el.addEventListener('click',()=>openDirectory(label,trigger))}
      if(!name){const icon=document.createElement('span');icon.className='icon';icon.setAttribute('aria-hidden','true');icon.textContent=icons[label];el.append(icon)}
      const text=document.createElement('span');text.textContent=label;el.append(text);
      if(!url){const next=document.createElement('span');next.className='icon next';next.textContent='arrow_forward';next.setAttribute('aria-hidden','true');el.append(next)}
      $('#directory-links').append(el);
    });
    if(!$('#directory').open)$('#directory').showModal(); $('#open-menu').setAttribute('aria-expanded','true'); $('#close-menu').focus();
  }
  function closeDirectory(){ $('#directory').close(); $('#open-menu').setAttribute('aria-expanded','false'); lastTrigger?.focus(); }
  $('#close-menu').addEventListener('click',closeDirectory);
  $('#directory').addEventListener('cancel',event=>{event.preventDefault();closeDirectory()});
  $('#directory').addEventListener('click',event=>{if(event.target===$('#directory')){const r=$('#directory').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right)closeDirectory()}});
  $('#open-menu').addEventListener('click',event=>openDirectory(null,event.currentTarget));
  document.querySelectorAll('[data-directory]').forEach(el=>el.addEventListener('click',()=>openDirectory(el.dataset.directory,el)));
  function announce(message){$('#feedback').textContent=message}
  function syncVideo(){const playing=!video.paused;$('#video-toggle').setAttribute('aria-label',playing?'Pause Video':'Play Video');$('#video-toggle .icon').textContent=playing?'pause':'play_arrow'}
  ['play','pause','ended'].forEach(type=>video.addEventListener(type,syncVideo));
  video.addEventListener('error',()=>announce('Video could not be loaded. The official showcase poster remains available.'));
  function playVideo(){return video.play().catch(()=>{syncVideo();announce('Press Play Video to start the muted showcase.')})}
  $('#video-toggle').addEventListener('click',()=>{if(video.paused){playVideo();announce('Muted showcase playing')}else{video.pause();announce('Showcase paused')}});
  function syncMotion(){root.dataset.motion=motionEnabled?'playing':'paused';document.querySelectorAll('[data-action=motion]').forEach(el=>{el.setAttribute('aria-checked',String(motionEnabled));el.setAttribute('aria-label',motionEnabled?'Pause animations':'Play animations');el.querySelector('.icon').textContent=motionEnabled?'pause':'play_arrow';const text=el.querySelector('.setting-text');if(text)text.textContent=el.getAttribute('aria-label')})}
  document.querySelectorAll('[data-action=motion]').forEach(el=>el.addEventListener('click',()=>{motionEnabled=!motionEnabled;syncMotion();if(motionEnabled)playVideo();else video.pause();announce(motionEnabled?'Animations enabled':'Animations paused')}));
  document.querySelectorAll('[data-action=theme]').forEach(el=>el.addEventListener('click',()=>{const dark=root.dataset.theme!=='dark';root.dataset.theme=dark?'dark':'light';document.querySelectorAll('[data-action=theme]').forEach(button=>{button.setAttribute('aria-checked',String(dark));button.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');button.querySelector('.icon').textContent=dark?'light_mode':'dark_mode';const text=button.querySelector('.setting-text');if(text)text.textContent=button.getAttribute('aria-label')});announce(dark?'Dark theme enabled':'Light theme enabled')}));
  reduced.addEventListener('change',()=>{if(reduced.matches){motionEnabled=false;syncMotion();video.pause();announce('Reduced motion: showcase paused')}});
  function ripple(el,x,y){if(reduced.matches||!motionEnabled)return;const r=el.getBoundingClientRect();const size=Math.hypot(r.width,r.height)*2;const dot=document.createElement('span');dot.className='ripple';dot.setAttribute('aria-hidden','true');Object.assign(dot.style,{width:size+'px',height:size+'px',left:(x-r.left-size/2)+'px',top:(y-r.top-size/2)+'px'});el.append(dot);dot.addEventListener('animationend',()=>dot.remove(),{once:true});setTimeout(()=>dot.remove(),500)}
  document.addEventListener('pointerdown',event=>{const el=event.target.closest('.action');if(el)ripple(el,event.clientX,event.clientY)});
  document.addEventListener('click',event=>{const el=event.target.closest('.action');if(el&&event.detail===0){const r=el.getBoundingClientRect();ripple(el,r.left+r.width/2,r.top+r.height/2)}});
  syncMotion();syncVideo();if(motionEnabled)playVideo();
})();
