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
    const bytes = Buffer.from(await response.arrayBuffer());
    const hasBom = bytes.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf]));
    assert.match(type, /^text\/(?:plain|markdown)(?:\s*;|$)/i, `${name}: expected a text document; received ${type}`);
    assert.ok(/(?:^|;)\s*charset\s*=\s*["']?utf-8["']?(?:\s*;|\s*$)/i.test(type) || hasBom,
      `${name}: UTF-8 encoding must be signalled by charset or BOM; received ${type}, BOM=${hasBom}`);
    const text = new TextDecoder('utf-8', {fatal:true}).decode(bytes);
    const expected = fs.readFileSync(path.join(root, name));
    const payload = hasBom ? bytes.subarray(3) : bytes;
    const sourcePayload = expected.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf])) ? expected.subarray(3) : expected;
    assert.equal(createHash('sha256').update(payload).digest('hex'), createHash('sha256').update(sourcePayload).digest('hex'),
      `${name}: document payload must equal the tracked UTF-8 source after removing an encoding marker`);
    assert.ok(/[\u3400-\u9fff]/u.test(text), `${name}: Chinese text must be present`);
    console.log(`PASS ${name}: ${type}, UTF-8 BOM=${hasBom}, exact source payload, valid Chinese UTF-8.`);
  } catch (error) {
    failures++;
    console.error(`FAIL ${error.message}`);
  }
}
if (failures) process.exitCode = 1;
