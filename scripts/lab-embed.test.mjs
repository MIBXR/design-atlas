import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const homeSource = fs.readFileSync(new URL('../home.js', import.meta.url), 'utf8');
const shellSource = fs.readFileSync(new URL('../site-shell.js', import.meta.url), 'utf8');
function home() {
  const frame = { contentWindow: {}, style: {} };
  const listeners = new Map();
  const document = {
    querySelector: () => frame,
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
