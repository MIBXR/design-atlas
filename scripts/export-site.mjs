import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {isDeepStrictEqual} from 'node:util';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repository = 'MIBXR/design-atlas';
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const jsonBytes = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');

function git(directory, args) {
  const result = spawnSync('git', args, {cwd:directory, encoding:'utf8'});
  if (result.status !== 0) throw new Error('Git inspection failed: ' + args[0]);
  return result.stdout.trim();
}

function inside(parent, child) {
  const relative = path.relative(parent, child);
  return relative !== '' && relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}

// Check each ancestor too: a normal-looking dist inside a junction is unsafe.
function plainPath(filename) {
  const absolute = path.resolve(filename);
  let current = path.parse(absolute).root;
  for (const part of absolute.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    const stat = fs.lstatSync(current, {throwIfNoEntry:false});
    if (stat?.isSymbolicLink()) throw new Error('Symlinks and junctions are not allowed: ' + current);
  }
  return absolute;
}

function inventory(directory) {
  plainPath(directory);
  if (!fs.lstatSync(directory).isDirectory()) throw new Error('Expected a real directory: ' + directory);
  const files = [];
  function visit(current) {
    for (const name of fs.readdirSync(current).sort()) {
      if (name === '.git') throw new Error('Static output cannot contain Git metadata.');
      const filename = path.join(current, name);
      const stat = fs.lstatSync(filename);
      if (stat.isDirectory()) visit(filename);
      else if (stat.isFile()) {
        const bytes = fs.readFileSync(filename);
        files.push({path:path.relative(directory, filename).split(path.sep).join('/'), bytes:bytes.length, sha256:sha256(bytes)});
      } else throw new Error('Static output contains a link or special file: ' + filename);
    }
  }
  visit(directory);
  return files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}

