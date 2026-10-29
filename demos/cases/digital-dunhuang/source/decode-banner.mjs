import { readFileSync, writeFileSync } from 'node:fs';

const base64 = readFileSync(process.argv[2], 'utf8').match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/)[1];
writeFileSync(process.argv[3], Buffer.from(base64, 'base64'));
