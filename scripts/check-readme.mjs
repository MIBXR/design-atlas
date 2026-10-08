import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const categories = new Map([
  ['产品', '产品与平台'], ['游戏/IP', '游戏与 IP'],
  ['艺术/文化', '艺术与文化'], ['经典风格', '经典设计语言'],
]);

// The gallery is curated prose. Check its coverage without rewriting captions.
export function checkReadme(readme, entries) {
  const failures = [];
  const gallery = /## 案例画廊\s+([\s\S]*?)(?=\n## |$)/.exec(readme)?.[1]?.replace(/<!--[\s\S]*?-->/g, '');
  if (!gallery) return ['README: missing case gallery'];
  const referenceCount = entries.filter(e => e.implementation === 'reference-study').length;
  const counts = /<!-- atlas-counts:start -->\s*\*\*(\d+) 个案例\*\*\s*·\s*\*\*(\d+) 个品牌／文化研究\*\*\s*·\s*\*\*(\d+) 种经典设计语言\*\*/.exec(readme);
  if (!counts || counts.slice(1).map(Number).some((count, i) => count !== [entries.length, referenceCount, entries.length - referenceCount][i])) failures.push('README: stale total counts; run npm run build');
  const knownIds = new Set(entries.map(e => e.id));
  const galleryIds = [...gallery.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)]
    .filter(match => /<img\b/.test(match[1]))
    .map(match => /cases\.html#style\/([a-z0-9-]+)"/.exec(match[1])?.[1]);
  for (const id of galleryIds) if (!knownIds.has(id)) failures.push(`README: unknown gallery case ${id || '(missing link)'}`);
  for (const id of knownIds) if (galleryIds.filter(cardId => cardId === id).length !== 1) failures.push(`README: ${id} needs exactly one visible gallery card`);
  for (const [category, title] of categories) {
    const section = gallery.split('### ' + title + ' · ')[1]?.split('\n### ')[0];
    const expected = entries.filter(e => e.category === category);
    if (!section || Number(section.split('\n')[0]) !== expected.length) failures.push(`README: stale ${title} count`);
    const cards = [...(section || '').matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1]).filter(card => /<img\b/.test(card));
    for (const entry of expected) {
      const matched = cards.filter(card => card.includes('cases.html#style/' + entry.id + '"'));
      if (matched.length !== 1) { failures.push(`README: ${entry.id} needs exactly one card in ${title}`); continue; }
      for (const ref of [entry.preview, entry.research, `prompts/${entry.id}.md`, `previews/mobile/${entry.id}.jpg`]) {
        if (!matched[0].includes('"' + ref + '"')) failures.push(`README: ${entry.id} card missing ${ref}`);
      }
      const demoDirectory = path.posix.dirname(entry.demo);
      if (!matched[0].includes('href="' + demoDirectory + '"') && !matched[0].includes('href="' + entry.demo + '"')) failures.push(`README: ${entry.id} card missing demo link`);
    }
    for (const card of cards) {
      const id = /cases\.html#style\/([a-z0-9-]+)"/.exec(card)?.[1];
      if (knownIds.has(id) && !expected.some(e => e.id === id)) failures.push(`README: ${id} is in the wrong category`);
    }
  }
  return failures;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const entries = fs.readdirSync(path.join(root, 'entries')).filter(n => n.endsWith('.json')).map(n => JSON.parse(fs.readFileSync(path.join(root, 'entries', n), 'utf8')));
  const failures = checkReadme(fs.readFileSync(path.join(root, 'README.md'), 'utf8'), entries);
  if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
  else console.log(`PASS: README totals and ${entries.length} curated gallery cards match the case library.`);
}
