import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { buildAgent, defaultRoot, resolveRepositoryPath, sha256 } from './build-agent.mjs';

export function verifyPatterns({ root = defaultRoot } = {}) {
  const expected = buildAgent({ root, write: false });
  const metadata = expected.catalog.patterns;
  if (!metadata) return { patternCount: 0, caseCount: expected.catalog.entryCount };
  const rootCatalog = JSON.parse(fs.readFileSync(resolveRepositoryPath(root, 'agent/catalog.json'), 'utf8'));
  assert.deepEqual(rootCatalog.patterns, metadata, 'Stale root pattern manifest. Run npm run build.');
  assert.equal(rootCatalog.contentVersion, expected.catalog.contentVersion, 'Stale combined library version. Run npm run build.');
  for (const [relative, bytes] of expected.outputs) if (relative === 'patterns.js' || relative.startsWith('agent/patterns')) assert.ok(fs.readFileSync(resolveRepositoryPath(root, relative)).equals(bytes), `Stale generated pattern: ${relative}. Run npm run build.`);
  const catalogBytes = fs.readFileSync(resolveRepositoryPath(root, metadata.path));
  assert.equal(sha256(catalogBytes), metadata.sha256, 'Pattern catalog hash differs');
  assert.equal(catalogBytes.length, metadata.bytes, 'Pattern catalog size differs');
  const catalog = JSON.parse(catalogBytes);
  assert.equal(catalog.contentVersion, metadata.contentVersion);
  assert.equal(catalog.patternCount, metadata.patternCount);
  assert.deepEqual(fs.readdirSync(resolveRepositoryPath(root, 'agent/patterns')).sort(), catalog.patterns.map(p => p.id + '.json').sort(), 'Unexpected or missing pattern bundles');
  for (const pattern of catalog.patterns) {
    const bytes = fs.readFileSync(resolveRepositoryPath(root, pattern.paths.bundle));
    assert.equal(sha256(bytes), pattern.bundleSha256, `${pattern.id}: bundle hash differs`);
    const bundle = JSON.parse(bytes);
    assert.deepEqual(bundle.pattern, JSON.parse(fs.readFileSync(resolveRepositoryPath(root, `patterns/${pattern.id}.json`), 'utf8')));
    for (const source of bundle.sourceCases) {
      const caseBytes = fs.readFileSync(resolveRepositoryPath(root, source.paths.bundle));
      assert.equal(sha256(caseBytes), source.bundleSha256, `${pattern.id}: source case hash differs`);
      assert.ok(JSON.parse(caseBytes).patternIds.includes(pattern.id), `${pattern.id}: missing reverse case association`);
    }
  }
  return { patternCount: catalog.patternCount, caseCount: expected.catalog.entryCount, contentVersion: catalog.contentVersion };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { const result = verifyPatterns(); console.log(`PASS: ${result.patternCount} atomic design patterns; provenance, references, source coverage and generated hashes match across ${result.caseCount} cases.`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
