import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repository = 'MIBXR/web-atlas';

function git(directory, args) {
  const result = spawnSync('git', args, {cwd:directory, encoding:'utf8'});
  if (result.status !== 0) throw new Error('Git inspection failed: ' + args[0]);
  return result.stdout.trim();
}

function inside(parent, child) {
  const relative = path.relative(parent, child);
  return relative !== '' && relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}

function plainPath(filename) {
  const absolute = path.resolve(filename);
  let current = path.parse(absolute).root;
  for (const part of absolute.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    if (fs.lstatSync(current, {throwIfNoEntry:false})?.isSymbolicLink()) throw new Error('Symlinks and junctions are not allowed: ' + current);
  }
  return absolute;
}

const json = filename => JSON.parse(fs.readFileSync(plainPath(filename), 'utf8'));

export function exportSite(checkout, {sourceRoot = root} = {}) {
  if (!path.isAbsolute(checkout)) throw new Error('Use the absolute native checkout path returned by the Sites helper.');
  sourceRoot = plainPath(sourceRoot);
  checkout = plainPath(checkout);
  if (checkout === sourceRoot || inside(sourceRoot, checkout) || inside(checkout, sourceRoot)) throw new Error('The native checkout must be separate from the canonical repository.');
  if (path.relative(checkout, fs.realpathSync(git(checkout, ['rev-parse', '--show-toplevel']))) !== '') throw new Error('The native Git checkout must be rooted at the specified directory.');
  if (git(sourceRoot, ['status', '--porcelain', '--untracked-files=all'])) throw new Error('Commit the source before exporting.');
  const sourceCommit = git(sourceRoot, ['rev-parse', 'HEAD']);
  const sourceHosting = json(path.join(sourceRoot, '.openai', 'hosting.json'));
  const nativeHosting = json(path.join(checkout, '.openai', 'hosting.json'));
  if (!sourceHosting.project_id || nativeHosting.project_id !== sourceHosting.project_id) throw new Error('Native hosting must identify the same Site.');
  const sourceDist = plainPath(path.join(sourceRoot, 'dist'));
  const targetDist = plainPath(path.join(checkout, 'dist'));
  if (fs.existsSync(targetDist) && !fs.lstatSync(targetDist).isDirectory()) throw new Error('Existing dist must be a directory.');
  const catalog = json(path.join(sourceDist, 'client', 'agent', 'catalog.json'));
  if (catalog.source?.repository !== repository || catalog.source?.commit !== sourceCommit) throw new Error('Build dist from the current committed source before exporting.');
  const staging = fs.mkdtempSync(path.join(checkout, '.site-export-stage-'));
  const stagedDist = path.join(staging, 'dist');
  const previousDist = path.join(staging, 'previous-dist');
  let movedPrevious = false;
  try {
    fs.cpSync(sourceDist, stagedDist, {recursive:true, dereference:false, filter:filename => {
      const stat = fs.lstatSync(filename);
      if (path.basename(filename) === '.git' || !stat.isDirectory() && !stat.isFile()) throw new Error('Static output cannot contain Git metadata, links or special files: ' + filename);
      return true;
    }});
    if (fs.existsSync(targetDist)) {
      fs.renameSync(targetDist, previousDist);
      movedPrevious = true;
    }
    fs.renameSync(stagedDist, targetDist);
    fs.copyFileSync(path.join(sourceRoot, '.openai', 'hosting.json'), path.join(checkout, '.openai', 'hosting.json'));
    return {checkout, sourceCommit};
  } catch (error) {
    if (movedPrevious && !fs.existsSync(targetDist)) fs.renameSync(previousDist, targetDist);
    throw error;
  } finally {
    if (!inside(checkout, staging)) throw new Error('Unsafe staging cleanup path.');
    fs.rmSync(staging, {recursive:true, force:true});
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 2 || args[0] !== '--checkout') throw new Error('Usage: node scripts/export-site.mjs --checkout <absolute native checkout>');
    const result = exportSite(args[1]);
    console.log(`Exported dist from ${result.sourceCommit} to ${result.checkout}. Git was not changed.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
