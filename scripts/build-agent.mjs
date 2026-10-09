import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { renderDetailNotes } from './detail-notes.mjs';
import { loadPatterns, buildPatterns } from './build-patterns.mjs';

export const repository = 'https://github.com/MIBXR/design-atlas';
export const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const sha256 = data => crypto.createHash('sha256').update(data).digest('hex');
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n', 'utf8');
const catalogFields = ['id', 'title', 'category', 'tags', 'summary', 'useCases', 'avoid', 'country', 'implementation', 'studyScope', 'capturedAt', 'theoryVerifiedAt', 'tokens', 'composition', 'interaction', 'themeBehavior', 'soundBehavior'];
const sharedFiles = ['asset-sources.js', 'asset-runtime.js', 'asset-cache.js', 'asset-cache-worker.js', 'case-loading.css', 'case-loading.js', 'theme.js', 'favicon.svg', 'document.html', 'document.js', 'document.css', 'site-nav.css', 'theme-control.css', 'site-typography.css', 'site-footer.css', 'site-shell.js'];

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
  const bytes = readFile(root, relative);
  return { path: relative, role, content: readText(root, relative), sha256: sha256(bytes), bytes: bytes.length };
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
    ...walkFiles(root, 'vendor'),
  ]);
  if (entry.referencePreview) paths.add(entry.referencePreview);
  const mobilePreview = `previews/mobile/${entry.id}.jpg`;
  const mobilePath = resolveRepositoryPath(root, mobilePreview, { mustExist: false });
  if (fs.existsSync(mobilePath)) paths.add(mobilePreview);
  const files = [...paths].sort().map(relative => {
    const bytes = readFile(root, relative);
    return { path: relative, role: fileRole(relative, entry, documentPaths), sha256: sha256(bytes), bytes: bytes.length };
  });
  return { schemaVersion: 1, id: entry.id, entry, patternIds, documents, files };
}

export function buildAgent({ root = defaultRoot, write = true } = {}) {
  const entryDirectory = resolveRepositoryPath(root, 'entries');
  const entries = fs.readdirSync(entryDirectory).filter(name => name.endsWith('.json')).sort().map(name => {
    const entryPath = 'entries/' + name;
    return { entryPath, entry: JSON.parse(readText(root, entryPath)) };
  }).sort((a, b) => a.entry.order - b.entry.order || a.entry.id.localeCompare(b.entry.id, 'en'));
  if (!entries.length) throw new Error('No entries found');
  if (new Set(entries.map(({ entry }) => entry.id)).size !== entries.length) throw new Error('Duplicate case ids');
  const bundles = [];
  const outputs = new Map();
  const rendererSource = readText(root, 'atlas.js');
  const originalEntries = entries.map(({ entry }) => entry);
  const patterns = loadPatterns({ root, entries: originalEntries });
  const records = entries.map(({ entry, entryPath }) => {
    const patternIds = patterns.filter(pattern => pattern.sources.some(source => source.caseId === entry.id)).map(pattern => pattern.id);
    const bundle = makeBundle(root, entry, entryPath, patternIds);
    const { notes } = renderDetailNotes({ entries: originalEntries, id: entry.id, rendererSource });
    const notesBytes = Buffer.from(notes, 'utf8');
    bundle.webNotes = { format: 'text/html', renderer: 'atlas.js', content: notes, sha256: sha256(notesBytes), bytes: notesBytes.length };
    const bundlePath = `agent/cases/${entry.id}.json`;
    const data = encode(bundle);
    outputs.set(bundlePath, data);
    bundles.push(bundle);
    const record = Object.fromEntries(catalogFields.filter(key => entry[key] !== undefined).map(key => [key, entry[key]]));
    record.paths = { bundle: bundlePath, preview: entry.preview, demo: entry.demo, entry: entryPath };
    record.bundleSha256 = sha256(data);
    return record;
  });
  const patternData = patterns.length ? buildPatterns({ root, patterns, caseRecords: records, caseBundles: bundles, write: false }) : null;
  if (patternData) for (const [relative, bytes] of patternData.outputs) outputs.set(relative, bytes);
  const caseVersionInput = records.map(record => [record.id, record.bundleSha256]).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([id, hash]) => `${id}:${hash}\n`).join('');
  const contentVersion = sha256(Buffer.from(caseVersionInput + (patternData ? `patterns:${patternData.catalog.contentVersion}\n` : ''), 'utf8'));
  const catalog = { schemaVersion: 1, contentVersion, entryCount: records.length, repository, entries: records };
  if (patternData) {
    const bytes = outputs.get('agent/patterns.json');
    catalog.patterns = { path: 'agent/patterns.json', sha256: sha256(bytes), bytes: bytes.length, patternCount: patterns.length, contentVersion: patternData.catalog.contentVersion };
  }
  outputs.set('agent/catalog.json', encode(catalog));
  outputs.set('agent/README.md', Buffer.from("# Design Atlas · Agent 数据\n\n完整工作流与数据协议见 [AGENT.md](../AGENT.md)，维护标准见 [CONTRIBUTING.md](../CONTRIBUTING.md)。\n\n- [catalog.json](catalog.json)：完整案例索引与设计巧思目录的路径、SHA256、字节数和版本。\n- cases/<id>.json：原始条目、研究与Prompt原文、网页说明webNotes、完整源码/素材清单，以及反向关联patternIds。\n- [patterns.json](patterns.json)：人工策展的完整原子记录、来源、约束、参数与组合关系，并提供巧思包路径/哈希。\n- patterns/<id>.json：完整pattern与sourceCases；来源案例包含标题、完整包/演示路径及包SHA256。sourceFiles从来源案例清单核验，完整运行依赖按来源案例导出。\n- webNotes由真实atlas.js生成，保存网页案例七节原始HTML；比较界面按同名章节逐行对齐，原始单例说明保持一致。\n\n巧思sources的observed/adapted/inferred保留观察、迁移与公共资料推断的边界。先核验主索引patterns描述，再核验巧思bundleSha256与sourceCases；全部资料、索引和文件使用同一个固定会话SHA。在线发布只在主索引添加source.commit/baseUrl，完整案例/巧思包和巧思目录保持原始字节。\n\n巧思contentVersion由排序后的巧思ID与包SHA256确定；总库contentVersion由排序后的案例ID/哈希加巧思contentVersion确定。案例只引用巧思ID，巧思引用案例哈希，没有哈希循环、时钟或Git SHA自引用。\n\n生成文件使用UTF-8与LF；被引用的文件遵循.gitattributes。二进制只记录原仓库路径/字节数/SHA256，不嵌入JSON。源码来自原始Git字节，区别于部署中重写素材地址或增加UTF-8标记的展示文件。\n\n修改内容后运行npm run build，再运行npm run check与npm run test:agent。构建扫描全部entries/及patterns/；检查覆盖、去重、源观察漂移、组合ID、manifest和生成哈希。首次增加案例须拆巧思，终态维护不复制内容到skill仓库。\n", 'utf8'));
  if (write) {
    // Check the destination before creating directories or replacing any bytes.
    fs.mkdirSync(resolveRepositoryPath(root, 'agent/cases', { mustExist: false }), { recursive: true });
    if (patternData) fs.mkdirSync(resolveRepositoryPath(root, 'agent/patterns', { mustExist: false }), { recursive: true });
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
  }
  return { catalog, bundles, patternCatalog: patternData?.catalog, patternBundles: patternData?.bundles || [], outputs };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { catalog } = buildAgent();
    console.log(`Built Agent catalog and ${catalog.entryCount} lossless case bundles (${catalog.contentVersion.slice(0, 12)}).`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
