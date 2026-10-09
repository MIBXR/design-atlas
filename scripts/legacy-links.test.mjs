import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../legacy-links.js', import.meta.url), 'utf8');
function visit(href) {
  const listeners = new Map();
  const replacements = [];
  const location = new URL(href);
  location.replace = destination => replacements.push(destination);
  const window = { location, addEventListener: (event, listener) => listeners.set(event, listener) };
  vm.runInNewContext(source, { window, URL }, { timeout: 1000, filename: 'legacy-links.js' });
  return { location, listeners, replacements };
}

test('root and index collection URLs replace the entry while preserving the entire URL state', () => {
  const states = [
    '#style/notion-editorial', '#compare', '?category=games', '?country=%E6%97%A5%E6%9C%AC',
    '?q=grid%20motion', '?sort=title', '?q=', '?category=unknown',
    '?utm_source=archive&q=one%2Ftwo%20%26&q=second&sort=title#style/notion-editorial',
    '#style%2Fnotion-editorial', '#style/%ZZ',
  ];
  for (const pathname of ['/', '/index.html']) {
    for (const state of states) {
      const href = `https://atlas.test${pathname}${state}`;
      const result = visit(href);
      const expected = new URL(href);
      expected.pathname = '/cases.html';
      assert.deepEqual(result.replacements, [expected.href], href);
    }
  }
});

test('normal landing anchors and campaign parameters remain on the landing page', () => {
  for (const state of ['', '#features', '#workflow', '?utm_source=share#features', '?query=grid', '#compare-notes', '#style']) {
    assert.deepEqual(visit(`https://atlas.test/${state}`).replacements, [], state);
  }
});

test('the compatibility handler does not reroute cases or independent module and demo paths', () => {
  for (const pathname of ['/cases.html', '/fundamentals.html', '/agent.html', '/document.html', '/demos/notion-editorial/index.html']) {
    const result = visit(`https://atlas.test${pathname}?q=grid#style/notion-editorial`);
    assert.deepEqual(result.replacements, [], pathname);
  }
});

test('legacy state added after arriving on the landing page is restored on hash and history navigation', () => {
  const hashNavigation = visit('https://atlas.test/');
  hashNavigation.location.hash = '#style/google-material';
  hashNavigation.listeners.get('hashchange')();
  assert.deepEqual(hashNavigation.replacements, ['https://atlas.test/cases.html#style/google-material']);

  const historyNavigation = visit('https://atlas.test/index.html?utm_source=share');
  historyNavigation.location.search = '?country=Japan&q=grid';
  historyNavigation.listeners.get('popstate')();
  assert.deepEqual(historyNavigation.replacements, ['https://atlas.test/cases.html?country=Japan&q=grid']);
});

test('legacy pattern collection and detail links reach the independent page with filters intact', () => {
  for (const path of ['/', '/index.html', '/cases.html', '/cases']) for (const hash of ['#patterns', '#patterns?type=sound&source=zelda-world', '#pattern/sound-opt-in?type=sound']) {
    const href = 'https://atlas.test' + path + '?utm_source=shared' + hash;
    const expected = new URL(href); expected.pathname = '/patterns.html';
    assert.deepEqual(visit(href).replacements, [expected.href]);
  }
  assert.deepEqual(visit('https://atlas.test/patterns.html#patterns?type=visual').replacements, []);
});
