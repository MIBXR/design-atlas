import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../document.js', import.meta.url), 'utf8');
const documents = [
  {path:'README.md', title:'项目指南', group:'项目指南'},
  {path:'CONTRIBUTING.md', title:'维护指南', group:'项目指南'},
  {path:'research/OVERVIEW.md', title:'调研方法', group:'研究方法与索引'},
  {path:'demos/zelda-world/fidelity.md', title:'复现说明', group:'案例研究'},
];
const flush = async () => { await new Promise(resolve => setImmediate(resolve)); };

async function page(search = '', {headings, headingsByFile = {}, wide = true, compact = false, deferFrom = Infinity} = {}) {
  const fetched = [], requests = [], media = new Map();
  function eventTarget() {
    const listeners = new Map();
    return {
      addEventListener(name, listener) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(listener); },
      removeEventListener(name, listener) { listeners.get(name)?.delete(listener); },
      emit(name, event = {}) { for (const listener of [...listeners.get(name) || []]) listener(event); },
      listenerCount(name) { return listeners.get(name)?.size || 0; },
    };
  }
  function matches(node, selector) {
    if (selector.includes(',')) return selector.split(',').some(part => matches(node, part.trim()));
    if (selector.startsWith('#')) return node.id === selector.slice(1);
    const match = selector.match(/^(\w+)?(?:\.([\w-]+))?(?:\[([\w-]+)(?:="?([^"\]]+)"?)?\])?$/);
    return !!match && (!match[1] || node.tagName === match[1].toUpperCase()) && (!match[2] || node.className?.split(' ').includes(match[2])) && (!match[3] || node.getAttribute(match[3]) !== null && (match[4] === undefined || node.getAttribute(match[3]) === match[4]));
  }
  function descendants(node) { return node.children.flatMap(child => [child, ...descendants(child)]); }
  function element(tagName = 'div') {
    const node = Object.assign(eventTarget(), {tagName:tagName.toUpperCase(), attributes:{}, children:[], textContent:'', hidden:false, position:1000, scrollTop:0,
      append(...items) { items.forEach(item => { item.parentElement = node; node.children.push(item); }); },
      replaceChildren(...items) { node.children.forEach(child => { child.parentElement = null; }); node.children = []; node.append(...items); },
      setAttribute(name, value) { node.attributes[name] = String(value); if (name === 'id') node.id = String(value); },
      getAttribute(name) { return node.attributes[name] ?? node[name] ?? null; },
      hasAttribute(name) { return node.getAttribute(name) !== null; },
      removeAttribute(name) { delete node.attributes[name]; },
      remove() { if (node.parentElement) node.parentElement.children.splice(node.parentElement.children.indexOf(node), 1); node.parentElement = null; },
      querySelectorAll(selector) { return descendants(node).filter(child => matches(child, selector)); },
      querySelector(selector) { return node.querySelectorAll(selector)[0] || null; },
      closest(selector) { return matches(node, selector) ? node : node.parentElement?.closest(selector) || null; },
      contains(target) { return target === node || descendants(node).includes(target); },
      getBoundingClientRect() { return {top:node.position, bottom:88}; },
      scrollIntoView() { node.scrolled = true; node.position = 112; },
      focus() { document.activeElement = node; },
      click(options = {}) {
        node.focus();
        const event = {target:node, button:0, defaultPrevented:false, preventDefault() { this.defaultPrevented = true; }, ...options};
        node.emit('click', event); document.emit('click', event);
        return event;
      },
    });
    return node;
  }
  const nodes = new Map();
  const document = Object.assign(eventTarget(), {baseURI:'https://atlas.test/document.html', documentElement:{scrollHeight:3000}, createElement:element,
    querySelector(selector) {
      if (!nodes.has(selector)) { const node = element(selector === '#title' ? 'h1' : selector === '#document-outline-menu' ? 'details' : 'div'); if (selector.startsWith('#')) node.id = selector.slice(1); nodes.set(selector, node); }
      return nodes.get(selector);
    },
    querySelectorAll(selector) { return [...nodes.values(), ...[...nodes.values()].flatMap(descendants)].filter((node, index, all) => all.indexOf(node) === index && matches(node, selector)); },
    getElementById(id) { return document.querySelectorAll('[id]').find(node => node.id === id) || null; },
  });
  const node = selector => document.querySelector(selector);
  node('#document-outline-menu').append(element('summary'), node('#document-outline-close'), node('#document-outline-navigation'));
  node('#document-outline').append(node('#document-outline-toggle'), node('#document-outline-menu'));
  node('#page-directory').append(node('#document-navigation'));
  node('#main').append(node('#title'), node('#document-outline'), node('#content'));
  const location = new URL(document.baseURI + search);
  Object.defineProperty(document, 'baseURI', {get:() => location.href});
  const historyEntries = [location.href]; let historyIndex = 0;
  const history = {
    pushState(_, __, url) { location.href = new URL(url, location).href; historyEntries.splice(++historyIndex); historyEntries.push(location.href); },
    async go(delta) { historyIndex += delta; location.href = historyEntries[historyIndex]; window.emit('popstate'); await flush(); },
    back() { return history.go(-1); }, forward() { return history.go(1); },
  };
  const window = Object.assign(eventTarget(), {DESIGN_ATLAS_DOCUMENTS:documents, innerHeight:900, scrollY:0, location, history,
    matchMedia(query) {
      if (!media.has(query)) media.set(query, Object.assign(eventTarget(), {matches:query.includes('max-width') ? compact : wide}));
      return media.get(query);
    },
  });
  const scope = {document, window, location, history, URL, URLSearchParams, AbortController, TextDecoder, requestAnimationFrame:callback => callback(),
    fetch:async (url, options = {}) => {
      const path = url.pathname.slice(1); fetched.push(url.href);
      const response = {ok:!!(headings || headingsByFile[path]), status:503, arrayBuffer:async () => Buffer.from(path)};
      const request = {path, signal:options.signal}; requests.push(request);
      return requests.length - 1 < deferFrom ? response : new Promise(resolve => { request.resolve = () => resolve(response); });
    },
  };
  if (headings || Object.keys(headingsByFile).length) {
    window.marked = scope.marked = {parse:text => text};
    window.DOMPurify = scope.DOMPurify = {sanitize:path => {
      const fragment = element('fragment');
      fragment.append(...(headingsByFile[path] || headings).map(([tag, text]) => Object.assign(element(tag), {textContent:text})));
      return fragment;
    }};
  }
  await vm.runInNewContext(source, scope); await flush();
  const directoryLinks = () => node('#document-navigation').querySelectorAll('a');
  const outlineLinks = () => node('#document-outline-navigation').querySelectorAll('a');
  return {fetched, requests, document, window, history, location, node, media,
    get links() { return [...directoryLinks(), ...outlineLinks()]; },
    get headings() { return outlineLinks().map(link => document.getElementById(decodeURIComponent(link.href.slice(1)))); },
    get groups() { return node('#document-navigation').querySelectorAll('details'); },
    documentLink(file) { return directoryLinks().find(link => new URL(link.href, location).searchParams.get('file') === file); },
    async open(file, hash = '') { const link = this.documentLink(file); const oldHref = link.href; link.href = oldHref + hash; const event = link.click(); link.href = oldHref; await flush(); return event; },
    key(key) { document.emit('keydown', {key, preventDefault() {}}); },
    outside(target) { document.emit('click', {target:{closest:() => null, ...target}, button:0, preventDefault() {}}); },
    resize({wide, compact}) { const changed = []; for (const [query, match] of media) { const matches = query.includes('max-width') ? compact : wide; if (match.matches !== matches) changed.push(match); match.matches = matches; } changed.forEach(match => match.emit('change')); },
    scroll(positions) { this.headings.forEach((heading, index) => { heading.position = positions[index]; }); window.emit('scroll'); },
    outlineLinks, directoryLinks,
  };
}

