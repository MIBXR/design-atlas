import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../theme.js', import.meta.url), 'utf8');
const themeKey = 'atlas-color-scheme';

function sharedStorage() {
  const values = new Map(), documents = new Set();
  return {
    values,
    connect(receive) {
      documents.add(receive);
      return {
        getItem: key => values.get(key) ?? null,
        setItem(key, value) {
          values.set(key, value);
          for (const other of documents) if (other !== receive) other({ key });
        },
      };
    },
    clear() {
      values.clear();
      for (const receive of documents) receive({ key: null });
    },
  };
}

function page({ store = sharedStorage(), systemDark = false, denied = false, embedded = false, mounted = true } = {}) {
  const documentListeners = new Map(), windowListeners = new Map(), mediaListeners = new Map();
  const root = { dataset: embedded ? { labEmbed: 'home' } : {}, style: {} };
  const favicon = { href: 'favicon.svg', getAttribute: () => favicon.href, setAttribute: (name, value) => { favicon[name] = value; } };
  const button = {
    dataset: {}, setAttribute() {},
    closest: selector => selector === 'button[data-theme-toggle]' ? button : null,
  };
  const media = { matches: systemDark, addEventListener: (name, listener) => mediaListeners.set(name, listener) };
  const storage = store.connect(event => windowListeners.get('storage')?.(event));
  const fail = () => { throw new Error('Storage denied'); };
  vm.runInNewContext(source, {
    localStorage: denied ? { getItem: fail, setItem: fail } : storage,
    matchMedia: () => media,
    document: {
      documentElement: root,
      addEventListener: (name, listener) => documentListeners.set(name, listener),
      querySelectorAll: selector => selector === 'link[rel~="icon"]' ? [favicon] : mounted && selector === 'button[data-theme-toggle]' ? [button] : [],
    },
    window: { addEventListener: (name, listener) => windowListeners.set(name, listener) },
  }, { timeout: 1000, filename: 'theme.js' });
  return {
    button, favicon, mode: () => root.dataset.atlasThemeChoice, resolved: () => root.dataset.atlasTheme,
    mount() { mounted = true; documentListeners.get('DOMContentLoaded')?.(); },
    click(target = button) { documentListeners.get('click')({ target }); },
    system(dark) { media.matches = dark; mediaListeners.get('change')?.(); },
  };
}

test('theme applies before controls mount and cycles system, dark, light, system', () => {
  const store = sharedStorage(), fixture = page({ store, mounted: false });
  assert.equal(fixture.mode(), 'system');
  assert.equal(fixture.resolved(), 'light');
  fixture.mount();
  for (const expected of ['dark', 'light', 'system']) {
    fixture.click();
    assert.equal(fixture.mode(), expected);
    assert.equal(store.values.get(themeKey), expected);
  }
});

test('system follows OS changes while both manual themes keep their chosen appearance', () => {
  const fixture = page();
  fixture.system(true);
  assert.equal(fixture.resolved(), 'dark');
  fixture.system(false);
  assert.equal(fixture.resolved(), 'light');
  fixture.click(); // Manual dark.
  fixture.system(true); fixture.system(false);
  assert.equal(fixture.resolved(), 'dark');
  fixture.click(); // Manual light.
  fixture.system(false); fixture.system(true);
  assert.equal(fixture.resolved(), 'light');
});

test('same-origin documents and the hidden home lab share storage changes and clear', () => {
  const store = sharedStorage(), parent = page({ store }), lab = page({ store, embedded: true });
  parent.click();
  assert.equal(lab.mode(), 'dark');
  assert.equal(lab.resolved(), 'dark');
  assert.equal(page({ store, mounted: false }).resolved(), 'dark', 'saved choice applies before page controls exist');
  lab.click();
  assert.equal(parent.mode(), 'light');
  parent.system(true); lab.system(true);
  store.clear();
  for (const fixture of [parent, lab]) {
    assert.equal(fixture.mode(), 'system');
    assert.equal(fixture.resolved(), 'dark');
  }
});

test('storage refusal leaves the three-state control usable in the current document', () => {
  const fixture = page({ denied: true });
  for (const expected of ['dark', 'light', 'system']) {
    assert.doesNotThrow(() => fixture.click());
    assert.equal(fixture.mode(), expected);
  }
});

test('a click on an SVG child delegates to its theme button', () => {
  const fixture = page();
  const path = { closest: selector => selector === 'button[data-theme-toggle]' ? fixture.button : null };
  fixture.click(path);
  assert.equal(fixture.mode(), 'dark');
});

test('favicon tracks resolved system appearance and manual theme overrides', () => {
  const fixture = page();
  assert.equal(fixture.favicon.href, 'favicon-light.svg?v=atlas-cross-1');
  fixture.system(true);
  assert.equal(fixture.favicon.href, 'favicon-dark.svg?v=atlas-cross-1');
  fixture.click(); // Manual dark, even when the OS becomes light.
  fixture.system(false);
  assert.equal(fixture.favicon.href, 'favicon-dark.svg?v=atlas-cross-1');
  fixture.click(); // Manual light, even when the OS becomes dark.
  fixture.system(true);
  assert.equal(fixture.favicon.href, 'favicon-light.svg?v=atlas-cross-1');
  fixture.click(); // Follow the dark OS again.
  assert.equal(fixture.favicon.href, 'favicon-dark.svg?v=atlas-cross-1');
});
