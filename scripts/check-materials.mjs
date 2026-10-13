import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { buildMaterials, defaultRoot } from './build-materials.mjs';
import { sha256 } from './build-agent.mjs';

export function verifyMaterials({ root = defaultRoot } = {}) {
  const expected = buildMaterials({ root, write: false });
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'agent/catalog.json'), 'utf8'));
  if (!expected.catalog.materialCount && !catalog.materials) return { materialCount: 0, files: 0 };
  const bytes = expected.outputs.get('agent/materials.json');
  assert.deepEqual(catalog.materials, { path: 'agent/materials.json', sha256: sha256(bytes), bytes: bytes.length, materialCount: expected.catalog.materialCount, contentVersion: expected.catalog.contentVersion }, 'Stale root material manifest. Run npm run build.');
  for (const [relative, content] of expected.outputs) assert.ok(fs.readFileSync(path.join(root, relative)).equals(content), `Stale generated material: ${relative}. Run npm run build.`);
  assert.deepEqual(fs.readdirSync(path.join(root, 'agent/materials')).sort(), expected.bundles.map(bundle => `${bundle.id}.json`).sort(), 'Unexpected or missing material bundle');
  return { materialCount: expected.catalog.materialCount, files: expected.bundles.reduce((sum, bundle) => sum + bundle.files.length, 0), contentVersion: expected.catalog.contentVersion };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { const result = verifyMaterials(); console.log(`PASS: ${result.materialCount} source-backed materials; interactive demos, full documents, dependency files and generated hashes match (${result.files} files).`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
