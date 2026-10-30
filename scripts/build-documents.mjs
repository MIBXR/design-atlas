import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const groups = ['项目指南', '研究方法与索引', '案例研究', '巧思研究', '复用 Prompt', '素材使用'];
const guideTitles = {'docs/guide.md':'项目指南', 'docs/agent.md':'Agent 工作流与数据契约'};

export function documentCatalog() {
  const paths = [];
  function collect(relative) {
    for (const item of fs.readdirSync(path.join(root, relative), {withFileTypes:true})) {
      const child = path.posix.join(relative, item.name);
      if (item.isDirectory()) collect(child);
      else if (item.name.endsWith('.md')) paths.push(child);
    }
  }
  for (const directory of ['docs', 'prompts']) collect(directory);
  const documents = paths.map(relative => {
    const text = fs.readFileSync(path.join(root, relative), 'utf8');
    const heading = /^#\s+(.+?)\s*#*\s*$/m.exec(text)?.[1] || path.posix.basename(relative);
    const title = guideTitles[relative] || heading.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]*>|[*`]/g, '').trim();
    const group = guideTitles[relative] ? groups[0] : relative.startsWith('prompts/') ? groups[4] : relative.startsWith('docs/cases/') ? groups[2] : relative.startsWith('docs/patterns/') ? groups[3] : relative.startsWith('docs/materials/') ? groups[5] : groups[1];
    return {path:relative, title, group};
  });
  const guideOrder = Object.keys(guideTitles);
  documents.sort((a,b) => groups.indexOf(a.group)-groups.indexOf(b.group) || (a.group === groups[0] ? guideOrder.indexOf(a.path)-guideOrder.indexOf(b.path) : a.title.localeCompare(b.title,'zh-CN')) || a.path.localeCompare(b.path));
  return documents;
}

export function buildDocuments() {
  const documents = documentCatalog();
  fs.writeFileSync(path.join(root,'data/docs.js'), 'window.ATLAS_DOCUMENTS = ' + JSON.stringify(documents,null,2) + ';\n', 'utf8');
  return documents;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(`Built ${buildDocuments().length} public Markdown documents.`);
