import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site-shell.js', import.meta.url), 'utf8');
function page({ compact = false, menuCount = 1 } = {}) {
  const documentListeners = new Map();
  const windowListeners = new Map();
  const mediaListeners = new Map();
  const navigationCalls = [];
  const document = {
    activeElement: { name: 'body' },
    addEventListener: (name, listener) => documentListeners.set(name, listener),
  };
  const menus = Array.from({ length: menuCount }, () => {
    const summary = { name: 'summary', focus() { document.activeElement = summary; } };
    const filter = { name: 'filter' };
    return {
      open: false, summary, filter,
      contains: element => element === summary || element === filter,
      querySelector: selector => selector === 'summary' ? summary : null,
    };
  });
  document.querySelectorAll = selector => selector === '.atlas-page-menu' ? menus : [];
  const media = { matches: compact, addEventListener: (name, listener) => mediaListeners.set(name, listener) };
  let mediaQueries = 0;
  const window = {
    location: { href: 'https://atlas.test/cases.html', replace: value => navigationCalls.push(value) },
    history: { pushState: (...values) => navigationCalls.push(values), replaceState: (...values) => navigationCalls.push(values) },
    addEventListener: (name, listener) => windowListeners.set(name, listener),
    matchMedia(query) { assert.equal(query, '(max-width: 800px)'); mediaQueries++; return media; },
  };
  vm.runInNewContext(source, { document, window }, { timeout: 1000, filename: 'site-shell.js' });
  return {
    document, menus, media, documentListeners, windowListeners, navigationCalls,
    mediaQueries: () => mediaQueries,
    resize(isCompact) { media.matches = isCompact; mediaListeners.get('change')?.(); },
    click(target) {
      let prevented = false;
      documentListeners.get('click')?.({ target, preventDefault() { prevented = true; } });
      return prevented;
    },
    back() { windowListeners.get('popstate')?.(); },
  };
}

test('page directories use responsive defaults and leave user toggles and filter focus intact', () => {
  const desktop = page({ compact: false, menuCount: 2 });
  assert.ok(desktop.menus.every(menu => menu.open));
  desktop.menus[0].open = false;
  desktop.click({ href: '#lab' });
  assert.equal(desktop.menus[0].open, false, 'ordinary interactions must not reset a manual toggle');

  const mobile = page({ compact: true });
  const menu = mobile.menus[0];
  assert.equal(menu.open, false);
  menu.open = true;
  mobile.document.activeElement = menu.filter;
  assert.equal(mobile.click(menu.filter), false);
  assert.equal(menu.open, true, 'choosing a filter must not hide the focused button');
  assert.equal(mobile.document.activeElement, menu.filter);
});

test('crossing into the compact layout keeps focus visible without moving unrelated focus', () => {
  const fixture = page();
  const menu = fixture.menus[0];
  fixture.document.activeElement = menu.filter;
  fixture.resize(true);
  assert.equal(menu.open, false);
  assert.equal(fixture.document.activeElement, menu.summary);
  fixture.resize(false);
  assert.equal(menu.open, true);

  const outside = { name: 'main-link' };
  fixture.document.activeElement = outside;
  fixture.resize(true);
  assert.equal(fixture.document.activeElement, outside);
});

test('real navigation and rapid Back do not get intercepted or close manually expanded menus', () => {
  const fixture = page({ compact: true });
  const menu = fixture.menus[0];
  menu.open = true;
  for (const href of ['index.html', 'cases.html', 'fundamentals.html?style=notion-editorial', 'agent.html', '#elements']) {
    assert.equal(fixture.click({ href }), false, href);
  }
  fixture.back();
  fixture.back();
  assert.equal(menu.open, true);
  assert.deepEqual(fixture.navigationCalls, []);
});

test('pages without a local directory initialize without media listeners or navigation work', () => {
  const fixture = page({ menuCount: 0 });
  assert.equal(fixture.mediaQueries(), 0);
  assert.equal(fixture.documentListeners.size, 0);
  assert.equal(fixture.windowListeners.size, 0);
  assert.deepEqual(fixture.navigationCalls, []);
});
