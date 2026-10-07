import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, 'dist');
const files = ['index.html', 'atlas.css', 'atlas.js', 'catalog.js', 'fundamentals.html', 'fundamentals.css', 'fundamentals.js', 'document.html', 'document.js', 'favicon.svg', 'README.md', 'CONTRIBUTING.md'];
const folders = ['demos', 'entries', 'previews', 'research', 'prompts', 'docs', 'vendor'];
if (path.relative(root, output) !== 'dist' || fs.lstatSync(output, {throwIfNoEntry:false})?.isSymbolicLink()) {
  throw new Error('Static output must be the real dist directory inside this repository.');
}
function regularTree(source) {
  const info = fs.lstatSync(source);
  if (info.isDirectory()) for (const child of fs.readdirSync(source)) regularTree(path.join(source, child));
  else if (!info.isFile()) throw new Error('Static content cannot contain links or special files: ' + source);
}
for (const name of [...files, ...folders]) regularTree(path.join(root, name));
fs.rmSync(output, {recursive:true, force:true});
fs.mkdirSync(output);
for (const name of [...files, ...folders]) fs.cpSync(path.join(root, name), path.join(output, name), {recursive:true});
// Signal UTF-8 for static hosts that omit charset; tracked source stays unchanged.
let markedDocuments = 0;
function markMarkdown(directory) {
  for (const item of fs.readdirSync(directory, {withFileTypes:true})) {
    const target = path.join(directory, item.name);
    if (item.isDirectory()) markMarkdown(target);
    else if (item.isFile() && item.name.endsWith('.md')) {
      const bytes = fs.readFileSync(target);
      if (!bytes.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf]))) {
        fs.writeFileSync(target, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), bytes]));
      }
      markedDocuments++;
    }
  }
}
markMarkdown(output);
if (fs.existsSync(path.join(output, '.git'))) throw new Error('Git metadata cannot be served.');
console.log('Prepared dist: demos, prompts, documentation and research; Git metadata and local server excluded.');
console.log(`Marked ${markedDocuments} deployed Markdown documents as UTF-8; tracked source files unchanged.`);
