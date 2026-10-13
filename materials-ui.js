(() => {
  'use strict';
  const materials = window.DESIGN_MATERIALS;
  const favorites = window.DesignAtlasFavorites;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const typeLabels = {'component-library':'组件库',image:'图片素材',sound:'声音与音效',font:'字体',poster:'海报与视觉'};
  const types = [...new Set(materials.map(item => item.type))];
  const categories = [...new Set(materials.map(item => item.category))];
  const items = values => `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>`;
  const star = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1.1 6.2-5.7-3-5.7 3 1.1-6.2L3.2 9.6l6.3-.9Z"/></svg>';
  let state = {query:'',type:'all',category:'all',favorites:false};
  let toastTimer;
  let preview;
  function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3000); }
  const favorite = material => `<button class="favorite ${favorites.has('materials',material.id) ? 'selected' : ''}" data-material-fav="${esc(material.id)}" aria-label="收藏${esc(material.title)}" aria-pressed="${favorites.has('materials',material.id)}">${star}</button>`;
  function query() {
    const params = new URLSearchParams();
    if (state.query) params.set('q',state.query);
    if (state.type !== 'all') params.set('type',state.type);
    if (state.category !== 'all') params.set('category',state.category);
    if (state.favorites) params.set('favorites','1');
    return params.size ? '?' + params : '';
  }
  const href = id => `#material/${encodeURIComponent(id)}${query()}`;
  function navigation() {
    $('#material-navigation').innerHTML = `<a class="nav-item ${!state.favorites && state.type === 'all' ? 'active' : ''}" href="#materials"><span>全部内容素材</span><b>${materials.length}</b></a>` + types.map(type => `<a class="nav-item ${!state.favorites && state.type === type ? 'active' : ''}" href="#materials?type=${encodeURIComponent(type)}"><span>${esc(typeLabels[type] || type)}</span><b>${materials.filter(item => item.type === type).length}</b></a>`).join('') + `<a class="nav-item ${state.favorites ? 'active' : ''}" href="#materials?favorites=1"><span>我的收藏</span><b>${favorites.ids('materials').length}</b></a>`;
  }
  function cards() {
    const terms = state.query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const results = materials.filter(item => (state.type === 'all' || item.type === state.type) && (state.category === 'all' || item.category === state.category) && (!state.favorites || favorites.has('materials',item.id)) && terms.every(term => [item.title,item.summary,item.category,...item.tags,...item.useCases,...item.demos.map(demo => demo.title + ' ' + demo.summary)].join(' ').toLocaleLowerCase().includes(term)));
    $('#material-cards').innerHTML = results.map(item => `<article class="card"><a class="card-preview" href="${href(item.id)}" aria-label="查看${esc(item.title)}与互动样例"><img src="${esc(item.preview)}" alt="${esc(item.title)}代表性样例预览" loading="lazy"><span class="card-number">${esc(item.category)}</span></a><div class="card-body"><div class="card-title"><h2><a href="${href(item.id)}">${esc(item.title)}</a></h2>${favorite(item)}</div><p class="subtitle">${esc(item.upstream.repository || new URL(item.upstream.url).hostname)} · ${item.demos.length} 个互动样例</p><p class="card-summary">${esc(item.summary)}</p><div class="tags"><span class="tag">${esc(typeLabels[item.type] || item.type)}</span>${item.tags.slice(0,3).map(tag => `<span class="tag">${esc(tag)}</span>`).join('')}</div><div class="card-bottom"><a href="${esc(item.upstream.url)}" target="_blank" rel="noopener noreferrer">来源仓库</a><a href="${href(item.id)}">样例 & 使用方法</a></div></div></article>`).join('');
    $('#material-results-label').textContent = `${state.favorites ? '我的收藏' : state.type === 'all' ? '全部内容素材' : typeLabels[state.type] || state.type} / ${results.length} 个资源${state.query ? ' · '+state.query : ''}`;
    $('#materials-empty').hidden = !!results.length;
    navigation();
  }
  function detail(material) {
    $('#material-detail').innerHTML = `<div class="detail-top"><a class="back" href="#materials${query()}">返回内容素材库</a><div>${favorite(material)}<a class="copy-button" href="agent/materials/${encodeURIComponent(material.id)}.json" download="${esc(material.id)}-material.json">下载 Agent 素材包</a><button class="primary-button" id="copy-material-prompt">复制复用 Prompt</button></div></div><div class="detail-title"><div><p class="eyebrow">CONTENT MATERIAL / ${esc(material.category)}</p><h1>${esc(material.title)}</h1><p>${esc(material.summary)}</p></div><div class="tags"><span class="tag">${esc(typeLabels[material.type] || material.type)}</span><span class="tag">${esc(material.license.name)}</span></div></div><div class="detail-layout"><div class="demo-panel"><div class="demo-toolbar"><span>LIVE EXAMPLES / 可操作样例</span><div><button data-viewport="desktop" aria-pressed="true" class="active">适应面板</button><button data-viewport="wide" aria-pressed="false">桌面 1440px</button><button data-viewport="mobile" aria-pressed="false">手机 ≤390px</button><button id="material-demo-replay" hidden>重播</button><a id="material-demo-open" class="copy-button" href="${esc(material.demo)}" target="_blank" rel="noopener">独立打开 Demo</a></div></div><div id="material-live-frame" class="frame-wrap pattern-live-frame material-live-frame"><div class="pattern-live-placeholder"><button id="material-demo-start" class="primary-button">载入互动样例</button><p>${esc(material.demoNote)}</p></div></div><p class="demo-caption">一次运行一个效果。桌面预览保留原始字号，宽度不足时可横向滚动；手机预览与适应面板按实际宽度响应。</p><section class="notes material-context"><h2>先选一个样例</h2><div class="material-examples">${material.demos.map(demo => `<a href="${esc(demo.entrypoint)}" data-material-example="${esc(demo.id)}"><strong>${esc(demo.title)}</strong><span>${esc(demo.summary)}</span></a>`).join('')}</div><h3>${material.install ? "安装与取材" : "完整取材"}</h3>${material.install ? '<code class="material-install">' + esc(material.install) + '</code>' : ""}<p>本地 Demo 的完整运行依赖随素材导出。更多组件、框架入口与作者工具见<a href="${esc(material.upstream.url)}" target="_blank" rel="noopener noreferrer">原始仓库</a>。</p></section></div><aside class="notes"><section><h2>01 / 适用场景与限制</h2><h3>适合</h3>${items(material.useCases)}<h3>谨慎使用</h3>${items(material.avoid)}<h3>实现约束</h3>${items(material.constraints)}</section><section><h2>02 / 样例与参数</h2>${material.demos.map(demo => `<h3>${esc(demo.title)}</h3><p>${esc(demo.summary)}</p><div class="pattern-parameter-scroll"><table class="pattern-parameters"><caption>${esc(demo.component)} · 样例基线</caption><thead><tr><th scope="col">参数</th><th scope="col">值</th><th scope="col">说明</th></tr></thead><tbody>${(demo.parameters || []).map(param => `<tr><th scope="row">${esc(param.name)}</th><td>${esc(param.value)}</td><td>${esc(param.note)}</td></tr>`).join('')}</tbody></table></div>`).join('')}</section><section><h2>03 / 键盘与减少动态</h2><h3>键盘操作</h3><p>${esc(material.accessibility.keyboard)}</p><h3>减少动态</h3><p>${esc(material.accessibility.reducedMotion)}</p></section><section><h2>04 / 许可证与来源</h2><p><a href="${esc(material.license.url)}" target="_blank" rel="noopener noreferrer">${esc(material.license.name)} · 查看原始许可证</a></p><p>${esc(material.license.scope)}</p><p>${esc(material.license.notes)}</p><article class="material-source"><p>${material.upstream.version ? "核验版本 " + esc(material.upstream.version) + " · " : "来源核验 · "}${esc(material.upstream.verifiedAt)}</p>${material.upstream.commit ? "<code>" + esc(material.upstream.commit) + "</code>" : ""}</article>${material.sources.map(source => `<article class="material-source"><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a><p>${esc(source.note)}</p></article>`).join('')}<a href="document.html?file=${encodeURIComponent(material.research)}">查看素材使用与维护说明</a></section><section><h2>05 / 复用 Prompt</h2><p>用自己的内容、技术栈与目标区域替换任务描述，保留授权、兼容性与动态约束。</p><textarea id="material-prompt" class="prompt-box" aria-label="内容素材复用 Prompt" readonly>${esc(material.prompt)}</textarea></section></aside></div>`;
    const frame = $('#material-live-frame');
    preview = window.DesignAtlasPreview.mount(frame, document.querySelectorAll('[data-viewport]'), 'desktop', {scaleWide:false});
    let entrypoint = material.demo;
    function load() {
      frame.innerHTML = `<iframe class="demo-frame" title="${esc(material.title)}交互样例" src="${esc(entrypoint)}"></iframe>`;
      $('#material-demo-open').href = entrypoint;
      $('#material-demo-replay').hidden = false;
      preview.refresh();
    }
    $('#material-demo-start').addEventListener('click', () => {load();$('#material-demo-replay').focus({preventScroll:true});});
    $('#material-demo-replay').addEventListener('click',load);
    document.querySelectorAll('[data-material-example]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();entrypoint = link.getAttribute('href');load();
      document.querySelectorAll('[data-material-example]').forEach(item => item.setAttribute('aria-current',String(item === link)));
      frame.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'center'});
    }));
    $('#copy-material-prompt').addEventListener('click',async () => {
      try {await navigator.clipboard.writeText(material.prompt);toast('素材复用 Prompt 已复制。');}
      catch {$('#material-prompt').focus();$('#material-prompt').select();toast('已选中 Prompt，请按 Ctrl+C 复制。');}
    });
  }
  function route() {
    const [route = 'materials',params = ''] = (location.hash.slice(1) || 'materials').split('?');
    const values = new URLSearchParams(params);
    state = {query:values.get('q') || '',type:types.includes(values.get('type')) ? values.get('type') : 'all',category:categories.includes(values.get('category')) ? values.get('category') : 'all',favorites:values.get('favorites') === '1'};
    const isDetail = route.startsWith('material/');
    preview?.disconnect();preview = null;
    $('#materials-library').hidden = isDetail;$('#material-detail').hidden = !isDetail;$('#material-detail').innerHTML = '';
    $('#material-search').value = state.query;$('#material-type').value = state.type;$('#material-category').value = state.category;
    navigation();
    if (isDetail) {
      const material = materials.find(item => item.id === route.slice(9));
      if (material) detail(material);
      else $('#material-detail').innerHTML = '<div class="detail-top"><a class="back" href="#materials">返回内容素材库</a></div><h1>没有找到这个素材</h1><p>请回到素材库重新选择。</p>';
    } else cards();
  }
  function filter() {
    state.query = $('#material-search').value.trim();state.type = $('#material-type').value;state.category = $('#material-category').value;
    history.replaceState(null,'', '#materials' + query());cards();
  }
  $('#materials-total').textContent = materials.length;
  $('#material-type').insertAdjacentHTML('beforeend',types.map(type => `<option value="${esc(type)}">${esc(typeLabels[type] || type)}</option>`).join(''));
  $('#material-category').insertAdjacentHTML('beforeend',categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join(''));
  $('#material-search').addEventListener('input',filter);
  $('#material-type').addEventListener('change',filter);$('#material-category').addEventListener('change',filter);
  $('#material-reset').addEventListener('click', () => {location.hash = 'materials';route();});
  document.addEventListener('click',event => {const button = event.target.closest('[data-material-fav]');if (button) favorites.toggle('materials',button.dataset.materialFav);});
  document.addEventListener('keydown',event => {if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(event.target.tagName) && !$('#materials-library').hidden && !$('#favorite-dialog').open) {event.preventDefault();$('#material-search').focus();}});
  favorites.subscribe(({error}) => {if (!$('#materials-library').hidden) cards();else navigation();document.querySelectorAll('[data-material-fav]').forEach(button => {const selected = favorites.has('materials',button.dataset.materialFav);button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});if (error) toast(error);});
  window.addEventListener('hashchange', () => {route();window.scrollTo({top:0,behavior:'instant'});});
  route();
})();
