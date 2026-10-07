import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files=fs.readdirSync(path.join(root,'entries')).filter(x=>x.endsWith('.json'));
const entries=files.map(file=>JSON.parse(fs.readFileSync(path.join(root,'entries',file),'utf8')));
const required=['id','order','title','subtitle','category','tags','summary','accent','background','principles','productFocus','interaction','theme','constraints','useCases','avoid','tokens','sources','prompt','negativePrompt','demo','preview','research','exercise','composition'];
const failures=[]; let scripts=0; let sourceCount=0;
function fail(message){failures.push(message);}
if(entries.length<14)fail(`Expected at least the original 14 entries; found ${entries.length}`);
if(new Set(entries.map(x=>x.id)).size!==entries.length)fail('Duplicate ids');
if(new Set(entries.map(x=>x.order)).size!==entries.length)fail('Duplicate order values');
for(const e of entries){
  for(const key of required)if(e[key]===undefined)fail(`${e.id}: missing ${key}`);
  for(const name of ['principles','interaction','constraints','tags','sources','useCases','avoid'])if(!Array.isArray(e[name])||e[name].length===0)fail(`${e.id}: empty or invalid ${name}`);
  for(const name of ['accent','background'])if(!/^#[0-9a-f]{6}$/i.test(e[name]||''))fail(`${e.id}: invalid ${name}`);
  if(!Array.isArray(e.tokens?.palette)||!e.tokens.palette.length||e.tokens.palette.some(x=>!/^#[0-9a-f]{6}$/i.test(x)))fail(`${e.id}: invalid token palette`);
  for(const name of ['type','layout','motion'])if(typeof e.tokens?.[name]!=='string'||!e.tokens[name])fail(`${e.id}: missing token ${name}`);
  for(const name of ['color','typography','layout','imagery','shape','hierarchy','motion','coherence'])if(typeof e.composition?.[name]!=='string'||!e.composition[name])fail(`${e.id}: missing composition ${name}`);
  if(!['fixed','system','manual','system-and-manual'].includes(e.themeBehavior?.mode)||!['light','dark','system'].includes(e.themeBehavior?.default)||!e.themeBehavior?.control||!e.themeBehavior?.designReason)fail(`${e.id}: invalid theme behavior`);
  if(!['none','background','video','external','interactive'].includes(e.soundBehavior?.kind)||!e.soundBehavior?.control||!e.soundBehavior?.interactionRole)fail(`${e.id}: invalid sound behavior`);
  if(!['产品','游戏/IP','经典风格','艺术/文化'].includes(e.category))fail(`${e.id}: invalid category`);
  if(typeof e.prompt!=='string'||e.prompt.length<200)fail(`${e.id}: prompt too short`);
  if(!e.sources.some(x=>x.type==='实例'))fail(`${e.id}: no real example`);
  if(!e.sources.some(x=>['理论','规范'].includes(x.type)))fail(`${e.id}: no theory or standard`);
  sourceCount+=e.sources.length;
  for(const s of e.sources)if(!/^https:\/\//.test(s.url)||!s.note)fail(`${e.id}: invalid source`);
  for(const key of ['demo','research',...(process.argv.includes('--require-previews')?['preview']:[])])if(!fs.existsSync(path.join(root,e[key])))fail(`${e.id}: missing ${e[key]}`);
  const demoPath=path.join(root,e.demo); if(!fs.existsSync(demoPath))continue;
  const html=fs.readFileSync(demoPath,'utf8');
  if(!/<meta[^>]+name=["']viewport["']/.test(html))fail(`${e.id}: missing viewport`);
  if(!html.includes('prefers-reduced-motion')&&!fs.readdirSync(path.dirname(demoPath)).filter(x=>x.endsWith('.css')).some(x=>fs.readFileSync(path.join(path.dirname(demoPath),x),'utf8').includes('prefers-reduced-motion')))fail(`${e.id}: missing reduced-motion rule`);
  for(const match of html.matchAll(/<(?:script|img|link|source|video|audio)[^>]+(?:src|href|poster)=["']([^"']+)["']/g)){
    const ref=match[1];if(/^(https?:)?\/\//.test(ref))fail(`${e.id}: remote asset ${ref}`);
    else if(!ref.startsWith('data:')&&!ref.startsWith('#')&&!fs.existsSync(path.resolve(path.dirname(demoPath),ref.split(/[?#]/)[0])))fail(`${e.id}: missing local asset ${ref}`);
  }
  for(const match of html.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/g)){
    const cssPath=path.resolve(path.dirname(demoPath),match[1]);if(!fs.existsSync(cssPath))continue;
    for(const url of fs.readFileSync(cssPath,'utf8').matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)){
      const ref=url[1];if(/^(https?:)?\/\//.test(ref))fail(`${e.id}: remote stylesheet asset ${ref}`);
      else if(!ref.startsWith('data:')&&!ref.startsWith('#')&&!fs.existsSync(path.resolve(path.dirname(cssPath),ref.split(/[?#]/)[0])))fail(`${e.id}: missing stylesheet asset ${ref}`);
    }
  }
  if(e.referenceUrl&&e.implementation!=='reference-study')fail(`${e.id}: real website must use reference-study implementation`);
  if(e.implementation==='reference-study'||e.referenceUrl){
    for(const key of ['country','referenceUrl','fidelity','assetManifest'])if(!e[key])fail(`${e.id}: missing reference-study ${key}`);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(e.capturedAt||''))fail(`${e.id}: missing or invalid capture date`);
    for(const key of ['fidelity','assetManifest',...(e.referencePreview?['referencePreview']:[])])if(e[key]&&!fs.existsSync(path.join(root,e[key])))fail(`${e.id}: missing evidence ${e[key]}`);
  }
  for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){if(!match[1].trim())continue;try{new vm.Script(match[1]);scripts++;}catch(err){fail(`${e.id}: inline JS ${err.message}`);}}
  for(const file of fs.readdirSync(path.dirname(demoPath)).filter(x=>x.endsWith('.js'))){try{new vm.Script(fs.readFileSync(path.join(path.dirname(demoPath),file),'utf8'));scripts++;}catch(err){fail(`${e.id}: ${file} ${err.message}`);}}
}
for(const file of ['atlas.js','catalog.js','fundamentals.js','document.js','theme.js']){try{new vm.Script(fs.readFileSync(path.join(root,file),'utf8'));scripts++;}catch(err){fail(`${file}: ${err.message}`);}}
for(const file of ['index.html','fundamentals.html','document.html']){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  if(!/<meta[^>]+name=["']viewport["']/.test(html))fail(`${file}: missing viewport`);
  for(const match of html.matchAll(/<(?:script|img|link)[^>]+(?:src|href)=["']([^"']+)["']/g)){
    const ref=match[1];
    if(/^(https?:)?\/\//.test(ref))fail(`${file}: remote asset ${ref}`);
    else if(!ref.startsWith('data:')&&!ref.startsWith('#')&&!fs.existsSync(path.join(root,ref.split('?')[0])))fail(`${file}: missing local asset ${ref}`);
  }
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`PASS: ${entries.length} entries, ${sourceCount} source records, ${scripts} JS scripts; local assets and required fields valid${process.argv.includes('--require-previews')?', preview files present':''}.`);
