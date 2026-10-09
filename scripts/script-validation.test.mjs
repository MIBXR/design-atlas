import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {validateScript} from './script-validation.mjs';
test('module validation catches syntax errors and recursively checks local dependencies without execution',()=>{
 const folder=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-module-'));
 try{
  const main=path.join(folder,'app.js'),nested=path.join(folder,'nested.js');
  fs.writeFileSync(main,"import './nested.js'; throw Error('must not execute');");
  fs.writeFileSync(nested,'export const x=1;');assert.equal(validateScript(main,{module:true}),2);
  fs.writeFileSync(nested,'export const x=1;const x=2;');assert.throws(()=>validateScript(main,{module:true}),/already been declared/);
  fs.unlinkSync(nested);assert.throws(()=>validateScript(main,{module:true}),/Missing module dependency/);
 }finally{assert.ok(path.resolve(folder).startsWith(path.resolve(os.tmpdir())+path.sep));fs.rmSync(folder,{recursive:true,force:true});}
});
