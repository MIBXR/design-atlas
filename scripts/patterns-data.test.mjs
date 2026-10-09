import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadPatterns, buildPatterns, defaultRoot } from './build-patterns.mjs';
import { buildAgent, sha256 } from './build-agent.mjs';
import { verifyPatterns } from './check-patterns.mjs';

const testWork = path.resolve(defaultRoot, 'work', 'patterns-data-tests');
fs.mkdirSync(testWork, { recursive: true });
function fixture() {
  const root = fs.mkdtempSync(path.join(testWork, 'fixture-'));
  const entry = { id: 'fixture-case', title: 'Original / 来源', capturedAt: '2026-10-07', interaction: ['点击 → 原始响应 → 目的'], demo: 'demos/fixture-case/index.html' };
  const pattern = {
    id: 'fixture-feedback', title: '局部反馈', category: '交互反馈', summary: '一个独立可组合的动作。', mechanism: 'One atomic mechanism.', trigger: '点击', effect: '同步状态',
    useCases: ['工具'], avoid: ['虚构执行'], constraints: ['来源边界保留'],
    composition: { role: 'accent', notes: '作用于一个控件，不承担整页导航。', pairsWellWith: [], conflicts: [] },
    accessibility: { keyboard: '原生按钮', reducedMotion: '即时终态' }, parameters: [{ name: '时间', value: '200ms', note: '示范拟合' }], prompt: 'Implement one meaningful feedback.',
    sources: [{ caseId: entry.id, locator: 'entries/fixture-case.json#interaction/0', observation: entry.interaction[0], evidence: 'adapted', capturedAt: entry.capturedAt }],
    sourceFiles: ['entries/fixture-case.json', entry.demo],
  };
  const write = (relative, bytes) => { const absolute = path.join(root, ...relative.split('/')); fs.mkdirSync(path.dirname(absolute), { recursive: true }); fs.writeFileSync(absolute, bytes); };
  write('entries/fixture-case.json', JSON.stringify(entry));
  write(entry.demo, '<!doctype html><button>Real source bytes</button>');
  const writePattern = (value = pattern) => write('patterns/fixture-feedback.json', JSON.stringify(value));
  writePattern();
  const caseRecord = { id: entry.id, title: entry.title, paths: { bundle: 'agent/cases/fixture-case.json', demo: entry.demo }, bundleSha256: 'a'.repeat(64) };
  const caseBundle = { id: entry.id, patternIds: [pattern.id], files: pattern.sourceFiles.map(relative => ({ path: relative, sha256: sha256(fs.readFileSync(path.join(root, relative))) })) };
  return { root, entry, pattern, write, writePattern, caseRecord, caseBundle, cleanup() {
    const relative = path.relative(testWork, root);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
    fs.rmSync(root, { recursive: true, force: true });
  } };
}

test('pattern generation preserves complete metadata, is deterministic, and versions both atoms and source cases', () => {
  const f = fixture();
  try {
    const build = () => buildPatterns({ root: f.root, patterns: loadPatterns({ root: f.root }), caseRecords: [f.caseRecord], caseBundles: [f.caseBundle], write: false });
    const first = build(), second = build();
    assert.deepEqual(first.catalog, second.catalog);
    assert.deepEqual(first.bundles[0].pattern, f.pattern);
    const record = first.catalog.patterns[0];
    assert.equal(record.bundleSha256, sha256(first.outputs.get(record.paths.bundle)));
    assert.equal(first.catalog.contentVersion, sha256(Buffer.from(`${record.id}:${record.bundleSha256}\n`)));
    assert.deepEqual(first.bundles[0].sourceCases[0], { id: f.entry.id, title: f.entry.title, paths: { bundle: f.caseRecord.paths.bundle, demo: f.entry.demo }, bundleSha256: f.caseRecord.bundleSha256 });
    f.writePattern({ ...f.pattern, mechanism: 'A refined independent mechanism.' });
    const changedAtom = build();
    assert.notEqual(changedAtom.catalog.contentVersion, first.catalog.contentVersion);
    f.caseRecord.bundleSha256 = 'b'.repeat(64);
    assert.notEqual(build().catalog.contentVersion, changedAtom.catalog.contentVersion, 'A source case change must also version the atom bundle');
  } finally { f.cleanup(); }
});