test('document center opens the project guide and retains encoded document deep links', async () => {
  const home = await page();
  assert.deepEqual(home.fetched, ['https://atlas.test/README.md']);
  assert.equal(home.node('#document-count').textContent, String(documents.length));
  assert.equal(home.links.length, documents.length);
  assert.equal(home.documentLink('README.md').attributes['aria-current'], 'page');
  assert.equal(home.documentLink('research/OVERVIEW.md').href, 'document.html?file=research%2FOVERVIEW.md');
  const deepLink = await page('?file=research%2FOVERVIEW.md#sources');
  assert.deepEqual(deepLink.fetched, ['https://atlas.test/research/OVERVIEW.md']);
  assert.equal(deepLink.documentLink('research/OVERVIEW.md').attributes['aria-current'], 'page');
});

test('document reader rejects unpublished files, traversal and external paths before fetching', async () => {
  for (const file of ['AGENTS.md', 'research/unpublished.md', 'demos/../README.md', 'https://example.com/README.md', '.git/config.md']) {
    const fixture = await page('?file=' + encodeURIComponent(file));
    assert.deepEqual(fixture.fetched, [], file);
    assert.equal(fixture.node('#content').attributes.role, 'alert');
    assert.equal(fixture.node('#content').attributes['aria-busy'], 'false');
  }
});

