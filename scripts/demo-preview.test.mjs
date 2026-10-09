import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../demo-preview.js', import.meta.url), 'utf8');
function preview({ loaded = true, mode = 'desktop' } = {}) {
  const classes = new Set(), events = new Map();
  const frame = { style: {} };
  const controls = ['desktop', 'wide', 'mobile'].map(value => ({
    dataset: { viewport: value }, attributes: {}, active: false,
    classList: { toggle(_class, active) { this.owner.active = active; } },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(_event, listener) { this.click = listener; },
  }));
  controls.forEach(button => { button.classList.owner = button; });
  const wrap = {
    clientWidth: 720, style: { setProperty(name, value) { this[name] = value; } },
    classList: { toggle(name, active) { active ? classes.add(name) : classes.delete(name); } },
    querySelector() { return loaded ? frame : null; },
    closest() { return { getBoundingClientRect: () => ({ top: 0 }) }; },
    getBoundingClientRect: () => ({ top: 112 }),
  };
  const window = { innerHeight: 720, addEventListener(name, listener) { events.set(name, listener); }, removeEventListener(name) { events.delete(name); } };
  let observer;
  vm.runInNewContext(source, {
    window, document: { querySelector: () => ({ getBoundingClientRect: () => ({ height: 88 }) }) },
    getComputedStyle: () => ({ borderTopWidth: '1px', borderBottomWidth: '1px', paddingTop: classes.has('mobile') ? '12px' : '0px', paddingBottom: classes.has('mobile') ? '12px' : '0px' }),
    ResizeObserver: class { constructor(callback) { observer = this; this.resize = callback; } observe() {} disconnect() { this.disconnected = true; } },
  });
  const controller = window.DesignAtlasPreview.mount(wrap, controls, mode);
  return { window, wrap, frame, controls, classes, events, observer, controller, load() { loaded = true; controller.refresh(); } };
}

test('three preview modes share the real viewport height budget and resize without overflowing their frame', () => {
  const view = preview();
  assert.equal(view.wrap.style.height, '484px');
  assert.equal(view.frame.style.height, '482px');
  view.controls[1].click();
  assert.equal(view.wrap.style['--preview-scale'], .5);
  assert.equal(view.frame.style.height, '964px');
  assert.equal(view.controls[1].attributes['aria-pressed'], 'true');
  assert.equal(view.controls.filter(button => button.active).length, 1);
  view.wrap.clientWidth = 360;
  view.observer.resize();
  assert.equal(view.wrap.style['--preview-scale'], .25);
  assert.equal(view.frame.style.height, '1928px');
  view.controls[2].click();
  assert.ok(view.classes.has('mobile'));
  assert.ok(!view.classes.has('wide'));
  assert.equal(view.frame.style.height, '458px');
  view.window.innerHeight = 500;
  view.events.get('resize')();
  assert.equal(view.wrap.style.height, '264px');
  assert.equal(view.frame.style.height, '238px');
  view.controls[0].click();
  assert.equal(view.frame.style.height, '262px');
  view.controller.disconnect();
  assert.equal(view.observer.disconnected, true);
  assert.equal(view.events.has('resize'), false);
});

test('an unloaded source stays lazy and retains its chosen viewport when loaded or replayed', () => {
  const view = preview({ loaded: false, mode: 'wide' });
  assert.equal(view.wrap.style.height, undefined);
  assert.equal(view.controls[1].attributes['aria-pressed'], 'true');
  view.controls[2].click();
  assert.equal(view.classes.size, 0);
  view.load();
  assert.ok(view.classes.has('mobile'));
  assert.equal(view.frame.style.height, '458px');
  view.controller.refresh();
  assert.equal(view.controls[2].attributes['aria-pressed'], 'true');
});
