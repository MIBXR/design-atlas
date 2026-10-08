import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { buildAgent, defaultRoot, resolveRepositoryPath, sha256 } from './build-agent.mjs';

export function verifyAgent({ root = defaultRoot } = {}) {
  // Derive every bundle from current source bytes. This catches stale metadata,
  // missing dependencies, changed assets, lossy documents and generated edits.
  const expected = buildAgent({ root, write: false });
  for (const [relative, data] of expected.outputs) {
    const actual = fs.readFileSync(resolveRepositoryPath(root, relative));
    assert.ok(actual.equals(data), `Stale generated content: ${relative}. Run npm run build.`);
  }
  const casesPath = resolveRepositoryPath(root, 'agent/cases');
  const caseFiles = fs.readdirSync(casesPath).sort();
  assert.deepEqual(caseFiles, expected.bundles.map(bundle => bundle.id + '.json').sort(), 'Unexpected or missing generated case bundle');
  const catalog = JSON.parse(fs.readFileSync(resolveRepositoryPath(root, 'agent/catalog.json'), 'utf8'));
  assert.equal(catalog.schemaVersion, 1);
  assert.equal(catalog.entryCount, expected.bundles.length);
  if (catalog.patterns) {
    const bytes = fs.readFileSync(resolveRepositoryPath(root, catalog.patterns.path));
    assert.equal(sha256(bytes), catalog.patterns.sha256, 'Pattern index hash differs');
    assert.equal(bytes.length, catalog.patterns.bytes, 'Pattern index size differs');
    const patterns = JSON.parse(bytes);
    assert.equal(patterns.patternCount, catalog.patterns.patternCount);
    assert.equal(patterns.contentVersion, catalog.patterns.contentVersion);
    assert.deepEqual(fs.readdirSync(resolveRepositoryPath(root, 'agent/patterns')).sort(), expected.patternBundles.map(bundle => bundle.id + '.json').sort(), 'Unexpected or missing pattern bundle');
  }
  let files = 0, documents = 0;
  for (const record of catalog.entries) {
    const bundleBytes = fs.readFileSync(resolveRepositoryPath(root, record.paths.bundle));
    assert.equal(record.bundleSha256, sha256(bundleBytes), `${record.id}: bundle hash differs`);
    const bundle = JSON.parse(bundleBytes);
    const original = JSON.parse(fs.readFileSync(resolveRepositoryPath(root, record.paths.entry), 'utf8'));
    assert.deepEqual(bundle.entry, original, `${record.id}: original entry was changed or omitted`);
    assert.deepEqual(bundle.patternIds, expected.bundles.find(item => item.id === record.id).patternIds, `${record.id}: extracted pattern association differs`);
    assert.equal(bundle.webNotes?.format, 'text/html', `${record.id}: missing original website notes`);
    assert.equal(bundle.webNotes?.sha256, sha256(Buffer.from(bundle.webNotes.content, 'utf8')), `${record.id}: website notes hash differs`);
    assert.equal(bundle.webNotes?.bytes, Buffer.byteLength(bundle.webNotes.content, 'utf8'), `${record.id}: website notes byte size differs`);
    for (const document of bundle.documents) {
      const bytes = fs.readFileSync(resolveRepositoryPath(root, document.path));
      assert.ok(Buffer.from(document.content, 'utf8').equals(bytes), `${record.id}: document is not lossless: ${document.path}`);
      assert.equal(document.bytes, bytes.length, `${document.path}: document byte size differs`);
      assert.equal(document.sha256, sha256(bytes), `${document.path}: document hash differs`);
      documents++;
    }
    for (const file of bundle.files) {
      const bytes = fs.readFileSync(resolveRepositoryPath(root, file.path));
      assert.equal(file.bytes, bytes.length, `${file.path}: file byte size differs`);
      assert.equal(file.sha256, sha256(bytes), `${file.path}: file hash differs`);
      files++;
    }
  }
  return { entryCount: catalog.entryCount, documents, files, contentVersion: catalog.contentVersion };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = verifyAgent();
    console.log(`PASS: ${result.entryCount} lossless Agent bundles, ${result.documents} original documents, ${result.files} file records; metadata, current bytes and hashes match.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
