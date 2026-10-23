// Build the job list for the Figma runtime and pack runtime + jobs into out/payload.png.
import fs from 'fs';
import { readRows } from './parse.mjs';
import { indexMasters, toIR, masters, glyphs, images, stats, visual, alphaVars } from './ir.mjs';
import { readTokens } from './tokens.mjs';
import { encode } from './datapng.mjs';

const PHOSPHOR = process.env.PHOSPHOR || '/Users/makoffee/.claude/jobs/173a3516/tmp/ph/package/assets';
const GLYPH_NAMES = { 'glyph:v8d0a0b7c': 'Icon/play (drawn)', 'glyph:vea182cbe': 'Icon/plus (drawn)', 'glyph:vaebbfee8': 'Icon/share (drawn)', 'glyph:va6a10f36': 'Icon/speaker-x (drawn)', 'glyph:v12de02cc': 'Icon/cta-round default' };
const PAGES = { components: 'brilliant-Components', ds: 'brilliant-Design System', screens: 'brilliant-Key Screens' };
const SPLIT = 350; // max nodes per build job

const comps = readRows('data/components.x.bl'), ds = readRows('data/ds.x.bl'), screens = readRows('data/screens.x.bl');
indexMasters(comps);
const jobs = [];

// ── tokens ──────────────────────────────────────────────────────────────────────────────────────────────
const TOK = readTokens();
const vn = (t) => t.replace(/\./g, '/');
const scopesFor = (name, type) => {
  if (type === 'COLOR') return name.startsWith('color.text') ? ['TEXT_FILL'] : name.startsWith('color.border') ? ['STROKE_COLOR'] : ['ALL_FILLS', 'STROKE_COLOR', 'EFFECT_COLOR'];
  if (type === 'STRING') return ['FONT_FAMILY'];
  if (/^spacing\./.test(name)) return ['GAP', 'WIDTH_HEIGHT'];
  if (/^radius\./.test(name)) return ['CORNER_RADIUS'];
  if (/^(alpha|opacity)\./.test(name)) return ['OPACITY'];
  if (/^stroke\./.test(name)) return ['STROKE_FLOAT'];
  if (/^font\.size/.test(name)) return ['FONT_SIZE'];
  if (/^font\.weight/.test(name)) return ['FONT_WEIGHT'];
  return ['WIDTH_HEIGHT'];
};
const hidden = new Set(TOK.hidden);
const vars = [];
for (const [name, c] of Object.entries(TOK.colors)) vars.push({ name: vn(name), type: 'COLOR', value: { r: c.r, g: c.g, b: c.b, a: c.a }, alias: TOK.aliases[name] && TOK.colors[TOK.aliases[name]] ? vn(TOK.aliases[name]) : undefined, scopes: scopesFor(name, 'COLOR'), hidden: hidden.has(name) });
for (const [name, v] of Object.entries(TOK.numbers)) { const val = /^(alpha|opacity)\./.test(name) && v > 1 ? v / 100 : v; vars.push({ name: vn(name), type: 'FLOAT', value: val, alias: TOK.aliases[name] && TOK.numbers[TOK.aliases[name]] !== undefined ? vn(TOK.aliases[name]) : undefined, scopes: scopesFor(name, 'FLOAT'), hidden: hidden.has(name) }); }
for (const [name, v] of Object.entries(TOK.strings)) vars.push({ name: vn(name), type: 'STRING', value: v, scopes: scopesFor(name, 'STRING') });
const textStyles = Object.entries(TOK.typography).filter(([k, v]) => v && !k.startsWith('sooner.')).map(([k, v]) => ({ name: vn(k), fam: v.fontFamily, w: v.fontWeight, sz: v.fontSize, lh: v.lineHeight, ls: v.letterSpacing }));
const effectStyles = Object.entries(TOK.shadows).map(([k, v]) => {
  const effects = [...v.matchAll(/drop\(([^)]*)\)/g)].map(([, a]) => { const o = Object.fromEntries(a.split(',').map((x) => x.split(':').map((s) => s.trim()))); const h = o.color.slice(1); return { type: 'DROP_SHADOW', color: { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255, a: h.length > 6 ? parseInt(h.slice(6, 8), 16) / 255 : 1 }, offset: { x: +(o.x || 0), y: +(o.y || 0) }, radius: +(o.blur || 0), spread: +(o.spread || 0), visible: true, blendMode: 'NORMAL' }; });
  return { name: 'shadow/' + k, effects };
});
const tokensJob = { t: 'tokens', collection: 'brilliant-tokens', vars, textStyles, effectStyles };
jobs.push(tokensJob);
jobs.push({ t: 'hashes' });

