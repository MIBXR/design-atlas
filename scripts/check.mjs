import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries=fs.readdirSync(path.join(root,'entries')).filter(x=>x.endsWith('.json')).map(file=>JSON.parse(fs.readFileSync(path.join(root,'entries',file),'utf8')));
const failures=[];
const local=ref=>!/^(https?:)?\/\//.test(ref)&&!ref.startsWith('data:')&&!ref.startsWith('#');
function checkRefs(label,html,dir){
  for(const match of html.matchAll(/<(?:script|img|link|source|video|audio)[^>]+(?:src|href|poster)=["']([^"']+)["']/g)){
    const ref=match[1];if(local(ref)&&!fs.existsSync(path.resolve(dir,ref.split(/[?#]/)[0])))failures.push(`${label}: missing local asset ${ref}`);
  }
}
for(const e of entries){
  for(const key of ['demo','research','preview'])if(e[key]&&!fs.existsSync(path.join(root,e[key])))failures.push(`${e.id}: missing ${e[key]}`);
  const demoPath=path.join(root,e.demo||'');if(!e.demo||!fs.existsSync(demoPath))continue;
  const dir=path.dirname(demoPath),html=fs.readFileSync(demoPath,'utf8');
  checkRefs(e.id,html,dir);
  for(const match of html.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/g)){
    const cssPath=path.resolve(dir,match[1]);if(!fs.existsSync(cssPath))continue;
    for(const url of fs.readFileSync(cssPath,'utf8').matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)){
      const ref=url[1];if(local(ref)&&!fs.existsSync(path.resolve(path.dirname(cssPath),ref.split(/[?#]/)[0])))failures.push(`${e.id}: missing stylesheet asset ${ref}`);
    }
  }
}
for(const file of ['index.html','cases.html','patterns.html','agent.html','fundamentals.html','document.html'])checkRefs(file,fs.readFileSync(path.join(root,file),'utf8'),root);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`PASS: ${entries.length} entries; local references resolve.`);
