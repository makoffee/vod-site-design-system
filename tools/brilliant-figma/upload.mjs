// POST the payload PNG and the Brilliant image assets to the single-use Figma upload URLs from upload_assets.
// Usage: node upload.mjs out/uploads.json   (entries: { url, file })
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const BRILLIANT = '/Users/makoffee/Brilliant/sooner.de rebrand  design';
const entries = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const type = (f) => (/\.jpe?g$/i.test(f) ? 'image/jpeg' : /\.webp$/i.test(f) ? 'image/webp' : 'image/png');
const results = await Promise.all(entries.map(async ({ url, file }) => {
  let abs = file.startsWith('Assets/') ? path.join(BRILLIANT, file) : file;
  if (/\.webp$/i.test(abs)) { // Figma stores uploaded WebP but cannot decode it for fills: send a JPEG
    const jpg = path.join('out', path.basename(abs).replace(/\.webp$/i, '.jpg'));
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '90', abs, '--out', jpg]); abs = jpg;
  }
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': type(abs) }, body: fs.readFileSync(abs) });
  return `${res.status} ${file}`;
}));
console.log(results.filter((r) => !r.startsWith('2')).join('\n') || `all ${results.length} uploaded`);
