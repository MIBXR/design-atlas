import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site-shell.js', import.meta.url), 'utf8');
function page({ compact = false, menuCount = 2, hasDirectory = true, embedded = false, hasTools = false, cacheApi, reducedMotion = false } = {}) {
  const documentListeners = new Map();
  const windowListeners = new Map();
  const mediaListeners = new Map();
  const navigationCalls = [];
  const scrollCalls = [];
  const document = { activeElement: { name: 'body' }, documentElement: { dataset: embedded ? { labEmbed: 'home' } : {} }, addEventListener: (name, listener) => documentListeners.set(name, listener) };
  function element(name, { inside = false, href, action = false } = {}) {
    const attributes = new Map(href === undefined ? [] : [['href', href]]);
    const listeners = new Map();
    return {
      name, inside, action, hidden: false, scrollTop: 50,
      addEventListener: (type, listener) => listeners.set(type, listener),
      focus() { document.activeElement = this; },
      getAttribute: key => attributes.get(key) ?? null,
      setAttribute: (key, value) => attributes.set(key, value),
      hasAttribute: key => attributes.has(key),
      toggleAttribute(key, force) { force ? attributes.set(key, '') : attributes.delete(key); },
      contains(target) { return target === this || target?.parent === this; },
      closest() { return this.action ? this : this.parent?.action ? this.parent : null; },
      activate() { return listeners.get('click')?.(); },
      emit(type) { listeners.get(type)?.(); },
    };
  }
  const toggle = element('toggle');
  const closeButton = element('close', { inside: true });
  const filter = element('filter', { inside: true, action: true });
  const main = element('main');
  const favoriteDialog = element('favorite-dialog');
  document.body = element('body');
  const cacheStatus = element('cache-status');
  const cacheClear = element('cache-clear');
  const loadedScripts = [];
  let cacheButton, cacheDialog, backToTop;
  const themeControl = element('theme-control');
  themeControl.insertAdjacentElement = (_, button) => { cacheButton = button; };
  document.body.append = node => { if (node.name === 'dialog') cacheDialog = node; else backToTop = node; };
  document.head = { append: script => loadedScripts.push(script) };
  document.createElement = tag => {
    const node = element(tag);
    if (tag === 'dialog') {
      node.querySelector = selector => selector === '#cache-status' ? cacheStatus : selector === '#cache-clear' ? cacheClear : null;
      node.showModal = () => { node.open = true; };
    }
    return node;
  };
  document.activeElement = document.body;
  const directory = element('directory', { inside: true });
  directory.contains = target => !!target?.inside;
  const menus = Array.from({ length: menuCount }, () => ({ open: false }));
  directory.querySelectorAll = selector => selector === '.atlas-page-menu' ? menus : [];
  directory.querySelector = selector => selector === '[data-directory-close]' ? closeButton : selector === 'nav a[href], nav button' ? filter : null;
  document.querySelector = selector => selector === '[data-page-directory]' ? hasDirectory ? directory : null : selector === '[data-directory-toggle]' ? hasDirectory ? toggle : null : selector === '[data-theme-toggle]' ? hasTools ? themeControl : null : selector === 'main' ? main : selector === '#favorite-dialog' ? favoriteDialog : null;
  const sections = new Map([['lab', element('lab')], ['elements', element('elements')], ['prompt', element('prompt')]]);
  document.getElementById = id => sections.get(id) || null;
  const media = { matches: compact, addEventListener: (name, listener) => mediaListeners.set(name, listener) };
  let mediaQueries = 0;
  const window = {
    DesignAtlasAssetCache: cacheApi,
    innerHeight:800, scrollY:0,
    addEventListener: (name, listener) => windowListeners.set(name, listener),
    scrollTo(options) { scrollCalls.push(options); window.scrollY = options.top; windowListeners.get('scroll')?.(); },
    location: { href: 'https://atlas.test/fundamentals.html', replace: value => navigationCalls.push(value) },
    history: { pushState: (...values) => navigationCalls.push(values), replaceState: (...values) => navigationCalls.push(values) },
    matchMedia(query) {
      if (query === '(prefers-reduced-motion: reduce)') return {matches:reducedMotion};
      assert.equal(query, '(max-width: 800px)'); mediaQueries++; return media;
    },
  };
  vm.runInNewContext(source, { document, window, URL }, { timeout: 1000, filename: 'site-shell.js' });
  return {
    document, window, menus, media, directory, toggle, closeButton, filter, main, favoriteDialog, sections, documentListeners, navigationCalls, element, cacheButton, cacheDialog, cacheStatus, cacheClear, loadedScripts, backToTop, scrollCalls,
    mediaQueries: () => mediaQueries,
    scroll(top) { window.scrollY = top; windowListeners.get('scroll')?.(); },
    resize(isCompact) { media.matches = isCompact; mediaListeners.get('change')?.(); },
    click(target) {
      let prevented = false;
      target.activate?.();
      documentListeners.get('click')?.({ target, preventDefault() { prevented = true; } });
      return prevented;
    },
    escape() {
      let prevented = false;
      documentListeners.get('keydown')?.({ key: 'Escape', preventDefault() { prevented = true; } });
      return prevented;
    },
  };
}

