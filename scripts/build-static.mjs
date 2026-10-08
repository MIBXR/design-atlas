import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {loadAssetSources} from './build-asset-sources.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, 'dist');
const files = ['index.html', 'landing.css', 'home.js', 'legacy-links.js', 'site-nav.css', 'cases.html', 'atlas.css', 'atlas.js', 'theme.js', 'catalog.js', 'fundamentals.html', 'fundamentals.css', 'fundamentals.js', 'document.html', 'document.js', 'favicon.svg', 'README.md', 'CONTRIBUTING.md', 'agent.html', 'agent.css', 'agent.js', 'AGENT.md', 'llms.txt'];
const runtimeFiles = ['asset-sources.js', 'asset-runtime.js', 'asset-cache.js', 'asset-cache-worker.js', 'case-loading.js', 'case-loading.css'];
const folders = ['demos', 'entries', 'previews', 'research', 'prompts', 'docs', 'vendor', 'agent'];
const localOrigin = 'https://design-atlas.invalid';

function regularTree(source) {
  const info = fs.lstatSync(source);
  if (info.isDirectory()) for (const child of fs.readdirSync(source)) regularTree(path.join(source, child));
  else if (!info.isFile()) throw new Error('Static content cannot contain links or special files: ' + source);
}

function localReference(value, documentPath) {
  const trimmed = value.trim().replace(/&amp;/g, '&');
  if (!trimmed || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(trimmed)) return null;
  try {
    const url = new URL(trimmed, localOrigin + '/' + documentPath);
    if (url.origin !== localOrigin) return null;
    return {canonical:decodeURIComponent(url.pathname.slice(1)), suffix:url.search + url.hash};
  } catch { return null; }
}

export function rewriteAssetURL(value, documentPath, sources) {
  const reference = localReference(value, documentPath);
  const asset = reference && sources.assets[reference.canonical];
  return asset ? asset.url + reference.suffix : value;
}

