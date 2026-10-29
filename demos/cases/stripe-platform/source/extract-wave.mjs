import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

const provenance = JSON.parse(readFileSync(new URL('../assets/wave-provenance.json', import.meta.url), 'utf8'));
const modules = {};
const self = { webpackChunk_N_E: { push: ([, factories]) => Object.assign(modules, factories) } };
for (const url of new Set(provenance.modules.map(module => module.sourceUrl))) {
  runInNewContext(readFileSync(join(process.argv[2], new URL(url).pathname.split('/').pop()), 'utf8'), { self });
}
const factories = provenance.modules.map(({ id }) => `${id}:${modules[id].toString()}`);
const template = readFileSync(new URL('../assets/stripe-wave-renderer.js', import.meta.url), 'utf8');
const loader = template.slice(template.indexOf('const cache={}'));
const output = `(()=>{const modules={\n${factories.join(',\n')}};\n${loader}`
  .replace(/(["'])(?:[^"']*\/)?waveGeometry\.worker\.07101200\.js\1/g, '"assets/wave-geometry-worker.js"');
writeFileSync(process.argv[3], output);