// ── IR fixes Figma needs ──
// Negative padding (Brilliant pushes a single child past the frame): drop auto layout and place the child absolutely.
function negativePadding(n) {
  if (n.al && n.al.pad.some((v) => v < 0) && n.c?.length === 1) {
    const [t, , , l] = n.al.pad; const ch = n.c[0];
    delete n.al; Object.assign(ch, { x: l, y: t, wm: 'fixed', hm: 'fixed' });
  }
  (n.c || []).forEach(negativePadding);
}
// Icon-like masters (only vectors, plain frames, groups, masks, shapes) scale their content with the box, as in Brilliant.
const iconLike = (n) => ['V', 'G', 'M', 'R', 'E', 'SVG'].includes(n.k) || (n.k === 'F' && !n.al) ? (n.c || []).every(iconLike) && !(n.f || []).some((p) => p.t === 'I') : false;
function scaleContent(n) { for (const c of n.c || []) { c.pin = ['SCALE', 'SCALE']; scaleContent(c); } }

// ── IR helpers ──────────────────────────────────────────────────────────────────────────────────────────
const count = (n) => 1 + (n.c || []).reduce((s, c) => s + count(c), 0);
function splitJobs(n, parent, page, extra = {}) {
  if (count(n) <= SPLIT || !n.c || ['G', 'M', 'C', 'I'].includes(n.k)) { jobs.push({ t: 'build', page, parent, node: n, ...extra }); return; }
  const { c, ...shallow } = n; shallow.keep = 1;
  jobs.push({ t: 'build', page, parent, node: shallow, ...extra });
  for (const ch of c) splitJobs(ch, n.i, page);
}
// Replace masters and instances in a built IR tree with placeholders; collect what was replaced.
function placeholders(n, out, inMaster = false) {
  if (!n.c) return n;
  n.c = n.c.map((ch) => {
    if (masterIds.has(ch.i)) { out.masters.push(ch.i); return { i: ch.i, k: 'P', n: ch.n, ...geom(ch) }; }
    if (ch.k === 'I' && !String(ch.m).startsWith('glyph:')) { out.instances.push(ch); return { i: ch.i, k: 'P', n: ch.n, ...geom(ch) }; }
    return placeholders(ch, out);
  });
  return n;
}
const geom = (n) => Object.fromEntries(['x', 'y', 'w', 'h', 'wm', 'hm', 'abs', 'pin', 'minW', 'maxW', 'minH', 'maxH'].filter((k) => n[k] !== undefined).map((k) => [k, n[k]]));

// ── components page ─────────────────────────────────────────────────────────────────────────────────────
const masterIds = new Set([...masters.values()].map((m) => m.row.id));
const byId = new Map(); const parentOf = new Map();
const index = (r, parent) => { byId.set(r.id, r); if (parent) parentOf.set(r.id, parent); r.children.forEach((c) => index(c, r)); };
comps.forEach((r) => index(r));

jobs.push({ t: 'page', name: PAGES.components, clear: true });
const P = (name) => 'page:' + name;

// glyph components (built first: masters instance them)
const compIR = comps.map((r) => toIR(r)); // registers glyphs + images
compIR.forEach(negativePadding);
ds.map((r) => toIR(r)); screens.map((r) => toIR(r));
const glyphComps = [];
for (const [key, g] of glyphs) {
  const p = g.row.p; const w = p.w?.v ?? p.extW, h = p.h?.v ?? p.extH;
  const paint = visual(p); const look = Object.fromEntries(['f', 's', 'sw', 'sw4', 'sa', 'sj', 'sc', 'sd'].filter((k) => paint[k] !== undefined).map((k) => [k, paint[k]]));
  const child = p.type === 'icon'
    ? { i: key + ':svg', k: 'SVG', n: 'Vector', svg: fs.readFileSync(`${PHOSPHOR}/${p.icon.endsWith('-fill') ? 'fill' : 'regular'}/${p.icon}.svg`, 'utf8'), w, h, x: 0, y: 0, f: look.f, pin: ['SCALE', 'SCALE'] }
    : { i: key + ':v', k: 'V', n: 'Vector', x: 0, y: 0, pin: ['SCALE', 'SCALE'], ...look, ...(p.network ? { vnet: vectorNet(p.network) } : { vp: p.path.replace(/([MLCQZ])/g, ' $1 ').replace(/,/g, ' ').replace(/\s+/g, ' ').trim() }) };
  glyphComps.push({ i: key, k: 'C', n: GLYPH_NAMES[key] ?? 'Icon/' + key.slice(6), w, h, wm: 'fixed', hm: 'fixed', c: [child] });
}
function vectorNet(net) {
  const mir = { mi: 'ANGLE_AND_LENGTH', as: 'ANGLE', di: 'NONE', st: 'NONE' }; const n = net;
  const solid = (n.regions || []).filter((r) => !r.hole), holes = (n.regions || []).filter((r) => r.hole);
  const regions = solid.map((r) => ({ windingRule: 'NONZERO', loops: [r.loop] }));
  if (holes.length && regions.length) { regions[0].loops.push(...holes.map((h) => h.loop)); regions[0].windingRule = 'EVENODD'; } // holes may be listed before their outline
  return { vertices: net.vertices.map((v) => ({ x: v.x, y: v.y, handleMirroring: mir[v.t] ?? 'NONE' })), segments: net.segments.map((s) => ({ start: s.start, end: s.end, tangentStart: { x: s.ts[0], y: s.ts[1] }, tangentEnd: { x: s.te[0], y: s.te[1] } })), regions };
}
jobs.push({ t: 'build', page: PAGES.components, parent: P(PAGES.components), node: { i: 'glyph-board', k: 'F', n: 'Icons · glyph components', x: 0, y: -900, w: 1200, h: 200, wm: 'hug', hm: 'hug', al: { d: 'HORIZONTAL', g: 48, pad: [40, 40, 40, 40], pr: 'MIN', cr: 'CENTER' }, f: [{ t: 'S', c: { r: 0.07, g: 0.07, b: 0.07 } }], rd: [24], c: glyphComps } });

