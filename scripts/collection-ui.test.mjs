import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const atlasSource = fs.readFileSync(new URL('../atlas.js', import.meta.url), 'utf8');
const patternsSource = fs.readFileSync(new URL('../patterns-ui.js', import.meta.url), 'utf8');
const favoritesSource = fs.readFileSync(new URL('../favorites.js', import.meta.url), 'utf8');
const patternsPageSource = fs.readFileSync(new URL('../patterns-page.js', import.meta.url), 'utf8');
const entryFiles = fs.readdirSync(new URL('../entries/', import.meta.url)).filter(name => name.endsWith('.json'));
const entries = entryFiles.map(name => JSON.parse(fs.readFileSync(new URL(`../entries/${name}`, import.meta.url), 'utf8'))).sort((a, b) => a.order - b.order);
const fixturePatterns = [
  { id: 'focus-test', title: '悬停聚焦 <安全>', category: '交互反馈', experienceTypes: ['micro-motion'], summary: '聚焦当前内容', mechanism: '压低其他内容强调目标', trigger: '悬停或键盘聚焦', effect: '局部强调', useCases: ['展示平台'], avoid: ['纯触屏'], constraints: ['不能依赖颜色'], composition: { role: 'accent', notes: '只强调当前目标', pairsWellWith: ['loading-test'], conflicts: [] }, accessibility: { keyboard: 'focus-visible', reducedMotion: '移除位移' }, parameters: [{ name: '位移', value: '8px', note: '按内容调整' }], prompt: '用 <button> 实现悬停聚焦', sources: [{ caseId: entries[0].id, locator: 'interaction[0]', observation: '观察文本', evidence: 'observed', referenceUrl: 'https://example.com', capturedAt: '2026-10-08' }, { caseId: entries[1].id, locator: 'interaction[0]', observation: '适配文本', evidence: 'adapted' }], sourceFiles: [] },
  { id: 'loading-test', title: '加载遮罩', category: '加载与媒体', experienceTypes: ['page-motion'], summary: '明确页面状态', mechanism: '加载状态机', trigger: '资源等待', effect: '有界反馈', useCases: ['媒体'], avoid: ['永久拦截'], constraints: ['超时退出'], composition: { role: 'support', notes: '仅用于真实等待', pairsWellWith: [], conflicts: ['focus-test'] }, accessibility: { keyboard: '无需聚焦', reducedMotion: '静态文本' }, parameters: [], prompt: '实现有退出路径的加载状态', sources: [{ caseId: entries[0].id, locator: 'interaction[1]', observation: '设计推断文本', evidence: 'inferred', referenceUrl: 'javascript:alert(1)' }], sourceFiles: [] },
  { id: 'layout-test', title: '内容分组', category: '内容组织', experienceTypes: ['structure'], summary: '布局层级', mechanism: '语义分组', trigger: '内容出现', effect: '结构清晰', useCases: ['文档'], avoid: [], constraints: [], composition: { role: 'foundation', notes: '负责主体结构', pairsWellWith: [], conflicts: [] }, accessibility: { keyboard: '语义导航', reducedMotion: '静态' }, parameters: [], prompt: '分组内容', sources: [{ caseId: entries[2].id, locator: 'principles[0]', observation: '结构观察', evidence: 'adapted' }], sourceFiles: [] },
];

