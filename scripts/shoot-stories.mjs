// Screenshots Storybook stories for a quick visual check.
// Usage: node scripts/shoot-stories.mjs <storybookUrl> <outDir> <storyId> [storyId…]
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const [base, outDir, ...ids] = process.argv.slice(2);
if (!base || !outDir || ids.length === 0) {
  console.error("usage: node scripts/shoot-stories.mjs <storybookUrl> <outDir> <storyId>…");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1, viewport: { width: 1500, height: 1000 } });
for (const id of ids) {
  await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const root = page.locator("#storybook-root");
  await root.screenshot({ path: join(outDir, `${id}.png`) });
  console.log("shot", id);
}
await browser.close();
