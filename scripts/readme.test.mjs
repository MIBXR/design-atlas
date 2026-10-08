import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { checkReadme } from './check-readme.mjs';

const entries = fs.readdirSync(new URL('../entries/', import.meta.url)).filter(n => n.endsWith('.json')).map(n => JSON.parse(fs.readFileSync(new URL('../entries/' + n, import.meta.url), 'utf8')));
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('the maintained gallery covers all cases, categories and reuse links', () => {
  assert.deepEqual(checkReadme(readme, entries), []);
});
test('adding a case cannot pass with the old gallery or category count', () => {
  const added = { ...entries[0], id: 'new-cultural-case', category: '艺术/文化' };
  const failures = checkReadme(readme, [...entries, added]);
  assert.ok(failures.some(f => f.includes('stale 艺术与文化 count')));
  assert.ok(failures.some(f => f.includes('new-cultural-case needs exactly one card')));
});
test('missing mobile reuse links and unknown gallery IDs are rejected', () => {
  const entry = entries[0];
  assert.ok(checkReadme(readme.replace(`href="previews/mobile/${entry.id}.jpg"`, 'href="missing.jpg"'), entries).some(f => f.includes('card missing previews/mobile/')));
  assert.ok(checkReadme(readme.replace(`cases.html#style/${entry.id}"`, 'cases.html#style/deleted-case"'), entries).some(f => f.includes('unknown gallery case deleted-case')));
});
test('a card moved into another category cannot pass by updating totals alone', () => {
  const changed = entries.map((entry, i) => i ? entry : { ...entry, category: entry.category === '艺术/文化' ? '游戏/IP' : '艺术/文化' });
  assert.ok(checkReadme(readme, changed).some(f => f.includes('wrong category')));
});
test('commented cards and duplicate cards under an extra heading are rejected', () => {
  const card = readme.match(/<td\b[^>]*>[\s\S]*?<img\b[\s\S]*?<\/td>/)[0];
  assert.ok(checkReadme(readme.replace(card, `<!-- ${card} -->`), entries).some(f => f.includes('visible gallery card')));
  const duplicate = readme.replace('### 经典设计语言', `### 其他案例\n\n<table><tr>${card}</tr></table>\n\n### 经典设计语言`);
  assert.ok(checkReadme(duplicate, entries).some(f => f.includes('visible gallery card')));
});