function page({ hash = '', clipboardRejects = false, data = entries, patterns = fixturePatterns, withPatterns = true, dedicated = false } = {}) {
  const nodes = new Map();
  const documentListeners = new Map();
  const windowListeners = new Map();
  const copied = [];
  const playgroundOperations = [];
  const previewOperations = [];
  const location = new URL(`https://atlas.test/cases.html?category=products&q=原有筛选${hash}`);
  const document = { activeElement: { tagName: 'BODY' } };
  function node(selector) {
    if (nodes.has(selector)) return nodes.get(selector);
    const classes = new Set();
    const attributes = new Map();
    const listeners = new Map();
    const element = {
      innerHTML: '', textContent: '', value: '', hidden: /patterns-library|pattern-detail|comparison|detail/.test(selector) || selector === '#pattern-demo-replay', dataset: {}, clientWidth: 1000,
      tagName: selector.includes('search') ? 'INPUT' : 'DIV',
      classList: { add: value => classes.add(value), remove: value => classes.delete(value), contains: value => classes.has(value), toggle(value, force) { if (force === undefined) force = !classes.has(value); force ? classes.add(value) : classes.delete(value); return force; } },
      style: { setProperty() {} },
      addEventListener(name, listener) { listeners.set(name, listener); },
      setAttribute(name, value) { attributes.set(name, value); }, removeAttribute(name) { attributes.delete(name); },
      append() {}, insertAdjacentHTML(_position, html) { element.innerHTML += html; }, scrollIntoView() {}, showModal() { element.open = true; },
      close() { element.open = false; listeners.get('close')?.({ target: element }); },
      querySelectorAll() { return []; },
      focus() { document.activeElement = element; }, select() { element.selected = true; },
      emit(name, value) { element.value = value; return listeners.get(name)?.({ target: element }); },
      click() { return listeners.get('click')?.({ target: element }); },
    };
    nodes.set(selector, element);
    return element;
  }
  document.querySelector = node;
  document.querySelectorAll = () => [];
  document.createElement = tag => node(`created:${tag}`);
  document.body = node('body');
  if (dedicated) document.body.classList.add('patterns-page');
  document.addEventListener = (name, listener) => { if (!documentListeners.has(name)) documentListeners.set(name, []); documentListeners.get(name).push(listener); };
  const window = { DESIGN_ATLAS: data, DESIGN_PATTERNS: patterns, DesignAtlasPreview: { mount: root => {
    previewOperations.push({root, action:'mount'});
    return {refresh() { previewOperations.push({root, action:'refresh'}); }, disconnect() { previewOperations.push({root, action:'disconnect'}); }};
  } }, addEventListener(name, listener) { if (!windowListeners.has(name)) windowListeners.set(name, []); windowListeners.get(name).push(listener); }, scrollTo() {} };
  if (dedicated) window.DesignAtlasPlayground = {
    labels: { visual: '视觉构成', 'micro-motion': '微动效', 'page-motion': '页面动效', sound: '声音反馈', structure: '内容与状态' },
    mount(root, { type = 'visual' } = {}) { root.dataset.type = type; root.innerHTML = type; playgroundOperations.push({ action: 'mount', root, type }); },
    dispose(root) { playgroundOperations.push({ action: 'dispose', root }); },
    disposeDetached() {},
  };
  const history = { replaceState(_state, _title, href) { location.href = new URL(href, location).href; }, pushState(_state, _title, href) { location.href = new URL(href, location).href; } };
  const scope = { window, document, location, history, URL, URLSearchParams, console, navigator: { clipboard: { async writeText(value) { if (clipboardRejects) throw Error('denied'); copied.push(value); } } }, localStorage: { getItem: () => null, setItem() {} }, ResizeObserver: class { observe() {} disconnect() {} }, setTimeout: () => 0, clearTimeout() {}, Blob };
  const context = vm.createContext(scope);
  vm.runInContext(favoritesSource, context, { filename: 'favorites.js', timeout: 2000 });
  if (withPatterns) vm.runInContext(patternsSource, context, { filename: 'patterns-ui.js', timeout: 2000 });
  vm.runInContext(dedicated ? patternsPageSource : atlasSource, context, { filename: dedicated ? 'patterns-page.js' : 'atlas.js', timeout: 2000 });
  return {
    node, location, copied, document, playgroundOperations, previewOperations,
    navigate(hash) { location.hash = hash; windowListeners.get('hashchange')?.forEach(listener => listener()); },
    backTo(href) { location.href = href; windowListeners.get('popstate')?.forEach(listener => listener()); },
    select(id, checked = true) { const target = { dataset: { compare: id }, checked, closest(selector) { return selector === '[data-compare]' ? target : null; } }; documentListeners.get('change')?.forEach(listener => listener({ target })); },
    key(key) { documentListeners.get('keydown')?.forEach(listener => listener({ key, preventDefault() {} })); },
  };
}

