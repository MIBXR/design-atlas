import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

export function assertRepositoryLineEndings(root) {
  if (!fs.existsSync(path.join(root, '.git'))) return;
  const records = execFileSync('git', ['ls-files', '--eol', '-z', '--cached', '--others', '--exclude-standard', '--', '.', ':(exclude,attr:-text)'], { cwd: root, encoding: 'utf8' });
  const invalid = records.split('\0').filter(record => {
    const metadata = record.split('\t', 1)[0];
    return /\bw\/(?:crlf|mixed)\b/.test(metadata) && /\beol=lf\b/.test(metadata);
  }).map(record => record.slice(record.indexOf('\t') + 1));
  if (invalid.length) throw new Error(`Convert Git-managed text to LF before rebuilding Agent data:\n${invalid.join('\n')}`);
}
