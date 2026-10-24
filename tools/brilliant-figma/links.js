// Pasted as use_figma code after a sync: returns { components, screens } (name → node id) for src/figma-nodes.json.
// Save the returned JSON to a file and run: node tools/brilliant-figma/write-links.mjs <file>
const out = { components: {}, screens: {} };
const comps = figma.root.children.find((p) => p.name === "Components");
await comps.loadAsync();
for (const n of comps.findAllWithCriteria({ types: ["COMPONENT_SET", "COMPONENT"] })) {
  if (n.type === "COMPONENT" && n.parent && n.parent.type === "COMPONENT_SET") continue;
  out.components[n.name] = n.id;
}
const screens = figma.root.children.find((p) => p.name === "Key Screens");
await screens.loadAsync();
for (const n of screens.findAll((n) => n.type === "FRAME" && n.name.includes(" | ") && /desktop|widescreen/i.test(n.name))) out.screens[n.name] = n.id;
return out;
