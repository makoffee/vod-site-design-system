// Convert parsed Brilliant rows into a compact Figma build IR: precomputed Figma paints/effects, component
// variant resolution, and instance overrides as diff ops against the master variant.
import { readTokens } from './tokens.mjs';

const TOK = readTokens();

// ── paints ──────────────────────────────────────────────────────────────────────────────────────────────
const r4 = (v) => Math.round(v * 10000) / 10000;
const rgb = (c) => ({ r: r4(c.r), g: r4(c.g), b: r4(c.b) });
const alphaOf = (c) => c.o ?? c.a ?? 1;
const inv = ([[a, b, c], [d, e, f]]) => { const det = a * e - b * d; return [[e / det, -b / det, (b * f - c * e) / det], [-d / det, a / det, (c * d - a * f) / det]].map((r) => r.map(r4)); };

function linearTransform(angle) {
  const t = (angle * Math.PI) / 180; const dx = Math.sin(t), dy = -Math.cos(t);
  const L = 0.5 * (Math.abs(dx) + Math.abs(dy));
  const s = [0.5 - dx * L, 0.5 - dy * L], e = [0.5 + dx * L, 0.5 + dy * L];
  const v = [e[0] - s[0], e[1] - s[1]], q = [-v[1], v[0]];
  return inv([[v[0], q[0], s[0] - 0.5 * q[0]], [v[1], q[1], s[1] - 0.5 * q[1]]]);
}
function linearHandles([sx, sy, ex, ey, wx, wy]) { // Figma handle form: start, end, width
  return inv([[ex - sx, wx - sx, sx - 0.5 * (wx - sx)], [ey - sy, wy - sy, sy - 0.5 * (wy - sy)]]);
}
function radialTransform([cx, cy, ex, ey, wx, wy]) {
  const ux = ex - cx, uy = ey - cy, vx = wx - cx, vy = wy - cy;
  return inv([[2 * ux, 2 * vx, cx - ux - vx], [2 * uy, 2 * vy, cy - uy - vy]]);
}

export const images = new Set();
export const alphaVars = new Map(); // derived RGBA variables: 'color.surface.glass.10' → value
function paint(p) {
  if (p.type === 'SOLID') {
    const a = alphaOf(p.c) * (p.o ?? 1); const out = { t: 'S', c: rgb(p.c) };
    if (p.c.tok && TOK.colors[p.c.tok]) {
      const base = TOK.colors[p.c.tok];
      // Figma instances drop paint opacity on variable-bound paints, so translucent uses bind an RGBA alpha variant (white/10 style)
      if (Math.abs(a - base.a) < 0.005) { out.v = p.c.tok; out.o = 1; }
      else { const pct = Math.round(a * 100); const name = `${p.c.tok}.${pct}`; alphaVars.set(name, { base: p.c.tok, r: base.r, g: base.g, b: base.b, a: r4(a) }); out.v = name; out.o = 1; out.c = rgb(base); out.va = r4(a); }
    } else out.o = r4(a);
    if (out.o === 1) delete out.o; return out;
  }
  if (p.type === 'LINEAR' || p.type === 'RADIAL') {
    return { t: p.type === 'LINEAR' ? 'L' : 'R', m: p.type === 'LINEAR' ? (p.handles ? linearHandles(p.handles) : linearTransform(p.angle ?? 180)) : radialTransform(p.handles),
      s: p.stops.map((s) => ({ p: Math.min(1, Math.max(0, r4(s.pos ?? 0))), c: { ...rgb(s.c), a: r4(alphaOf(s.c)) } })), ...(p.o !== undefined && p.o !== 1 ? { o: p.o } : {}) };
  }
  if (p.type === 'IMAGE') {
    images.add(p.src);
    const out = { t: 'I', src: p.src, sm: { fill: 'FILL', fit: 'FIT', tile: 'TILE', crop: 'CROP' }[p.mode] ?? 'FILL' };
    if (p.crop) { const [x0, y0, x1, , , , , y3] = p.crop; const sx = x1 - x0, sy = y3 - y0; out.m = [[r4(1 / sx), 0, r4(-x0 / sx)], [0, r4(1 / sy), r4(-y0 / sy)]]; out.sm = 'CROP'; }
    if (p.o !== undefined && p.o !== 1) out.o = p.o; return out;
  }
  return null;
}
function fillsOf(list) { return (list || []).map(paint).filter(Boolean); }
function bgBlur(list) { const b = (list || []).find((p) => p.type === 'BG_BLUR'); return b ? b.radius : undefined; }

