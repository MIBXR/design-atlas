import { readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const provenance = JSON.parse(readFileSync(new URL('source-provenance.json', import.meta.url), 'utf8')).operatorProfiles;
const { utf8ByteOffset, utf8ByteEndExclusive } = provenance.sourceJsonExpression;
const expression = readFileSync(process.argv[2]).subarray(utf8ByteOffset, utf8ByteEndExclusive).toString('utf8');
const literal = expression.match(/JSON\.parse\(('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")\)/s)[1];
const flat = JSON.parse(runInNewContext(literal));
const profiles = provenance.mappings.map(({ key, name, textKey }) => ({ key, name, profile: flat[textKey].split('\n') }));
writeFileSync(process.argv[3], JSON.stringify(profiles, null, 2) + '\n');