test('the shared header opens and clears media cache independently of favorites and directories', async () => {
  const calls = [];
  const fixture = page({ hasDirectory: false, hasTools: true, cacheApi: {
    status: async () => { calls.push('status'); return { available: true, files: 4, bytes: 3 * 1024 * 1024 }; },
    clear: async () => { calls.push('clear'); return { available: true, files: 0, bytes: 0 }; },
  } });
  assert.equal(fixture.cacheButton.getAttribute('aria-controls'), fixture.cacheDialog.id);
  assert.equal(fixture.cacheButton.getAttribute('aria-haspopup'), 'dialog');
  assert.match(fixture.cacheDialog.innerHTML, /<form method="dialog">/);
  await fixture.cacheButton.activate();
  assert.equal(fixture.cacheDialog.open, true);
  assert.equal(fixture.cacheStatus.textContent, '4 项 · 3.0 MiB');
  assert.equal(fixture.cacheClear.disabled, false);
  await fixture.cacheClear.activate();
  assert.match(fixture.cacheStatus.textContent, /^0 项 · 0\.0 MiB · 下次打开时按需重新下载$/);
  assert.deepEqual(calls, ['status', 'clear']);
  assert.equal(fixture.favoriteDialog.open, undefined);
  assert.equal(fixture.loadedScripts.length, 0);
});

test('pages without the cache runtime load it on demand and retain unsupported-browser feedback', async () => {
  const fixture = page({ hasDirectory: false, hasTools: true });
  assert.equal(fixture.loadedScripts.length, 0);
  const opening = fixture.cacheButton.activate();
  assert.equal(fixture.loadedScripts.length, 1);
  assert.equal(fixture.loadedScripts[0].src, 'asset-cache.js');
  assert.equal(fixture.cacheClear.disabled, true);
  fixture.window.DesignAtlasAssetCache = { status: async () => ({ available: false }) };
  fixture.loadedScripts[0].onload();
  await opening;
  assert.match(fixture.cacheStatus.textContent, /此浏览器暂不支持持久素材缓存/);
  assert.equal(fixture.cacheClear.disabled, true);
  assert.equal(fixture.mediaQueries(), 0);
});