test('current document outline includes level one and two headings with stable unique anchors', async () => {
  const headings = [['h1','页面指南'], ['h2','开始'], ['h3','内部细节'], ['h2','开始'], ['h1','下一章']];
  const hash = '#' + encodeURIComponent('开始-2');
  const fixture = await page('?file=README.md' + hash, {headings});
  assert.equal(fixture.node('#content').attributes.role, undefined);
  const outline = fixture.outlineLinks();
  assert.deepEqual(outline.map(link => link.textContent), ['页面指南', '开始', '开始', '下一章']);
  assert.deepEqual(outline.map(link => link.href), ['#title', '#' + encodeURIComponent('开始'), hash, '#' + encodeURIComponent('下一章')]);
  assert.equal(fixture.headings[2].scrolled, true);
  assert.equal(outline[2].attributes['aria-current'], 'location');
  fixture.scroll([-300, -80, 500, 1200]);
  assert.equal(outline[1].attributes['aria-current'], 'location');
  assert.equal(outline[2].attributes['aria-current'], undefined);
  fixture.window.scrollY = 2100; fixture.scroll([-300, -80, 500, 1200]);
  assert.equal(outline[3].attributes['aria-current'], 'location');
  const reload = await page('?file=README.md', {headings});
  assert.deepEqual(reload.outlineLinks().map(link => link.href), outline.map(link => link.href));
  assert.equal(fixture.node('#document-outline-menu').open, true);
});

test('narrow document outline starts collapsed and restores focus to a selected content heading', async () => {
  const fixture = await page('', {wide:false, headings:[['h1','指南'], ['h2','操作']]});
  const menu = fixture.node('#document-outline-menu');
  assert.equal(menu.open, false); menu.open = true;
  fixture.outlineLinks()[1].click();
  assert.equal(menu.open, false);
  assert.equal(fixture.document.activeElement, fixture.headings[1]);
  assert.equal(fixture.headings[1].tabIndex, -1);
});

test('mobile outline opens from its floating control, closes accessibly and yields to the main directory', async () => {
  const fixture = await page('', {wide:false, compact:true, headings:[['h1','指南'], ['h2','操作']]});
  const menu = fixture.node('#document-outline-menu'), toggle = fixture.node('#document-outline-toggle');
  assert.equal(menu.open, false); assert.equal(toggle.hidden, false);
  toggle.click(); assert.equal(menu.open, true); assert.equal(toggle.attributes['aria-expanded'], 'true');
  assert.equal(fixture.document.activeElement, fixture.outlineLinks()[0]);
  fixture.key('Escape'); assert.equal(menu.open, false); assert.equal(fixture.document.activeElement, toggle);
  toggle.click(); fixture.node('#document-outline-close').click();
  assert.equal(menu.open, false); assert.equal(fixture.document.activeElement, toggle);
  toggle.click(); fixture.outlineLinks()[1].click();
  assert.equal(menu.open, false); assert.equal(fixture.document.activeElement, fixture.headings[1]); assert.equal(toggle.attributes['aria-expanded'], 'false');
  toggle.click(); const directory = fixture.node('#page-directory'); directory.focus();
  fixture.outside({id:'header-directory-toggle'});
  assert.equal(menu.open, false); assert.equal(fixture.document.activeElement, directory);
});

test('document outline moves focus to a visible control when its responsive layout changes', async () => {
  const fixture = await page('', {headings:[['h1','指南'], ['h2','操作']]});
  const menu = fixture.node('#document-outline-menu'), toggle = fixture.node('#document-outline-toggle'), summary = menu.querySelector('summary');
  fixture.outlineLinks()[1].focus(); fixture.resize({wide:false, compact:true});
  assert.equal(menu.open, false); assert.equal(fixture.document.activeElement, toggle);
  fixture.resize({wide:true, compact:false}); assert.equal(toggle.hidden, true); assert.equal(menu.open, true); assert.equal(fixture.document.activeElement, fixture.outlineLinks()[0]);
  fixture.resize({wide:false, compact:false}); assert.equal(menu.open, false); assert.equal(fixture.document.activeElement, summary);
  fixture.resize({wide:false, compact:true}); assert.equal(fixture.document.activeElement, toggle);
  fixture.resize({wide:false, compact:false}); assert.equal(fixture.document.activeElement, summary);
  fixture.resize({wide:true, compact:false}); assert.equal(fixture.document.activeElement, fixture.outlineLinks()[0]);
});

test('document groups initially reveal the current category and navigation preserves sidebar state and scroll', async () => {
  const fixture = await page('', {headings:[['h1','指南'], ['h2','操作']]});
  assert.deepEqual(fixture.groups.map(group => group.open), [true, false, false]);
  const navigation = fixture.node('#document-navigation'), groups = [...fixture.groups], links = [...fixture.directoryLinks()];
  groups[2].open = true; groups[0].open = false; fixture.node('#page-directory').scrollTop = 237;
  const event = await fixture.open('research/OVERVIEW.md');
  assert.equal(event.defaultPrevented, true);
  assert.deepEqual(fixture.groups, groups); assert.deepEqual(fixture.directoryLinks(), links);
  assert.equal(fixture.node('#document-navigation'), navigation);
  assert.equal(fixture.node('#page-directory').scrollTop, 237);
  assert.deepEqual(fixture.groups.map(group => group.open), [false, true, true]);
  assert.equal(fixture.documentLink('research/OVERVIEW.md').attributes['aria-current'], 'page');
  assert.equal(fixture.documentLink('README.md').attributes['aria-current'], undefined);
});