// skeleton
const skel = { masters: [], instances: [] };
const skelIR = compIR.map((n) => placeholders(structuredClone(n), skel));
for (const n of skelIR) splitJobs(n, P(PAGES.components), PAGES.components);

// masters in dependency order
const deps = new Map();
const collectDeps = (n, set) => { if (n.k === 'I' && n.m && !String(n.m).startsWith('glyph:')) set.add(n.m); for (const o of n.ops || []) if (o.swap && !String(o.swap).startsWith('glyph:')) set.add(o.swap); (n.c || []).forEach((c) => collectDeps(c, set)); };
const masterOfVariant = new Map();
for (const m of masters.values()) for (const v of m.variants) masterOfVariant.set(v.row.id, m.row.id);
const masterIR = new Map(compIR.flatMap(function all(n) { return [[n.i, n], ...(n.c || []).flatMap(all)]; }).filter(([i]) => masterIds.has(i)));
for (const id of masterIds) { const s = new Set(); collectDeps(masterIR.get(id), s); deps.set(id, new Set([...s].map((v) => masterOfVariant.get(v)).filter((m) => m && m !== id))); }
const order = []; const seen = new Set();
const visit = (id, stack = new Set()) => { if (seen.has(id)) return; if (stack.has(id)) { console.warn('cycle at', id); return; } stack.add(id); for (const d of deps.get(id) || []) visit(d, stack); seen.add(id); order.push(id); };
for (const id of masterIds) visit(id);

const desc = (row) => {
  const header = parentOf.get(row.id)?.children.find((c) => c.p.name === 'Spec header');
  if (!header) return undefined;
  const path = header.children.find((c) => c.p.name === 'Storybook path')?.p.text?.chars;
  const usage = header.children.filter((c) => c.p.text && !['Storybook path', 'Name'].includes(c.p.name)).map((c) => c.p.text.chars).join('\n');
  return [usage, path && 'Storybook: ' + path].filter(Boolean).join('\n\n');
};
for (const id of order) {
  const n = structuredClone(masterIR.get(id)); const row = byId.get(id);
  const bodies = n.axes ? n.c.filter((c) => c.vn) : [n];
  for (const b of bodies) if ((b.c || []).length && (b.c || []).every(iconLike)) { scaleContent(b); console.log('icon-like master', b.n); }
  const sub = { masters: [], instances: [] }; // masters never contain other masters' definitions
  if (n.axes) {
    const variants = n.c.filter((c) => c.vn);
    for (const v of variants) { v.k = 'C'; jobs.push({ t: 'build', page: PAGES.components, parent: id, node: v }); }
    const { c, ...setNode } = n; setNode.desc = desc(row);
    jobs.push({ t: 'combine', page: PAGES.components, replace: id, variants: variants.map((v) => v.i), pos: variants.map((v) => ({ i: v.i, x: v.x ?? 0, y: v.y ?? 0 })), node: setNode });
  } else {
    n.k = 'C'; n.desc = desc(row);
    jobs.push({ t: 'build', page: PAGES.components, parent: P(PAGES.components), replace: id, node: n });
  }
}
for (const inst of skel.instances) jobs.push({ t: 'build', page: PAGES.components, parent: P(PAGES.components), replace: inst.i, node: inst });

// ── design system + key screens ─────────────────────────────────────────────────────────────────────────
for (const [key, roots] of [['ds', ds], ['screens', screens]]) {
  jobs.push({ t: 'page', name: PAGES[key], clear: true });
  for (const r of roots) { const n = toIR(r); negativePadding(n); splitJobs(n, P(PAGES[key]), PAGES[key]); }
}

// derived alpha variables (registered while converting)
for (const [name, v] of alphaVars) tokensJob.vars.push({ name: vn(name), type: 'COLOR', value: { r: v.r, g: v.g, b: v.b, a: v.a }, scopes: scopesFor(v.base, 'COLOR'), desc: `${v.base} at ${Math.round(v.a * 100)}%` });

// ── pack ────────────────────────────────────────────────────────────────────────────────────────────────
const runtime = fs.readFileSync('runtime.js', 'utf8');
const payload = JSON.stringify({ runtime, jobs, images: [...images] }).replace(/[\u0080-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
fs.writeFileSync('out/payload.json', payload);
fs.writeFileSync('out/payload.png', encode(Buffer.from(payload, 'latin1')));
const kinds = {}; for (const j of jobs) kinds[j.t] = (kinds[j.t] || 0) + 1;
console.log('jobs', jobs.length, JSON.stringify(kinds), 'payload', payload.length, 'masters ordered', order.length, 'skeleton instances', skel.instances.length, 'glyphs', glyphs.size, 'images', images.size);
