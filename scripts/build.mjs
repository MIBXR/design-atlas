import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {buildAgent} from './build-agent.mjs';
import {assertRepositoryLineEndings} from './check-line-endings.mjs';
import {buildDocuments} from './build-documents.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assertRepositoryLineEndings(root);
const entries = fs.readdirSync(path.join(root,'entries')).filter(x=>x.endsWith('.json')).map(x=>JSON.parse(fs.readFileSync(path.join(root,'entries',x),'utf8'))).sort((a,b)=>a.order-b.order);
const referenceCount = entries.filter(entry=>entry.implementation==='reference-study').length;
const readmePath = path.join(root,'README.md');
const readme = fs.readFileSync(readmePath,'utf8');
const counts = `<!-- atlas-counts:start -->\n**${entries.length} 个案例**　·　**${referenceCount} 个品牌／文化研究**　·　**${entries.length-referenceCount} 种经典设计语言**\n<!-- atlas-counts:end -->`;
if(!readme.includes('<!-- atlas-counts:start -->') || !readme.includes('<!-- atlas-counts:end -->'))throw new Error('README case count markers are missing');
fs.writeFileSync(readmePath,readme.replace(/<!-- atlas-counts:start -->[\s\S]*?<!-- atlas-counts:end -->/,counts),'utf8');
fs.writeFileSync(path.join(root,'catalog.js'), 'window.DESIGN_ATLAS = ' + JSON.stringify(entries,null,2) + ';\n');
for (const file of ['index.html', 'cases.html']) {
  const filePath = path.join(root, file);
  const html = fs.readFileSync(filePath, 'utf8')
    .replace(/(data-home-count="all">)\d+/g, `$1${entries.length}`)
    .replace(/(data-home-count="studies">)\d+/g, `$1${referenceCount}`)
    .replace(/(data-home-count="classics">)\d+/g, `$1${entries.length-referenceCount}`)
    .replace(/(id="(?:all-count|hero-count)">)\d+/g, `$1${entries.length}`)
    .replace(/(id="results-label" role="status">全部风格 \/ )\d+( 个条目)/g, `$1${entries.length}$2`);
  fs.writeFileSync(filePath, html, 'utf8');
}
fs.mkdirSync(path.join(root, 'prompts'), {recursive:true});
for (const entry of entries) {
  const prompt = `# ${entry.title} · 复用 Prompt\n\n由 [结构化案例](../entries/${entry.id}.json) 自动生成。参考观察与具体边界见 [调研](../${entry.research})。\n\n## 正向 Prompt\n\n${entry.prompt}\n\n## 负向约束\n\n${entry.negativePrompt}\n\n## 制作约束\n\n${entry.constraints.map(item => '- ' + item).join('\n')}\n\n## 检查方法\n\n${entry.exercise}\n\n[查看 Demo](../${entry.demo}) · [返回案例库](../cases.html#style/${entry.id})\n`;
  fs.writeFileSync(path.join(root, 'prompts', entry.id + '.md'), prompt, 'utf8');
}
const clean = value => String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const rows = entries.map(entry => {
  const source = entry.referenceUrl || entry.sources[0]?.url;
  const label = entry.studyScope === 'visual-adaptation' ? '官方影像网页转译' : entry.implementation === 'reference-study' ? '原站局部复现' : '经典构成练习';
  return `| ${entry.order} | [${clean(entry.title)}](../cases.html#style/${entry.id}) | ${clean(entry.category)} | ${clean(entry.country || '跨来源研究')} | ${label} | ${entry.capturedAt || '—'} | [原始案例](${source}) · [研究](${path.basename(entry.research)}) · [Prompt数据](../entries/${entry.id}.json) · [Demo](../${entry.demo}) |`;
});
fs.writeFileSync(path.join(root,'research','CASE-INDEX.md'), `# 案例与代码索引\n\n由 entries/ 自动生成，共 ${entries.length} 项。真实网站案例按原始网址与采集日期固定归档，不跟随官网后续变化。国家/地区按具体机构、创作来源收录；不代表全国统一风格。详细比较见 [国别案例比较](COUNTRY-COMPARISON.md)。\n\n| 顺序 | 案例 | 分类 | 国家/地区 | 类型 | 采集日期 | 可查询资料 |\n| --- | --- | --- | --- | --- | --- | --- |\n${rows.join('\n')}\n`, 'utf8');
console.log(`Built ${entries.length} entries. Open index.html or run npm start.`);
const {catalog} = buildAgent();
console.log(`Built ${catalog.entryCount} Agent case bundles (${catalog.contentVersion.slice(0,12)}).`);
console.log(`Built ${catalog.patterns?.patternCount || 0} curated design patterns with linked, verifiable sources.`);
console.log(`Built ${buildDocuments().length} public Markdown documents.`);
