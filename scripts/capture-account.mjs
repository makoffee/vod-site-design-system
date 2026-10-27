// Capture sooner.de account views (desktop + mobile, DE + EN) for the component inventory.
// Usage: SOONER_USER=... SOONER_PASS=... node scripts/capture-account.mjs [probe]
import { chromium } from 'playwright';
import fs from 'fs';

// Production captures live outside the repo (../component-design-refs) so agents searching the project don't treat drifted production UI as the source.
const OUT = '../component-design-refs/design-refs/account';
const PATHS = ['account', 'account/settings', 'account/subscriptions', 'account/purchases', 'account/parental_pin', 'account/devices', 'watchlist'];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'de-DE' });
const page = await ctx.newPage();

await page.goto('https://sooner.de/de/login', { waitUntil: 'networkidle' });
if (process.argv[2] === 'probe') {
  const fields = await page.$$eval('input, button', (els) => els.map((e) => `${e.tagName} type=${e.type} name=${e.name} id=${e.id} placeholder=${e.placeholder} text=${(e.textContent || '').trim().slice(0, 30)}`));
  console.log(page.url()); console.log(fields.join('\n'));
  await page.screenshot({ path: `${OUT}/_login.png` });
  await browser.close(); process.exit(0);
}
await page.getByRole('button', { name: /Ablehnen/ }).click().catch(() => {});
await page.fill('input[type=email], input[name=email]', process.env.SOONER_USER);
await page.fill('input[type=password]', process.env.SOONER_PASS);
await Promise.all([page.waitForLoadState('networkidle'), page.getByRole('button', { name: 'Anmelden', exact: true }).click()]);
await page.waitForTimeout(3000);
console.log('after login:', page.url());

const clean = () => {
  const main = document.querySelector('main') || document.body;
  const c = main.cloneNode(true);
  c.querySelectorAll('script, style, noscript, svg path').forEach((n) => n.remove());
  return c.outerHTML;
};
for (const lang of ['de', 'en']) for (const p of PATHS) {
  for (const [vp, size] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 393, height: 852 }]]) {
    await page.setViewportSize(size);
    await page.goto(`https://sooner.de/${lang}/${p}`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(1500);
    const name = `${p.replace(/\//g, '-')}--${lang}--${vp}`;
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    if (vp === 'desktop') fs.writeFileSync(`${OUT}/${p.replace(/\//g, '-')}--${lang}.html`, await page.evaluate(clean));
    console.log(name, page.url());
  }
}
await browser.close();