test('comparison keeps two or three complete cases within shared semantic rows and enforces selection limit', () => {
  const longFocus = 'LONG_CONTENT_'.repeat(120);
  const data = entries.map((entry, index) => index === 0 ? { ...entry, productFocus: longFocus } : entry);
  const fixture = page({ data });
  fixture.select(data[0].id); fixture.select(data[1].id);
  fixture.navigate('#compare');
  let html = fixture.node('#comparison').innerHTML;
  assert.match(html, /<table class="compare-table two">/);
  assert.match(html, /role="region"[^>]*tabindex="0"/);
  assert.ok(html.includes(longFocus), 'long content must remain complete');
  assert.equal((html.match(/data-compare-section=/g) || []).length, 10);
  for (const section of html.matchAll(/<tr data-compare-section="([^"]+)">(.*?)<\/tr>/gs)) {
    assert.equal((section[2].match(/<td headers=/g) || []).length, 2, section[1]);
    data.slice(0, 2).forEach(entry => assert.ok(section[2].includes(`compare-case-${entry.id}`)));
  }
  fixture.backTo('https://atlas.test/cases.html');
  fixture.select(data[2].id); fixture.select(data[3].id);
  assert.equal(fixture.node('#compare-count').textContent, 3, 'fourth selection is rejected');
  fixture.navigate('#compare');
  html = fixture.node('#comparison').innerHTML;
  assert.match(html, /<table class="compare-table ">/);
  assert.equal((html.match(/<td headers=/g) || []).length, 30);
  assert.ok(!html.includes(`<h2>${data[3].title}</h2>`));
  fixture.node('#compare-clear').onclick();
  assert.match(fixture.node('#comparison').innerHTML, /请先在案例库选择 2–3 个条目/);
});

test('pattern search combines URL query, category and source while preserving independent case filters', () => {
  const fixture = page({ hash: `#patterns?category=${encodeURIComponent('交互反馈')}&source=${entries[1].id}&q=${encodeURIComponent('悬停')}` });
  assert.equal(fixture.node('#patterns-library').hidden, false);
  assert.match(fixture.node('#pattern-results-label').textContent, /1 个机制/);
  assert.match(fixture.node('#pattern-cards').innerHTML, /focus-test/);
  assert.doesNotMatch(fixture.node('#pattern-cards').innerHTML, /loading-test|layout-test/);
  assert.match(fixture.node('#pattern-cards').innerHTML, /&lt;安全&gt;/);
  assert.equal(fixture.node('#pattern-category').value, '交互反馈');
  const previous = fixture.location.href;
  fixture.node('#pattern-source').emit('change', entries[2].id);
  assert.equal(fixture.node('#patterns-empty').hidden, false);
  assert.equal(fixture.location.searchParams.get('q'), '原有筛选');
  assert.equal(fixture.location.searchParams.get('category'), 'products');
  fixture.backTo(previous);
  assert.equal(fixture.node('#pattern-source').value, entries[1].id, 'Back restores source filter');
  assert.equal(fixture.node('#patterns-empty').hidden, true);
  fixture.node('#pattern-reset').click();
  assert.match(fixture.node('#pattern-results-label').textContent, /3 个机制/);
  assert.equal(fixture.location.hash, '#patterns');
});

