import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {resolveRepositoryPath} from './build-agent.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const help = `Web Atlas — local, dependency-free Agent interface
node scripts/atlas.mjs search "深色 产品" [--category 产品] [--limit 5]
node scripts/atlas.mjs show linear-workflow [--source]
node scripts/atlas.mjs export linear-workflow --out <new-directory> [--code-only]

search returns keyword matches, show returns complete context, export preserves
repository-relative paths and original bytes. Full export includes media.
Use npm run build after changing entries or source files.`;

export function safePath(base, relative) {
  return resolveRepositoryPath(base, relative, {mustExist:false});
}

export function searchCatalog(catalog, query = '', {category, limit = 5} = {}) {
  const terms = [...new Set(query.toLowerCase().split(/[\s,，;；]+/u).filter(Boolean))];
  const fields = ['id','title','tags','category','useCases','summary','tokens','composition','interaction','themeBehavior','soundBehavior','avoid'];
  return catalog.entries.filter(e => !category || e.category === category).map(entry => {
    let score = 0;
    const matches = [];
    for (const term of terms) {
      const matchingFields = fields.filter(field => JSON.stringify(entry[field] ?? '').toLowerCase().includes(term));
      if (matchingFields.length) {
        matches.push({term, fields:matchingFields});
        score += matchingFields.reduce((sum, field) => sum + (['id','title','tags','useCases'].includes(field) ? 4 : field === 'avoid' ? 1 : 2), 0);
      }
    }
    return {id:entry.id,title:entry.title,category:entry.category,summary:entry.summary,useCases:entry.useCases,avoid:entry.avoid,paths:entry.paths,score,matches};
  }).filter(e => !terms.length || e.matches.length).sort((a,b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, limit);
}

export function readBundle(catalog, id, base = root) {
  const entry = catalog.entries.find(e => e.id === id);
  if (!entry) throw new Error('Unknown case: ' + id);
  const bytes = fs.readFileSync(safePath(base, entry.paths.bundle));
  const bundle = JSON.parse(bytes.toString('utf8'));
  if (bundle.schemaVersion !== 1 || bundle.id !== id || bundle.entry.id !== id) throw new Error('Invalid case bundle.');
  return bundle;
}

function readSource(base, file) {
  return fs.readFileSync(safePath(base, file.path));
}

export function exportBundle(bundle, directory, {codeOnly = false, base = root} = {}) {
  const out = path.resolve(directory);
  if (fs.existsSync(out)) throw new Error('Choose a new output directory; existing directories are preserved.');
  const parent = path.dirname(out);
  if (!fs.existsSync(parent) || fs.realpathSync(parent) !== parent) throw new Error('Output parent must exist and contain no symlinks.');
  const selected = bundle.files.filter(file => !codeOnly || (['source','context','vendor','license'].includes(file.role) || file.role === 'process' && /\.(?:md|txt|json|css|js|mjs)$/i.test(file.path)));
  fs.mkdirSync(out);
  const omitted = bundle.files.filter(file => !selected.includes(file)).map(file => file.path);
  try {
    for (const file of selected) {
      const bytes = readSource(base, file);
      const target = safePath(out, file.path);
      fs.mkdirSync(path.dirname(target), {recursive:true});
      fs.writeFileSync(target, bytes, {flag:'wx'});
    }
    fs.writeFileSync(path.join(out,'atlas-export.json'), JSON.stringify({schemaVersion:1,id:bundle.id,codeOnly,files:selected,omitted,bundle,entrypoint:bundle.entry.demo},null,2)+'\n', {flag:'wx'});
  } catch (error) {
    fs.rmSync(out, {recursive:true, force:true});
    throw error;
  }
  return {id:bundle.id,directory:out,files:selected.length,omitted,entrypoint:bundle.entry.demo};
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length || ['--help','-h','help'].includes(args[0])) { console.log(help); return; }
  const command = args.shift();
  if (!['search','show','export'].includes(command)) throw new Error('Unknown command; use --help.');
  const options = {};
  const positionals = [];
  const flags = command === 'search' ? ['category','limit'] : command === 'show' ? ['source'] : ['out','code-only'];
  while (args.length) {
    const arg = args.shift();
    if (!arg.startsWith('--')) { positionals.push(arg); continue; }
    const key = arg.slice(2);
    if (!flags.includes(key) || Object.hasOwn(options,key)) throw new Error('Invalid option: ' + arg);
    if (['source','code-only'].includes(key)) options[key] = true;
    else {
      const value = args.shift();
      if (!value || value.startsWith('--')) throw new Error('Missing value for ' + arg);
      options[key] = value;
    }
  }
  const catalog = JSON.parse(fs.readFileSync(path.join(root,'agent/catalog.json'),'utf8'));
  if (catalog.schemaVersion !== 1) throw new Error('Unsupported catalog version.');
  let result;
  if (command === 'search') {
    const limit = options.limit === undefined ? 5 : Number(options.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new Error('Limit must be an integer from 1 to 100.');
    const query = positionals.join(' ');
    result = {schemaVersion:1,query,method:'keyword',results:searchCatalog(catalog,query,{category:options.category,limit})};
  } else {
    if (positionals.length !== 1) throw new Error('Supply exactly one case ID.');
    const bundle = readBundle(catalog,positionals[0]);
    if (command === 'show') {
      result = options.source ? {...bundle,source:bundle.files.filter(f => ['source','vendor'].includes(f.role) && /\.(?:html|js|mjs|css)$/i.test(f.path)).map(f => ({...f,content:readSource(root,f).toString('utf8')}))} : bundle;
    } else {
      if (!options.out) throw new Error('Export requires --out <new-directory>.');
      result = exportBundle(bundle,options.out,{codeOnly:options['code-only']});
    }
  }
  console.log(JSON.stringify(result,null,2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
