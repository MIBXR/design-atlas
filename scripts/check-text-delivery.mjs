import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.argv[2];
if (!base || !/^https?:\/\//.test(base)) {
  throw new Error('Usage: node scripts/check-text-delivery.mjs <http(s)://base-url> [--all]');
}
const documents = process.argv.includes('--all')
  ? ['demos/linear-workflow/fidelity.md', 'README.md', 'research/OVERVIEW.md', 'prompts/google-material.md']
  : ['demos/linear-workflow/fidelity.md'];
let failures = 0;
for (const name of documents) {
  try {
    const response = await fetch(new URL(name, base.endsWith('/') ? base : base + '/'), {signal: AbortSignal.timeout(20000)});
    assert.equal(response.status, 200, `${name}: HTTP status`);
    const type = response.headers.get('content-type') || '';
    assert.match(type, /^text\/plain\s*;\s*charset\s*=\s*utf-8\s*$/i,
      `${name}: browser navigation needs text/plain; charset=utf-8; received ${type}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const text = new TextDecoder('utf-8', {fatal:true}).decode(bytes);
    const expected = fs.readFileSync(path.join(root, name));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), createHash('sha256').update(expected).digest('hex'),
      `${name}: delivered bytes must equal the tracked UTF-8 document`);
    assert.ok(/[\u3400-\u9fff]/u.test(text), `${name}: Chinese text must be present`);
    console.log(`PASS ${name}: ${type}, exact source bytes, valid Chinese UTF-8.`);
  } catch (error) {
    failures++;
    console.error(`FAIL ${error.message}`);
  }
}
if (failures) process.exitCode = 1;