test('source edits cannot combine fresh case hashes with stale observation text', () => {
  const f = fixture();
  try {
    f.write('entries/fixture-case.json', JSON.stringify({ ...f.entry, interaction: ['Updated original observation.'] }));
    assert.throws(() => loadPatterns({ root: f.root }), /Stale pattern observation/);
    f.writePattern({ ...f.pattern, sources: [{ ...f.pattern.sources[0], observation: 'Updated original observation.' }] });
    assert.equal(loadPatterns({ root: f.root }).length, 1);
    f.writePattern({ ...f.pattern, sources: [{ ...f.pattern.sources[0], locator: 'entries/fixture-case.json#interaction/5' }] });
    assert.throws(() => loadPatterns({ root: f.root }), /Unknown pattern JSON locator/);
  } finally { f.cleanup(); }
});

test('experience types preserve schema-1 compatibility and reject invalid classifications', () => {
  const f = fixture();
  try {
    assert.equal(loadPatterns({ root: f.root }).length, 1);
    f.writePattern({ ...f.pattern, experienceTypes: ['visual', 'micro-motion'] });
    assert.deepEqual(loadPatterns({ root: f.root })[0].experienceTypes, ['visual', 'micro-motion']);
    for (const [experienceTypes, error] of [
      ['visual', /Expected pattern array/],
      [[], /Empty pattern experience types/],
      [['motion'], /Unknown pattern experience type/],
      [['sound', 'sound'], /Duplicate pattern value/],
    ]) {
      f.writePattern({ ...f.pattern, experienceTypes });
      assert.throws(() => loadPatterns({ root: f.root }), error);
    }
  } finally { f.cleanup(); }
});

test('invalid relations, provenance, optional coverage and paths outside manifests are checked', () => {
  const f = fixture();
  try {
    f.writePattern({ ...f.pattern, composition: { ...f.pattern.composition, pairsWellWith: ['missing-pattern'] } });
    assert.throws(() => loadPatterns({ root: f.root }), /Invalid pattern relationship/);
    f.writePattern({ ...f.pattern, sources: [{ ...f.pattern.sources[0], caseId: 'missing-case' }] });
    assert.throws(() => loadPatterns({ root: f.root }), /Unknown pattern source case/);
    f.writePattern();
    f.write('entries/uncovered-case.json', JSON.stringify({ id: 'uncovered-case' }));
    assert.equal(loadPatterns({ root: f.root }).length, 1);
    assert.throws(() => loadPatterns({ root: f.root, requireCoverage: true }), /Case has no extracted patterns/);
    fs.unlinkSync(path.join(f.root, 'entries/uncovered-case.json'));
    f.writePattern({ ...f.pattern, sourceFiles: ['entries/fixture-case.json', '../outside'] });
    assert.throws(() => loadPatterns({ root: f.root }), /Unsafe pattern path/);
    f.writePattern();
    assert.throws(() => buildPatterns({ root: f.root, patterns: loadPatterns({ root: f.root }), caseRecords: [f.caseRecord], caseBundles: [{ ...f.caseBundle, files: [] }], write: false }), /outside its stated source case/);
    assert.throws(() => buildPatterns({ root: f.root, patterns: loadPatterns({ root: f.root }), caseRecords: [f.caseRecord], caseBundles: [{ ...f.caseBundle, files: f.caseBundle.files.filter(file => file.path.startsWith('entries/')) }], write: false }), /cannot be verified through its case manifest/);
  } finally { f.cleanup(); }
});

test('symlinks and junctions are forbidden in pattern provenance', () => {
  const f = fixture();
  try {
    fs.symlinkSync(path.join(f.root, 'demos/fixture-case'), path.join(f.root, 'linked-demo'), process.platform === 'win32' ? 'junction' : 'dir');
    f.writePattern({ ...f.pattern, sourceFiles: [...f.pattern.sourceFiles, 'linked-demo/index.html'] });
    assert.throws(() => loadPatterns({ root: f.root }), /Symlink is forbidden/);
  } finally { f.cleanup(); }
});

test('combined library version includes the pattern version and every case has reverse associations', () => {
  const generated = buildAgent({ write: false });
  const metadata = generated.catalog.patterns;
  assert.ok(metadata.patternCount > 0);
  assert.equal(metadata.sha256, sha256(generated.outputs.get(metadata.path)));
  const caseInput = [...generated.catalog.entries].sort((a, b) => a.id.localeCompare(b.id, 'en')).map(record => `${record.id}:${record.bundleSha256}\n`).join('');
  assert.equal(generated.catalog.contentVersion, sha256(Buffer.from(caseInput + `patterns:${metadata.contentVersion}\n`)));
  const patterns = loadPatterns();
  for (const bundle of generated.bundles) assert.deepEqual(bundle.patternIds, patterns.filter(pattern => pattern.sources.some(source => source.caseId === bundle.id)).map(pattern => pattern.id).sort(), `${bundle.id}: reverse associations differ from pattern sources`);
  assert.equal(verifyPatterns().patternCount, metadata.patternCount);
});
