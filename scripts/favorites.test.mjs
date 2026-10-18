import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../favorites.js', import.meta.url), 'utf8');
const key = 'atlas-favorites-v2', legacyKey = 'atlas-favorites';
const backup = (cases = [], patterns = [], materials = []) => ({ format: 'design-atlas-favorites', version: 2, cases, patterns, materials });
function loadFavorites(initial) {
  const storage = new Map(Object.entries(initial).map(([name, value]) => [name, JSON.stringify(value)]));
  const window = {
    DESIGN_ATLAS: [{ id: 'case-a' }, { id: 'case-b' }, { id: 'shared' }],
    DESIGN_PATTERNS: [{ id: 'pattern-a' }, { id: 'shared' }],
    DESIGN_MATERIALS: [{ id: 'shaders' }],
    addEventListener() {},
  };
  const localStorage = { getItem: name => storage.get(name) ?? null, setItem: (name, value) => storage.set(name, value) };
  vm.runInNewContext(source, { window, localStorage, Date, JSON }, { filename: 'favorites.js' });
  return { api: window.DesignAtlasFavorites, storage };
}
const plain = value => JSON.parse(JSON.stringify(value));

test('old and current backups merge valid favorites without losing any library', () => {
  const { api, storage } = loadFavorites({ [legacyKey]: ['case-a', 'case-a', 'missing', 1] });
  assert.deepEqual(plain(api.ids('cases')), ['case-a']);
  api.importBackup(JSON.stringify(backup(['case-b', 'case-b', null], ['pattern-a', 'shared', 'missing'], ['shaders'])));
  assert.equal(api.has('cases', 'shared'), false);
  api.importBackup({ format: 'design-atlas-favorites', version: 1, favorites: ['shared'] });
  api.importBackup(['case-b']);
  api.importBackup({ format: 'design-atlas-favorites', version: 2, cases: ['case-a'], patterns: [] });
  const exported = plain(api.exportBackup());
  delete exported.exportedAt;
  const expected = backup(['case-a', 'case-b', 'shared'], ['pattern-a', 'shared'], ['shaders']);
  assert.deepEqual(exported, expected);
  assert.deepEqual(JSON.parse(storage.get(key)), expected);
  assert.deepEqual(JSON.parse(storage.get(legacyKey)), expected.cases);
});

test('invalid imports cannot partially change favorites or persisted storage', () => {
  const { api, storage } = loadFavorites({ [key]: backup(['case-a'], ['pattern-a'], ['shaders']) });
  const before = [...storage];
  for (const value of ['{', null, backup(['case-b'], 'pattern-a'), backup(['case-b'], [], 'shaders'), { ...backup(['case-b']), version: 3 }]) {
    assert.throws(() => api.importBackup(value));
    assert.deepEqual(plain(api.ids('cases')), ['case-a']);
    assert.deepEqual(plain(api.ids('patterns')), ['pattern-a']);
    assert.deepEqual(plain(api.ids('materials')), ['shaders']);
    assert.deepEqual([...storage], before);
  }
});
