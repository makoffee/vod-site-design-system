// Figma node id → story URL on the hosted Storybook, for the Figma documentation / Dev Mode links (scripts/figma/set-story-links.js).
// Usage: node scripts/figma/story-links.mjs [indexUrl] > story-links.json
//   indexUrl: where to read the story index (default: the local dev server, which has the newest stories)
import fs from "node:fs";

const HOSTED = "https://makoffee.github.io/vod-site-design-system";
const index = process.argv[2] ?? "http://localhost:6006/index.json";

const nodes = JSON.parse(fs.readFileSync(new URL("../../src/figma-nodes.json", import.meta.url), "utf8"));
const { entries } = await (await fetch(index)).json();
const stories = Object.values(entries).filter((e) => e.type === "story");

// Figma names that differ from the story title's last segment.
const alias = { "Social Icons": "SocialIcons" };
// Key-screen frames → the Screens story whose Design tab points at them (figmaScreen("…") in Screens.stories.tsx).
const screensSource = fs.readFileSync(new URL("../../src/screens/Screens.stories.tsx", import.meta.url), "utf8");
const frameToExport = new Map([...screensSource.matchAll(/export const (\w+): Story = \{[^\n]*figmaScreen\("([^"]+)"\)/g)].map((m) => [m[2], m[1]]));

const out = {};
for (const [name, id] of Object.entries(nodes.components)) {
  const story = stories.find((s) => s.title.split("/").pop() === (alias[name] ?? name));
  if (story) out[id] = { name, url: `${HOSTED}/?path=/story/${story.id}` };
}
for (const [name, id] of Object.entries(nodes.screens)) {
  const story = stories.find((s) => s.title === "Screens/Key screens" && s.exportName === frameToExport.get(name));
  if (story) out[id] = { name, url: `${HOSTED}/?path=/story/${story.id}` };
}
console.log(JSON.stringify(out, null, 2));