test('pattern detail retains source provenance, composition links, exact Prompt and clipboard fallback', async () => {
  const fixture = page({ hash: '#pattern/focus-test?category=交互反馈', clipboardRejects: true });
  const html = fixture.node('#pattern-detail').innerHTML;
  assert.equal(fixture.node('#pattern-detail').hidden, false);
  assert.equal(fixture.node('#collection').hidden, true);
  assert.match(html, /#style\//);
  assert.match(html, /实访观察|练习适配/);
  assert.match(html, /#pattern\/loading-test/);
  assert.match(html, /agent\/patterns\/focus-test.json/);
  assert.match(html, /用 &lt;button&gt; 实现悬停聚焦/);
  await fixture.node('#copy-pattern-prompt').click();
  assert.equal(fixture.node('#pattern-prompt').selected, true);
  assert.match(fixture.node('#toast').textContent, /Ctrl\+C/);
  fixture.key('/');
  assert.equal(fixture.node('#patterns-library').hidden, false);
  assert.equal(fixture.document.activeElement, fixture.node('#pattern-search'));
  fixture.navigate('#pattern/loading-test');
  assert.doesNotMatch(fixture.node('#pattern-detail').innerHTML, /javascript:/);
  assert.match(fixture.node('#pattern-detail').innerHTML, /设计推断/);
  await fixture.node('#copy-pattern-prompt').click();
  const copySuccess = page({ hash: '#pattern/focus-test' });
  await copySuccess.node('#copy-pattern-prompt').click();
  assert.deepEqual(copySuccess.copied, [fixturePatterns[0].prompt], 'clipboard gets the exact canonical Prompt');
});

test('case details link back to related atoms without changing archived notes, and unknown atoms are recoverable', () => {
  const fixture = page({ hash: `#style/${entries[0].id}` });
  const html = fixture.node('#detail').innerHTML;
  assert.match(html, /这个案例的设计巧思/);
  assert.match(html, /#pattern\/focus-test\?source=/);
  const notes = html.split('<aside class="notes">')[1].split('</aside>')[0];
  assert.equal((notes.match(/<section>/g) || []).length, 7);
  assert.doesNotMatch(notes, /这个案例的设计巧思/);
  fixture.navigate('#pattern/missing');
  assert.match(fixture.node('#pattern-detail').innerHTML, /没有找到这个设计巧思/);
  fixture.navigate('#patterns?category=不存在&source=missing');
  assert.match(fixture.node('#pattern-results-label').textContent, /3 个机制/);
  const legacy = page({ hash: `#style/${entries[0].id}`, withPatterns: false });
  assert.equal(legacy.node('#detail').hidden, false, 'renderer works without pattern runtime for Agent extraction');
});

test('experience types combine with source and purpose filters and survive return navigation', () => {
  const fixture = page({ hash: '#patterns?type=micro-motion&category=交互反馈&source=' + entries[0].id });
  assert.match(fixture.node('#pattern-cards').innerHTML, /悬停聚焦/);
  assert.doesNotMatch(fixture.node('#pattern-cards').innerHTML, /加载遮罩|内容分组/);
  assert.equal(fixture.node('#pattern-type').value, 'micro-motion');
  fixture.node('#pattern-type').emit('change', 'structure');
  assert.equal(fixture.node('#patterns-empty').hidden, false);
  assert.match(fixture.location.hash, /type=structure/);
  fixture.navigate('#patterns?type=unknown');
  assert.equal(fixture.node('#pattern-type').value, 'all');
  assert.match(fixture.node('#pattern-results-label').textContent, /3 个机制/);
});

test('search shortcuts preserve both detail routes while a favorites or cache dialog is open', () => {
  for (const dedicated of [false, true]) {
    for (const selector of ['#favorite-dialog', '#asset-cache-dialog']) {
      const fixture = page({ dedicated, hash: dedicated ? '#pattern/focus-test' : `#style/${entries[0].id}` });
      const detail = fixture.node(dedicated ? '#pattern-detail' : '#detail');
      const dialog = fixture.node(selector);
      dialog.open = true;
      const before = fixture.location.href;
      fixture.key('/');
      assert.equal(fixture.location.href, before);
      assert.equal(detail.hidden, false);
      dialog.open = false;
      fixture.key('/');
      assert.equal(detail.hidden, true);
      assert.equal(fixture.document.activeElement, fixture.node(dedicated ? '#pattern-search' : '#search'));
    }
  }
});

test('pattern source Demo waits for its central action and keeps replay, source switching and preview cleanup', () => {
  const fixture = page({dedicated:true, hash:'#pattern/focus-test'});
  const frame = fixture.node('#pattern-live-frame');
  const start = fixture.node('#pattern-demo-start');
  const replay = fixture.node('#pattern-demo-replay');
  const refreshes = () => fixture.previewOperations.filter(operation => operation.action === 'refresh').length;
  assert.doesNotMatch(fixture.node('#pattern-detail').innerHTML, /<iframe/);
  assert.equal(replay.hidden, true);
  fixture.node('#pattern-demo-source').emit('change', entries[1].id);
  assert.equal(fixture.node('#pattern-demo-open').href, entries[1].demo);
  assert.doesNotMatch(frame.innerHTML, /<iframe/);
  assert.equal(refreshes(), 0);
  fixture.document.activeElement = start;
  start.click();
  assert.ok(frame.innerHTML.includes(`src="${entries[1].demo}"`));
  assert.equal(replay.hidden, false);
  assert.equal(fixture.document.activeElement, replay);
  assert.equal(refreshes(), 1);
  replay.click();
  assert.equal(refreshes(), 2);
  fixture.node('#pattern-demo-source').emit('change', entries[0].id);
  assert.ok(frame.innerHTML.includes(`src="${entries[0].demo}"`));
  assert.equal(refreshes(), 3);
  fixture.navigate('#patterns');
  assert.equal(fixture.previewOperations.at(-1).action, 'disconnect');
});

test('showcase dialog follows navigation, filter controls and history', () => {
  const fixture = page({ dedicated: true, hash: '#patterns?type=page-motion' });
  const panel = fixture.node('#pattern-showcase-panel'), showcase = fixture.node('#pattern-showcase');
  const mounts = () => fixture.playgroundOperations.filter(operation => operation.root === showcase && operation.action === 'mount');
  assert.equal(mounts().length, 0, 'closed showcase is not initialized');
  assert.match(fixture.node('#pattern-showcase-label').textContent, /页面动效/);
  fixture.node('#pattern-showcase-open').click();
  assert.equal(panel.open, true);
  assert.equal(mounts().at(-1).type, 'page-motion');
  fixture.navigate('#patterns?type=micro-motion');
  const previous = fixture.location.href;
  assert.equal(mounts().at(-1).type, 'micro-motion');
  fixture.node('#pattern-type').emit('change', 'sound');
  assert.equal(mounts().at(-1).type, 'sound');
  fixture.backTo(previous);
  assert.equal(mounts().at(-1).type, 'micro-motion');
  assert.match(fixture.node('#pattern-showcase-label').textContent, /微动效/);
  fixture.navigate('#patterns?type=unknown');
  assert.equal(mounts().at(-1).type, 'visual');
  assert.match(fixture.node('#pattern-showcase-label').textContent, /全部类型预览/);
});

test('showcase dialog preserves same-type controls and disposes on close or detail navigation', () => {
  const fixture = page({ dedicated: true, hash: '#patterns?type=visual' });
  const panel = fixture.node('#pattern-showcase-panel'), showcase = fixture.node('#pattern-showcase');
  const operations = () => fixture.playgroundOperations.filter(operation => operation.root === showcase);
  fixture.node('#pattern-showcase-open').click();
  showcase.innerHTML = 'user-adjusted-preview';
  fixture.node('#pattern-search').emit('input', '悬停');
  fixture.node('#pattern-category').emit('change', '交互反馈');
  fixture.node('#pattern-source').emit('change', entries[0].id);
  assert.equal(operations().filter(operation => operation.action === 'mount').length, 1);
  assert.equal(showcase.innerHTML, 'user-adjusted-preview');
  fixture.navigate('#pattern/focus-test?type=visual');
  assert.equal(panel.open, false);
  assert.equal(fixture.node('#pattern-showcase-open').hidden, true);
  assert.equal(operations().at(-1).action, 'dispose');
  fixture.key('/');
  assert.equal(fixture.node('#patterns-library').hidden, false);
  assert.equal(fixture.document.activeElement, fixture.node('#pattern-search'));
  assert.equal(operations().at(-1).action, 'dispose');
  assert.equal(fixture.node('#pattern-showcase-open').hidden, false);
  fixture.node('#pattern-showcase-open').click();
  panel.close();
  assert.equal(operations().at(-1).action, 'dispose');
  fixture.node('#pattern-type').emit('change', 'structure');
  assert.equal(operations().at(-1).action, 'dispose');
  fixture.node('#pattern-showcase-open').click();
  assert.equal(operations().at(-1).type, 'structure');
});
