import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {files, folders} from './build-static.mjs';

test('public Markdown additions and removals update the document catalog and reject stale output', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-documents-'));
  assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
  try {
    fs.mkdirSync(path.join(root, 'scripts'));
    for (const file of ['build-documents.mjs', 'build-static.mjs', 'build-asset-sources.mjs', 'check-line-endings.mjs']) {
      fs.copyFileSync(new URL(file, import.meta.url), path.join(root, 'scripts', file));
    }
    for (const folder of folders) fs.mkdirSync(path.join(root, folder), {recursive:true});
    for (const file of files.filter(name => name.endsWith('.md'))) fs.writeFileSync(path.join(root, file), '# 项目指南\n');
    fs.writeFileSync(path.join(root, 'AGENTS.md'), '# 内部说明\n');
    const run = check => spawnSync(process.execPath, ['scripts/build-documents.mjs', ...(check ? ['--check'] : [])], {cwd:root, encoding:'utf8'});
    const readCatalog = () => {
      const window = {};
      vm.runInNewContext(fs.readFileSync(path.join(root, 'documents.js'), 'utf8'), {window});
      return window.DESIGN_ATLAS_DOCUMENTS;
    };
    assert.equal(run().status, 0);
    const relative = 'docs/new-guide.md';
    fs.writeFileSync(path.join(root, relative), '# 新文档\n');
    const staleAddition = run(true);
    assert.notEqual(staleAddition.status, 0);
    assert.match(staleAddition.stderr, /Document directory is stale/);
    assert.equal(run().status, 0);
    const catalog = readCatalog();
    assert.equal(catalog.find(document => document.path === relative).title, '新文档');
    assert.equal(catalog.find(document => document.path === relative).group, '复现与素材');
    assert.ok(!catalog.some(document => document.path === 'AGENTS.md'));
    assert.equal(run(true).status, 0);
    fs.unlinkSync(path.join(root, relative));
    const staleRemoval = run(true);
    assert.notEqual(staleRemoval.status, 0);
    assert.match(staleRemoval.stderr, /Document directory is stale/);
    assert.equal(run().status, 0);
    assert.ok(!readCatalog().some(document => document.path === relative));
    assert.equal(run(true).status, 0);
  } finally {
    fs.rmSync(root, {recursive:true, force:true});
  }
});
