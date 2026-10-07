(() => {
'use strict';
const entries = window.DESIGN_ATLAS || [];
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const docHref = file => `document.html?file=${encodeURIComponent(file)}`;
const cacheControls=document.createElement('section');
cacheControls.className='cache-controls';
cacheControls.innerHTML='<h3>已经下载的素材</h3><p>嵌入预览与独立页面共享当前站点的素材缓存。浏览器空间不足时会重新下载。</p><p id="cache-status" role="status">正在检查…</p><button id="cache-clear" class="copy-button" disabled>清除素材缓存</button>';
$('#favorite-dialog').append(cacheControls);
async function showCacheStatus(clear=false){
  const status=$('#cache-status'),button=$('#cache-clear');
  status.textContent=clear?'正在清除素材缓存…':'正在检查素材缓存…';button.disabled=true;
  const api=window.DesignAtlasAssetCache;
  const result=api?await api[clear?'clear':'status']():{available:false};
  status.textContent=result.available?`${result.files} 项 · ${(result.bytes/1024/1024).toFixed(1)} MiB${clear?' · 下次打开时按需重新下载':''}`:'此浏览器暂不支持持久素材缓存，页面仍可正常加载。';
  button.disabled=!result.available;
}
$('#favorite-manage').addEventListener('click',()=>showCacheStatus());
$('#cache-clear').addEventListener('click',()=>showCacheStatus(true));
let favorites=[]; try { favorites=JSON.parse(localStorage.getItem('atlas-favorites')||'[]'); if(!Array.isArray(favorites))favorites=[]; } catch {}
favorites=[...new Set(favorites.filter(id=>entries.some(e=>e.id===id)))];
let previewObserver;
let country='all'; let selected=[]; let filter='all'; let query=''; let sort='curated';
let renderedLocation='';
const categoryFilters={products:'产品',games:'游戏/IP',classics:'经典风格',culture:'艺术/文化',favorites:'favorites'};
function readCollectionState(){
  const params=new URL(location.href).searchParams;
  const category=params.get('category');
  filter=Object.hasOwn(categoryFilters,category)?categoryFilters[category]:'all';
  country=countries.includes(params.get('country'))?params.get('country'):'all';
  query=(params.get('q')||'').trim();
  sort=params.get('sort')==='title'?'title':'curated';
  $('#search').value=query;
  $('#country').value=country;
  $('#sort').value=sort;
  document.querySelectorAll('[data-filter]').forEach(button=>{
    const active=button.dataset.filter===filter;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}
function writeCollectionState({replace=false,showCollection=false}={}){
  const url=new URL(location.href);
  const category=Object.keys(categoryFilters).find(key=>categoryFilters[key]===filter);
  const values={category,country:country==='all'?null:country,q:query,sort:sort==='curated'?null:sort};
  Object.entries(values).forEach(([key,value])=>value?url.searchParams.set(key,value):url.searchParams.delete(key));
  if(showCollection)url.hash='';
  if(url.href!==location.href)history[replace?'replaceState':'pushState'](null,'',url);
  if(showCollection)route();
  else{renderCards();renderedLocation=location.href;}
}
const elementLabels={color:'配色角色',typography:'字体排版',layout:'布局留白',imagery:'图像图标',shape:'线条形状',hierarchy:'信息层级',motion:'动效反馈',coherence:'协调逻辑'};
const composition = e => `<dl class="element-map">${Object.entries(e.composition||{}).map(([k,v])=>`<div class="${k==='coherence'?'coherence':''}"><dt>${elementLabels[k]||esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
const themeModeLabels={fixed:'固定主题',system:'跟随系统',manual:'手动切换','system-and-manual':'系统 + 手动'};
const soundKindLabels={none:'无网站配乐',background:'背景音乐',video:'媒体声音',external:'外部音乐入口',interactive:'操作／演奏声音'};
const behaviors=e=>`<div class="behavior-block"><span class="behavior-label">显示主题</span><h3>${esc(themeModeLabels[e.themeBehavior?.mode]||'固定主题')}</h3><p>${esc(e.themeBehavior?.control||'此练习保留当前设计配色；实验室可独立比较浅深色。')}</p><p>${esc(e.themeBehavior?.designReason||'优先保持图形、文字和颜色角色的一致性。')}</p></div><div class="behavior-block"><span class="behavior-label">声音与交互</span><h3>${esc(soundKindLabels[e.soundBehavior?.kind]||'无网站配乐')}</h3><p>${esc(e.soundBehavior?.control||'本练习不使用音乐。')}</p><p>${esc(e.soundBehavior?.interactionRole||'操作反馈由文字、形状和动效表达。')}</p></div>`;
const labels = {all:'全部风格',产品:'产品与平台','游戏/IP':'游戏与 IP',经典风格:'经典设计语言','艺术/文化':'艺术与文化',favorites:'我的收藏'};
const list = values => `<ul>${values.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const swatches = e => `<div class="swatches">${e.tokens.palette.map(x=>`<span class="swatch"><i style="background:${esc(x)}"></i>${esc(x)}</span>`).join('')}</div>`;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),2300);}
function saveFavorites(){try{localStorage.setItem('atlas-favorites',JSON.stringify(favorites));}catch{toast('此浏览器未允许本地存储，收藏仅保留到关闭页面。');}$('#fav-count').textContent=String(favorites.length).padStart(2,'0');}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];saveFavorites();document.querySelectorAll(`[data-fav="${id}"]`).forEach(x=>{x.classList.toggle('selected',favorites.includes(id));x.setAttribute('aria-pressed',String(favorites.includes(id)));x.textContent=favorites.includes(id)?'★':'☆';});if(filter==='favorites' && !$('#collection').hidden)renderCards();}
function favoriteButton(e){return `<button class="favorite ${favorites.includes(e.id)?'selected':''}" data-fav="${e.id}" aria-label="收藏${esc(e.title)}" aria-pressed="${favorites.includes(e.id)}">${favorites.includes(e.id)?'★':'☆'}</button>`;}
function updateTray(){const count=selected.length;document.body.classList.toggle('has-tray',count>0);$('#compare-count').textContent=count;$('#compare-tray').hidden=!count;$('#tray-text').textContent=`已选择 ${count} 项：${selected.map(id=>entries.find(e=>e.id===id)?.title).join(' · ')}`;$('#compare-go').disabled=count<2;}
function selectCompare(id,checked){if(checked && !selected.includes(id)){if(selected.length===3){toast('一次最多比较 3 项，请先取消一个条目。');renderCards();return;}selected.push(id);}else if(!checked){selected=selected.filter(x=>x!==id);}updateTray();}
function renderCards(){let results=entries.filter(e=>(filter==='all'||filter==='favorites'&&favorites.includes(e.id)||e.category===filter)).filter(e=>country==='all'||e.country===country);if(query){results=results.filter(e=>JSON.stringify(e).toLowerCase().includes(query.toLowerCase()));}if(sort==='title')results.sort((a,b)=>a.title.localeCompare(b.title,'zh-CN'));$('#cards').innerHTML=results.map(e=>`<article class="card" style="--bg:${esc(e.background)}"><a class="card-preview" href="#style/${e.id}" aria-label="查看${esc(e.title)}"><img src="${esc(e.preview)}" alt="${esc(e.title)}代码 demo 的实际首屏" loading="lazy"><span class="card-number">${String(e.order).padStart(2,'0')} / ${esc(e.category)}</span></a><div class="card-body"><div class="card-title"><h2><a href="#style/${e.id}">${esc(e.title)}</a></h2>${favoriteButton(e)}</div><p class="subtitle">${esc(e.subtitle)}</p><p class="card-summary">${esc(e.summary)}</p><div class="tags">${[...new Set([e.country,...e.tags].filter(Boolean))].slice(0,3).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div><div class="card-bottom"><label class="compare-label"><input type="checkbox" data-compare="${e.id}" ${selected.includes(e.id)?'checked':''} aria-label="比较${esc(e.title)}">加入比较</label><a href="#style/${e.id}">拆解 & demo ↗</a></div></div></article>`).join('');$('#results-label').textContent=`${labels[filter]} / ${results.length} 个条目${country!=='all'?' · '+country:''}${query?' · '+query:''}`;$('#empty').hidden=!!results.length;}
function route(){
  previewObserver?.disconnect();
  readCollectionState();
  let hash;
  try{hash=decodeURIComponent(location.hash);}catch{hash='';}
  $('#collection').hidden=true;$('#detail').hidden=true;$('#comparison').hidden=true;
  if(hash.startsWith('#style/')){
    const entry=entries.find(x=>x.id===hash.slice(7));
    if(entry){renderDetail(entry);$('#detail').hidden=false;}
    else{const url=new URL(location.href);url.hash='';history.replaceState(null,'',url);$('#collection').hidden=false;renderCards();}
  }else if(hash==='#compare'){renderComparison();$('#comparison').hidden=false;}
  else{$('#collection').hidden=false;renderCards();}
  renderedLocation=location.href;
  window.scrollTo({top:0,behavior:'instant'});updateTray();
}
function renderDetail(e){const i=entries.findIndex(x=>x.id===e.id);$('#detail').innerHTML=`<div class="detail-top"><a class="back" href="#">← 返回参考库</a><div>${favoriteButton(e)}${e.referenceUrl?`<a class="copy-button" href="${esc(e.referenceUrl)}" target="_blank" rel="noopener noreferrer">对照原站 ↗</a>`:''}<a class="copy-button" href="${esc(docHref(e.research))}" target="_blank">调研原文 ↗</a><a class="primary-button" href="${esc(e.demo)}" target="_blank">独立打开 demo ↗</a></div></div><div class="detail-title"><div><p class="eyebrow">${String(e.order).padStart(2,'0')} / ${esc(e.category)} / ${esc(e.subtitle)}</p><h1>${esc(e.title)}</h1><p>${esc(e.summary)}</p></div><div class="tags">${e.tags.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div></div><div class="detail-layout"><div class="demo-panel"><div class="demo-toolbar"><span>LIVE DEMO / ${e.implementation==='reference-study'?'原站局部复现':'经典风格练习'}</span><div><button data-viewport="desktop" class="active" aria-pressed="true">适应面板</button><button data-viewport="wide" aria-pressed="false">桌面 1440px</button><button data-viewport="mobile" aria-pressed="false">手机 ≤390px</button><button id="reload-demo">重播 ↻</button></div></div><div class="frame-wrap"><iframe class="demo-frame" title="${esc(e.title)}交互 demo" src="${esc(e.demo)}"></iframe></div><p class="demo-caption">可在画面内滚动、点击与切换。${e.implementation==='reference-study'?'原站局部复现，具体差异见下方对照说明。':'经典风格组合练习。'}桌面 1440px 保留完整桌面布局与动效；独立打开可查看原始尺寸。</p><a class="copy-button" href="${esc(e.demo)}" download="${e.id}-index.html">入口源码 ↓</a> <a class="copy-button" href="${esc(e.preview)}" target="_blank">实际截图 ↗</a><p class="demo-caption">完整代码与真实素材位于 demos/${e.id}/；请从完整项目运行，复用单例时也保留根目录公共资源与加载模块。</p>${e.fidelity?`<div class="evidence-links"><a href="${esc(docHref(e.fidelity))}" target="_blank">复现范围与差异 ↗</a><a href="${esc(e.assetManifest)}" target="_blank">素材来源清单 ↗</a></div>`:''}${e.referencePreview?`<details class="source-comparison"><summary>展开原站与本地画面对照</summary><div><figure><img src="${esc(e.referencePreview)}" alt="${esc(e.title)}原站实访截图"><figcaption>原站 · 实访快照${e.referencePreviewNote?" · "+esc(e.referencePreviewNote):""}</figcaption></figure><figure><img src="${esc(e.preview)}" alt="${esc(e.title)}本地截图"><figcaption>本地 · 局部复现</figcaption></figure></div></details>`:''}</div><aside class="notes"><section><h2>从要素看风格</h2><p>下方映射展示各个元素如何共同表达主题。实验室可交互调配，原站局部复现保留其自身设计。</p><a class="element-lab-link" href="fundamentals.html?style=${e.id}">调配这个风格的设计要素 ↗</a>${composition(e)}</section><section><h2>01 / 设计机制</h2>${list(e.principles)}<h3>怎样凸显产品重点</h3><p>${esc(e.productFocus)}</p><h3>主题与情绪</h3><p>${esc(e.theme)}</p></section><section><h2>02 / 交互巧思</h2>${list(e.interaction)}${behaviors(e)}</section><section><h2>03 / 约束与适用场景</h2>${list(e.constraints)}<h3>适合</h3><p>${e.useCases.map(esc).join(' / ')}</p><h3>谨慎使用</h3><p>${e.avoid.map(esc).join(' / ')}</p></section><section><h2>04 / 设计 Tokens</h2>${swatches(e)}<p><b>字体</b> · ${esc(e.tokens.type)}<br><b>布局</b> · ${esc(e.tokens.layout)}<br><b>动效</b> · ${esc(e.tokens.motion)}</p></section><section><div class="prompt-head"><h2>05 / 可复用 Prompt</h2><button class="copy-button" id="copy-prompt">复制 Prompt</button></div><textarea class="prompt-box" aria-label="可复用 Prompt" readonly>${esc(e.prompt)}</textarea><details><summary>负面约束 / Negative Prompt</summary><p>${esc(e.negativePrompt)}</p></details><h3>改造练习</h3><p>${esc(e.exercise)}</p></section><section><h2>06 / 来源与证据</h2>${e.sources.map(s=>`<div class="source-item"><span class="source-badge">${esc(s.type)}</span><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a><small>${esc(s.note)}</small></div>`).join('')}<p>${e.referenceUrl?`参考站采集：${esc(e.capturedAt||"2026-10-07")}。本案例归档这次采集的页面与交互。`:"理论来源核验：2026-10-07。"}详细观察、推断与限制见<a href="${esc(docHref(e.research))}" target="_blank">调研记录</a>。</p></section></aside></div><div class="detail-footer">${i?`<a href="#style/${entries[i-1].id}">← ${esc(entries[i-1].title)}</a>`:'<span></span>'}${i<entries.length-1?`<a href="#style/${entries[i+1].id}">${esc(entries[i+1].title)} →</a>`:'<a href="#">回到参考库 →</a>'}</div>`;$('#copy-prompt').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(e.prompt+'\n\n负面约束：'+e.negativePrompt);toast('Prompt 与负面约束已复制。');}catch{const area=$('.prompt-box');area.focus();area.select();toast('已选中 Prompt，请按 Ctrl+C 复制。');}});$('#reload-demo').addEventListener('click',()=>{$('.demo-frame').src=e.demo;});initPreview(e.id==='chatgpt-platform'?'wide':'desktop');}
function initPreview(initialMode){
  const wrap=$('.frame-wrap');
  const syncScale=()=>{
    if(!wrap.classList.contains('wide'))return;
    const width=wrap.clientWidth;
    if(!width)return;
    const scale=Math.min(1,width/1440);
    wrap.style.setProperty('--preview-scale',scale);
    wrap.style.setProperty('--preview-height',`${1000*scale}px`);
  };
  const setMode=mode=>{
    wrap.classList.toggle('mobile',mode==='mobile');
    wrap.classList.toggle('wide',mode==='wide');
    document.querySelectorAll('[data-viewport]').forEach(button=>{
      const active=button.dataset.viewport===mode;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    syncScale();
  };
  document.querySelectorAll('[data-viewport]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.viewport)));
  previewObserver=new ResizeObserver(syncScale);
  previewObserver.observe(wrap);
  setMode(initialMode);
}

function renderComparison(){const chosen=selected.map(id=>entries.find(e=>e.id===id)).filter(Boolean);$('#comparison').innerHTML=`<div class="detail-top"><a href="#" class="back">← 返回参考库</a><button id="return-select" class="copy-button">调整选择</button></div><h1 style="font-size:36px">看见风格之间的差异。</h1><p class="compare-tip">比较信息层级、交互目的与设计约束，再选择适合项目的设计语言。</p>${chosen.length<2?'<p class="compare-empty">请先在参考库选择 2–3 个条目。</p>':`<div class="compare-grid ${chosen.length===2?'two':''}">${chosen.map(e=>`<article class="compare-column"><a href="#style/${e.id}"><img src="${esc(e.preview)}" alt="${esc(e.title)} demo"><h2>${esc(e.title)} ↗</h2></a><p>${esc(e.summary)}</p><section><h3>信息焦点</h3><p>${esc(e.productFocus)}</p></section><section><h3>设计机制</h3>${list(e.principles)}</section><section><h3>交互巧思</h3>${list(e.interaction)}${behaviors(e)}</section><section><h3>主题</h3><p>${esc(e.theme)}</p>${swatches(e)}</section><section><h3>要素协调</h3><p>${esc(e.composition?.coherence||'')}</p></section><section><h3>硬约束</h3>${list(e.constraints)}</section><section><h3>适用 / 不适用</h3><p>${e.useCases.map(esc).join(' / ')}<br>谨慎：${e.avoid.map(esc).join(' / ')}</p></section><a class="primary-button" href="${esc(e.demo)}" target="_blank">操作 demo ↗</a></article>`).join('')}</div>`}`;$('#return-select').onclick=()=>{location.hash='';};}
document.addEventListener('click',event=>{const button=event.target.closest('[data-fav]');if(button)toggleFavorite(button.dataset.fav);});
document.addEventListener('change',event=>{const item=event.target.closest('[data-compare]');if(item)selectCompare(item.dataset.compare,item.checked);});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  writeCollectionState({showCollection:true});
}));
$('#search').addEventListener('input',event=>{query=event.target.value.trim();writeCollectionState({replace:true});});
$('#sort').addEventListener('change',event=>{sort=event.target.value;writeCollectionState();});
$('#reset-search').onclick=()=>{
  query='';filter='all';country='all';sort='curated';
  writeCollectionState({showCollection:true});
};
$('#compare-open').onclick=$('#compare-go').onclick=()=>{if(selected.length<2){toast('先勾选 2–3 个条目的“加入比较”。');return;}location.hash='#compare';};
$('#compare-clear').onclick=()=>{selected=[];updateTray();if(location.hash==='#compare')renderComparison();else if(!$('#collection').hidden)renderCards();};
document.addEventListener('keydown',event=>{
  if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){
    event.preventDefault();
    if($('#collection').hidden)writeCollectionState({showCollection:true});
    $('#search').focus();
  }
});
$('.skip').addEventListener('click',event=>{event.preventDefault();$('#main').focus();$('#main').scrollIntoView();});
function restoreRoute(){
  // Back/Forward can emit both events for one hash navigation. Render once.
  if(renderedLocation===location.href)return;
  route();$('#main').focus({preventScroll:true});
}
window.addEventListener('popstate',restoreRoute);
window.addEventListener('hashchange',restoreRoute);
$('#all-count').textContent=entries.length;$('#hero-count').textContent=entries.length;
$('#footer-count').textContent=entries.length+' DEMOS · 8 CLASSIC STYLES · GIT ARCHIVE';
document.querySelectorAll('[data-category-count]').forEach(el=>el.textContent=String(entries.filter(e=>e.category===el.dataset.categoryCount).length).padStart(2,'0'));
const countries=[...new Set(entries.map(e=>e.country).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'zh-CN'));$('#country').innerHTML='<option value="all">全部地区</option>'+countries.map(c=>'<option value="'+esc(c)+'">'+esc(c)+'</option>').join('');$('#country').onchange=event=>{country=event.target.value;writeCollectionState();};
$('#favorite-manage').onclick=()=>$('#favorite-dialog').showModal();$('#favorite-export').onclick=()=>{const data={format:'design-atlas-favorites',version:1,exportedAt:new Date().toISOString(),favorites};const json=JSON.stringify(data,null,2);$('#favorite-json').value=json;const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='design-atlas-favorites.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#favorite-status').textContent='已生成 '+favorites.length+' 个收藏的备份，下方也可复制 JSON。';};$('#favorite-import').onclick=()=>{try{const data=JSON.parse($('#favorite-json').value);const ids=Array.isArray(data)?data:data.favorites;if(!Array.isArray(ids))throw Error();const valid=[...new Set(ids.filter(id=>typeof id==='string'&&entries.some(e=>e.id===id)))];favorites=[...new Set([...favorites,...valid])];saveFavorites();route();$('#favorite-status').textContent='已合并 '+valid.length+' 个有效案例，现有 '+favorites.length+' 个收藏。';}catch{$('#favorite-status').textContent='格式错误，请粘贴导出的 JSON。';}};saveFavorites();route();
})();
