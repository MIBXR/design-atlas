const content = document.querySelector('#content');
let file = new URLSearchParams(location.search).get('file') || 'README.md';
const documents = window.DESIGN_ATLAS_DOCUMENTS || [];
const documentPaths = new Set(documents.map(item => item.path));
const libraryURL = new URL('.', document.baseURI);
let activeRequest;
let cleanupOutline = () => {};
let currentHeadings = [];
function isAllowedDocument(value) {
  return documentPaths.has(value) && !value.includes('\\') && !value.split('/').some(part => !part || part.startsWith('.'));
}
function renderDirectory() {
  const navigation = document.querySelector('#document-navigation');
  document.querySelector('#document-count').textContent = String(documents.length);
  for (const group of new Set(documents.map(item => item.group))) {
    const section = document.createElement('details');
    section.className = 'document-group';
    section.setAttribute('data-document-group', group);
    section.open = documents.some(item => item.group === group && item.path === file);
    const title = document.createElement('summary');
    title.textContent = group;
    section.append(title);
    const links = document.createElement('ul');
    for (const item of documents.filter(item => item.group === group)) {
      const row = document.createElement('li');
      const link = document.createElement('a');
      link.href = 'document.html?file=' + encodeURIComponent(item.path);
      link.textContent = item.title;
      link.title = item.path;
      link.setAttribute('data-document-file', item.path);
      if (item.path === file) link.setAttribute('aria-current', 'page');
      row.append(link);
      links.append(row);
    }
    section.append(links);
    navigation.append(section);
  }
  navigation.querySelector('[aria-current="page"]')?.scrollIntoView({block:'nearest'});
}
function syncDirectory() {
  for (const link of document.querySelector('#document-navigation').querySelectorAll('[data-document-file]')) {
    if (link.getAttribute('data-document-file') === file) {
      link.setAttribute('aria-current', 'page');
      link.closest('.document-group').open = true;
    } else link.removeAttribute('aria-current');
  }
}
function localPath(url) {
  if (url.origin !== libraryURL.origin || !url.pathname.startsWith(libraryURL.pathname)) return null;
  return decodeURIComponent(url.pathname.slice(libraryURL.pathname.length));
}
function prepareLinks(fragment, sourceURL) {
  for (const link of fragment.querySelectorAll('a[href]')) {
    const reference = link.getAttribute('href');
    if (reference.startsWith('#')) continue;
    const url = new URL(reference, sourceURL);
    const path = localPath(url);
    if (path !== null && isAllowedDocument(path)) {
      const reader = new URL('document.html', libraryURL);
      reader.searchParams.set('file', path);
      reader.hash = url.hash;
      link.href = reader.href;
    } else {
      if (path !== null && /^demos\/[A-Za-z0-9_-]+\/?$/.test(path)) {
        url.pathname = url.pathname.replace(/\/?$/, '/index.html');
      }
      link.href = url.href;
    }
  }
  for (const image of fragment.querySelectorAll('img[src]')) {
    image.src = new URL(image.getAttribute('src'), sourceURL).href;
    image.loading = 'lazy';
    image.decoding = 'async';
  }
}
function renderOutline(headings) {
  const outline = document.querySelector('#document-outline');
  const menu = document.querySelector('#document-outline-menu');
  const navigation = document.querySelector('#document-outline-navigation');
  const toggle = document.querySelector('#document-outline-toggle');
  const closeButton = document.querySelector('#document-outline-close');
  navigation.replaceChildren();
  const listeners = [];
  function listen(target, type, callback, options) {
    target.addEventListener(type, callback, options);
    listeners.push(() => target.removeEventListener(type, callback, options));
  }
  const reserved = new Set([...document.querySelectorAll('[id]')].filter(node => !headings.includes(node)).map(node => node.id));
  const links = headings.map(heading => {
    const base = heading.id || heading.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, '').replace(/[\s-]+/g, '-') || 'section';
    let id = base;
    let number = 2;
    while (reserved.has(id)) id = `${base}-${number++}`;
    reserved.add(id);
    heading.id = id;
    heading.tabIndex = -1;
    const link = document.createElement('a');
    link.href = '#' + encodeURIComponent(id);
    link.textContent = heading.textContent;
    link.className = 'outline-level-' + heading.tagName.slice(1);
    link.addEventListener('click', () => {
      if (!wide.matches) setOpen(false);
      heading.focus({preventScroll:true});
    });
    navigation.append(link);
    return link;
  });
  const wide = window.matchMedia('(min-width:1200px)');
  const compact = window.matchMedia('(max-width:800px)');
  const summary = menu.querySelector('summary');
  function setOpen(open, {restoreFocus = false} = {}) {
    menu.open = open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '收起本文目录' : '打开本文目录');
    if (restoreFocus) toggle.focus({preventScroll:true});
  }
  const syncLayout = () => {
    const active = document.activeElement;
    const inside = menu.contains(active);
    const controlFocused = active === toggle || active === closeButton;
    setOpen(wide.matches);
    toggle.hidden = !compact.matches;
    closeButton.hidden = !compact.matches;
    if (compact.matches && inside) toggle.focus({preventScroll:true});
    else if (wide.matches && (controlFocused || active === summary)) (navigation.querySelector('[aria-current="location"]') || links[0])?.focus({preventScroll:true});
    else if (!compact.matches && !wide.matches && (controlFocused || inside)) summary.focus({preventScroll:true});
  };
  syncLayout();
  listen(wide, 'change', syncLayout);
  listen(compact, 'change', syncLayout);
  listen(toggle, 'click', () => {
    setOpen(!menu.open);
    if (menu.open) {
      const current = navigation.querySelector('[aria-current="location"]');
      current?.focus({preventScroll:true});
      current?.scrollIntoView({block:'nearest'});
    }
  });
  listen(closeButton, 'click', () => setOpen(false, {restoreFocus:true}));
  listen(document, 'keydown', event => {
    if (!compact.matches || !menu.open || event.key !== 'Escape') return;
    event.preventDefault();
    setOpen(false, {restoreFocus:true});
  });
  listen(document, 'click', event => {
    if (!compact.matches || !menu.open || outline.contains(event.target)) return;
    setOpen(false, {restoreFocus:menu.contains(document.activeElement)});
  });
  outline.hidden = !headings.length;
  function updateCurrent() {
    const top = document.querySelector('.atlas-site-header').getBoundingClientRect().bottom + 24;
    let current = 0;
    headings.forEach((heading, index) => { if (heading.getBoundingClientRect().top <= top + 1) current = index; });
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = headings.length - 1;
    links.forEach((link, index) => index === current ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
  }
  let pending = false;
  listen(window, 'scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; updateCurrent(); });
  }, {passive:true});
  listen(window, 'resize', updateCurrent);
  const target = headings.find(heading => location.hash === '#' + encodeURIComponent(heading.id));
  target?.scrollIntoView({block:'start'});
  updateCurrent();
  return () => listeners.forEach(remove => remove());
}
function renderMarkdown(text, sourceURL) {
  if (!window.marked || !window.DOMPurify) throw new Error('文档渲染器加载失败，请刷新后重试。');
  const html = marked.parse(text.replace(/^[\u200B-\u200F\uFEFF]+/u, ''), {gfm:true, async:false});
  const fragment = DOMPurify.sanitize(html, {
    USE_PROFILES:{html:true}, RETURN_DOM_FRAGMENT:true,
    FORBID_TAGS:['style', 'iframe', 'form'], FORBID_ATTR:['style']
  });
  const heading = fragment.querySelector('h1');
  const headings = [...fragment.querySelectorAll('h1,h2')];
  const title = heading?.textContent.trim() || file.split('/').pop();
  // The page header already displays the document's leading title.
  heading?.remove();
  prepareLinks(fragment, sourceURL);
  for (const table of fragment.querySelectorAll('table')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '表格');
    table.replaceWith(wrapper);
    wrapper.append(table);
  }
  content.replaceChildren(fragment);
  return {title, headings:headings.map(node => node === heading ? document.querySelector('#title') : node)};
}
function focusDocument() {
  const target = currentHeadings.find(heading => location.hash === '#' + encodeURIComponent(heading.id));
  (target || document.querySelector('#main')).scrollIntoView({block:'start'});
  (target || document.querySelector('#title')).focus({preventScroll:true});
}
async function readDocument({focus = false} = {}) {
  activeRequest?.abort();
  const request = activeRequest = new AbortController();
  file = new URLSearchParams(location.search).get('file') || 'README.md';
  cleanupOutline();
  currentHeadings = [];
  syncDirectory();
  content.textContent = '正在读取文档…';
  content.removeAttribute('role');
  content.setAttribute('aria-busy', 'true');
  document.querySelector('#document-outline').hidden = true;
  document.querySelector('#download').hidden = true;
  const back = document.querySelector('#back');
  back.href = 'cases.html';
  back.textContent = '返回案例库';
  try {
    if (!documents.length) throw new Error('文档目录加载失败，请刷新后重试。');
    if (!isAllowedDocument(file)) throw new Error('请选择本站已公开的 Markdown 文档。');
    const sourceURL = new URL(file, libraryURL);
    const response = await fetch(sourceURL, {signal:request.signal});
    if (!response.ok) throw new Error(`文档读取失败（${response.status}）。`);
    // Decode the actual bytes explicitly; never let a browser guess a legacy charset.
    const text = new TextDecoder('utf-8', {fatal:true}).decode(await response.arrayBuffer());
    if (activeRequest !== request) return;
    const {title, headings} = renderMarkdown(text, sourceURL);
    currentHeadings = headings;
    document.querySelector('#title').textContent = title;
    document.querySelector('#path').textContent = file;
    document.title = `${title} · Design Atlas`;
    cleanupOutline = renderOutline(headings);
    const download = document.querySelector('#download');
    download.href = file;
    download.download = file.split('/').pop();
    download.textContent = `下载 ${download.download}`;
    download.hidden = false;
    const caseId = file.match(/^demos\/([A-Za-z0-9_-]+)\//)?.[1];
    if (caseId) {
      back.href = `cases.html#style/${caseId}`;
      back.textContent = '返回案例详情';
    }
    if (focus) focusDocument();
  } catch (error) {
    if (activeRequest !== request) return;
    content.textContent = error.message;
    content.setAttribute('role', 'alert');
  } finally {
    if (activeRequest === request) content.setAttribute('aria-busy', 'false');
  }
}
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const url = new URL(link.href, document.baseURI);
  if (url.origin !== libraryURL.origin || url.pathname !== new URL('document.html', libraryURL).pathname) return;
  const nextFile = url.searchParams.get('file') || 'README.md';
  if (!isAllowedDocument(nextFile)) return;
  if (nextFile === file && url.hash) return;
  event.preventDefault();
  history.pushState(null, '', url);
  readDocument({focus:true});
});
window.addEventListener('popstate', () => {
  if ((new URLSearchParams(location.search).get('file') || 'README.md') !== file) readDocument({focus:true});
  else focusDocument();
});
renderDirectory();
readDocument();
