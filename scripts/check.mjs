import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const entries=fs.readdirSync(path.join(root,'entries/cases')).filter(x=>x.endsWith('.json')).map(file=>JSON.parse(fs.readFileSync(path.join(root,'entries/cases',file),'utf8')));
const snapshots=fs.readdirSync(path.join(root,'entries/materials')).filter(name=>name.endsWith('.json')).map(name=>JSON.parse(fs.readFileSync(path.join(root,'entries/materials',name),'utf8')).snapshotPath).filter(Boolean);
const failures=[];
const local=ref=>ref&&!/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(ref);
const resolve=(dir,ref)=>ref.startsWith('/')?path.join(root,ref):path.resolve(dir,ref);
function checkCSS(label,css,dir){
  for(const match of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)){
    const ref=decodeURIComponent(match[1]);if(local(ref)&&!fs.existsSync(resolve(dir,ref.split(/[?#]/)[0])))failures.push(label+': missing stylesheet asset '+ref);
  }
}
function checkRefs(label,html,dir){
  for(const tag of html.matchAll(/<(?:script|img|link|source|video|audio|iframe)\b[^>]*>/g)){
    for(const match of tag[0].matchAll(/(?:src|href|poster|data-src)=["']([^"']+)["']/g)){
      const ref=match[1];if(!local(ref))continue;const file=resolve(dir,ref.split(/[?#]/)[0]);
      if(!fs.existsSync(file))failures.push(label+': missing local asset '+ref);
      else if(tag[0].startsWith('<link')&&file.endsWith('.css'))checkCSS(label,fs.readFileSync(file,'utf8'),path.dirname(file));
    }
    const srcset=tag[0].match(/srcset=["']([^"']+)["']/)?.[1];
    if(srcset&&!srcset.startsWith('data:'))for(const value of srcset.split(',')){const ref=value.trim().split(/\s+/)[0];if(local(ref)&&!fs.existsSync(resolve(dir,ref.split(/[?#]/)[0])))failures.push(label+': missing srcset asset '+ref);}
  }
  for(const style of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g))checkCSS(label,style[1],dir);
  for(const style of html.matchAll(/\bstyle=(["'])(.*?)\1/g))checkCSS(label,style[2],dir);
}
function visit(directory,styles=false){
  if(snapshots.includes(path.relative(root,directory).split(path.sep).join('/')+'/'))return;
  for(const item of fs.readdirSync(directory,{withFileTypes:true})){
    const file=path.join(directory,item.name);
    if(item.isDirectory()){if(item.name!=='source')visit(file,styles);}
    else if(item.name.endsWith('.html'))checkRefs(path.relative(root,file),fs.readFileSync(file,'utf8'),directory);
    else if(styles&&item.name.endsWith('.css'))checkCSS(path.relative(root,file),fs.readFileSync(file,'utf8'),directory);
  }
}
for(const entry of entries)for(const key of ['demo','research','preview'])if(entry[key]&&!fs.existsSync(path.join(root,entry[key])))failures.push(entry.id+': missing '+entry[key]);
for(const file of ['index.html','cases.html','patterns.html','materials.html','agent.html','lab.html','docs.html'])checkRefs(file,fs.readFileSync(path.join(root,file),'utf8'),root);
visit(path.join(root,'demos/cases'));visit(path.join(root,'demos/materials'));visit(path.join(root,'site'),true);visit(path.join(root,'scripts/templates'),true);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('PASS: '+entries.length+' entries; case subpages, material demos and site local references resolve.');
