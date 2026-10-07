import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries = fs.readdirSync(path.join(root, 'entries'))
  .filter(name => name.endsWith('.json'))
  .map(name => JSON.parse(fs.readFileSync(path.join(root, 'entries', name), 'utf8')))
  .filter(entry => entry.implementation === 'reference-study');
const failures = [];
let count = 0;
let bytes = 0;

for (const entry of entries) {
  const manifestPath = path.join(root, entry.assetManifest);
  if (!fs.existsSync(manifestPath)) {
    failures.push(`${entry.id}: missing manifest`);
    continue;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const base = path.dirname(manifestPath);
  if (!Array.isArray(manifest.assets) || !manifest.assets.length) {
    failures.push(`${entry.id}: empty asset manifest`);
    continue;
  }
  for (const asset of manifest.assets) {
    const relative = asset.file || asset.path;
    if (typeof relative !== 'string') {
      failures.push(`${entry.id}: asset without file path`);
      continue;
    }
    let file = path.resolve(base, relative);
    if (!fs.existsSync(file)) file = path.resolve(base, 'assets', relative);
    if (!file.startsWith(base + path.sep) || !fs.existsSync(file)) {
      failures.push(`${entry.id}: missing asset ${relative}`);
      continue;
    }
    const data = fs.readFileSync(file);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    if (asset.bytes !== data.length) failures.push(`${entry.id}: size differs for ${relative}`);
    if (asset.sha256 !== hash) failures.push(`${entry.id}: SHA256 differs or is missing for ${relative}`);
    if (!/^https:\/\//.test(asset.sourceUrl || asset.url || '')) {
      failures.push(`${entry.id}: asset has no HTTPS source ${relative}`);
    }
    count++;
    bytes += data.length;
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${entries.length} source studies, ${count} asset records, ${(bytes / 1048576).toFixed(1)} MiB; files, origins, sizes and SHA256 verified.`);
}
