import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries = fs.readdirSync(path.join(root,'entries')).filter(x=>x.endsWith('.json')).map(x=>JSON.parse(fs.readFileSync(path.join(root,'entries',x),'utf8'))).sort((a,b)=>a.order-b.order);
fs.writeFileSync(path.join(root,'catalog.js'), 'window.DESIGN_ATLAS = ' + JSON.stringify(entries,null,2) + ';\n');
console.log(`Built ${entries.length} entries. Open index.html or run npm start.`);
