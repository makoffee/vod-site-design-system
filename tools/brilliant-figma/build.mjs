import fs from 'fs';
import { readRows } from './parse.mjs';
import { indexMasters, toIR, stats, images, masters } from './ir.mjs';
const comps = readRows('data/components.x.bl'), ds = readRows('data/ds.x.bl'), screens = readRows('data/screens.x.bl');
indexMasters(comps);
const out = {};
for (const [name, roots] of [['components', comps], ['ds', ds], ['screens', screens]]) {
  const s0 = { ...stats }; out[name] = roots.map((r) => toIR(r));
  const json = JSON.stringify(out[name]);
  console.log(name, 'IR bytes', json.length, 'nodes', stats.nodes - s0.nodes, 'instances', stats.instances - s0.instances, 'detached', stats.detached - s0.detached, 'ops', stats.ops - s0.ops);
}
console.log('masters', masters.size, 'images', images.size);
fs.writeFileSync('out/ir.json', JSON.stringify(out));
