import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../document.js', import.meta.url), 'utf8');
const documents = [
  {path:'README.md', title:'项目指南', group:'项目指南'},
  {path:'research/OVERVIEW.md', title:'调研方法', group:'研究方法与索引'},
];

async function page(search = '', {headings, wide = true} = {}) {
  const fetched = [];
  const links = [];
  const created = [];
  const events = new Map();
  let outlineHeadings = [];
  function element(tagName = 'div') {
    const attributes = {};
    const children = [];
    const listeners = new Map();
    const node = {tagName:tagName.toUpperCase(), attributes, children, textContent:'', hidden:true, position:1000,
      append(...items) { children.push(...items); },
      replaceChildren(...items) { children.splice(0, children.length, ...items); },
      setAttribute(name, value) { attributes[name] = value; },
      removeAttribute(name) { delete attributes[name]; },
      remove() { node.removed = true; },
      querySelector() { return links.find(link => link.attributes['aria-current'] === 'page'); },
      getBoundingClientRect() { return {top:node.position, bottom:88}; },
      scrollIntoView() { node.scrolled = true; node.position = 112; },
      focus() { document.activeElement = node; },
      addEventListener(name, listener) { listeners.set(name, listener); },
      click() { listeners.get('click')?.(); },
    };
    created.push(node);
    if (node.tagName === 'A') links.push(node);
    return node;
  }
  const nodes = new Map();
  const document = {
    baseURI:'https://atlas.test/document.html',
    documentElement:{scrollHeight:3000},
    createElement:element,
    querySelector(selector) {
      if (!nodes.has(selector)) {
        const node = element(selector === '#title' ? 'h1' : 'div');
        if (selector.startsWith('#')) node.id = selector.slice(1);
        nodes.set(selector, node);
      }
      return nodes.get(selector);
    },
    querySelectorAll() { return created.filter(node => node.id && !node.removed); },
  };
  const window = {DESIGN_ATLAS_DOCUMENTS:documents, innerHeight:900, scrollY:0,
    matchMedia:() => ({matches:wide, addEventListener() {}}),
    addEventListener(name, listener) { events.set(name, listener); },
  };
  const scope = {
    document, window,
    location:new URL('https://atlas.test/document.html' + search), URL, URLSearchParams,
    TextDecoder, requestAnimationFrame:callback => callback(),
    fetch:async url => { fetched.push(url.href); return headings ? {ok:true, arrayBuffer:async () => Buffer.from('# document')} : {ok:false, status:503}; },
  };
  if (headings) {
    const sourceHeadings = headings.map(([tag, text]) => Object.assign(element(tag), {textContent:text}));
    const fragment = {
      querySelector:() => sourceHeadings.find(node => node.tagName === 'H1'),
      querySelectorAll:selector => selector === 'h1,h2' ? sourceHeadings.filter(node => /H[12]/.test(node.tagName)) : [],
    };
    window.marked = scope.marked = {parse:() => 'parsed document'};
    window.DOMPurify = scope.DOMPurify = {sanitize:() => fragment};
    outlineHeadings = sourceHeadings.filter(node => /H[12]/.test(node.tagName));
    outlineHeadings[0] = document.querySelector('#title');
  }
  await vm.runInNewContext(source, scope);
  return {fetched, links, headings:outlineHeadings, document, window, node:selector => nodes.get(selector),
    scroll(positions) {
      outlineHeadings.forEach((heading, index) => { heading.position = positions[index]; });
      events.get('scroll')?.();
    },
  };
}

test('document center opens the project guide and retains encoded document deep links', async () => {
  const home = await page();
  assert.deepEqual(home.fetched, ['https://atlas.test/README.md']);
  assert.equal(home.node('#document-count').textContent, '2');
  assert.equal(home.links.length, 2);
  assert.equal(home.links[0].attributes['aria-current'], 'page');
  assert.equal(home.links[1].href, 'document.html?file=research%2FOVERVIEW.md');
  const deepLink = await page('?file=research%2FOVERVIEW.md#sources');
  assert.deepEqual(deepLink.fetched, ['https://atlas.test/research/OVERVIEW.md']);
  assert.equal(deepLink.links[1].attributes['aria-current'], 'page');
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
  const outline = fixture.links.slice(2);
  assert.deepEqual(outline.map(link => link.textContent), ['页面指南', '开始', '开始', '下一章']);
  assert.deepEqual(outline.map(link => link.href), ['#title', '#' + encodeURIComponent('开始'), hash, '#' + encodeURIComponent('下一章')]);
  assert.equal(fixture.headings[2].scrolled, true);
  assert.equal(outline[2].attributes['aria-current'], 'location');
  fixture.scroll([-300, -80, 500, 1200]);
  assert.equal(outline[1].attributes['aria-current'], 'location');
  assert.equal(outline[2].attributes['aria-current'], undefined);
  fixture.window.scrollY = 2100;
  fixture.scroll([-300, -80, 500, 1200]);
  assert.equal(outline[3].attributes['aria-current'], 'location');
  const reload = await page('?file=README.md', {headings});
  assert.deepEqual(reload.links.slice(2).map(link => link.href), outline.map(link => link.href));
  assert.equal(fixture.node('#document-outline-menu').open, true);
});

test('narrow document outline starts collapsed and restores focus to a selected content heading', async () => {
  const fixture = await page('', {wide:false, headings:[['h1','指南'], ['h2','操作']]});
  const menu = fixture.node('#document-outline-menu');
  assert.equal(menu.open, false);
  menu.open = true;
  fixture.links[3].click();
  assert.equal(menu.open, false);
  assert.equal(fixture.document.activeElement, fixture.headings[1]);
  assert.equal(fixture.headings[1].tabIndex, -1);
});