// ── node props → IR ─────────────────────────────────────────────────────────────────────────────────────
const KIND = { frame: 'F', group: 'G', rect: 'R', ellipse: 'E', text: 'T', vector: 'V', instance: 'I', mask: 'M', icon: 'S', bool: 'F' };
const ALIGN = { s: 'MIN', c: 'CENTER', e: 'MAX', sb: 'SPACE_BETWEEN', b: 'BASELINE' };
const PIN_H = { l: 'MIN', r: 'MAX', lr: 'STRETCH', c: 'CENTER', s: 'SCALE' };
const PIN_V = { t: 'MIN', b: 'MAX', tb: 'STRETCH', c: 'CENTER', s: 'SCALE' };
const resolved = (ax, ext) => (ax ? (ax.v ?? ext) : ext);

function pathData(d) {
  return d.replace(/([MLCQZ])/g, ' $1 ').replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
}
function network(n) {
  const mir = { mi: 'ANGLE_AND_LENGTH', as: 'ANGLE', di: 'NONE', st: 'NONE' };
  const solid = (n.regions || []).filter((r) => !r.hole), holes = (n.regions || []).filter((r) => r.hole);
  const regions = solid.map((r) => ({ windingRule: 'NONZERO', loops: [r.loop] }));
  if (holes.length && regions.length) { regions[0].loops.push(...holes.map((h) => h.loop)); regions[0].windingRule = 'EVENODD'; } // holes may be listed before their outline
  return { vertices: n.vertices.map((v) => ({ x: r4(v.x), y: r4(v.y), handleMirroring: mir[v.t] ?? 'NONE' })),
    segments: n.segments.map((s) => ({ start: s.start, end: s.end, tangentStart: { x: s.ts[0], y: s.ts[1] }, tangentEnd: { x: s.te[0], y: s.te[1] } })), regions };
}

// Visual props shared by full nodes and instance overrides. Returns an object with only defined keys.
export function visual(p) {
  const o = {};
  if (p.fills !== undefined) { o.f = fillsOf(p.fills); const bb = bgBlur(p.fills); if (bb !== undefined) o.bb = bb; }
  if (p.strokes !== undefined) {
    o.s = fillsOf(p.strokes); const s0 = p.strokes[0];
    if (s0) { if (s0.w) { if (s0.w.length >= 4) o.sw4 = s0.w; else o.sw = s0.w[0]; }
      o.sa = { i: 'INSIDE', o: 'OUTSIDE', c: 'CENTER' }[s0.pos] ?? 'CENTER';
      if (s0.join) o.sj = { m: 'MITER', r: 'ROUND', b: 'BEVEL' }[s0.join[0]]; if (s0.cap) o.sc = { r: 'ROUND', s: 'SQUARE', n: 'NONE' }[s0.cap[0]];
      if (s0.dash) o.sd = s0.dash; if (s0.wTok) o.swv = s0.wTok; }
  }
  if (p.radius) { o.rd = p.radius; if (p.radiusTok) o.rdv = p.radiusTok; }
  const fx = [];
  for (const s of p.shadows || []) fx.push({ type: s.inner ? 'INNER_SHADOW' : 'DROP_SHADOW', color: { ...rgb(s.color), a: r4(s.o) }, offset: { x: s.x, y: s.y }, radius: s.blur, spread: s.spread, visible: true, blendMode: 'NORMAL' });
  if (p.layerBlur) fx.push({ type: 'LAYER_BLUR', radius: p.layerBlur, visible: true });
  if (o.bb !== undefined) { fx.push({ type: 'BACKGROUND_BLUR', radius: o.bb, visible: true }); delete o.bb; }
  if (fx.length || p.shadows || p.layerBlur || (p.fills !== undefined)) o.fx = fx;
  if (p.opacity !== undefined) o.op = p.opacity;
  if (p.blend) o.bl = p.blend.replace(/([A-Z])/g, '_$1').toUpperCase();
  o.hid = !!p.hidden;
  if (p.clip !== undefined) o.clip = p.clip;
  if (p.text) {
    const t = p.text; o.tx = { c: t.chars, fam: t.family, w: t.weight, sz: t.size, lh: t.lhAuto ? 'auto' : t.lh, ls: t.ls ?? 0, al: { l: 'LEFT', c: 'CENTER', r: 'RIGHT', j: 'JUSTIFIED', trailing: 'RIGHT' }[t.align] ?? 'LEFT', va: { t: 'TOP', c: 'CENTER', b: 'BOTTOM' }[t.valign], cs: t.case === 'upper' ? 'UPPER' : t.case === 'lower' ? 'LOWER' : t.case === 'title' ? 'TITLE' : undefined, cl: t.clamp };
    if (p.spans) o.sp = p.spans.map((s) => ({ a: s.start, b: s.end, w: s.weight ? weight(s.weight) : undefined, sz: s.size, fam: s.family, ls: s.ls, c: s.color ? rgb(s.color) : undefined }));
    if (p.textStyle) o.ts = p.textStyle.replace(/\./g, '/');
  }
  return o;
}
const W = { r: 400, m: 500, medium: 500, sb: 600, semibold: 600, b: 700, bold: 700, heavy: 800, bl: 900, black: 900 };
const weight = (w) => W[w] ?? (parseInt(w) || 400);