test('document navigation and browser history restore the selected document and its heading deep link', async () => {
  const fixture = await page('', {headingsByFile:{'README.md':[['h1','项目指南'], ['h2','开始']], 'research/OVERVIEW.md':[['h1','调研方法'], ['h2','来源']]}});
  await fixture.open('research/OVERVIEW.md', '#' + encodeURIComponent('来源'));
  assert.equal(fixture.location.searchParams.get('file'), 'research/OVERVIEW.md'); assert.equal(fixture.node('#title').textContent, '调研方法');
  assert.equal(fixture.headings[1].scrolled, true); assert.equal(fixture.document.activeElement, fixture.headings[1]);
  await fixture.history.back(); assert.equal(fixture.node('#title').textContent, '项目指南'); assert.equal(fixture.documentLink('README.md').attributes['aria-current'], 'page');
  await fixture.history.forward(); assert.equal(fixture.node('#title').textContent, '调研方法'); assert.equal(fixture.headings[1].scrolled, true);
  const fetched = fixture.fetched.length;
  assert.equal(fixture.outlineLinks()[0].click().defaultPrevented, false);
  await flush(); assert.equal(fixture.fetched.length, fetched, 'the current outline uses native anchors without refetching its document');
  fixture.history.pushState(null, '', '#title'); await fixture.history.back();
  assert.equal(fixture.fetched.length, fetched, 'same-document hash history only changes the reading position');
  assert.equal(fixture.document.activeElement, fixture.headings[1]);
});

test('fast document changes abort the superseded fetch and only the newest response may update the reader', async () => {
  const fixture = await page('', {deferFrom:1, headingsByFile:{'README.md':[['h1','项目指南']], 'CONTRIBUTING.md':[['h1','维护指南']], 'research/OVERVIEW.md':[['h1','调研方法']]}});
  await fixture.open('CONTRIBUTING.md'); await fixture.open('research/OVERVIEW.md');
  const older = fixture.requests[1], newer = fixture.requests[2];
  assert.equal(older.signal.aborted, true); assert.equal(newer.signal.aborted, false);
  newer.resolve(); await flush(); assert.equal(fixture.node('#title').textContent, '调研方法');
  older.resolve(); await flush();
  assert.equal(fixture.node('#title').textContent, '调研方法'); assert.equal(fixture.node('#content').attributes['aria-busy'], 'false');
  assert.equal(fixture.node('#path').textContent, 'research/OVERVIEW.md');
});

test('repeated document changes replace outline links and dispose its listeners', async () => {
  const fixture = await page('', {headings:[['h1','指南'], ['h2','操作']]});
  const counts = () => [fixture.document.listenerCount('click'), fixture.document.listenerCount('keydown'), fixture.window.listenerCount('scroll'), fixture.window.listenerCount('resize'), fixture.node('#document-outline-toggle').listenerCount('click'), ...[...fixture.media.values()].map(match => match.listenerCount('change'))];
  const baseline = counts();
  for (const file of ['CONTRIBUTING.md', 'research/OVERVIEW.md', 'README.md']) {
    const previous = fixture.outlineLinks()[1]; await fixture.open(file);
    assert.equal(fixture.outlineLinks().length, 2); assert.equal(previous.parentElement, null);
    assert.deepEqual(counts(), baseline);
  }
  assert.deepEqual(fixture.outlineLinks().map(link => link.href), ['#title', '#' + encodeURIComponent('操作')]);
});

test('document interception retains modified clicks, downloads and external links as native navigation', async () => {
  const fixture = await page('', {headings:[['h1','指南']]});
  const link = fixture.documentLink('CONTRIBUTING.md'), count = fixture.fetched.length;
  for (const options of [{ctrlKey:true}, {metaKey:true}, {shiftKey:true}, {altKey:true}, {button:1}]) assert.equal(link.click(options).defaultPrevented, false);
  link.click({defaultPrevented:true});
  link.target = '_blank'; assert.equal(link.click().defaultPrevented, false); delete link.target;
  link.download = 'CONTRIBUTING.md'; assert.equal(link.click().defaultPrevented, false); delete link.download;
  const original = link.href; link.href = 'https://example.com/document.html?file=README.md'; assert.equal(link.click().defaultPrevented, false); link.href = original;
  assert.equal(fixture.fetched.length, count);
});
