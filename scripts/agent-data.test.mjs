import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAgent, defaultRoot, resolveRepositoryPath, sha256 } from './build-agent.mjs';
import { verifyAgent } from './check-agent.mjs';

const testWork = path.resolve(defaultRoot, 'work', 'agent-data-tests');
fs.mkdirSync(testWork, { recursive: true });
function fixture() {
  const root = fs.mkdtempSync(path.join(testWork, 'fixture-'));
  const write = (relative, data) => {
    const absolute = path.join(root, ...relative.split('/'));
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, data);
  };
  const entry = {
    id: 'fixture-case', order: 1, title: '测试 / A source', subtitle: 'A fixture', category: '经典风格',
    tags: ['测试'], summary: 'Preserve original design context.', useCases: ['学习'], avoid: ['虚构'],
    tokens: { palette: ['#fff'], type: 'fixture type', layout: 'fixture grid', motion: 'reduced-motion' },
    composition: { layout: 'asymmetric', imagery: 'real bytes' },
    interaction: ['Click → original response → purpose'],
    principles: ['Preserve each actual design decision'], productFocus: 'Source evidence', theme: 'Measured design', constraints: ['Keep the original boundaries'], exercise: 'Compare a second layout',
    sources: [{ title: 'Original source', url: 'https://example.test/', type: '理论', note: 'An existing archive record' }], theoryVerifiedAt: '2026-10-07',
    themeBehavior: { mode: 'fixed', default: 'light' }, soundBehavior: { kind: 'none' },
    prompt: 'original prompt', negativePrompt: 'original constraints',
    demo: 'demos/fixture-case/index.html', preview: 'previews/fixture-case.jpg',
    research: 'research/fixture-case.md', fidelity: 'demos/fixture-case/fidelity.md',
    assetManifest: 'demos/fixture-case/assets-manifest.json',
    extraOriginalField: { nested: ['must survive', 42] },
  };
  write('entries/fixture-case.json', JSON.stringify(entry));
  write(entry.demo, '<!doctype html><title>A fixture</title>');
  write(entry.research, Buffer.from('\uFEFF研究原文\r\nsecond line\r\n', 'utf8'));
  write('prompts/fixture-case.md', '# Prompt\nOriginal → precise constraints\n');
  write(entry.fidelity, '## Bounds\nObserved and unverified states remain explicit.\n');
  write(entry.assetManifest, '{"assets":[]}\n');
  write('demos/fixture-case/assets/original.bin', Buffer.from([0, 255, 128, 13, 10, 64]));
  write(entry.preview, Buffer.from([255, 216, 255, 217]));
  write('previews/mobile/fixture-case.jpg', Buffer.from([255, 216, 255, 217]));
  write('atlas.js', fs.readFileSync(path.join(defaultRoot, 'atlas.js')));
  for (const name of ['asset-sources.js', 'asset-runtime.js', 'asset-cache.js', 'asset-cache-worker.js', 'case-loading.css', 'case-loading.js', 'theme.js', 'favicon.svg', 'document.html', 'document.js', 'vendor/LICENSES.txt']) write(name, '// fixture\n');
  return { root, entry, write, cleanup() {
    const relative = path.relative(testWork, root);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), 'Fixture cleanup must stay inside the test workspace');
    fs.rmSync(root, { recursive: true, force: true });
  } };
}

test('bundles preserve original fields, document bytes and binary asset hashes deterministically', () => {
  const f = fixture();
  try {
    const first = buildAgent({ root: f.root });
    const second = buildAgent({ root: f.root, write: false });
    assert.deepEqual(first.catalog, second.catalog);
    assert.equal(first.catalog.entryCount, 1);
    assert.deepEqual(first.bundles[0].entry, f.entry);
    assert.ok(first.bundles[0].webNotes.content.includes('Original source'));
    assert.ok(first.bundles[0].webNotes.content.includes('2026-10-07'));
    assert.equal(first.bundles[0].webNotes.sha256, sha256(Buffer.from(first.bundles[0].webNotes.content, 'utf8')));
    assert.ok(!Object.hasOwn(first.catalog.entries[0], 'country'), 'Do not invent metadata');
    for (const [relative, bytes] of first.outputs) assert.ok(bytes.equals(second.outputs.get(relative)));
    const document = first.bundles[0].documents.find(item => item.role === 'research');
    assert.ok(Buffer.from(document.content, 'utf8').equals(fs.readFileSync(path.join(f.root, f.entry.research))));
    const asset = first.bundles[0].files.find(item => item.path.endsWith('/original.bin'));
    assert.equal(asset.bytes, 6);
    assert.equal(asset.sha256, sha256(Buffer.from([0, 255, 128, 13, 10, 64])));
    assert.equal(verifyAgent({ root: f.root }).entryCount, 1);
    f.write('demos/fixture-case/assets/original.bin', Buffer.from([1, 255, 128, 13, 10, 64]));
    assert.throws(() => verifyAgent({ root: f.root }), /Stale generated content/);
    const changed = buildAgent({ root: f.root });
    assert.notEqual(changed.catalog.contentVersion, first.catalog.contentVersion);
    verifyAgent({ root: f.root });
  } finally { f.cleanup(); }
});

test('verification rejects modified bundles, omitted case files and unsafe paths', () => {
  const f = fixture();
  try {
    buildAgent({ root: f.root });
    f.write('agent/cases/fixture-case.json', '{}\n');
    assert.throws(() => verifyAgent({ root: f.root }), /Stale generated content/);
    buildAgent({ root: f.root });
    fs.unlinkSync(path.join(f.root, 'demos/fixture-case/assets/original.bin'));
    assert.throws(() => verifyAgent({ root: f.root }), /Stale generated content/);
    for (const unsafe of ['../outside', '/absolute', 'C:/absolute', 'demos\\file', 'demos/a:stream', 'demos/../file', 'demos/CON.txt']) {
      assert.throws(() => resolveRepositoryPath(f.root, unsafe, { mustExist: false }), /Unsafe repository path/);
    }
  } finally { f.cleanup(); }
});

test('generation rejects symlinks, including directory junctions on Windows', () => {
  const f = fixture();
  try {
    const target = path.join(f.root, 'demos/fixture-case/assets');
    fs.symlinkSync(target, path.join(f.root, 'demos/fixture-case/linked-assets'), process.platform === 'win32' ? 'junction' : 'dir');
    assert.throws(() => buildAgent({ root: f.root }), /Symlink is forbidden/);
  } finally { f.cleanup(); }
});
