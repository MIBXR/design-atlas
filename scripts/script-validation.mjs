import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';

// Parse modules as modules, without importing or executing demo/vendor code.
export function validateScript(file, {module=false, seen=new Set()}={}) {
  const resolved=path.resolve(file);
  if(seen.has(resolved))return 0;
  seen.add(resolved);
  const source=fs.readFileSync(resolved,'utf8');
  if(!module){new vm.Script(source,{filename:resolved});return 1;}
  const parsed=spawnSync(process.execPath,['--input-type=module','--check'],{input:source,encoding:'utf8',maxBuffer:1024*1024});
  if(parsed.error||parsed.status!==0)throw new Error(parsed.error?.message||parsed.stderr.trim());
  let count=1;
  const refs=[...source.matchAll(/^[ \t]*import\s+(?:[\w$,*{}\s]+\s+from\s*)?['"]([^'"]+)['"]/gm),...source.matchAll(/^[ \t]*export\s+(?:\*|\{[^}]*\})\s+from\s*['"]([^'"]+)['"]/gm),...source.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g)];
  for(const match of refs){
    const ref=match[1];
    if(!ref.startsWith('.'))throw new Error('Demo module dependency must be local: '+ref);
    const dependency=path.resolve(path.dirname(resolved),ref);
    if(!fs.existsSync(dependency))throw new Error('Missing module dependency: '+ref+' in '+resolved);
    count+=validateScript(dependency,{module:true,seen});
  }
  return count;
}
