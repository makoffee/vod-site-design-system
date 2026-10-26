// Run as Figma plugin code (use_figma): sets each component's documentation link to its story on the hosted Storybook.
// LINKS = output of `node scripts/figma/story-links.mjs` reduced to { "nodeId": "url" }. Frames can't hold documentation
// links (and Dev Mode resources aren't writable through the MCP), so key screens link one way: story Design tab → frame.
const LINKS = { /* "2721:27490": "https://makoffee.github.io/vod-site-design-system/?path=/story/components-button--primary-md-default" */ };
let set = 0; const missing = [];
for (const [id, url] of Object.entries(LINKS)) {
  const node = await figma.getNodeByIdAsync(id);
  if (!node) { missing.push(id); continue; }
  if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") { node.documentationLinks = [{ uri: url }]; set++; }
}
return { set, missing };