function layout(p) {
  const o = {};
  if (p.al) { const a = p.al; o.al = { d: a.dir === 'v' ? 'VERTICAL' : 'HORIZONTAL', g: a.gap ?? 0, pad: a.pad ?? [0, 0, 0, 0], pr: ALIGN[a.dir === 'v' ? a.y : a.x] ?? 'MIN', cr: ALIGN[a.dir === 'v' ? a.x : a.y] ?? 'MIN' };
    if (o.al.cr === 'SPACE_BETWEEN') o.al.cr = 'MIN';
    if (a.wrap) { o.al.wrap = 1; o.al.cg = a.cgap ?? a.gap ?? 0; }
    if (a.gapTok) o.al.gv = a.gapTok; if (a.padTok?.some(Boolean)) o.al.pv = a.padTok; }
  return o;
}

function sizing(p) {
  const o = {};
  if (p.x !== undefined) o.x = p.x; if (p.y !== undefined) o.y = p.y;
  const w = resolved(p.w, p.extW), h = resolved(p.h, p.extH);
  if (w !== undefined) o.w = r4(w); if (h !== undefined) o.h = r4(h);
  if (p.w) o.wm = p.w.m[0]; if (p.h) o.hm = p.h.m[0]; // f|h|f(ixed): 'f'ill, 'h'ug, 'f'ixed clash → use full words
  if (p.w) o.wm = p.w.m; if (p.h) o.hm = p.h.m;
  for (const k of ['minW', 'minH', 'maxW', 'maxH']) if (p[k] !== undefined) o[k] = p[k];
  if (p.abs) o.abs = 1;
  if (p.pin) o.pin = [PIN_H[p.pin.h] ?? 'MIN', PIN_V[p.pin.v] ?? 'MIN'];
  if (p.rot) o.rot = p.rot;
  if (p.constrain) o.lock = 1;
  return o;
}

// ── components ──────────────────────────────────────────────────────────────────────────────────────────
export const masters = new Map(); // name → { row, axes, variants: [{row, values}], def }
export function indexMasters(roots) {
  const walk = (r, inInst) => {
    const p = r.p;
    if (p.comp && !inInst) {
      if (p.axes) {
        const variants = r.children.filter((c) => c.p.variant).map((c) => ({ row: c, values: c.p.variant }));
        const top = [...variants].sort((a, b) => (a.row.p.y ?? 0) - (b.row.p.y ?? 0) || (a.row.p.x ?? 0) - (b.row.p.x ?? 0))[0];
        masters.set(p.name, { row: r, axes: p.axes, variants, def: top?.values ?? {} });
      } else masters.set(p.name, { row: r, axes: null, variants: [{ row: r, values: {} }], def: {} });
    }
    r.children.forEach((c) => walk(c, inInst || p.type === 'instance'));
  };
  roots.forEach((r) => walk(r, false));
}

