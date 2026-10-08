import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { renderDetailNotes } from './detail-notes.mjs';

export const repository = 'https://github.com/MIBXR/design-atlas';
export const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const sha256 = data => crypto.createHash('sha256').update(data).digest('hex');
const encode = value => Buffer.from(JSON.stringify(value, null, 2) + '\n', 'utf8');
const catalogFields = ['id', 'title', 'category', 'tags', 'summary', 'useCases', 'avoid', 'country', 'implementation', 'capturedAt', 'theoryVerifiedAt', 'tokens', 'composition', 'interaction', 'themeBehavior', 'soundBehavior'];
const sharedFiles = ['asset-sources.js', 'asset-runtime.js', 'asset-cache.js', 'asset-cache-worker.js', 'case-loading.css', 'case-loading.js', 'theme.js', 'favicon.svg', 'document.html', 'document.js', 'document.css', 'site-nav.css', 'site-shell.js'];

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

function makeBundle(root, entry, entryPath) {
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
  return { schemaVersion: 1, id: entry.id, entry, documents, files };
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
  const records = entries.map(({ entry, entryPath }) => {
    const bundle = makeBundle(root, entry, entryPath);
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
  const contentVersion = sha256(Buffer.from(records.map(record => [record.id, record.bundleSha256]).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([id, hash]) => `${id}:${hash}\n`).join(''), 'utf8'));
  const catalog = { schemaVersion: 1, contentVersion, entryCount: records.length, repository, entries: records };
  outputs.set('agent/catalog.json', encode(catalog));
  outputs.set('agent/README.md', Buffer.from('# Design Atlas · Agent 数据\n\n完整工作流与数据协议见 [AGENT.md](../AGENT.md)。\n\n- [catalog.json](catalog.json)：检索索引，保留原案例的设计、主题、声音和适用场景。\n- `cases/<id>.json`：完整原始条目、研究与 Prompt 等原文，以及源码、原始素材和预览的文件清单。二进制素材以原仓库路径与 SHA256 引用，不嵌入 JSON。\n- `webNotes`：生成时执行真正的 `atlas.js`，保存网页右侧完整七节说明的原始 HTML，包括标签、来源日期、负向约束和界面说明；与实际网页说明逐字节校验。\n- `contentVersion` 由排序后的案例 ID 与 bundle SHA256 生成；没有时钟或 Git SHA 自引用。\n\n生成文件使用 UTF-8 与 LF。被引用的源文件遵循 `.gitattributes`：普通文本固定 LF，素材与第三方 vendor 保留原字节。生成器计算实际文件字节，不转换源文档或素材。\n\n这些文件由 `node scripts/build-agent.mjs` 自动生成。修改原始条目／文档／代码／素材后先运行 `npm run build`，再运行 `node scripts/check-agent.mjs` 与 `node scripts/check-detail-alignment.mjs` 检查生成内容同步及网页说明对齐。\n', 'utf8'));
  if (write) {
    // Check the destination before creating directories or replacing any bytes.
    fs.mkdirSync(resolveRepositoryPath(root, 'agent/cases', { mustExist: false }), { recursive: true });
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
  }
  return { catalog, bundles, outputs };
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