function json(filename) {
  plainPath(filename);
  if (!fs.lstatSync(filename).isFile()) throw new Error('Expected a regular JSON file: ' + filename);
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function cleanSource(sourceRoot) {
  if (git(sourceRoot, ['status', '--porcelain', '--untracked-files=all'])) throw new Error('Commit the canonical source before exporting; its working tree must be clean.');
  const commit = git(sourceRoot, ['rev-parse', 'HEAD']);
  if (!/^[a-f\d]{40}$/.test(commit)) throw new Error('Expected a full canonical Git commit SHA.');
  return commit;
}

function verifyFiles(directory, expected) {
  if (!isDeepStrictEqual(inventory(directory), expected)) throw new Error('Static file paths, bytes or SHA256 differ from the verified export.');
}

// sourceRoot is injectable for offline fixture checks; the CLI always uses this repository.
export function exportSite(checkout, {sourceRoot = root, verify = false} = {}) {
  if (!path.isAbsolute(checkout)) throw new Error('Use the absolute native checkout path returned by the Sites helper.');
  sourceRoot = plainPath(sourceRoot);
  checkout = plainPath(checkout);
  if (checkout === sourceRoot || inside(sourceRoot, checkout) || inside(checkout, sourceRoot)) throw new Error('The native checkout must be separate from the canonical repository.');
  if (path.relative(checkout, fs.realpathSync(git(checkout, ['rev-parse', '--show-toplevel']))) !== '') throw new Error('The native Git checkout must be rooted at the specified directory.');
  const sourceCommit = cleanSource(sourceRoot);
  const sourceHosting = json(path.join(sourceRoot, '.openai', 'hosting.json'));
  const nativeHosting = json(path.join(checkout, '.openai', 'hosting.json'));
  if (!sourceHosting.project_id || nativeHosting.project_id !== sourceHosting.project_id || nativeHosting.static?.directory !== 'dist') throw new Error('Native hosting must identify the same Site and serve dist.');
  const sourceDist = plainPath(path.join(sourceRoot, 'dist'));
  const targetDist = plainPath(path.join(checkout, 'dist'));
  const targetProvenance = plainPath(path.join(checkout, 'site-provenance.json'));
  if (!inside(checkout, targetDist) || path.dirname(targetDist) !== checkout) throw new Error('Target dist must be directly inside the specified native checkout.');
  const catalog = json(path.join(sourceDist, 'agent', 'catalog.json'));
  if (catalog.source?.repository !== repository || catalog.source?.commit !== sourceCommit || catalog.source?.baseUrl !== `https://raw.githubusercontent.com/${repository}/${sourceCommit}/`) throw new Error('Rebuild canonical dist: catalog.source must identify its exact clean GitHub HEAD.');
  const {source, ...builtCatalog} = catalog;
  if (!isDeepStrictEqual(builtCatalog, json(path.join(sourceRoot, 'agent', 'catalog.json')))) throw new Error('Built Agent catalog does not match the canonical content catalog.');
  if (!/^[a-f\d]{64}$/.test(catalog.contentVersion)) throw new Error('Invalid canonical contentVersion.');
  const assetPath = plainPath(path.join(sourceDist, 'asset-sources.js'));
  if (!fs.lstatSync(assetPath).isFile()) throw new Error('Built media map must be a regular file.');
  const assetBytes = fs.readFileSync(assetPath);
  if (!assetBytes.equals(fs.readFileSync(plainPath(path.join(sourceRoot, 'asset-sources.js'))))) throw new Error('Built media map differs from the committed canonical map.');
  const assignment = /globalThis\.DesignAtlasAssetSources\s*=\s*(\{[\s\S]*\});?\s*$/.exec(assetBytes.toString('utf8'));
  if (!assignment) throw new Error('Cannot read the fixed asset map without executing it.');
  const assets = JSON.parse(assignment[1]);
  if (!/^[a-f\d]{40}$/.test(assets.commit) || assets.baseUrl !== `https://raw.githubusercontent.com/${repository}/${assets.commit}/`) throw new Error('Media must use an immutable canonical GitHub commit.');
  for (const [filename, asset] of Object.entries(assets.assets)) {
    if (!filename || filename.startsWith('/') || filename.includes('\\') || filename.split('/').some(part => !part || part === '.' || part === '..')) throw new Error('Invalid canonical media path: ' + filename);
    const expectedUrl = assets.baseUrl + filename.split('/').map(encodeURIComponent).join('/');
    if (!/^[a-f\d]{64}$/.test(asset.sha256) || !Number.isSafeInteger(asset.bytes) || asset.bytes <= 0 || asset.url !== expectedUrl) throw new Error('Invalid fixed media mapping: ' + filename);
  }
  const files = inventory(sourceDist);
  const exportedPaths = new Set(files.map(file => file.path));
  if (Object.keys(assets.assets).some(filename => exportedPaths.has(filename))) throw new Error('Use the GitHub asset build: mapped original media must be omitted from dist.');
  const provenance = {
    schemaVersion:1,
    projectId:nativeHosting.project_id,
    canonicalSource:{repository, commit:sourceCommit, contentVersion:catalog.contentVersion},
    mediaSource:{commit:assets.commit, baseUrl:assets.baseUrl, manifestSha256:sha256(assetBytes), assetCount:Object.keys(assets.assets).length},
    static:{directory:'dist', fileCount:files.length, bytes:files.reduce((sum, file) => sum + file.bytes, 0), filesSha256:sha256(jsonBytes(files)), files}
  };
  const provenanceBytes = jsonBytes(provenance);
  const result = {checkout, sourceCommit, contentVersion:catalog.contentVersion, assetsCommit:assets.commit, fileCount:files.length, bytes:provenance.static.bytes, filesSha256:provenance.static.filesSha256, provenanceSha256:sha256(provenanceBytes)};
  if (verify) {
    verifyFiles(targetDist, files);
    if (!fs.readFileSync(targetProvenance).equals(provenanceBytes)) throw new Error('Provenance bytes/hash differ from the canonical export.');
    if (cleanSource(sourceRoot) !== sourceCommit) throw new Error('Canonical source advanced during verification.');
    return result;
  }
  if (fs.existsSync(targetDist)) inventory(targetDist);
  if (fs.existsSync(targetProvenance) && !fs.lstatSync(targetProvenance).isFile()) throw new Error('Existing provenance is not a regular file.');
  const staging = fs.mkdtempSync(path.join(checkout, '.site-export-stage-'));
  const stagedDist = path.join(staging, 'dist');
  const stagedProvenance = path.join(staging, 'site-provenance.json');
  const previousDist = path.join(staging, 'previous-dist');
  const previousProvenance = path.join(staging, 'previous-provenance.json');
  let installedDist = false;
  let installedProvenance = false;
  try {
    fs.cpSync(sourceDist, stagedDist, {recursive:true, dereference:false});
    fs.writeFileSync(stagedProvenance, provenanceBytes);
    verifyFiles(stagedDist, files);
    if (cleanSource(sourceRoot) !== sourceCommit) throw new Error('Canonical source advanced during export.');
    verifyFiles(sourceDist, files);
    plainPath(targetDist);
    plainPath(targetProvenance);
    if (fs.existsSync(targetDist)) {
      inventory(targetDist);
      fs.renameSync(targetDist, previousDist);
    }
    if (fs.existsSync(targetProvenance)) fs.renameSync(targetProvenance, previousProvenance);
    fs.renameSync(stagedDist, targetDist);
    installedDist = true;
    fs.renameSync(stagedProvenance, targetProvenance);
    installedProvenance = true;
    verifyFiles(targetDist, files);
    if (!fs.readFileSync(targetProvenance).equals(provenanceBytes)) throw new Error('Exported provenance bytes changed.');
    return result;
  } catch (error) {
    if (installedDist) {
      plainPath(targetDist);
      inventory(targetDist);
      fs.rmSync(targetDist, {recursive:true});
    }
    if (installedProvenance) fs.unlinkSync(targetProvenance);
    if (fs.existsSync(previousDist)) fs.renameSync(previousDist, targetDist);
    if (fs.existsSync(previousProvenance)) fs.renameSync(previousProvenance, targetProvenance);
    throw error;
  } finally {
    if (!inside(checkout, staging)) throw new Error('Unsafe staging cleanup path.');
    plainPath(staging);
    inventory(staging);
    fs.rmSync(staging, {recursive:true});
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const verify = args.includes('--verify');
    const values = args.filter(value => value !== '--verify');
    if (args.filter(value => value === '--verify').length > 1 || values.length !== 2 || values[0] !== '--checkout') throw new Error('Usage: node scripts/export-site.mjs --checkout <absolute native checkout> [--verify]');
    console.log(JSON.stringify(exportSite(values[1], {verify}), null, 2));
    if (!verify) console.log('Export only; Git was not changed. Force-track the complete output: git add --force -- dist site-provenance.json. Preserve dist bytes with dist/** -text in the native checkout .gitattributes; verify committed bytes and the packaged archive before publishing.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
