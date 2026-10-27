// Inventory production checkbox / radio / switch controls (markup, classes, computed styles, screenshots).
import { chromium } from 'playwright';
import fs from 'fs';
// Production captures live outside the repo (../component-design-refs) so agents searching the project don't treat drifted production UI as the source.
const OUT = '../component-design-refs/design-refs/controls';
const URLS = ['https://sooner.de/de/login', 'https://sooner.de/de/signup', 'https://sooner.de/de/subscribe', 'https://sooner.de/de/register'];
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
const report = [];
for (const url of URLS) {
  await p.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
  await p.getByRole('button', { name: /Ablehnen/ }).click({ timeout: 2000 }).catch(() => {});
  await p.waitForTimeout(1000);
  const name = url.split('/').pop();
  await p.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  const controls = await p.evaluate(() => [...document.querySelectorAll('input[type=checkbox], input[type=radio], [role=switch], [role=checkbox], [role=radio]')].map((el, i) => {
    const box = el.closest('label') || el.parentElement;
    const vis = [...(box?.querySelectorAll('*') || [])].filter((n) => { const r = n.getBoundingClientRect(); return r.width > 8 && r.width < 40 && r.height > 8 && r.height < 40; }).slice(0, 4).map((n) => { const s = getComputedStyle(n); return { tag: n.tagName, cls: n.className?.baseVal ?? n.className, w: n.getBoundingClientRect().width, h: n.getBoundingClientRect().height, bg: s.backgroundColor, border: s.border, radius: s.borderRadius, outline: s.outline, shadow: s.boxShadow }; });
    const s = getComputedStyle(el);
    el.setAttribute('data-ctl', i);
    return { i, type: el.type || el.getAttribute('role'), checked: el.checked, cls: el.className, label: (box?.innerText || '').trim().slice(0, 80), html: (box?.outerHTML || '').slice(0, 900), self: { w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height, appearance: s.appearance, bg: s.backgroundColor, border: s.border, radius: s.borderRadius, accent: s.accentColor, opacity: s.opacity }, visuals: vis };
  }));
  for (const c of controls) {
    const el = p.locator(`[data-ctl="${c.i}"]`);
    const target = (await el.isVisible().catch(() => false)) ? el : el.locator('xpath=..');
    await target.scrollIntoViewIfNeeded().catch(() => {});
    const box = await target.boundingBox().catch(() => null);
    if (box) await p.screenshot({ path: `${OUT}/${name}-${c.type}-${c.i}.png`, clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 12), width: Math.min(420, box.width + 260), height: box.height + 24 } }).catch(() => {});
  }
  report.push({ url, controls });
  console.log(url, '→', p.url(), controls.length, 'controls');
}
fs.writeFileSync(`${OUT}/controls.json`, JSON.stringify(report, null, 1));
await b.close();
