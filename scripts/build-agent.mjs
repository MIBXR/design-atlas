import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderDetailNotes } from './detail-notes.mjs';
import { loadPatterns, buildPatterns } from './build-patterns.mjs';
import { loadMaterials, buildMaterials } from './build-materials.mjs';
import { assertRepositoryLineEndings } from './check-line-endings.mjs';

export const repository = 'https://github.com/MIBXR/web-atlas';
export const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n', 'utf8');
const catalogFields = ['id', 'title', 'category', 'tags', 'summary', 'useCases', 'avoid', 'country', 'implementation', 'studyScope', 'capturedAt', 'theoryVerifiedAt', 'tokens', 'composition', 'interaction', 'themeBehavior', 'soundBehavior'];
const sharedFiles = ['data/asset-sources.js', 'site/runtime/asset-runtime.js', 'site/runtime/asset-cache.js', 'asset-cache-worker.js', 'site/runtime/case-loading.css', 'site/runtime/case-loading.js', 'site/shared/theme.js', 'site/icons/favicon.svg', 'docs.html', 'site/pages/docs/docs.js', 'site/pages/docs/docs.css', 'site/shared/site-nav.css', 'site/shared/theme-control.css', 'site/shared/site-typography.css', 'site/shared/site-footer.css', 'site/shared/site-shell.js'];

