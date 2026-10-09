import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validateEntryPreviews } from './preview-validation.mjs';

// Small real images encoded by Pillow: 4 × 3 JPEG, 3 × 4 JPEG, 2 × 3 PNG.
const landscape = Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAADAAQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDGooorzTjP/9k=', 'base64');
const portrait = Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAEAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDGooorzTjP/9k=', 'base64');
const sourcePNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAIAAAA2iEnWAAAAFElEQVR4nGMMLXdhYGBgYgADKAUAFJUBFtoOZ1wAAAAASUVORK5CYII=', 'base64');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-previews-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'previews/mobile'), { recursive: true });
  fs.mkdirSync(path.join(root, 'research/screenshots'), { recursive: true });
  fs.writeFileSync(path.join(root, 'previews/example.jpg'), landscape);
  fs.writeFileSync(path.join(root, 'previews/mobile/example.jpg'), portrait);
  fs.writeFileSync(path.join(root, 'research/screenshots/example.png'), sourcePNG);
  return { root, entry: { id: 'example', preview: 'previews/example.jpg', referencePreview: 'research/screenshots/example.png' } };
}

test('paired browser previews report dimensions and preserve PNG source screenshots', t => {
  const { root, entry } = fixture(t);
  const result = validateEntryPreviews(root, entry);
  assert.deepEqual(result.desktop, { path: entry.preview, format: 'JPEG', width: 4, height: 3 });
  assert.deepEqual(result.mobile, { path: 'previews/mobile/example.jpg', format: 'JPEG', width: 3, height: 4 });
  assert.equal(result.reference.format, 'PNG');
  assert.equal(result.reference.height, 3);
});

test('a case cannot pass the preview gate without its mobile screenshot', t => {
  const { root, entry } = fixture(t);
  fs.unlinkSync(path.join(root, 'previews/mobile/example.jpg'));
  assert.throws(() => validateEntryPreviews(root, entry), /previews\/mobile\/example\.jpg: Missing repository file/);
});

test('renaming PNG bytes to a JPEG preview is rejected', t => {
  const { root, entry } = fixture(t);
  fs.writeFileSync(path.join(root, entry.preview), sourcePNG);
  assert.throws(() => validateEntryPreviews(root, entry), /PNG encoding does not match the filename extension/);
});

test('a JPEG with a readable frame header but a truncated scan is rejected', t => {
  const { root, entry } = fixture(t);
  fs.writeFileSync(path.join(root, entry.preview), landscape.subarray(0, landscape.length - 2));
  assert.throws(() => validateEntryPreviews(root, entry), /missing JPEG end marker/);
});

test('damaged source screenshot data is rejected even when PNG dimensions survive', t => {
  const { root, entry } = fixture(t);
  const damaged = Buffer.from(sourcePNG);
  damaged[45] ^= 1;
  fs.writeFileSync(path.join(root, entry.referencePreview), damaged);
  assert.throws(() => validateEntryPreviews(root, entry), /invalid PNG checksum/);
});

test('swapped desktop and mobile screenshots are rejected', t => {
  const { root, entry } = fixture(t);
  fs.writeFileSync(path.join(root, 'previews/mobile/example.jpg'), landscape);
  assert.throws(() => validateEntryPreviews(root, entry), /mobile preview must be portrait/);
  fs.writeFileSync(path.join(root, entry.preview), portrait);
  assert.throws(() => validateEntryPreviews(root, entry), /desktop preview must be landscape/);
});