test('mobile hides the complete directory and one header control reveals all subdirectories', () => {
  const mobile = page({ compact: true });
  assert.equal(mobile.directory.hidden, true, 'utilities and submenus share the hidden aside');
  assert.equal(mobile.toggle.hidden, false);
  assert.equal(mobile.toggle.getAttribute('aria-expanded'), 'false');
  mobile.menus[0].open = false;
  mobile.click(mobile.toggle);
  assert.equal(mobile.directory.hidden, false);
  assert.equal(mobile.directory.hasAttribute('data-directory-open'), true);
  assert.ok(mobile.menus.every(menu => menu.open), 'opening must not require a second disclosure');
  assert.equal(mobile.directory.scrollTop, 0);
  assert.equal(mobile.toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(mobile.document.activeElement, mobile.directory);
  assert.equal(mobile.escape(), true);
  assert.equal(mobile.directory.hidden, true);
  assert.equal(mobile.toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(mobile.document.activeElement, mobile.toggle);
  mobile.click(mobile.toggle); mobile.click(mobile.closeButton);
  assert.equal(mobile.document.activeElement, mobile.toggle);
  assert.equal(mobile.directory.hidden, true);
});

test('choosing a filter or native section link dismisses the directory and focuses visible content', () => {
  const mobile = page({ compact: true });
  mobile.click(mobile.toggle);
  mobile.document.activeElement = mobile.filter;
  assert.equal(mobile.click(mobile.filter), false);
  assert.equal(mobile.directory.hidden, true);
  assert.equal(mobile.document.activeElement, mobile.main);
  mobile.click(mobile.toggle);
  const link = mobile.element('section-link', { inside: true, action: true, href: '#elements' });
  mobile.document.activeElement = link;
  assert.equal(mobile.click(link), false, 'native hash scrolling must not be prevented');
  assert.equal(mobile.directory.hidden, true);
  assert.equal(mobile.document.activeElement, mobile.sections.get('elements'));
  assert.equal(mobile.sections.get('elements').getAttribute('tabindex'), '-1');
  assert.deepEqual(mobile.navigationCalls, [], 'shell does not rewrite route or history');
});

test('outside dismissal preserves a newly focused control and returns stranded panel focus to the toggle', () => {
  const mobile = page({ compact: true });
  mobile.click(mobile.toggle);
  const outsideControl = mobile.element('search');
  mobile.document.activeElement = outsideControl;
  mobile.click(outsideControl);
  assert.equal(mobile.directory.hidden, true);
  assert.equal(mobile.document.activeElement, outsideControl);
  mobile.click(mobile.toggle);
  mobile.click(mobile.element('plain-content'));
  assert.equal(mobile.document.activeElement, mobile.toggle);
});

test('tools that open dialogs retain dialog focus when the directory closes', () => {
  const mobile = page({ compact: true });
  mobile.click(mobile.toggle);
  const favoriteTool = mobile.element('favorite-manage', { inside: true, action: true });
  const dialog = mobile.element('dialog-close');
  mobile.document.activeElement = dialog; // showModal ran in the target listener.
  mobile.click(favoriteTool);
  assert.equal(mobile.directory.hidden, true);
  assert.equal(mobile.document.activeElement, dialog);
});

test('closing favorites restores the visible directory control only when the hidden opener stranded focus', () => {
  const mobile = page({ compact: true });
  function openFavorites() {
    mobile.click(mobile.toggle);
    const tool = mobile.element('favorite-manage', { inside: true, action: true });
    tool.id = 'favorite-manage';
    mobile.favoriteDialog.open = true;
    const dialogControl = mobile.element('dialog-close');
    dialogControl.parent = mobile.favoriteDialog;
    mobile.document.activeElement = dialogControl;
    mobile.click(tool);
    assert.equal(mobile.document.activeElement, dialogControl, 'opening must retain modal focus');
    mobile.favoriteDialog.open = false;
  }
  openFavorites();
  mobile.document.activeElement = mobile.document.body;
  mobile.favoriteDialog.emit('close');
  assert.equal(mobile.document.activeElement, mobile.toggle);
  openFavorites();
  const newVisibleFocus = mobile.element('search');
  mobile.document.activeElement = newVisibleFocus;
  mobile.favoriteDialog.emit('close');
  assert.equal(mobile.document.activeElement, newVisibleFocus, 'never steal a new visible focus');
  mobile.document.activeElement = mobile.document.body;
  mobile.favoriteDialog.emit('close');
  assert.equal(mobile.document.activeElement, mobile.document.body, 'unrelated subsequent close events do not restore');
});

test('desktop keeps the original sidebar and breakpoint changes never leave focus in hidden controls', () => {
  const fixture = page();
  assert.equal(fixture.toggle.hidden, true);
  assert.equal(fixture.directory.hidden, false);
  assert.ok(fixture.menus.every(menu => menu.open));
  fixture.menus[0].open = false;
  fixture.document.activeElement = fixture.filter;
  fixture.click(fixture.filter);
  assert.equal(fixture.menus[0].open, false, 'desktop interactions preserve native manual toggles');
  assert.equal(fixture.document.activeElement, fixture.filter);
  fixture.resize(true);
  assert.equal(fixture.directory.hidden, true);
  assert.equal(fixture.document.activeElement, fixture.toggle);
  fixture.resize(false);
  assert.equal(fixture.directory.hidden, false);
  assert.equal(fixture.document.activeElement, fixture.filter);
  fixture.resize(true); fixture.click(fixture.toggle);
  fixture.document.activeElement = fixture.closeButton;
  fixture.resize(false);
  assert.equal(fixture.document.activeElement, fixture.filter);
  const outside = fixture.element('main-link');
  fixture.document.activeElement = outside;
  fixture.resize(true);
  assert.equal(fixture.document.activeElement, outside);
});

test('embedded home lab skips shared controls and pages without directories skip directory listeners', () => {
  for (const options of [{ hasDirectory: false }, { embedded: true }]) {
    const fixture = page(options);
    assert.equal(fixture.mediaQueries(), 0);
    assert.equal(fixture.documentListeners.size, 0);
    assert.deepEqual(fixture.navigationCalls, []);
    assert.equal(!!fixture.backToTop, !options.embedded);
  }
});

test('outer pages show back to top after one viewport and respect motion preferences', () => {
  for (const reducedMotion of [false, true]) {
    const fixture = page({hasDirectory:false, reducedMotion});
    assert.equal(fixture.backToTop.hidden, true);
    assert.equal(fixture.backToTop.textContent, '回到顶部');
    fixture.scroll(800);
    assert.equal(fixture.backToTop.hidden, true);
    fixture.scroll(801);
    assert.equal(fixture.backToTop.hidden, false);
    fixture.document.activeElement = fixture.backToTop;
    fixture.click(fixture.backToTop);
    assert.equal(fixture.scrollCalls[0].top, 0);
    assert.equal(fixture.scrollCalls[0].behavior, reducedMotion ? 'instant' : 'smooth');
    assert.equal(fixture.backToTop.hidden, true);
    assert.equal(fixture.document.activeElement, fixture.main);
  }
});

test('both real page headers own an accessible directory button beside theme and reuse the entire aside', () => {
  for (const name of ['cases.html', 'fundamentals.html']) {
    const html = fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
    assert.match(html, /<div class="atlas-site-theme"><button[^>]*data-directory-toggle[^>]*aria-controls="page-directory"[^>]*aria-expanded="false"[^>]*hidden>/);
    assert.match(html, /<aside[^>]*class="[^"]*atlas-page-directory[^>]*id="page-directory"[^>]*data-page-directory[^>]*tabindex="-1"/);
    assert.match(html, /<main[^>]*id="main"[^>]*tabindex="-1"/);
  }
});
