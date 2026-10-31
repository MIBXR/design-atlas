(() => {
  'use strict';
  const root = document.documentElement;
  const main = document.querySelector('main');
  const icons = {
    search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z"/>',
    starFill:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z" fill="currentColor"/>',
    back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    up:'<path d="M12 19V5M6 11l6-6 6 6"/>',
    down:'<path d="M12 5v14M6 13l6 6 6-6"/>',
    chevronDown:'<path d="m6 9 6 6 6-6"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    download:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    upload:'<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
    plus:'<path d="M5 12h14M12 5v14"/>', minus:'<path d="M5 12h14"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
    pause:'<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/>',
    system:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    dark:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
    light:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7L7 17M17 7l1.7-1.7"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
  const disclosure = `${icon('plus').replace('class="icon"','class="icon plus"')}${icon('minus').replace('class="icon"','class="icon minus"')}`;
  const brandPaths = {
    web:'M24 8 88 72 72 88 8 24Z M8 72 72 8 88 24 24 88Z',
    motion:'M8 48a28 28 0 1 0 56 0a28 28 0 1 0-56 0Z M32 48a28 28 0 1 0 56 0a28 28 0 1 0-56 0Z'
  };
  const modes = ['system','dark','light'];
  const modeNames = {system:'跟随系统',dark:'深色',light:'浅色'};
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const compact = matchMedia('(max-width:800px)');
  let brand = localStorage.getItem('atlas-sister-brand') || 'web';
  let theme = localStorage.getItem('atlas-sister-theme') || 'system';
  let favorites = new Set(JSON.parse(localStorage.getItem('atlas-sister-favorites') || '[]'));
  let category = '全部', search = '', sort = 'number', reversed = false, selected = 0, shortNotes = false;
  let disposePage = () => {};
  let toastTimer;
  const cases = [
    ['北岸咖啡 · 品牌官网','产品','以温暖纸色、清楚的字级与圆形图版，呈现一杯咖啡背后的日常。','编辑排版','品牌叙事','#e9dfcc','#c9d2b9','#4e6149','#273d32','北岸 / 日常'],
    ['拾光器 · 效率工具','产品','以克制网格组织工具能力，让主张、界面与行动入口自然接续。','产品界面','网格系统','#e6e8f0','#c7d2e7','#516891','#293a58','拾光 / 有序'],
    ['远山计划 · 探索游戏','游戏','用层叠的山形与留白建立探索感，章节索引保留稳定的阅读位置。','几何构成','章节导航','#172d3b','#345663','#daaa65','#f3e7ce','远山 / 出发'],
    ['留白画室 · 作品档案','艺术','把作品放在轻盈的纸面里，以大字号与细线组织创作的不同阶段。','作品档案','留白','#f3e7da','#dcc3b0','#aa6652','#51352d','留白 / 之间'],
    ['微光邮局 · 互动故事','游戏','几何光斑连接每一封信件，柔和状态让故事选择与页面导航分开。','互动叙事','柔和状态','#2c2544','#635879','#d5c48e','#f5efd9','微光 / 来信'],
    ['小满笔记 · 写作应用','产品','以阅读为中心安排侧栏、正文与工具，强调色只服务必要的状态。','长文阅读','工具布局','#e8ecd9','#bac6a5','#7c8960','#34432b','小满 / 记录'],
    ['回声剧场 · 演出手册','艺术','用黑白反差和圆形节奏构成演出档案，日期与标题共享对齐线。','信息层级','黑白构成','#27292b','#505457','#bdc4ba','#f2f0df','回声 / 在场'],
    ['浮岛物语 · 世界索引','游戏','几何岛屿在轻盈的背景中浮动，分类筛选为世界内容提供秩序。','世界索引','形状语言','#dae9e9','#a3c7c5','#e5b077','#285451','浮岛 / 漫游'],
    ['晴窗书店 · 阅读选集','艺术','从书名到专题保留舒展的间距，以稳定卡片边界衬托内容色彩。','专题阅读','内容网格','#eee7c9','#cfc6a1','#9e7455','#504b33','晴窗 / 页间'],
    ['石间工作室 · 器物图录','艺术','圆与矩形组织器物系列，窄屏按相同顺序展开，保留图文关系。','器物图录','形状对照','#dcd8d2','#b5afa5','#7b806d','#3b4139','石间 / 形与物'],
    ['环线地图 · 城市工具','产品','用清楚的色彩角色区分操作与当前位置，信息密集时仍能找回方向。','导航状态','配色角色','#e1e7d7','#bbc9ac','#69856a','#304939','环线 / 找到'],
    ['慢岛档案 · 视觉随笔','艺术','以几何图版与短句串联随笔，细小反馈维持连续的浏览节奏。','视觉随笔','层级节奏','#eadcd8','#d1b7b4','#a36d72','#58383e','慢岛 / 片刻']
  ].map((c,id) => ({id,title:c[0],category:c[1],summary:c[2],tags:c.slice(3,5),palette:c.slice(5,9),artTitle:c[9]}));
  const webSource = 'https://github.com/MIBXR/web-atlas/tree/2541e56a21d5321717b9397c14ae09462d562ee4/site';
  const motionSource = 'https://github.com/MIBXR/motion-atlas/tree/80aac18cd2fcef4a97e53b1ef9227a223136ff60/site';
  const prompt = '制作一个有清楚配色角色的参考库界面。用 68px 通栏顶栏、228px 左侧目录和 300px 最小宽度卡片组织列表；详情为 2:1 双栏，舞台吸附在操作栏下方，较短说明栏同时吸附。正文链接、强调字、实心操作、高亮条与柔和状态分别使用五个主题色角色。手机把目录收入一个菜单，保留单行操作与顺序阅读。';
  const decisions = {
    list:[['骨架负责位置，品牌只替换配色、标志和圆角。','skeleton'],['白卡片衬托作品，次级面区分内层内容。','surfaces'],['当前项分级强调，悬停用中性次级面。','emphasis']],
    detail:[['舞台始终贴在操作栏下方，较短说明栏同时吸附。','sticky'],['复制 Prompt 使用实心底，通用操作保持中性。','accent-tiers'],['顶栏保留独立快照，主体以 140ms 交接。','transitions']],
    docs:[['三栏分别负责找文档、阅读和定位当前章节。','docs-reader'],['正文保留行宽上限，目录标题单行省略。','docs-reader'],['链接与状态各用自己的配色角色。','accent-tiers']]
  };
  const decision = page => `<details class="decision"><summary>${icon('chevronDown')}这一页的设计决策</summary><ul>${decisions[page].map(([text,anchor])=>`<li>${text} <a href="../../../docs.html?file=docs/cases/atlas-sister-sites.md#${anchor}" target="_top">阅读依据</a></li>`).join('')}</ul></details>`;
  const art = c => `<div class="art" data-variant="${c.id%4}" style="--art-a:${c.palette[0]};--art-b:${c.palette[1]};--art-c:${c.palette[2]};--art-ink:${c.palette[3]}"><div class="art-copy"><small>FORM / ${String(c.id+1).padStart(2,'0')}</small><strong>${c.artTitle}</strong></div><i class="art-lines"></i></div>`;
  function controls() {
    return `<div class="segmented brand-switch" aria-label="切换品牌"><button type="button" data-brand="web" aria-pressed="${brand==='web'}">Web</button><button type="button" data-brand="motion" aria-pressed="${brand==='motion'}">Motion</button></div><button type="button" class="button icon-button" data-theme-toggle aria-label="显示主题：${modeNames[theme]}；点击切换为${modeNames[modes[(modes.indexOf(theme)+1)%3]]}" title="显示主题：${modeNames[theme]}">${icon(theme)}</button>`;
  }
  function applyBrandTheme() {
    root.dataset.brand = brand;
    root.dataset.theme = theme === 'system' ? (systemTheme.matches ? 'dark' : 'light') : theme;
    root.dataset.themeChoice = theme;
    document.querySelector('.brand path').setAttribute('d',brandPaths[brand]);
    const name = brand === 'web' ? 'WEB ATLAS' : 'MOTION ATLAS';
    document.querySelector('.brand strong').textContent = name;
    document.querySelector('.brand').setAttribute('aria-label',name+' 列表页');
    document.querySelector('.footer-brand').textContent = name;
    for (const container of document.querySelectorAll('.header-controls,.mobile-controls')) container.innerHTML = controls();
  }
  function notify(message) {
    const toast = document.querySelector('.toast');
    clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false;
    toastTimer = setTimeout(()=>toast.hidden=true,2200);
  }
  function filterNavigation() {
    return `<details class="rail-group" open><summary>分类${disclosure}</summary><div class="rail-list">${[['全部',12],['产品',4],['游戏',3],['艺术',5]].map(([name,count])=>`<button type="button" class="rail-item" data-category="${name}" ${category===name?'aria-current="true"':''}><span>${name}</span><small>${count}</small></button>`).join('')}</div></details><details class="rail-group" open><summary>收藏${disclosure}</summary><div class="rail-list"><button type="button" class="rail-item" data-category="收藏" ${category==='收藏'?'aria-current="true"':''}><span>我的收藏</span><small data-favorite-count>${String(favorites.size).padStart(2,'0')}</small></button><button type="button" class="rail-item" data-export>导出收藏${icon('download')}</button><button type="button" class="rail-item" data-import>导入收藏${icon('upload')}</button></div></details>`;
  }
  const docGroups = [
    ['项目指南',[['如何为参考库定配色角色','demo'],['参考库的使用与收录','CONTRIBUTING.md'],['收藏与迁移','docs/guide.md']]],
    ['研究',[['共享骨架与品牌层','docs/cases/atlas-sister-sites.md#skeleton'],['底色与内容卡片','docs/cases/atlas-sister-sites.md#surfaces'],['主题色的五个角色','docs/cases/atlas-sister-sites.md#accent-tiers'],['当前项分级与中性悬停','docs/cases/atlas-sister-sites.md#emphasis'],['两栏详情的吸附规则','docs/cases/atlas-sister-sites.md#sticky'],['文档中心的三栏组织','docs/cases/atlas-sister-sites.md#docs-reader'],['主体页面与顶栏的切换','docs/cases/atlas-sister-sites.md#transitions'],['叙事窗口的容量','docs/cases/atlas-sister-sites.md#capacity'],['标签栏图标','docs/cases/atlas-sister-sites.md#favicon'],['素材托管','docs/cases/atlas-sister-sites.md#hosting']]],
    ['Prompt',[['Atlas 姊妹站 · 复用 Prompt','prompts/cases/atlas-sister-sites.md']]],
    ['项目说明',[['Web Atlas · 项目介绍','README.md'],['Web Atlas · 维护要点','AGENTS.md']]]
  ];
  function docsNavigation() {
    return `<div class="doc-search-wrap"><label class="search">${icon('search')}<input id="doc-search" type="search" placeholder="搜索文档标题" aria-label="搜索文档标题"></label></div>${docGroups.map(([name,docs])=>`<details class="rail-group" open><summary>${name}${disclosure}</summary><div class="rail-list">${docs.map(([title,file])=>`<a class="rail-item" data-document title="${title}" href="${file==='demo'?'#docs':'../../../docs.html?file='+file}" ${file==='demo'?'aria-current="page"':'target="_top"'}>${title}</a>`).join('')}</div></details>`).join('')}`;
  }
  function syncNavigation(page) {
    for (const link of document.querySelectorAll('.site-nav a,.mobile-site a')) {
      if(link.hash==='#'+page)link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    }
    document.querySelector('.mobile-page').innerHTML = page==='list' ? filterNavigation() : page==='docs' ? docsNavigation() : `<a class="rail-item" href="#list">返回列表</a>${[['detail-title','作品概览'],['stage','作品舞台'],['note-0','设计要点'],['note-1','配色角色']].map(([id,title])=>`<button class="rail-item" type="button" data-scroll="${id}">${title}</button>`).join('')}`;
  }
  function setMenu(open) {
    const menu = document.querySelector('.mobile-menu');
    menu.hidden = !open;
    document.querySelector('.menu-toggle').setAttribute('aria-expanded',String(open));
    if(open) {
      setMenuView('page');
      document.querySelector('.outline')?.removeAttribute('data-open');
      document.querySelector('.outline-toggle')?.setAttribute('aria-expanded','false');
    }
  }
  function setMenuView(view) {
    document.querySelector('.mobile-page').hidden = view!=='page';
    document.querySelector('.mobile-site').hidden = view!=='site';
    for(const button of document.querySelectorAll('[data-menu-view]'))button.setAttribute('aria-pressed',String(button.dataset.menuView===view));
  }
  function renderCards() {
    const filtered = cases.filter(c=>(category==='全部'||c.category===category||(category==='收藏'&&favorites.has(c.id))) && (c.title+c.summary+c.tags.join('')).includes(search));
    filtered.sort((a,b)=>sort==='name'?a.title.localeCompare(b.title,'zh-CN'):a.id-b.id);
    if(reversed)filtered.reverse();
    document.querySelector('.cards').innerHTML = filtered.map(c=>`<article class="card"><a class="card-preview" href="#detail" data-select="${c.id}" aria-label="查看${c.title}">${art(c)}</a><div class="card-title"><h2><a href="#detail" data-select="${c.id}">${c.title}</a></h2><button type="button" class="button favorite" data-favorite="${c.id}" aria-label="收藏${c.title}" aria-pressed="${favorites.has(c.id)}">${icon(favorites.has(c.id)?'starFill':'star')}</button></div><p class="card-summary">${c.summary}</p><div class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></article>`).join('') || '<p>没有匹配的条目，试试其他关键词。</p>';
    document.querySelector('#result-count').textContent = `${category==='收藏'?'我的收藏':category==='全部'?'当前筛选':category} / ${filtered.length} 个条目`;
  }
  function listPage() {
    main.innerHTML = `<div class="layout"><aside class="rail" aria-label="分类与收藏">${filterNavigation()}</aside><div class="list-main"><header class="hero"><div><p class="eyebrow">CASE COLLECTION</p><h1>从看见风格，<br>到掌握它的<mark>语言</mark>。</h1><p class="hero-description">把界面拆成可理解、可借用、可亲手操作的设计机制。</p></div><div class="hero-geometry" aria-hidden="true"><i></i><b></b><span></span></div></header>${decision('list')}<div class="collection-tools"><label class="search">${icon('search')}<input id="case-search" type="search" placeholder="搜索标题、设计与关键词" aria-label="搜索案例"><kbd>/</kbd></label><label class="select-wrap"><select id="sort" aria-label="排序方式"><option value="number">按编号</option><option value="name">按名称</option></select>${icon('chevronDown')}</label><button class="button icon-button" type="button" id="sort-direction" aria-label="${reversed?'反序，点击改为正序':'正序，点击改为反序'}">${icon(reversed?'down':'up')}</button></div><div class="results"><span id="result-count"></span><span>01 — 12</span></div><div class="cards"></div></div></div>`;
    document.querySelector('#case-search').value=search;
    document.querySelector('#sort').value=sort;
    renderCards();
  }
  const noteSections = [
    ['设计要点',`<ul><li>把品牌表达放进色彩与形状，内容保持清楚的层级。</li><li>标题、摘要与标签沿相同的对齐线阅读。</li><li>用真实操作理解列表与详情的关系。</li></ul>`],
    ['配色',`<p>背景承接氛围，图版保持作品原色。</p><div class="swatches" id="swatches"></div>`],
    ['版式与尺度','<p>舞台和说明采用 2:1 两栏，间距 32px。舞台工具条与画面分开，正文段落放进有 20px 内边距的卡片。</p>'],
    ['当前项与悬停','<p>顶栏当前页用实心底，侧栏状态用柔和底。非当前导航悬停使用次级面与正文色，避免把短暂反馈看成选中状态。</p>'],
    ['可复用 Prompt',`<textarea class="prompt" aria-label="可复用 Prompt" readonly>${prompt}</textarea>`],
    ['响应式阅读','<p>1159px 及以下回到单列，800px 及以下把目录放进顶栏菜单；舞台工具条和页面操作栏各自保持单行。</p>'],
    ['切换与减少动态','<p>页面交接只给主体 140ms 淡化，顶栏保持原位。系统减少动态时，页面直接切换，几何图形保持静止。</p>'],
    ['来源',`<p><a href="${webSource}" target="_blank" rel="noreferrer">Web Atlas 固定提交源码</a><br><a href="${motionSource}" target="_blank" rel="noreferrer">Motion Atlas 固定提交源码</a></p>`]
  ];
  function fillNotes() {
    document.querySelector('.note-sections').innerHTML=noteSections.slice(0,shortNotes?2:8).map(([title,body],i)=>`<section class="note-section" id="note-${i}"><h2>${title}</h2>${body}</section>`).join('');
    document.querySelector('#swatches').innerHTML=cases[selected].palette.map(color=>`<span class="swatch"><i style="background:${color}"></i>${color}</span>`).join('');
  }
  function detailPage() {
    const c=cases[selected];
    main.innerHTML=`<div class="detail-page"><div class="detail-actions"><a class="button return" href="#list" aria-label="返回列表">${icon('back')}<span>返回列表</span></a><div><button class="button previous" type="button" aria-label="上一个作品" data-step="-1">${icon('back')}<span>上一个</span></button><button class="button next" type="button" aria-label="下一个作品" data-step="1">${icon('arrow')}<span>下一个</span></button><button class="button" type="button" data-detail-favorite data-favorite="${c.id}" aria-label="收藏${c.title}" aria-pressed="${favorites.has(c.id)}">${icon(favorites.has(c.id)?'starFill':'star')}<span>收藏</span></button><button class="button primary" type="button" id="copy-prompt">${icon('copy')}<span>复制 Prompt</span></button></div></div><div class="detail-layout"><div class="stage-column"><div class="stage-toolbar"><div class="segmented" aria-label="舞台视图"><button type="button" data-viewport="desktop" aria-pressed="true">桌面</button><button type="button" data-viewport="mobile" aria-pressed="false">手机</button></div><button class="button" type="button" id="right-length" aria-pressed="${shortNotes}">右栏：${shortNotes?'较短':'较长'}</button><button class="button" type="button" id="play" aria-pressed="false" aria-label="播放舞台动画">${icon('play')}<span>播放</span></button></div><div class="stage" id="stage" data-viewport="desktop" data-playing="false" role="img" aria-label="${c.title}的几何画面">${art(c)}</div><div class="stage-caption"><strong>滚动，观察两栏怎样相互让位。</strong><br>切换右栏长度，可分别查看舞台较短与说明较短时的吸附。画面由 CSS 渐变与几何形状组成。</div></div><aside class="notes"><header class="detail-heading" id="detail-title"><p class="eyebrow">REFERENCE / ${String(c.id+1).padStart(2,'0')}</p><h1>${c.title}</h1><p>${c.summary}</p><div class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></header>${decision('detail')}<div class="note-sections"></div></aside></div></div>`;
    fillNotes();
    const page=document.querySelector('.detail-page');
    const actions=document.querySelector('.detail-actions');
    const stage=document.querySelector('.stage-column');
    const notes=document.querySelector('.notes');
    const header=document.querySelector('.site-header');
    const syncColumns=()=>{
      const actionsHeight=actions.getBoundingClientRect().height;
      const stageHeight=stage.getBoundingClientRect().height;
      const notesHeight=notes.getBoundingClientRect().height;
      page.style.setProperty('--detail-sticky-top',`calc(var(--header-height) + ${actionsHeight}px + 24px)`);
      stage.classList.toggle('detail-sticky',window.innerWidth>=1160);
      notes.classList.toggle('detail-sticky',window.innerWidth>=1160&&stageHeight>notesHeight);
    };
    const observer=new ResizeObserver(syncColumns);
    for(const element of [header,actions,stage,notes])observer.observe(element);
    window.addEventListener('resize',syncColumns);
    disposePage=()=>{observer.disconnect();window.removeEventListener('resize',syncColumns);};
    syncColumns();
  }
  function docsPage() {
    main.innerHTML=`<div class="docs-layout"><aside class="rail docs-rail" aria-label="文档目录">${docsNavigation()}</aside><article class="article"><p class="document-path">项目指南 / 配色与界面</p><h1>如何为参考库<br>定配色角色</h1>${decision('docs')}<p class="lead">一套颜色要回答的，是每个位置承担什么职责。先确定角色，再选择适合品牌与主题的数值。</p>
      <section id="color-question"><h2>01 从阅读任务出发</h2><p>参考库同时容纳搜索、筛选、作品预览与长文阅读。作品之间的色彩差异很大，界面需要提供稳定的边界，让观看者知道哪些颜色来自作品，哪些颜色表示当前状态。页面底色承担整体氛围，卡片承接内容，内层次级面区分输入与补充信息。</p><p>如果把品牌色平均涂在标题、链接、按钮和装饰上，每个位置都在争取注意。先列出用户的动作：找到一类内容、判断是否要看、进入详情、阅读说明、取走 Prompt。颜色顺着这些动作安排，界面会更容易理解。</p><h3 id="color-boundary">让作品保留自己的颜色</h3><p>卡片画面可以明亮，也可以接近纯黑。卡片内边距与细边框提供共同的展示环境；品牌色留在界面状态中，作品的色相关系由作品自己决定。这样浏览不同风格时，页面仍有统一的秩序。</p></section>
      <section id="color-roles"><h2>02 把主题色分成五个角色</h2><p>角色是使用规则，色值是具体选择。链接需要在正文中清楚可辨，眉题只需提供局部强调，实心按钮需要承托文字，标题高亮条要保留文字对比，柔和底则负责提示当前范围。它们可以属于同一色相，却采用不同明度。</p><div class="table-frame"><div class="table-scroll" tabindex="0" role="region" aria-label="主题色层级与用途"><table><thead><tr><th>角色</th><th>变量</th><th>使用位置</th></tr></thead><tbody><tr><td>深色强调</td><td>--accent-1</td><td>正文链接、焦点轮廓</td></tr><tr><td>强调文字</td><td>--accent-2</td><td>眉题、侧栏当前项</td></tr><tr><td>实心底</td><td>--accent-3</td><td>顶栏当前页、复制 Prompt</td></tr><tr><td>高亮条</td><td>--accent-mark</td><td>标题中的重点词</td></tr><tr><td>柔和底</td><td>--accent-4</td><td>侧栏状态与提示区域</td></tr></tbody></table></div></div><p>实心底上的字由独立的墨色变量控制。绿色底可以配深字，浅色主题的橙色底采用白字；切到深色主题时，橙色的明度与承托文字一起调整。只修改底色会破坏这一对关系。</p></section>
      <section id="color-variables"><h2>03 让变量表达职责</h2><p>变量名描述颜色在页面中的工作。组件引用角色，品牌层给角色赋值；更换品牌时，侧栏仍是侧栏，主操作仍是主操作。尺寸、对齐线与导航关系继续使用同一套骨架。</p><pre><code>/* Web Atlas · 浅色 */
:root {
  --accent-1: #4b6118;
  --accent-2: #5f7a1f;
  --accent-3: #d4ef76;
  --accent-3-ink: #252822;
  --accent-mark: #d4ef76;
  --accent-4: #eef6d2;
}</code></pre><h3 id="color-theme">深浅主题按角色成对调整</h3><p>浅色页面把品牌色放在底色中，白卡片抬起内容；深色页面以接近中性的底色稳定大面积背景，卡片保留少量品牌色。深色高亮条应降低明度，让浅色标题继续清楚，不能直接复用明亮的实心按钮底色。</p></section>
      <section id="color-state"><h2>04 区分当前位置与短暂反馈</h2><p>顶栏回答正在浏览哪一种页面，采用实心底；侧栏回答当前内容属于哪个范围，采用柔和底和较重文字。悬停只表示这个位置可操作，使用中性次级面与正文色，使它与持续存在的当前状态分开。</p><p>按钮的悬停可以使用柔和主题底，因为按钮承担明确动作。卡片则保持原底色，只轻微上移并放大画面；正文链接保留正常的文字反馈。这些变化各自服务所处的阅读环境。</p></section>
      <section id="color-practice"><h2>05 在真实内容中使用</h2><p>选择角色后，把颜色放回列表、详情和文档三种页面。既看第一眼的层级，也看长文滚动、目录展开、主题切换与手机布局。相同角色在不同页面持续出现，使用者便能把前一页学到的操作方式带到下一页。</p><p>你可以用顶栏切换 Web 与 Motion，观察保持不变的骨架和随品牌变化的表面。也可以进入详情页切换说明长度，看舞台与正文怎样共享一个滚动条。完整的数值与设计依据见<a href="../../../docs.html?file=docs/cases/atlas-sister-sites.md#accent-tiers" target="_top">主题色分层研究</a>。</p></section>
      </article><aside class="outline" id="article-outline" aria-label="本文目录"><p>本文目录</p><nav>${[['color-question','从阅读任务出发'],['color-boundary','作品保留原色',true],['color-roles','五个配色角色'],['color-variables','变量表达职责'],['color-theme','深浅主题配对',true],['color-state','当前位置与反馈'],['color-practice','在真实内容中使用']].map(([id,title,sub])=>`<a href="#${id}" data-scroll="${id}" class="${sub?'sub':''}">${title}</a>`).join('')}</nav></aside></div><button class="button outline-toggle" type="button" aria-expanded="false" aria-controls="article-outline">本文目录</button>`;
    const headings=[...document.querySelectorAll('.article h2,.article h3')];
    const links=[...document.querySelectorAll('.outline a')];
    const syncOutline=()=>{
      const active=headings.filter(h=>h.getBoundingClientRect().top<=140).at(-1)||headings[0];
      const id=active.id||active.parentElement.id;
      for(const link of links)if(link.dataset.scroll===id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    };
    window.addEventListener('scroll',syncOutline,{passive:true});
    disposePage=()=>window.removeEventListener('scroll',syncOutline);
    syncOutline();
  }
  function updatePage() {
    disposePage();disposePage=()=>{};
    const page=location.hash.slice(1)||'list';
    if(!['list','detail','docs'].includes(page))throw new Error('未知页面：'+page);
    root.dataset.page=page;
    ({list:listPage,detail:detailPage,docs:docsPage})[page]();
    syncNavigation(page);setMenu(false);window.scrollTo(0,0);
    main.focus({preventScroll:true});
  }
  function transition(update) {
    if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(update);
    else update();
  }
  document.addEventListener('click',event=>{
    const target=event.target.closest('button,a');
    if(!target)return;
    if(target.matches('[data-brand]')){brand=target.dataset.brand;localStorage.setItem('atlas-sister-brand',brand);applyBrandTheme();}
    if(target.matches('[data-theme-toggle]')){theme=modes[(modes.indexOf(theme)+1)%3];localStorage.setItem('atlas-sister-theme',theme);applyBrandTheme();}
    if(target.matches('.menu-toggle'))setMenu(document.querySelector('.mobile-menu').hidden);
    if(target.matches('[data-menu-view]'))setMenuView(target.dataset.menuView);
    if(target.matches('[data-category]')){
      category=target.dataset.category;
      document.querySelector('.layout>.rail').innerHTML=filterNavigation();syncNavigation('list');renderCards();setMenu(false);
    }
    if(target.matches('[data-select]'))selected=Number(target.dataset.select);
    if(target.matches('[data-favorite]')){
      const id=Number(target.dataset.favorite);
      favorites.has(id)?favorites.delete(id):favorites.add(id);
      localStorage.setItem('atlas-sister-favorites',JSON.stringify([...favorites]));
      for(const button of document.querySelectorAll(`[data-favorite="${id}"]`)){
        button.setAttribute('aria-pressed',String(favorites.has(id)));
        button.innerHTML=icon(favorites.has(id)?'starFill':'star')+(button.hasAttribute('data-detail-favorite')?'<span>收藏</span>':'');
      }
      for(const count of document.querySelectorAll('[data-favorite-count]'))count.textContent=String(favorites.size).padStart(2,'0');
      if(root.dataset.page==='list'&&category==='收藏')renderCards();
    }
    if(target.matches('#sort-direction')){reversed=!reversed;target.innerHTML=icon(reversed?'down':'up');target.setAttribute('aria-label',reversed?'反序，点击改为正序':'正序，点击改为反序');renderCards();}
    if(target.matches('[data-step]')){selected=(selected+Number(target.dataset.step)+cases.length)%cases.length;transition(updatePage);}
    if(target.matches('#copy-prompt'))navigator.clipboard.writeText(prompt).then(()=>notify('已复制 Prompt'));
    if(target.matches('[data-viewport]')){
      document.querySelector('.stage').dataset.viewport=target.dataset.viewport;
      for(const button of document.querySelectorAll('[data-viewport]'))button.setAttribute('aria-pressed',String(button===target));
    }
    if(target.matches('#right-length')){shortNotes=!shortNotes;target.textContent='右栏：'+(shortNotes?'较短':'较长');target.setAttribute('aria-pressed',String(shortNotes));fillNotes();}
    if(target.matches('#play')){
      const stage=document.querySelector('.stage');const playing=stage.dataset.playing!=='true';
      stage.dataset.playing=String(playing);target.setAttribute('aria-pressed',String(playing));target.setAttribute('aria-label',playing?'暂停舞台动画':'播放舞台动画');target.innerHTML=icon(playing?'pause':'play')+`<span>${playing?'暂停':'播放'}</span>`;
    }
    if(target.matches('[data-scroll]')){
      event.preventDefault();setMenu(false);
      document.getElementById(target.dataset.scroll).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
      document.querySelector('.outline')?.removeAttribute('data-open');document.querySelector('.outline-toggle')?.setAttribute('aria-expanded','false');
    }
    if(target.matches('.outline-toggle')){
      const outline=document.querySelector('.outline');const open=!outline.hasAttribute('data-open');
      setMenu(false);outline.toggleAttribute('data-open',open);target.setAttribute('aria-expanded',String(open));
    }
    if(target.matches('[data-export]')){
      const url=URL.createObjectURL(new Blob([JSON.stringify([...favorites])],{type:'application/json'}));
      const link=document.createElement('a');link.href=url;link.download='atlas-sister-favorites.json';link.click();URL.revokeObjectURL(url);
    }
    if(target.matches('[data-import]'))document.querySelector('#import-favorites').click();
  });
  document.addEventListener('click',event=>{
    if(!event.composedPath().some(element=>element.matches?.('.mobile-menu,.menu-toggle')))setMenu(false);
  });
  document.addEventListener('input',event=>{
    if(event.target.id==='case-search'){search=event.target.value.trim();renderCards();}
    if(event.target.id==='doc-search'){
      const rail=event.target.closest('.rail,.mobile-page');
      const query=event.target.value.trim();
      for(const link of rail.querySelectorAll('[data-document]'))link.hidden=!link.textContent.includes(query);
      for(const group of rail.querySelectorAll('.rail-group')){group.hidden=![...group.querySelectorAll('[data-document]')].some(link=>!link.hidden);if(query&&!group.hidden)group.open=true;}
    }
  });
  document.addEventListener('change',event=>{
    if(event.target.id==='sort'){sort=event.target.value;renderCards();}
    if(event.target.id==='import-favorites'){
      event.target.files[0].text().then(text=>{
        const ids=JSON.parse(text);
        if(!Array.isArray(ids)||ids.some(id=>!Number.isInteger(id)||!cases[id]))throw new Error('收藏文件应为作品编号数组');
        favorites=new Set([...favorites,...ids]);localStorage.setItem('atlas-sister-favorites',JSON.stringify([...favorites]));
        transition(updatePage);notify('已合并收藏');event.target.value='';
      });
    }
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      const wasOpen=!document.querySelector('.mobile-menu').hidden;
      setMenu(false);document.querySelector('.outline')?.removeAttribute('data-open');document.querySelector('.outline-toggle')?.setAttribute('aria-expanded','false');
      if(wasOpen)document.querySelector('.menu-toggle').focus();
    }
    if(event.key==='/'&&!event.target.matches('input,textarea,select')){
      const input=document.querySelector(root.dataset.page==='list'?'#case-search':root.dataset.page==='docs'?(compact.matches?'.mobile-page #doc-search':'.docs-rail #doc-search'):'#case-search');
      if(input){event.preventDefault();if(compact.matches&&root.dataset.page==='docs')setMenu(true);input.focus();}
    }
  });
  compact.addEventListener('change',()=>setMenu(false));
  systemTheme.addEventListener('change',()=>{if(theme==='system')applyBrandTheme();});
  window.addEventListener('hashchange',()=>transition(updatePage));
  document.querySelector('.menu-toggle').insertAdjacentHTML('afterbegin',icon('menu'));
  applyBrandTheme();updatePage();
})();
