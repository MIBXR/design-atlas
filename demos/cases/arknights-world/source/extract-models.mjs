import { readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const modules = {};
const self = { webpackChunk_N_E: { push: ([, factories]) => Object.assign(modules, factories) } };
runInNewContext(readFileSync(process.argv[2], 'utf8'), { self });
const ids = { rhodes: 11901, originiums: 44007, originium_arts: 95075, reunion: 83545, infected: 54860, nomadic_city: 29285, rhodes_island: 85686 };
const models = Object.fromEntries(Object.entries(ids).map(([key, id]) => {
  const literal = modules[id].toString().match(/JSON\.parse\(('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")\)/s)[1];
  return [key, JSON.parse(runInNewContext(literal))];
}));
writeFileSync(process.argv[3], JSON.stringify(models));
