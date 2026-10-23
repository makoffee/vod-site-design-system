// POST the payload PNG and the Brilliant image assets to the single-use Figma upload URLs from upload_assets.
// Usage: node upload.mjs out/uploads.json   (entries: { url, file })
import fs from 'fs';
import path from 'path';

const BRILLIANT = '/Users/makoffee/Brilliant/sooner.de rebrand  design';
const entries = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const type = (f) => (/\.jpe?g$/i.test(f) ? 'image/jpeg' : 'image/png');
const results = await Promise.all(entries.map(async ({ url, file }) => {
  const abs = file.startsWith('Assets/') ? path.join(BRILLIANT, file) : file;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': type(abs) }, body: fs.readFileSync(abs) });
  return `${res.status} ${file}`;
}));
console.log(results.filter((r) => !r.startsWith('2')).join('\n') || `all ${results.length} uploaded`);
