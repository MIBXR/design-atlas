import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const evidence = JSON.parse(readFileSync(new URL('../filter-evidence.json', import.meta.url), 'utf8'));
const members = evidence.map(({ key, value, sourceUrl }, index) => {
  const html = readFileSync(join(process.argv[2], `${index}.html`), 'utf8');
  const ids = [...new Set([...html.matchAll(/\/cave\/10\.0001\/([0-9.]+)/g)].map(match => match[1]))];
  return { key, value, sourceUrl, ids };
});
writeFileSync(process.argv[3], JSON.stringify(members, null, 2) + '\n');
