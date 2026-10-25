// Storybook Connect links: one Chromatic story URL per Figma component, to paste into the plugin in Figma.
// Usage: node scripts/storybook-connect-links.mjs <chromaticAppId> [storybookUrl]
//   chromaticAppId: the id in your Chromatic project URL (chromatic.com/builds?appId=<id>)
//   storybookUrl:   where to read index.json from (default http://localhost:6006, the dev server)
import fs from "node:fs";

const [appId, storybook = "http://localhost:6006"] = process.argv.slice(2);
if (!appId) {
  console.error("usage: node scripts/storybook-connect-links.mjs <chromaticAppId> [storybookUrl]");
  process.exit(1);
}

const nodes = JSON.parse(fs.readFileSync(new URL("../src/figma-nodes.json", import.meta.url), "utf8"));
const { entries } = await (await fetch(`${storybook}/index.json`)).json();
const stories = Object.values(entries).filter((e) => e.type === "story");
const base = `https://main--${appId}.chromatic.com`;
const figma = (id) => `https://www.figma.com/design/${nodes.file}/sooner.de-rebrand?node-id=${id.replace(":", "-")}`;

// Figma names that differ from the story title's last segment.
const alias = { "Social Icons": "SocialIcons" };

const rows = [];
for (const [name, id] of Object.entries(nodes.components)) {
  const title = alias[name] ?? name;
  const story = stories.find((s) => s.title.split("/").pop() === title);
  rows.push({ name, figma: figma(id), story: story ? `${base}/?path=/story/${story.id}` : "(no story)" });
}
for (const [name, id] of Object.entries(nodes.screens)) {
  rows.push({ name, figma: figma(id), story: "(screen: link the frame to its Key screens story by hand)" });
}
console.log("| Figma component | Story to link |\n| --- | --- |");
for (const r of rows) console.log(`| [${r.name}](${r.figma}) | ${r.story} |`);
