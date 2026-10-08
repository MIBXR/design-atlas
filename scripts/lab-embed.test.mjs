import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const homeSource = fs.readFileSync(new URL('../home.js', import.meta.url), 'utf8');
const shellSource = fs.readFileSync(new URL('../site-shell.js', import.meta.url), 'utf8');
const labSource = fs.readFileSync(new URL('../fundamentals.js', import.meta.url), 'utf8');
function home() {
  const frame = { contentWindow: {}, style: {} };
  const listeners = new Map();
  const document = {
    querySelector: selector => selector === '.landing-lab-frame' ? frame : null,
    querySelectorAll: () => [],
    getElementById: () => ({ addEventListener() {} }),
  };
  const location = new URL('https://atlas.test/index.html');
  const window = { addEventListener: (name, listener) => listeners.set(name, listener) };
  vm.runInNewContext(homeSource, { document, window, location }, { timeout: 1000 });
  return { frame, send: event => listeners.get('message')(event) };
}

test('the live lab can resize its iframe while untrusted windows and invalid messages are ignored', () => {
  const fixture = home();
  const trusted = { origin: 'https://atlas.test', source: fixture.frame.contentWindow, data: { type: 'design-atlas:lab-height', height: 628.4 } };
  fixture.send(trusted);
  assert.equal(fixture.frame.style.height, '629px');
  const rejected = [
    { ...trusted, origin: 'https://other.test' },
    { ...trusted, source: {} },
    { ...trusted, data: { type: 'other-message', height: 900 } },
    ...[null, '900', NaN, Infinity, 0, -1].map(height => ({ ...trusted, data: { type: 'design-atlas:lab-height', height } })),
  ];
  for (const message of rejected) {
    fixture.send(message);
    assert.equal(fixture.frame.style.height, '629px');
  }
  fixture.send({ ...trusted, data: { type: 'design-atlas:lab-height', height: 90 } });
  assert.equal(fixture.frame.style.height, '300px');
  fixture.send({ ...trusted, data: { type: 'design-atlas:lab-height', height: 5000 } });
  assert.equal(fixture.frame.style.height, '2000px');
});

test('the home embed skips responsive menus and leaves the focused real experiment alone', () => {
  const document = {
    documentElement: { dataset: { labEmbed: 'home' } },
    querySelectorAll() { throw new Error('The embedded lab must not initialize hidden page menus'); },
  };
  vm.runInNewContext(shellSource, { document, window: {} }, { timeout: 1000 });
});

function experiment({ embed = false, width = 822, height = 416 } = {}) {
  const nodes = new Map();
  let activeElement;
  let resizeObserver;
  let measuredHeight = height;
  const reports = [];
  const makeNode = () => ({
    listeners: new Map(), attributes: {}, dataset: {}, value: '', hidden: true,
    style: { properties: new Map(), setProperty(name, value) { this.properties.set(name, value); } },
    classList: { toggle() {}, add() {}, remove() {} },
    addEventListener(name, handler) { this.listeners.set(name, handler); },
    setAttribute(name, value) { this.attributes[name] = value; },
    append() {}, before() {}, after() {}, insertAdjacentHTML() {}, replaceChildren() {},
    focus() { activeElement = this; },
  });
  const node = id => { if (!nodes.has(id)) nodes.set(id, makeNode()); return nodes.get(id); };
  const schemes = ['paper', 'friendly', 'tool'].map(id => Object.assign(makeNode(), { dataset: { scheme: id } }));
  const selectors = new Map([
    ['.element-controls', node('controls')], ['.experiment', node('experiment')],
    ['.note-preview-top', node('note-top')], ['.note-preview h4', node('note-title')],
  ]);
  const document = {
    documentElement: { dataset: embed ? { labEmbed: 'home' } : {} }, getElementById: node,
    querySelector: selector => selectors.get(selector),
    querySelectorAll: selector => selector === '[data-scheme]' ? schemes : [],
    createElement: makeNode, createTextNode: text => ({ textContent: text }),
  };
  const location = new URL(`https://atlas.test/fundamentals.html${embed ? '?embed=home' : ''}`);
  const media = { matches: false, addEventListener() {} };
  const window = { innerWidth: width };
  window.parent = embed ? { postMessage(message, origin) { reports.push({ message, origin }); } } : window;
  node('lab').getBoundingClientRect = () => ({ height: measuredHeight });
  const ResizeObserver = class { constructor(callback) { resizeObserver = callback; } observe() {} };
  vm.runInNewContext(labSource, { document, window, location, URL, URLSearchParams, ResizeObserver, history: { replaceState() {} }, matchMedia: () => media }, { timeout: 1000 });
  return {
    node, reports, select: index => schemes[index].listeners.get('click')(), focus: () => activeElement,
    resize(nextWidth, nextHeight) { window.innerWidth = nextWidth; measuredHeight = nextHeight; resizeObserver(); },
  };
}

