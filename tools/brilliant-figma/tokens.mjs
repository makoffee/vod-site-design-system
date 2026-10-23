// Read Styles/default.ds (saved from an MCP read) into resolved token tables for Figma variables and styles.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));

export function readTokens(file = path.join(DIR, 'data/default.ds')) {
  const raw = {}; const hidden = [];
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l || l.startsWith('//') || l.startsWith('file(') || l.startsWith('ds:') || l.startsWith('figmaKey')) continue;
    if (l.startsWith('hide:')) { hidden.push(...l.slice(5).split(',').map((s) => s.trim())); continue; }
    let m = l.match(/^([\w.\-]+)\s*\{$/);
    if (m) { // block form: number.blur.20 { $default: 20 ... }
      let v; while (!lines[++i].trim().startsWith('}')) { const d = lines[i].match(/\$default:\s*(.+)/); if (d) v = d[1].trim(); }
      raw[m[1]] = v; continue;
    }
    m = l.match(/^([\w.\-]+):\s*(.+)$/);
    if (m) raw[m[1]] = m[2].trim();
  }
  const resolve = (name, seen = new Set()) => {
    const v = raw[name];
    if (v === undefined || seen.has(name)) return undefined;
    if (raw[v] !== undefined) { seen.add(name); return resolve(v, seen); }
    return v;
  };
  const isHidden = (n) => hidden.some((h) => (h.endsWith('*') ? n.startsWith(h.slice(0, -1)) : n === h));
  const colors = {}, numbers = {}, strings = {}, typography = {}, shadows = {}, aliases = {};
  for (const name of Object.keys(raw)) {
    const v = resolve(name);
    if (raw[raw[name]] !== undefined) aliases[name] = raw[name];
    if (name.startsWith('typography.')) { typography[name.slice(11)] = parseTypo(v); continue; }
    if (name.startsWith('shadow.')) { shadows[name.slice(7)] = v; continue; }
    if (/^#[0-9A-Fa-f]{6,8}$/.test(v ?? '')) { colors[name] = hex(v); continue; }
    if (/^-?[\d.]+$/.test(v ?? '')) { numbers[name] = parseFloat(v); continue; }
    if (/^".*"$/.test(v ?? '')) strings[name] = JSON.parse(v);
  }
  return { colors, numbers, strings, typography, shadows, aliases, hidden: Object.keys(raw).filter(isHidden) };
}

function hex(h) {
  const m = h.slice(1);
  return { r: parseInt(m.slice(0, 2), 16) / 255, g: parseInt(m.slice(2, 4), 16) / 255, b: parseInt(m.slice(4, 6), 16) / 255, a: m.length === 8 ? parseInt(m.slice(6, 8), 16) / 255 : 1 };
}
function parseTypo(v) {
  if (!v || !v.startsWith('{')) return undefined;
  const o = {};
  for (const [, k, val] of v.matchAll(/(\w+):\s*("[^"]*"|[-\d.]+)/g)) o[k] = val.startsWith('"') ? JSON.parse(val) : parseFloat(val);
  return o;
}
