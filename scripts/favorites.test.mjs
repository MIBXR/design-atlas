import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../favorites.js', import.meta.url), 'utf8');
const key = 'atlas-favorites-v2', legacyKey = 'atlas-favorites';
const backup = (cases = [], patterns = []) => ({ format: 'design-atlas-favorites', version: 2, cases, patterns });
function page(initial = {}, { failRead = false, failWrite = false } = {}) {
  const storage = new Map(Object.entries(initial).map(([name, value]) => [name, JSON.stringify(value)]));
  const events = new Map();
  const window = {
    DESIGN_ATLAS: [{ id: 'case-a' }, { id: 'case-b' }, { id: 'shared' }],
    DESIGN_PATTERNS: [{ id: 'pattern-a' }, { id: 'pattern-b' }, { id: 'shared' }],
    addEventListener: (name, listener) => events.set(name, listener),
  };
  const localStorage = {
    getItem(name) { if (failRead) throw Error('denied'); return storage.get(name) ?? null; },
    setItem(name, value) { if (failWrite) throw Error('quota'); storage.set(name, value); },
  };
  vm.runInNewContext(source, { window, localStorage, Date, JSON }, { filename: 'favorites.js' });
  return { api: window.DesignAtlasFavorites, storage, emit(name, value) { events.get('storage')({ key: name, newValue: value === null ? null : JSON.stringify(value) }); } };
}
const plain = value => JSON.parse(JSON.stringify(value));

test('legacy storage and backups preserve case favorites while namespaces stay independent', () => {
  const { api, storage } = page({ [legacyKey]: ['case-a', 'case-a', 'missing', 1] });
  assert.deepEqual(plain(api.ids('cases')), ['case-a']);
  api.toggle('patterns', 'shared');
  assert.equal(api.has('cases', 'shared'), false);
  assert.equal(api.has('patterns', 'shared'), true);
  assert.deepEqual(JSON.parse(storage.get(legacyKey)), ['case-a', 'case-a', 'missing', 1]);
  api.importBackup({ format: 'design-atlas-favorites', version: 1, favorites: ['case-b', 'case-a'] });
  api.importBackup(['shared']);
  assert.deepEqual(plain(api.ids('cases')), ['case-a', 'case-b', 'shared']);
  assert.deepEqual(plain(api.ids('patterns')), ['shared']);
  assert.deepEqual(JSON.parse(storage.get(legacyKey)), ['case-a', 'case-b', 'shared']);
});

test('versioned import merges valid IDs without replacing either library and exports both', () => {
  const { api } = page({ [key]: backup(['case-a'], ['pattern-a']) });
  const result = api.importBackup(JSON.stringify(backup(['case-b', 'case-b', 'pattern-a', null], ['pattern-b', 'case-a', 'pattern-b'])));
  assert.deepEqual(plain(result), { added: { cases: 1, patterns: 1 }, total: { cases: 2, patterns: 2 }, persisted: true });
  const exported = plain(api.exportBackup());
  assert.equal(exported.format, 'design-atlas-favorites'); assert.equal(exported.version, 2);
  assert.deepEqual(exported.cases, ['case-a', 'case-b']);
  assert.deepEqual(exported.patterns, ['pattern-a', 'pattern-b']);
  assert.ok(Number.isFinite(Date.parse(exported.exportedAt)));
  const ids = api.ids('cases'); ids.push('shared');
  assert.equal(api.has('cases', 'shared'), false);
  api.toggle('cases', 'case-a');
  assert.deepEqual(plain(api.ids('patterns')), ['pattern-a', 'pattern-b']);
});

test('invalid JSON or schema cannot partially modify favorites or persisted storage', () => {
  const { api, storage } = page({ [key]: backup(['case-a'], ['pattern-a']) });
  const before = [...storage];
  for (const value of ['{', null, backup(['case-b'], 'pattern-b'), { ...backup(['case-b']), version: 3 }]) assert.throws(() => api.importBackup(value));
  assert.deepEqual(plain(api.ids('cases')), ['case-a']);
  assert.deepEqual(plain(api.ids('patterns')), ['pattern-a']);
  assert.deepEqual([...storage], before);
});

test('storage events synchronize both libraries, accept legacy changes and preserve unrelated state', () => {
  const { api, emit, storage } = page({ [key]: backup(['case-a'], ['pattern-a']) });
  let updates = 0; const unsubscribe = api.subscribe(() => updates++);
  emit(key, backup(['case-b'], ['pattern-b', 'missing', 'pattern-b']));
  assert.deepEqual(plain(api.ids('cases')), ['case-b']);
  assert.deepEqual(plain(api.ids('patterns')), ['pattern-b']);
  emit(legacyKey, ['shared']);
  assert.deepEqual(plain(api.ids('cases')), ['shared']);
  assert.deepEqual(plain(api.ids('patterns')), ['pattern-b']);
  assert.deepEqual(JSON.parse(storage.get(key)), backup(['shared'], ['pattern-b']));
  emit('unrelated', []); assert.equal(updates, 3);
  unsubscribe(); emit(null, null);
  assert.equal(updates, 3);
  assert.deepEqual(plain(api.ids('cases')), []); assert.deepEqual(plain(api.ids('patterns')), []);
});

test('failed persistence keeps toggles and imports in the current session and notifies UI', () => {
  const { api, storage } = page({ [legacyKey]: ['case-a'] }, { failWrite: true });
  const notifications = []; api.subscribe(event => notifications.push(plain(event)));
  assert.deepEqual(plain(api.toggle('patterns', 'pattern-a')), { selected: true, persisted: false });
  assert.equal(api.has('patterns', 'pattern-a'), true);
  const result = api.importBackup(backup(['case-b'], ['pattern-b']));
  assert.equal(result.persisted, false);
  assert.deepEqual(plain(api.ids('cases')), ['case-a', 'case-b']);
  assert.deepEqual(plain(api.ids('patterns')), ['pattern-a', 'pattern-b']);
  assert.match(notifications.at(-1).error, /当前页面/);
  assert.equal(storage.has(key), false);
});

test('denied local storage is reported on subscription and still permits session favorites', () => {
  const { api } = page({}, { failRead: true, failWrite: true });
  const notifications = []; api.subscribe(event => notifications.push(plain(event)));
  assert.equal(notifications[0].persisted, false);
  assert.match(notifications[0].error, /无法读取/);
  api.toggle('cases', 'case-a');
  assert.deepEqual(plain(api.exportBackup().cases), ['case-a']);
  assert.equal(notifications.at(-1).persisted, false);
});
