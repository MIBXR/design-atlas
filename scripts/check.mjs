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
function checkCSS(label,css,dir){
  for(const url of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)){
    const ref=url[1];if(local(ref)&&!fs.existsSync(path.resolve(dir,ref.split(/[?#]/)[0])))failures.push(`${label}: missing stylesheet asset ${ref}`);
  }
}
function checkSite(directory){
  for(const item of fs.readdirSync(directory,{withFileTypes:true})){
    const file=path.join(directory,item.name);
    if(item.isDirectory())checkSite(file);
    else if(item.name.endsWith('.html'))checkRefs(path.relative(root,file),fs.readFileSync(file,'utf8'),directory);
    else if(item.name.endsWith('.css'))checkCSS(path.relative(root,file),fs.readFileSync(file,'utf8'),directory);
  }
}
for(const e of entries){
  for(const key of ['demo','research','preview'])if(e[key]&&!fs.existsSync(path.join(root,e[key])))failures.push(`${e.id}: missing ${e[key]}`);
  const demoPath=path.join(root,e.demo||'');if(!e.demo||!fs.existsSync(demoPath))continue;
  const dir=path.dirname(demoPath),html=fs.readFileSync(demoPath,'utf8');
  checkRefs(e.id,html,dir);
  for(const match of html.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/g)){
    const cssPath=path.resolve(dir,match[1]);if(!fs.existsSync(cssPath))continue;
    checkCSS(e.id,fs.readFileSync(cssPath,'utf8'),path.dirname(cssPath));
  }
}
for(const file of ['index.html','cases.html','patterns.html','materials.html','agent.html','lab.html','docs.html'])checkRefs(file,fs.readFileSync(path.join(root,file),'utf8'),root);
checkSite(path.join(root,'site'));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`PASS: ${entries.length} entries; local references resolve.`);
