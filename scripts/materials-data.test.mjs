import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMaterials, defaultRoot } from './build-materials.mjs';
import { sha256 } from './build-agent.mjs';
import { verifyMaterials } from './check-materials.mjs';

const testWork = path.resolve(defaultRoot, 'work/material-data-tests');
fs.mkdirSync(testWork, { recursive: true });

function fixture() {
  const root = fs.mkdtempSync(path.join(testWork, 'fixture-'));
  const write = (relative, data) => {
    const absolute = path.join(root, relative);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, data);
  };
  const material = {
    id: 'fixture', title: '组件素材', type: 'component-library', category: '组件与效果', summary: '互动参数与真实源码', tags: ['组件'],
    useCases: ['局部效果'], avoid: ['全页绘制'], constraints: ['保留后备'], prompt: '按真实任务调节参数',
    upstream: { repository: 'https://example.test/repo', url: 'https://example.test', commit: 'a'.repeat(40), version: '1.0.0', verifiedAt: '2026-10-13' },
    license: { name: 'MIT', url: 'https://example.test/license', scope: '软件', notes: '保留许可' },
    sources: [{ title: '组件定义', url: 'https://example.test/source', note: '公开源码参数' }],
    demos: [{ id: 'effect', title: '效果', summary: '可调节', entrypoint: 'material-demos/fixture/index.html?effect=effect' }],
    accessibility: { keyboard: '标准控件', reducedMotion: '停止自动运行' },
    demo: 'material-demos/fixture/index.html', preview: 'previews/materials/fixture.png', research: 'docs/fixture.md',
    sourceFiles: ['material-demos/fixture/index.html', 'material-demos/fixture/demo.js'], extraField: { original: true },
  };
  write('materials/fixture.json', JSON.stringify(material));
  write(material.demo, '<!doctype html><script src="demo.js"></script>');
  write('material-demos/fixture/demo.js', '// 可调节的原创样例\n');
  write('material-demos/fixture/vendor/runtime.js', '// fixed upstream runtime\n');
  write('material-demos/fixture/vendor/LICENSE.txt', 'Original notice\r\n');
  write(material.preview, Buffer.from([0, 255, 13, 10]));
  write(material.research, '\uFEFF来源与限制\r\n');
  const build = () => {
    const result = buildMaterials({ root });
    const bytes = result.outputs.get('agent/materials.json');
    write('agent/catalog.json', JSON.stringify({ schemaVersion: 1, materials: { path: 'agent/materials.json', sha256: sha256(bytes), bytes: bytes.length, materialCount: result.catalog.materialCount, contentVersion: result.catalog.contentVersion } }));
    return result;
  };
  return { root, material, write, build, cleanup() {
    const relative = path.relative(testWork, root);
    assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
    fs.rmSync(root, { recursive: true, force: true });
  } };
}

test('independent material bundles preserve documents, runtime bytes and original fields; changes update the index version', () => {
  const f = fixture();
  try {
    const first = f.build();
    assert.deepEqual(first.bundles[0].material, f.material);
    assert.equal(first.bundles[0].documents[0].content, '\uFEFF来源与限制\r\n');
    assert.ok(first.bundles[0].files.some(file => file.path.endsWith('vendor/runtime.js')));
    assert.equal(first.bundles[0].files.find(file => file.path === f.material.preview).sha256, sha256(Buffer.from([0, 255, 13, 10])));
    const second = buildMaterials({ root: f.root, write: false });
    for (const [relative, bytes] of first.outputs) assert.ok(bytes.equals(second.outputs.get(relative)));
    assert.equal(verifyMaterials({ root: f.root }).materialCount, 1);
    f.write('material-demos/fixture/vendor/runtime.js', '// changed upstream bytes\n');
    assert.throws(() => verifyMaterials({ root: f.root }), /Stale root material manifest/);
    const changed = f.build();
    assert.notEqual(changed.catalog.contentVersion, first.catalog.contentVersion);
    verifyMaterials({ root: f.root });
  } finally { f.cleanup(); }
});

test('material generation rejects missing provenance and invalid runnable or source paths', () => {
  const f = fixture();
  try {
    const update = value => f.write('materials/fixture.json', JSON.stringify(value));
    update({ ...f.material, upstream: { url: f.material.upstream.url, verifiedAt: f.material.upstream.verifiedAt } });
    assert.equal(buildMaterials({ root: f.root, write: false }).catalog.materialCount, 1);
    update({ ...f.material, license: { ...f.material.license, scope: '' } });
    assert.throws(() => buildMaterials({ root: f.root }), /license.scope/);
    update({ ...f.material, demos: [{ ...f.material.demos[0], entrypoint: '../outside.html' }] });
    assert.throws(() => buildMaterials({ root: f.root }), /Unsafe material path/);
    f.write('outside.js', '// unrelated\n');
    update({ ...f.material, sourceFiles: ['outside.js'] });
    assert.throws(() => buildMaterials({ root: f.root }), /outside its source manifest/);
    update(f.material);
    f.build();
    f.write('agent/materials/fixture.json', '{}\n');
    assert.throws(() => verifyMaterials({ root: f.root }), /Stale generated material/);
  } finally { f.cleanup(); }
});