test('all base presets begin in YaHei sans while an explicit font experiment remains available', () => {
  const lab = experiment();
  const palettes = [
    ['#f7f7f5', '#101010', '#373737'],
    ['#fefbff', '#1c1b1d', '#6442d6'],
    ['#f2efe6', '#171717', '#e3402e'],
  ];
  for (let index = 0; index < 3; index++) {
    lab.select(index);
    assert.equal(lab.node('type-choice').value, 'sans');
    assert.match(lab.node('sample').style.properties.get('--font-title'), /Microsoft YaHei/);
    assert.deepEqual(['color-bg', 'color-ink', 'color-accent'].map(id => lab.node(id).value), palettes[index]);
  }
  lab.node('type-choice').listeners.get('change')({ target: { value: 'serif' } });
  assert.match(lab.node('sample').style.properties.get('--font-title'), /Georgia/);
});

test('the real note composer can return focus and preserves its draft and saved note through preset switches', () => {
  const lab = experiment();
  lab.node('sample-action').listeners.get('click')();
  assert.equal(lab.node('sample-compose').hidden, false);
  assert.equal(lab.node('sample-action').attributes['aria-expanded'], 'true');
  assert.strictEqual(lab.focus(), lab.node('sample-note'));
  lab.node('sample-note').value = '散步时发现的光影';
  let prevented = false;
  lab.node('sample-compose').listeners.get('submit')({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(lab.node('note-title').textContent, '散步时发现的光影');
  lab.select(1);
  lab.select(2);
  assert.equal(lab.node('sample-note').value, '散步时发现的光影');
  assert.equal(lab.node('note-title').textContent, '散步时发现的光影');
  lab.node('sample-cancel').listeners.get('click')();
  assert.equal(lab.node('sample-compose').hidden, true);
  assert.equal(lab.node('sample-action').attributes['aria-expanded'], 'false');
  assert.strictEqual(lab.focus(), lab.node('sample-action'));
});

test('the actual embed reports its measured width even when its natural height stays unchanged', () => {
  const lab = experiment({ embed: true });
  assert.equal(lab.reports.length, 1);
  assert.equal(lab.reports[0].origin, 'https://atlas.test');
  assert.equal(lab.reports[0].message.type, 'design-atlas:lab-height');
  assert.equal(lab.reports[0].message.height, 416);
  assert.equal(lab.reports[0].message.width, 822);
  lab.resize(822, 416);
  assert.equal(lab.reports.length, 1);
  lab.resize(720, 416);
  assert.equal(lab.reports.length, 2);
  assert.equal(lab.reports[1].message.width, 720);
  lab.resize(720, 650);
  assert.equal(lab.reports.length, 3);
  assert.equal(lab.reports[2].message.height, 650);
  lab.resize(720, -1);
  lab.resize(NaN, 650);
  assert.equal(lab.reports.length, 3);
});
