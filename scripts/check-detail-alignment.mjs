import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { defaultRoot, resolveRepositoryPath, sha256 } from './build-agent.mjs';
import { renderDetailNotes } from './detail-notes.mjs';

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const themeLabels = { fixed: '固定主题', system: '跟随系统', manual: '手动切换', 'system-and-manual': '系统 + 手动' };
const soundLabels = { none: '无网站配乐', background: '背景音乐', video: '媒体声音', external: '外部音乐入口', interactive: '操作／演奏声音' };
const headings = ['从要素看风格', '01 / 设计机制', '02 / 交互巧思', '03 / 约束与适用场景', '04 / 设计 Tokens', '05 / 可复用 Prompt', '06 / 来源与证据'];

function notesSections(html, id) {
  // Content values are HTML-escaped by production esc(), so original entry
  // prose cannot introduce section delimiters. This parses the rendered HTML,
  // rather than attempting to identify template expressions in atlas.js.
  const start = html.indexOf('<aside class="notes">');
  const end = html.indexOf('</aside>', start);
  assert.ok(start >= 0 && end > start, `${id}: missing rendered notes aside`);
  const notes = html.slice(start + '<aside class="notes">'.length, end);
  const sections = notes.split('<section>').slice(1).map(section => section.slice(0, section.indexOf('</section>')));
  assert.equal(sections.length, headings.length, `${id}: expected all seven notes sections`);
  headings.forEach((heading, index) => assert.ok(sections[index].includes(`<h2>${heading}</h2>`), `${id}: section ${index} heading changed or missing`));
  return { notes, sections };
}

