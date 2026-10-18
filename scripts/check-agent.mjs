import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { buildAgent, defaultRoot, resolveRepositoryPath } from './build-agent.mjs';

export function verifyAgent({ root = defaultRoot } = {}) {
  const expected = buildAgent({ root, write: false });
  for (const [relative, data] of expected.outputs) {
    const actual = fs.readFileSync(resolveRepositoryPath(root, relative));
    assert.ok(actual.equals(data), `Stale generated content: ${relative}. Run npm run build.`);
  }
  for (const [directory, bundles] of [['cases', expected.bundles], ['patterns', expected.patternBundles], ['materials', expected.materialBundles]]) {
    const folder = resolveRepositoryPath(root, `agent/${directory}`, { mustExist: false });
    if (!bundles.length && !fs.existsSync(folder)) continue;
    assert.deepEqual(fs.readdirSync(folder).sort(), bundles.map(bundle => bundle.id + '.json').sort(), `Unexpected or missing generated ${directory} bundle`);
  }
  for (const bundle of expected.bundles) {
    const patternIds = expected.patternBundles.filter(pattern => pattern.sourceCases.some(source => source.id === bundle.id)).map(pattern => pattern.id).sort();
    assert.deepEqual([...bundle.patternIds].sort(), patternIds, `${bundle.id}: reverse pattern associations differ`);
  }
  for (const pattern of expected.patternBundles) {
    for (const source of pattern.sourceCases) {
      const record = expected.catalog.entries.find(entry => entry.id === source.id);
      assert.ok(record, `${pattern.id}: unknown source case ${source.id}`);
      assert.equal(source.bundleSha256, record.bundleSha256, `${pattern.id}: source case hash differs`);
    }
  }
  return {
    entryCount: expected.catalog.entryCount,
    patternCount: expected.patternBundles.length,
    materialCount: expected.materialBundles.length,
    documents: expected.bundles.reduce((sum, bundle) => sum + bundle.documents.length, 0),
    files: expected.bundles.reduce((sum, bundle) => sum + bundle.files.length, 0),
    contentVersion: expected.catalog.contentVersion,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = verifyAgent();
    console.log(`PASS: ${result.entryCount} lossless Agent bundles, ${result.patternCount} patterns, ${result.materialCount} materials; current source bytes, generated outputs and reverse associations match (${result.documents} case documents, ${result.files} case file records).`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
