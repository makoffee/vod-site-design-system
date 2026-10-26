// Writes src/figma-nodes.json from the JSON returned by links.js. Usage: node scripts/figma/write-links.mjs <links.json>
import fs from "node:fs";
const src = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const sort = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
const out = { file: "uVA7tqdgZDMe6JK3M8AZQb", components: sort(src.components), screens: sort(src.screens) };
fs.writeFileSync(new URL("../../src/figma-nodes.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`figma-nodes.json: ${Object.keys(out.components).length} components, ${Object.keys(out.screens).length} screens`);