// Public paths always use the repository's portable, relative path syntax.
// Check every existing component rather than trusting a lexical prefix alone.
export function resolveRepositoryPath(root, relative, { mustExist = true } = {}) {
  if (typeof relative !== 'string' || !relative || /[\\\0<>:"|?*]/.test(relative) || path.posix.isAbsolute(relative) || path.win32.isAbsolute(relative) || relative.split('/').some(part => !part || part === '.' || part === '..' || /[. ]$/.test(part) || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part))) {
    throw new Error(`Unsafe repository path: ${relative}`);
  }
  const absoluteRoot = path.resolve(root);
  const rootStat = fs.lstatSync(absoluteRoot);
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) throw new Error(`Repository root must be a real directory: ${absoluteRoot}`);
  const target = path.resolve(absoluteRoot, ...relative.split('/'));
  if (path.relative(absoluteRoot, target).startsWith('..' + path.sep) || target === absoluteRoot) throw new Error(`Path escapes repository: ${relative}`);
  let current = absoluteRoot;
  for (const component of relative.split('/')) {
    current = path.join(current, component);
    if (!fs.existsSync(current)) {
      // existsSync follows symlinks, including broken ones: inspect with lstat too.
      try { if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Symlink is forbidden: ${relative}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (mustExist) throw new Error(`Missing repository file: ${relative}`);
      continue;
    }
    if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Symlink is forbidden: ${relative}`);
  }
  return target;
}

function readFile(root, relative) {
  const absolute = resolveRepositoryPath(root, relative);
  if (!fs.lstatSync(absolute).isFile()) throw new Error(`Expected a regular file: ${relative}`);
  return fs.readFileSync(absolute);
}

function readText(root, relative) {
  const bytes = readFile(root, relative);
  // Reject lossy decoding; documents must preserve the exact original UTF-8 text.
  new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  return bytes.toString('utf8');
}

function walkFiles(root, relative) {
  const absolute = resolveRepositoryPath(root, relative);
  const result = [];
  for (const name of fs.readdirSync(absolute).sort()) {
    const child = relative + '/' + name;
    const stat = fs.lstatSync(resolveRepositoryPath(root, child));
    if (stat.isDirectory()) result.push(...walkFiles(root, child));
    else if (stat.isFile()) result.push(child);
    else throw new Error(`Unsupported filesystem object: ${child}`);
  }
  return result;
}

function fileRole(relative, entry, documentPaths) {
  if (documentPaths.has(relative) || relative === `entries/${entry.id}.json` || /\.(?:md|txt|json)$/i.test(relative)) return 'context';
  if (relative === entry.preview || relative === entry.referencePreview || relative.startsWith('previews/')) return 'preview';
  if (relative.includes('/assets/')) return 'asset';
  return /\.(?:html|js|mjs|css)$/i.test(relative) ? 'source' : 'asset';
}

function documentRecord(root, relative, role) {
  return { path: relative, role, content: readText(root, relative) };
}

function makeBundle(root, entry, entryPath, patternIds = []) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) throw new Error(`Invalid case id: ${entry.id}`);
  if (entryPath !== `entries/${entry.id}.json`) throw new Error(`Entry filename does not match id: ${entryPath}`);
  if (entry.demo !== `demos/${entry.id}/index.html`) throw new Error(`Unexpected demo path for ${entry.id}: ${entry.demo}`);
  const definitions = [
    [entry.research, 'research'],
    [`prompts/${entry.id}.md`, 'prompt'],
    [entry.fidelity, 'fidelity'],
    [entry.assetManifest, 'asset-manifest'],
  ].filter(([relative]) => relative !== undefined);
  const documents = definitions.map(([relative, role]) => documentRecord(root, relative, role));
  const documentPaths = new Set(documents.map(doc => doc.path));
  const paths = new Set([
    ...walkFiles(root, `demos/${entry.id}`),
    entryPath, ...documentPaths, entry.preview,
    ...sharedFiles,
    // Small shared renderer dependencies and their original license notices.
    ...walkFiles(root, 'site/vendor'),
  ]);
  if (entry.referencePreview) paths.add(entry.referencePreview);
  const mobilePreview = `previews/mobile/${entry.id}.jpg`;
  const mobilePath = resolveRepositoryPath(root, mobilePreview, { mustExist: false });
  if (fs.existsSync(mobilePath)) paths.add(mobilePreview);
  const files = [...paths].sort().map(relative => ({ path: relative, role: fileRole(relative, entry, documentPaths) }));
  return { schemaVersion: 1, id: entry.id, entry, patternIds, documents, files };
}

export function buildAgent({ root = defaultRoot, write = true } = {}) {
  assertRepositoryLineEndings(root);
  const entryDirectory = resolveRepositoryPath(root, 'entries');
  const entries = fs.readdirSync(entryDirectory).filter(name => name.endsWith('.json')).sort().map(name => {
    const entryPath = 'entries/' + name;
    return { entryPath, entry: JSON.parse(readText(root, entryPath)) };
  }).sort((a, b) => a.entry.order - b.entry.order || a.entry.id.localeCompare(b.entry.id, 'en'));
  if (!entries.length) throw new Error('No entries found');
  if (new Set(entries.map(({ entry }) => entry.id)).size !== entries.length) throw new Error('Duplicate case ids');
  const bundles = [];
  const outputs = new Map();
  const rendererSource = readText(root, 'site/pages/cases/atlas.js');
  const originalEntries = entries.map(({ entry }) => entry);
  const patterns = loadPatterns({ root, entries: originalEntries });
  const records = entries.map(({ entry, entryPath }) => {
    const patternIds = patterns.filter(pattern => pattern.sources.some(source => source.caseId === entry.id)).map(pattern => pattern.id);
    const bundle = makeBundle(root, entry, entryPath, patternIds);
    const { notes } = renderDetailNotes({ entries: originalEntries, id: entry.id, rendererSource });
    bundle.webNotes = { format: 'text/html', renderer: 'site/pages/cases/atlas.js', content: notes };
    const bundlePath = `agent/cases/${entry.id}.json`;
    const data = encode(bundle);
    outputs.set(bundlePath, data);
    bundles.push(bundle);
    const record = Object.fromEntries(catalogFields.filter(key => entry[key] !== undefined).map(key => [key, entry[key]]));
    record.paths = { bundle: bundlePath, preview: entry.preview, demo: entry.demo, entry: entryPath };
    return record;
  });
  const patternData = patterns.length ? buildPatterns({ root, patterns, caseRecords: records, caseBundles: bundles, write: false }) : null;
  if (patternData) for (const [relative, bytes] of patternData.outputs) outputs.set(relative, bytes);
  const materials = loadMaterials({ root });
  const materialData = materials.length ? buildMaterials({ root, materials, write: false }) : null;
  if (materialData) for (const [relative, bytes] of materialData.outputs) outputs.set(relative, bytes);
  const catalog = { schemaVersion: 1, entryCount: records.length, repository, entries: records };
  if (patternData) {
    catalog.patterns = { path: 'agent/patterns.json', patternCount: patterns.length };
  }
  if (materialData) {
    catalog.materials = { path: 'agent/materials.json', materialCount: materials.length };
  }
  outputs.set('agent/catalog.json', encode(catalog));
  outputs.set('agent/README.md', Buffer.from("# Web Atlas · Agent 数据\n\n完整工作流见 [docs/agent.md](../docs/agent.md)，维护标准见 [CONTRIBUTING.md](../CONTRIBUTING.md)。\n\n- [catalog.json](catalog.json)：案例摘要、包路径及巧思／素材目录路径。\n- cases/<id>.json：完整 entry、documents 原文、webNotes HTML、files 路径与角色、patternIds 关联。\n- [patterns.json](patterns.json)：巧思机制、来源、约束、参数、组合关系与包路径。\n- patterns/<id>.json：完整 pattern 与 sourceCases；按来源案例路径和 sourceFiles 取得上下文。\n- [materials.json](materials.json)：独立内容素材摘要和包路径。\n- materials/<id>.json：完整 material、documents、files 与主要源码 sourceFiles；来源版本和许可随包保留。\n\n所有资料使用同一个固定 Git 提交。目录按命令需要独立读取。发布索引的 source.commit/baseUrl 指向原始源码；网页播放文件可经过部署转换。\n\nwebNotes 由 site/pages/cases/atlas.js 的实际详情渲染器生成。来源 observed/adapted/inferred 保留观察、迁移与推断的边界；来源记录原文随资料保留。\n\n运行 npm run build 同步资料，npm run check 检查本地引用。受影响页面通过浏览器验收。\n", 'utf8'));
  if (write) {
    // Check the destination before creating directories or replacing any bytes.
    fs.mkdirSync(resolveRepositoryPath(root, 'agent/cases', { mustExist: false }), { recursive: true });
    if (patternData) fs.mkdirSync(resolveRepositoryPath(root, 'agent/patterns', { mustExist: false }), { recursive: true });
    if (materialData) fs.mkdirSync(resolveRepositoryPath(root, 'agent/materials', { mustExist: false }), { recursive: true });
    for (const [relative, data] of outputs) fs.writeFileSync(resolveRepositoryPath(root, relative, { mustExist: false }), data);
    const casesPath = resolveRepositoryPath(root, 'agent/cases');
    for (const name of fs.readdirSync(casesPath)) {
      const relative = `agent/cases/${name}`;
      if (name.endsWith('.json') && !outputs.has(relative)) {
        const absolute = resolveRepositoryPath(root, relative);
        if (!fs.lstatSync(absolute).isFile()) throw new Error(`Unexpected generated path: ${relative}`);
        fs.unlinkSync(absolute);
      }
    }
    if (patternData) for (const name of fs.readdirSync(resolveRepositoryPath(root, 'agent/patterns'))) {
      const relative = `agent/patterns/${name}`;
      if (name.endsWith('.json') && !outputs.has(relative)) fs.unlinkSync(resolveRepositoryPath(root, relative));
    }
    if (materialData) for (const name of fs.readdirSync(resolveRepositoryPath(root, 'agent/materials'))) {
      const relative = `agent/materials/${name}`;
      if (name.endsWith('.json') && !outputs.has(relative)) fs.unlinkSync(resolveRepositoryPath(root, relative));
    }
  }
  return { catalog, bundles, patternCatalog: patternData?.catalog, patternBundles: patternData?.bundles || [], materialCatalog: materialData?.catalog, materialBundles: materialData?.bundles || [], outputs };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { catalog } = buildAgent();
    console.log(`Built Agent catalog and ${catalog.entryCount} case bundles.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
