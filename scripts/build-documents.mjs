import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {files, folders} from './build-static.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'documents.js');
const groups = ['项目指南', '研究方法与索引', '案例研究', '复用 Prompt', '复现与素材'];
const guideTitles = {'README.md':'项目指南', 'CONTRIBUTING.md':'添加与维护案例', 'AGENT.md':'Agent 工作流与数据契约', 'agent/README.md':'Agent 资料说明'};

export function documentCatalog() {
  const paths = [];
  function collect(relative) {
    const source = path.join(root, relative);
    if (fs.statSync(source).isDirectory()) {
      for (const name of fs.readdirSync(source)) collect(path.posix.join(relative, name));
    } else if (relative.endsWith('.md')) paths.push(relative);
  }
  for (const relative of [...files.filter(name => name.endsWith('.md')), ...folders]) collect(relative);
  const entries = fs.readdirSync(path.join(root, 'entries')).filter(name => name.endsWith('.json')).map(name => JSON.parse(fs.readFileSync(path.join(root, 'entries', name), 'utf8')));
  const research = new Set(entries.map(entry => entry.research));
  const caseTitles = new Map(entries.map(entry => [entry.id, entry.title]));
  const documents = [...new Set(paths)].map(relative => {
    const text = fs.readFileSync(path.join(root, relative), 'utf8');
    const heading = /^#\s+(.+?)\s*#*\s*$/m.exec(text)?.[1] || path.posix.basename(relative);
    let title = guideTitles[relative] || heading.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]*>|[*`]/g, '').trim();
    const directory = relative.split('/')[0];
    const group = guideTitles[relative] ? groups[0] : research.has(relative) ? groups[2] : directory === 'research' ? groups[1] : directory === 'prompts' ? groups[3] : groups[4];
    if (directory === 'demos' && /\/(?:state-matrix|THIRD-PARTY-NOTICES)\.md$/.test(relative)) title = `${caseTitles.get(relative.split('/')[1]) || relative.split('/')[1]} · ${title}`;
    return {path:relative, title, group};
  });
  const guideOrder = Object.keys(guideTitles);
  documents.sort((a, b) => groups.indexOf(a.group) - groups.indexOf(b.group) || (a.group === groups[0] ? guideOrder.indexOf(a.path) - guideOrder.indexOf(b.path) : a.title.localeCompare(b.title, 'zh-CN')) || a.path.localeCompare(b.path));
  return documents;
}

export function buildDocuments({check = false} = {}) {
  const documents = documentCatalog();
  const source = 'window.DESIGN_ATLAS_DOCUMENTS = ' + JSON.stringify(documents, null, 2) + ';\n';
  if (check) {
    if (fs.readFileSync(output, 'utf8') !== source) throw new Error('Document directory is stale. Run npm run build.');
  } else fs.writeFileSync(output, source, 'utf8');
  return documents;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.slice(2).includes('--check');
  console.log(`${check ? 'Checked' : 'Built'} ${buildDocuments({check}).length} public Markdown documents.`);
}