export function checkDetailAlignment({ root = defaultRoot } = {}) {
  const entriesPath = resolveRepositoryPath(root, 'entries');
  const entries = fs.readdirSync(entriesPath).filter(name => name.endsWith('.json')).map(name => JSON.parse(fs.readFileSync(resolveRepositoryPath(root, `entries/${name}`), 'utf8'))).sort((a, b) => a.order - b.order);
  const rendererSource = fs.readFileSync(resolveRepositoryPath(root, 'atlas.js'), 'utf8');
  const catalogScript = fs.readFileSync(resolveRepositoryPath(root, 'catalog.js'), 'utf8');
  // Generated human-facing catalog must also be current. Its statement is
  // executed separately from the renderer to avoid using it as source data.
  const catalogScope = { window: {} };
  vm.runInNewContext(catalogScript, catalogScope, { filename: 'catalog.js', timeout: 2000 });
  const catalog = JSON.parse(JSON.stringify(catalogScope.window.DESIGN_ATLAS));
  const report = { entryCount: entries.length, checkedFields: 0, fallbackFields: [], theoryDates: 0, entries: [] };
  for (const entry of entries) {
    const { html } = renderDetailNotes({ entries, id: entry.id, rendererSource });
    assert.deepEqual(catalog.find(item => item.id === entry.id), entry, `${entry.id}: human website catalog differs from original entry`);
    const { notes, sections } = notesSections(html, entry.id);
    let checkedFields = 0;
    function contains(section, field, value) {
      assert.ok(typeof value === 'string' && value, `${entry.id}: ${field} is empty or would invoke a fallback`);
      assert.ok(sections[section].includes(escapeHTML(value)), `${entry.id}: rendered notes omit or change ${field}`);
      checkedFields++;
    }
    for (const [key, value] of Object.entries(entry.composition)) contains(0, `composition.${key}`, value);
    entry.principles.forEach((value, index) => contains(1, `principles[${index}]`, value));
    contains(1, 'productFocus', entry.productFocus);
    contains(1, 'theme', entry.theme);
    entry.interaction.forEach((value, index) => contains(2, `interaction[${index}]`, value));
    assert.ok(Object.hasOwn(themeLabels, entry.themeBehavior.mode), `${entry.id}: unknown theme mode would invoke fallback`);
    assert.ok(Object.hasOwn(soundLabels, entry.soundBehavior.kind), `${entry.id}: unknown sound kind would invoke fallback`);
    contains(2, 'themeBehavior.mode (display label)', themeLabels[entry.themeBehavior.mode]);
    contains(2, 'themeBehavior.control', entry.themeBehavior.control);
    contains(2, 'themeBehavior.designReason', entry.themeBehavior.designReason);
    contains(2, 'soundBehavior.kind (display label)', soundLabels[entry.soundBehavior.kind]);
    contains(2, 'soundBehavior.control', entry.soundBehavior.control);
    contains(2, 'soundBehavior.interactionRole', entry.soundBehavior.interactionRole);
    entry.constraints.forEach((value, index) => contains(3, `constraints[${index}]`, value));
    entry.useCases.forEach((value, index) => contains(3, `useCases[${index}]`, value));
    entry.avoid.forEach((value, index) => contains(3, `avoid[${index}]`, value));
    entry.tokens.palette.forEach((value, index) => contains(4, `tokens.palette[${index}]`, value));
    for (const key of ['type', 'layout', 'motion']) contains(4, `tokens.${key}`, entry.tokens[key]);
    contains(5, 'prompt', entry.prompt);
    assert.ok(sections[5].includes(`<textarea class="prompt-box" aria-label="可复用 Prompt" readonly>${escapeHTML(entry.prompt)}</textarea>`), `${entry.id}: Prompt textarea is not the exact original prompt`);
    contains(5, 'negativePrompt', entry.negativePrompt);
    contains(5, 'exercise', entry.exercise);
    entry.sources.forEach((source, index) => {
      for (const key of ['type', 'title', 'note']) contains(6, `sources[${index}].${key}`, source[key]);
      assert.ok(sections[6].includes(`href="${escapeHTML(source.url)}"`), `${entry.id}: source URL changed or missing`);
      checkedFields++;
    });
    assert.ok(sections[6].includes(`href="document.html?file=${encodeURIComponent(entry.research)}"`), `${entry.id}: research evidence link missing`);
    checkedFields++;
    if (entry.referenceUrl) contains(6, 'capturedAt', entry.capturedAt);
    else {
      contains(6, 'theoryVerifiedAt', entry.theoryVerifiedAt);
      report.theoryDates++;
    }
    const bundlePath = resolveRepositoryPath(root, `agent/cases/${entry.id}.json`);
    const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
    assert.deepEqual(bundle.entry, entry, `${entry.id}: Agent bundle differs from the website's original entry`);
    assert.ok(bundle.documents.some(document => document.path === entry.research && document.role === 'research'), `${entry.id}: Agent bundle omits research linked from rendered notes`);
    assert.equal(bundle.webNotes?.format, 'text/html', `${entry.id}: web notes format missing`);
    assert.equal(bundle.webNotes?.renderer, 'atlas.js', `${entry.id}: web notes renderer missing`);
    assert.equal(bundle.webNotes?.content, notes, `${entry.id}: Agent web notes differ from actual rendered website notes`);
    assert.equal(bundle.webNotes?.sha256, sha256(Buffer.from(notes, 'utf8')), `${entry.id}: web notes hash differs`);
    assert.equal(bundle.webNotes?.bytes, Buffer.byteLength(notes, 'utf8'), `${entry.id}: web notes byte count differs`);
    report.checkedFields += checkedFields;
    report.entries.push({ id: entry.id, sections: sections.length, checkedFields, notesSha256: sha256(Buffer.from(notes, 'utf8')), agentEntryMatches: true, websiteCatalogMatches: true });
  }
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const report = checkDetailAlignment();
    console.log(`PASS: actual production detail renderer executed for ${report.entryCount} entries; all seven right-hand sections and ${report.checkedFields} entry fields align with website catalog and Agent bundles. webNotes matches the website HTML byte-for-byte; no behavior fallback used. ${report.theoryDates} archived theory-verification dates are structured.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