export function resolveVariant(instRow) {
  const m = masters.get(instRow.p.inst.name);
  if (!m) return null;
  if (!m.axes) return m.variants[0].row;
  const names = new Set(m.axes.map((a) => a.name));
  const at = instRow.p.at || {};
  const raw = Object.keys(at).some((k) => !names.has(k));
  if (!raw) {
    const want = { ...m.def, ...at };
    const hit = m.variants.find((v) => m.axes.every((a) => String(v.values[a.name]) === String(want[a.name])));
    if (hit) return hit.row;
  }
  // raw axis ids or no exact match: the variant whose subtree differs least from the instance
  let best = null, bestScore = Infinity;
  for (const v of m.variants) { const d = diff(instRow, v.row, true); const score = d ? d.score : 1e6; if (score < bestScore) { bestScore = score; best = v.row; } }
  return best;
}

// ── glyphs: icon rows and leaf vectors named "Icon" become instances of small icon components ──────────────
import crypto from 'crypto';
export const glyphs = new Map(); // key → { row, n }
export const isGlyph = (r) => !r.children.length && (r.p.type === 'icon' || (r.p.type === 'vector' && r.p.name === 'Icon'));
export function glyphKey(r) {
  const k = r.p.type === 'icon' ? 'glyph:' + r.p.icon : 'glyph:v' + crypto.createHash('sha1').update(JSON.stringify(r.p.network ?? r.p.path ?? '')).digest('hex').slice(0, 8);
  if (!glyphs.has(k)) glyphs.set(k, { row: r, n: glyphs.size });
  return k;
}
const glyphPaint = (p) => { const v = visual(p); const o = {}; for (const k of ['f', 's', 'sw', 'sw4', 'sa', 'sj', 'sc', 'sd']) if (v[k] !== undefined) o[k] = v[k]; return o; };
function glyphIR(row) {
  const p = row.p; const n = { i: row.id, k: 'I', m: glyphKey(row), n: p.name ?? 'Icon', ...sizing({ ...p, w: { m: 'fixed', v: resolved(p.w, p.extW) }, h: { m: 'fixed', v: resolved(p.h, p.extH) } }) };
  n.hid = !!p.hidden; if (p.opacity !== undefined) n.op = p.opacity;
  n.ops = [{ path: [0], ...glyphPaint(p) }];
  return n;
}

// ── instance diff ───────────────────────────────────────────────────────────────────────────────────────
const sig = (o) => JSON.stringify(o);
const OVR_KEYS = ['f', 's', 'sw', 'sw4', 'sa', 'sj', 'sc', 'sd', 'rd', 'fx', 'op', 'bl', 'hid', 'clip', 'tx', 'sp', 'ts', 'al'];
function overrideProps(ip, mp, isRoot, parentAL) {
  const a = { ...visual(ip), ...layout(ip) }, b = { ...visual(mp), ...layout(mp) };
  const o = {};
  const inherits = ip.type === 'instance'; // instance rows print only their overrides
  for (const k of OVR_KEYS) if (sig(a[k]) !== sig(b[k])) { if (a[k] !== undefined) o[k] = a[k]; else if (inherits) continue; else if (k === 'f' || k === 's' || k === 'fx') o[k] = []; else if (k === 'hid') o.hid = false; }
  // geometry: only fixed sizes inside the instance (fill/hug follow the master)
  const sa = sizing(ip), sb = sizing(mp);
  if (!isRoot) {
    if ((sa.wm === 'fixed' && sa.w !== sb.w) || sa.wm !== sb.wm) { o.w = sa.w; o.wm = sa.wm; }
    if ((sa.hm === 'fixed' && sa.h !== sb.h) || sa.hm !== sb.hm) { o.h = sa.h; o.hm = sa.hm; }
    if ((!parentAL || ip.abs) && (sa.x !== sb.x || sa.y !== sb.y) && sa.x !== undefined) { o.x = sa.x; o.y = sa.y; }
  }
  return o;
}

