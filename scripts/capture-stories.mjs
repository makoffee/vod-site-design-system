// Screenshots every story that has a design reference in design-refs/ (file name = story id)
// and writes design-review/story/<id>.png plus design-review/sizes.json.
// Usage: node scripts/capture-stories.mjs [storybookUrl]   (default http://localhost:6006)
import { readdirSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:6006";
const root = new URL("..", import.meta.url).pathname;
const refsDir = join(root, "design-refs");
const outDir = join(root, "design-review", "story");
mkdirSync(outDir, { recursive: true });

const pngSize = (file) => {
  const b = readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
};

const ids = readdirSync(refsDir)
  .filter((f) => f.endsWith(".png"))
  .map((f) => f.slice(0, -4));

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1600, height: 1200 } });
const sizes = {};
const missing = [];

for (const id of ids) {
  const res = await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Match Brilliant's export background ("window", #1E1E1E) so translucent fills compare like for like.
  await page.addStyleTag({ content: "html,body,#storybook-root{background:#1e1e1e !important}" });
  // The preview decorator wraps every story; its first child is the story (plus any story decorators).
  const target = page.locator("#storybook-root > div > *").first();
  if (!res?.ok() || !(await target.count())) {
    missing.push(id);
    continue;
  }
  // Pad 4px so focus rings drawn outside the element are captured.
  const box = await target.boundingBox();
  await page.screenshot({
    path: join(outDir, `${id}.png`),
    clip: { x: Math.max(0, box.x - 4), y: Math.max(0, box.y - 4), width: box.width + 8, height: box.height + 8 },
  });
  sizes[id] = { design: pngSize(join(refsDir, `${id}.png`)), story: { w: Math.round(box.width * 2), h: Math.round(box.height * 2) } };
}

await browser.close();
writeFileSync(join(root, "design-review", "sizes.json"), JSON.stringify(sizes, null, 2));
console.log(`captured ${Object.keys(sizes).length}/${ids.length}`);
if (missing.length) console.log("no story for:", missing.join(", "));
