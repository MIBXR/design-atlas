import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
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
  for (const name of ['asset-sources.js', 'asset-runtime.js', 'asset-cache.js', 'asset-cache-worker.js', 'case-loading.css', 'case-loading.js', 'theme.js', 'favicon.svg', 'document.html', 'document.js', 'document.css', 'site-nav.css', 'theme-control.css', 'site-typography.css', 'site-footer.css', 'site-shell.js', 'vendor/LICENSES.txt']) write(name, '// fixture\n');
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

test('combined library versions case, pattern and material changes and checks every generated directory', () => {
  const f = fixture();
  try {
    const pattern = {
      id: 'fixture-feedback', title: '反馈', category: '交互反馈', summary: '局部反馈', mechanism: '同步状态', trigger: '点击', effect: '状态可见',
      useCases: ['工具'], avoid: [], constraints: ['保留来源'], parameters: [], prompt: '实现同步反馈',
      composition: { role: 'accent', notes: '当前控件', pairsWellWith: [], conflicts: [] },
      accessibility: { keyboard: '按钮', reducedMotion: '即时终态' },
      sources: [{ caseId: f.entry.id, locator: 'entries/fixture-case.json#interaction/0', observation: f.entry.interaction[0], evidence: 'adapted' }],
      sourceFiles: ['entries/fixture-case.json', f.entry.demo],
    };
    const material = {
      id: 'fixture', title: '素材', type: 'component-library', category: '组件与效果', summary: '交互素材', tags: [],
      useCases: ['工具'], avoid: [], constraints: ['保留来源'], prompt: '使用真实素材',
      upstream: { url: 'https://example.test', verifiedAt: '2026-10-07' },
      license: { name: 'MIT', url: 'https://example.test/license', scope: '软件', notes: '保留许可' },
      sources: [{ title: '来源', url: 'https://example.test/source', note: '参数依据' }],
      accessibility: { keyboard: '按钮', reducedMotion: '静态' },
      demo: 'material-demos/fixture/index.html', preview: 'previews/materials/fixture.png', research: 'docs/fixture.md',
      demos: [{ id: 'effect', title: '效果', summary: '可调节', entrypoint: 'material-demos/fixture/index.html' }],
      sourceFiles: ['material-demos/fixture/index.html'],
    };
    f.write('patterns/fixture-feedback.json', JSON.stringify(pattern));
    f.write('materials/fixture.json', JSON.stringify(material));
    f.write(material.demo, '<!doctype html><button>Fixture</button>');
    f.write(material.preview, Buffer.from([0, 255, 13, 10]));
    f.write(material.research, '# Fixture material\n');
    const first = buildAgent({ root: f.root });
    assert.deepEqual(first.bundles[0].patternIds, [pattern.id]);
    assert.equal(first.patternBundles[0].sourceCases[0].id, f.entry.id);
    assert.equal(first.patternBundles[0].sourceCases[0].bundleSha256, first.catalog.entries[0].bundleSha256);
    assert.equal(first.catalog.materials.contentVersion, first.materialCatalog.contentVersion);
    assert.equal(verifyAgent({ root: f.root }).patternCount, 1);
    for (const directory of ['cases', 'patterns', 'materials']) {
      const extra = `agent/${directory}/unexpected.json`;
      f.write(extra, '{}');
      assert.throws(() => verifyAgent({ root: f.root }), /Unexpected or missing generated/);
      fs.unlinkSync(path.join(f.root, extra));
    }
    f.write('patterns/fixture-feedback.json', JSON.stringify({ ...pattern, mechanism: '更新反馈机制' }));
    assert.throws(() => verifyAgent({ root: f.root }), /Stale generated content/);
    const changedPattern = buildAgent({ root: f.root });
    assert.notEqual(changedPattern.catalog.contentVersion, first.catalog.contentVersion);
    assert.notEqual(changedPattern.catalog.patterns.contentVersion, first.catalog.patterns.contentVersion);
    assert.equal(changedPattern.catalog.materials.contentVersion, first.catalog.materials.contentVersion);
    f.write(material.demo, '<!doctype html><button>Changed material</button>');
    assert.throws(() => verifyAgent({ root: f.root }), /Stale generated content/);
    const changedMaterial = buildAgent({ root: f.root });
    assert.notEqual(changedMaterial.catalog.contentVersion, changedPattern.catalog.contentVersion);
    assert.notEqual(changedMaterial.catalog.materials.contentVersion, changedPattern.catalog.materials.contentVersion);
    assert.equal(changedMaterial.catalog.patterns.contentVersion, changedPattern.catalog.patterns.contentVersion);
    f.write(f.entry.demo, '<!doctype html><button>Changed case</button>');
    const changedCase = buildAgent({ root: f.root });
    assert.notEqual(changedCase.catalog.contentVersion, changedMaterial.catalog.contentVersion);
    assert.notEqual(changedCase.catalog.patterns.contentVersion, changedMaterial.catalog.patterns.contentVersion);
    assert.equal(changedCase.catalog.materials.contentVersion, changedMaterial.catalog.materials.contentVersion);
    verifyAgent({ root: f.root });
  } finally { f.cleanup(); }
});

test('Git LF text rejects checkout drift while original assets keep their bytes', () => {
  const f = fixture();
  try {
    f.write('.gitattributes', '* text=auto eol=lf\ndemos/**/assets/** -text\nvendor/** -text\n');
    f.write(f.entry.research, '\uFEFF研究原文\nsecond line\n');
    f.write('vendor/LICENSES.txt', 'Original license\r\n');
    execFileSync('git', ['init', '--quiet', f.root]);
    execFileSync('git', ['add', '.gitattributes', 'site-nav.css'], { cwd: f.root });
    const original = fs.readFileSync(path.join(f.root, 'demos/fixture-case/assets/original.bin'));
    buildAgent({ root: f.root });
    assert.deepEqual(fs.readFileSync(path.join(f.root, 'demos/fixture-case/assets/original.bin')), original);
    assert.equal(fs.readFileSync(path.join(f.root, 'vendor/LICENSES.txt'), 'utf8'), 'Original license\r\n');
    for (const content of ['first\r\nsecond\r\n', 'first\nsecond\r\n']) {
      f.write('site-nav.css', content);
      assert.throws(() => buildAgent({ root: f.root }), /LF.*site-nav\.css/s);
    }
    f.write('site-nav.css', '// fixture\n');
    f.write('untracked.js', '// source\r\n');
    assert.throws(() => buildAgent({ root: f.root }), /LF.*untracked\.js/s);
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