export function rewriteCSS(text, documentPath, sources) {
  return text.replace(/url\(\s*(?:(["'])((?:\\.|(?!\1)[\s\S])*?)\1|([^"')]*))\s*\)/gi, (whole, quote, quoted, bare) => {
    const value = quote ? quoted : bare.trim();
    const rewritten = rewriteAssetURL(value, documentPath, sources);
    return rewritten === value ? whole : `url(${quote || '"'}${rewritten}${quote || '"'})`;
  });
}

// URL/descriptor boundaries preserve data URLs, which can contain commas.
export function rewriteSrcset(text, documentPath, sources) {
  let position = 0;
  let last = 0;
  let result = '';
  while (position < text.length) {
    while (position < text.length && /[\s,]/.test(text[position])) position++;
    const start = position;
    while (position < text.length && !/\s/.test(text[position])) position++;
    let end = position;
    while (end > start && text[end - 1] === ',') end--;
    if (end > start) {
      result += text.slice(last, start) + rewriteAssetURL(text.slice(start, end), documentPath, sources);
      last = end;
    }
    if (end < position) continue;
    let parentheses = 0;
    while (position < text.length) {
      const character = text[position++];
      if (character === '(') parentheses++;
      if (character === ')') parentheses = Math.max(0, parentheses - 1);
      if (character === ',' && !parentheses) break;
    }
  }
  return result + text.slice(last);
}

function rewriteTag(tag, documentPath, sources) {
  return tag.replace(/(\b(?:srcset|src|poster|href|style)\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+))/gi, (whole, prefix, double, single, bare) => {
    const quote = double !== undefined ? '"' : single !== undefined ? "'" : '';
    const value = double ?? single ?? bare;
    const decoded = value.replace(/&(?:amp|quot|apos|lt|gt|#x[\da-f]+|#\d+);/gi, entity => {
      const named = {'&amp;':'&', '&quot;':'"', '&apos;':"'", '&lt;':'<', '&gt;':'>'};
      if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
      const code = entity[2].toLowerCase() === 'x' ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
    });
    const attribute = prefix.trim().split(/\s*=/)[0].toLowerCase();
    const rewritten = attribute === 'style' ? rewriteCSS(decoded, documentPath, sources) : attribute === 'srcset' ? rewriteSrcset(decoded, documentPath, sources) : rewriteAssetURL(decoded, documentPath, sources);
    if (decoded === rewritten) return whole;
    const delimiter = quote || '"';
    const escaped = rewritten.replace(/&/g, '&amp;').replace(delimiter === '"' ? /"/g : /'/g, delimiter === '"' ? '&quot;' : '&#39;');
    return prefix + delimiter + escaped + delimiter;
  });
}

export function rewriteHTML(text, documentPath, sources) {
  return text.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<(?:[^>"']|"[^"]*"|'[^']*')+>/gi, token => {
    if (token.startsWith('<!--')) return token;
    if (/^<script\b/i.test(token)) return token.replace(/^<script\b[^>]*>/i, tag => rewriteTag(tag, documentPath, sources));
    if (/^<style\b/i.test(token)) return token.replace(/(^<style\b[^>]*>)([\s\S]*)(<\/style\s*>$)/i, (_, open, css, close) => rewriteTag(open, documentPath, sources) + rewriteCSS(css, documentPath, sources) + close);
    return rewriteTag(token, documentPath, sources);
  });
}

function injectAssets(text, documentPath, assetsMode) {
  const directory = path.posix.dirname(documentPath);
  const relative = name => path.posix.relative(directory === '.' ? '' : directory, name) || name;
  const hasRuntime = /<script\b[^>]*\bsrc\s*=\s*["'][^"']*asset-runtime\.js["']/i.test(text);
  const scripts = hasRuntime ? '' : `<script src="${relative('asset-sources.js')}"></script><script src="${relative('asset-runtime.js')}"></script>`;
  const setup = `<script data-design-atlas-assets>window.DesignAtlasAssetMode=${JSON.stringify(assetsMode === 'github' ? 'github' : 'auto')};</script>${scripts}`;
  if (!/<head\b[^>]*>/i.test(text)) throw new Error('Asset runtime requires a head element: ' + documentPath);
  // Resolve the library theme before asset loading can delay the first paint.
  const head = /<head\b[^>]*>[\s\S]*?<\/head\s*>/i.exec(text)?.[0] || '';
  const themeBoot = /<script src="theme\.js"><\/script>/i.exec(head)?.[0];
  if (themeBoot) return text.replace(themeBoot, themeBoot + setup);
  return text.replace(/<head\b[^>]*>/i, head => head + setup);
}

export function prepareStatic(assetsMode = 'local') {
  if (!['local', 'github'].includes(assetsMode)) throw new Error('Asset mode must be local or github.');
  if (path.relative(root, output) !== 'dist' || fs.lstatSync(output, {throwIfNoEntry:false})?.isSymbolicLink()) throw new Error('Static output must be the real dist directory inside this repository.');
  const includedRuntime = runtimeFiles.filter(name => fs.existsSync(path.join(root, name)));
  const runtimeReady = includedRuntime.includes('asset-runtime.js') && includedRuntime.includes('asset-sources.js');
  if (assetsMode === 'github' && !runtimeReady) throw new Error('GitHub mode requires asset-sources.js and asset-runtime.js in the source checkout.');
  const sources = includedRuntime.includes('asset-sources.js') ? loadAssetSources() : {assets:{}};
  // Hosted HTML/CSS is rewritten for playback, and Markdown gains a UTF-8 BOM.
  // Agent source must come from the original Git bytes, not those display files.
  const revision = spawnSync('git', ['rev-parse', 'HEAD'], {cwd:root, encoding:'utf8'});
  const clean = spawnSync('git', ['status', '--porcelain'], {cwd:root, encoding:'utf8'});
  const sourceCommit = revision.stdout?.trim();
  if (revision.status !== 0 || clean.status !== 0 || clean.stdout.trim() || !/^[a-f\d]{40}$/.test(sourceCommit)) throw new Error('Commit the verified source before static packaging so Agent source URLs identify the exact original bytes.');
  for (const name of [...files, ...includedRuntime, ...folders]) regularTree(path.join(root, name));
  fs.rmSync(output, {recursive:true, force:true});
  fs.mkdirSync(output);
  const omitted = new Set(assetsMode === 'github' ? Object.keys(sources.assets) : []);
  let omittedBytes = 0;
  for (const name of [...files, ...includedRuntime, ...folders]) {
    fs.cpSync(path.join(root, name), path.join(output, name), {recursive:true, filter:source => {
      const canonical = path.relative(root, source).split(path.sep).join('/');
      if (omitted.has(canonical)) { omittedBytes += sources.assets[canonical].bytes; return false; }
      return true;
    }});
  }
  let markedDocuments = 0;
  let totalBytes = 0;
  let rewrittenDocuments = 0;
  function finalize(directory) {
    for (const item of fs.readdirSync(directory, {withFileTypes:true})) {
      const target = path.join(directory, item.name);
      if (item.isDirectory()) finalize(target);
      else if (item.isFile()) {
        const canonical = path.relative(output, target).split(path.sep).join('/');
        if (item.name.endsWith('.html') || item.name.endsWith('.css')) {
          const original = fs.readFileSync(target, 'utf8');
          let text = original;
          if (assetsMode === 'github') text = item.name.endsWith('.html') ? rewriteHTML(text, canonical, sources) : rewriteCSS(text, canonical, sources);
          if (runtimeReady && item.name.endsWith('.html')) text = injectAssets(text, canonical, assetsMode);
          if (assetsMode === 'github' && (item.name.endsWith('.html') ? rewriteHTML(text, canonical, sources) : rewriteCSS(text, canonical, sources)) !== text) throw new Error('A static asset reference was not rewritten: ' + canonical);
          if (text !== original) { fs.writeFileSync(target, text, 'utf8'); rewrittenDocuments++; }
        } else if (item.name.endsWith('.md')) {
          const bytes = fs.readFileSync(target);
          if (!bytes.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf]))) fs.writeFileSync(target, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), bytes]));
          markedDocuments++;
        }
        totalBytes += fs.statSync(target).size;
      }
    }
  }
  finalize(output);
  const catalogPath = path.join(output, 'agent', 'catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  catalog.source = {repository:'MIBXR/design-atlas', commit:sourceCommit, baseUrl:`https://raw.githubusercontent.com/MIBXR/design-atlas/${sourceCommit}/`};
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  for (const canonical of omitted) {
    const asset = sources.assets[canonical];
    if (fs.existsSync(path.join(output, canonical)) || !asset?.url.startsWith(sources.baseUrl) || asset.bytes < sources.thresholdBytes || !/^[a-f\d]{64}$/.test(asset.sha256)) throw new Error('An omitted asset has no valid immutable source: ' + canonical);
  }
  if (fs.existsSync(path.join(output, '.git'))) throw new Error('Git metadata cannot be served.');
  console.log(`Prepared dist (${assetsMode} assets): ${totalBytes} bytes (${(totalBytes / 1024 / 1024).toFixed(3)} MiB).`);
  console.log(`Omitted ${omitted.size} byte-preserved media assets (${omittedBytes} bytes); rewrote ${rewrittenDocuments} HTML/CSS documents. Executable libraries and full local source assets remain in the checkout.`);
  console.log(`Marked ${markedDocuments} deployed Markdown documents as UTF-8; tracked source files unchanged.`);
  return {assetsMode, totalBytes, omittedAssets:omitted.size, omittedBytes, rewrittenDocuments};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argumentsList = process.argv.slice(2);
  if (argumentsList.some(value => !/^--assets=(?:local|github)$/.test(value)) || argumentsList.length > 1) throw new Error('Usage: node scripts/build-static.mjs [--assets=local|github]');
  prepareStatic(argumentsList[0]?.split('=')[1] || 'local');
}