// Returns { ops, score } or null when the structure cannot be expressed as overrides.
export function diff(instRow, varRow, scoring = false) {
  const ops = []; let score = 0;
  const rec = (iRows, mRows, path, parentAL) => {
    if (iRows.length !== mRows.length) return false;
    for (let i = 0; i < iRows.length; i++) {
      const ic = iRows[i], mc = mRows[i]; const pth = [...path, i];
      if (isGlyph(ic) || isGlyph(mc)) {
        if (!(isGlyph(ic) && isGlyph(mc))) return false;
        const ki = glyphKey(ic), km = glyphKey(mc); const op = {};
        if (ki !== km) op.swap = ki;
        const sa = sizing(ic.p), sb = sizing(mc.p);
        if (sa.w !== sb.w || sa.h !== sb.h) { op.w = sa.w; op.h = sa.h; op.wm = 'fixed'; op.hm = 'fixed'; }
        if (!!ic.p.hidden !== !!mc.p.hidden) op.hid = !!ic.p.hidden;
        if (Object.keys(op).length) { ops.push({ path: pth, ...op }); score += Object.keys(op).length; }
        const pa = glyphPaint(ic.p), pb = glyphPaint(mc.p);
        if (ki !== km || sig(pa) !== sig(pb)) { ops.push({ path: [...pth, 0], ...pa }); score += 1; }
        continue;
      }
      if (ic.p.type !== mc.p.type) return false;
      let base = mc;
      const op = {};
      if (ic.p.type === 'instance') {
        const vi = scoring ? null : resolveVariant(ic), vm = scoring ? null : resolveVariant(mc);
        if (!scoring && vi && vm && vi.id !== vm.id) { op.swap = vi.id; base = vi; }
      }
      // a summarized vector prints no fills: take the copy's own fills from data/full-vectors.bl
      const ip = ic.p.type === 'vector' && ic.summarized && FULL.has(ic.id) ? { ...ic.p, fills: FULL.get(ic.id).p.fills } : ic.p;
      const props = overrideProps(ip, base === mc ? mc.p : instancedRoot(ip, base.p), false, parentAL);
      Object.assign(op, props);
      if (Object.keys(op).length) { ops.push({ path: pth, ...op }); score += Object.keys(op).length; }
      const kids = base === mc ? mc.children : base.children;
      if (ic.children.length || kids.length) if (!rec(ic.children, kids, pth, !!(ic.p.al))) return false;
    }
    return true;
  };
  if (!rec(instRow.children, varRow.children, [], !!varRow.p.al)) return null;
  return { ops, score };
}
// After a swap, compare the nested copy against the new variant's root but keep the copy's own geometry.
const instancedRoot = (ip, vp) => ({ ...vp, x: ip.x, y: ip.y, w: ip.w, h: ip.h, extW: ip.extW, extH: ip.extH });

// ── tree → IR ───────────────────────────────────────────────────────────────────────────────────────────
import { readRows as _rr } from './parse.mjs';
const FULL = new Map(); for (const r of _rr(new URL('./data/full-vectors.bl', import.meta.url).pathname)) FULL.set(r.id, r);
export const stats = { nodes: 0, instances: 0, detached: 0, ops: 0 };
export function toIR(row, ctx = {}) {
  let p = row.p; stats.nodes++;
  if (isGlyph(row)) return glyphIR(row);
  const n = { i: row.id, k: KIND[p.type] ?? 'F' };
  if (p.name !== undefined) n.n = p.name;
  Object.assign(n, sizing(p));
  if (p.type === 'instance') {
    const v = resolveVariant(row);
    const d = v && diff(row, v);
    if (v && d) {
      stats.instances++; stats.ops += d.ops.length;
      n.m = v.id; const root = overrideProps(p, instancedRoot(p, v.p), true, false);
      Object.assign(n, root); if (d.ops.length) n.ops = d.ops; return n;
    }
    stats.detached++; n.k = 'F'; n.detachedFrom = p.inst.name;
    Object.assign(n, visual(v ? { ...v.p, ...stripUndef(p) } : p), layout(v ? v.p : p));
  } else Object.assign(n, visual(p), layout(p));
  if (p.comp) { n.comp = 1; if (p.axes) n.axes = p.axes; }
  if (p.variant) n.vn = Object.entries(p.variant).map(([k, v]) => `${k}=${v}`).join(', ');
  if (p.type === 'vector' && row.summarized && FULL.has(row.id)) { const fr = FULL.get(row.id); p.network = fr.p.network; if (!p.fills?.length) n.f = fillsOf(fr.p.fills); row = { ...row, summarized: false }; }
  if (p.type === 'vector') { if (p.network) n.vnet = network(p.network); else if (p.path) n.vp = pathData(p.path); if (row.summarized) n.summarized = 1; }
  if (p.type === 'icon') n.icon = p.icon;
  if (row.children.length) n.c = row.children.map((c) => toIR(c, ctx));
  return n;
}
const stripUndef = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));
