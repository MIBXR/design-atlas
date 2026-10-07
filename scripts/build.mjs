import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries = fs.readdirSync(path.join(root,'entries')).filter(x=>x.endsWith('.json')).map(x=>JSON.parse(fs.readFileSync(path.join(root,'entries',x),'utf8'))).sort((a,b)=>a.order-b.order);
fs.writeFileSync(path.join(root,'catalog.js'), 'window.DESIGN_ATLAS = ' + JSON.stringify(entries,null,2) + ';\n');
fs.mkdirSync(path.join(root, 'prompts'), {recursive:true});
for (const entry of entries) {
  const prompt = `# ${entry.title} · 复用 Prompt\n\n由 [结构化案例](../entries/${entry.id}.json) 自动生成。参考观察与具体边界见 [调研](../${entry.research})。\n\n## 正向 Prompt\n\n${entry.prompt}\n\n## 负向约束\n\n${entry.negativePrompt}\n\n## 制作约束\n\n${entry.constraints.map(item => '- ' + item).join('\n')}\n\n## 检查方法\n\n${entry.exercise}\n\n[查看 Demo](../${entry.demo}) · [返回参考库](../index.html#style/${entry.id})\n`;
  fs.writeFileSync(path.join(root, 'prompts', entry.id + '.md'), prompt, 'utf8');
}
const clean = value => String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const rows = entries.map(entry => {
  const source = entry.referenceUrl || entry.sources[0]?.url;
  const label = entry.implementation === 'reference-study' ? '原站局部复现' : '经典构成练习';
  return `| ${entry.order} | [${clean(entry.title)}](../index.html#style/${entry.id}) | ${clean(entry.category)} | ${clean(entry.country || '跨来源研究')} | ${label} | ${entry.capturedAt || '—'} | [原始案例](${source}) · [研究](${path.basename(entry.research)}) · [Prompt数据](../entries/${entry.id}.json) · [Demo](../${entry.demo}) |`;
});
fs.writeFileSync(path.join(root,'research','CASE-INDEX.md'), `# 案例与代码索引\n\n由 entries/ 自动生成，共 ${entries.length} 项。真实网站案例按原始网址与采集日期固定归档，不跟随官网后续变化。国家/地区按具体机构、创作来源收录；不代表全国统一风格。详细比较见 [国别案例比较](COUNTRY-COMPARISON.md)。\n\n| 顺序 | 案例 | 分类 | 国家/地区 | 类型 | 采集日期 | 可查询资料 |\n| --- | --- | --- | --- | --- | --- | --- |\n${rows.join('\n')}\n`, 'utf8');
console.log(`Built ${entries.length} entries. Open index.html or run npm start.`);
