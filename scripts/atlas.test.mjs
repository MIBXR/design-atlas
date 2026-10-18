import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readBundle, readVerified, exportBundle} from './atlas.mjs';
import {sha256} from './build-agent.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root,'agent/catalog.json'),'utf8'));

test('source reads reject same-length changed bytes and unsafe paths', () => {
  const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-read-'));
  try {
    const original=Buffer.from('source!');
    const file={path:'source.js',bytes:original.length,sha256:sha256(original)};
    fs.writeFileSync(path.join(scratch,'source.js'),original);
    assert.deepEqual(readVerified(scratch,file),original);
    fs.writeFileSync(path.join(scratch,'source.js'),'changed');
    assert.throws(()=>readVerified(scratch,file),/differs/);
    assert.throws(()=>readVerified(scratch,{...file,path:'../escape'}),/Unsafe/);
  } finally { fs.rmSync(scratch,{recursive:true,force:true}); }
});

test('full export preserves all original bytes and code-only declares missing media', () => {
  const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-export-'));
  try {
    const bundle=readBundle(catalog,'bauhaus-geometry');
    const out=path.join(scratch,'full');
    const result=exportBundle(bundle,out);
    assert.equal(result.files,bundle.files.length);
    assert.deepEqual(result.omitted,[]);
    assert.throws(()=>exportBundle(bundle,out),/existing directories/);
    for(const file of bundle.files) assert.deepEqual(fs.readFileSync(path.join(out,file.path)),fs.readFileSync(path.join(root,file.path)));
    const code=exportBundle(bundle,path.join(scratch,'code'),{codeOnly:true});
    assert.ok(code.omitted.length > 0);
    assert.ok(!code.omitted.includes(bundle.entry.demo));
    assert.ok(code.omitted.every(file=>!fs.existsSync(path.join(scratch,'code',file))));
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(scratch,'code/atlas-export.json'),'utf8')).omitted,code.omitted);
  } finally { fs.rmSync(scratch,{recursive:true,force:true}); }
});
