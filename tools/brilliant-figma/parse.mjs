// Parse a Brilliant blueprint read (```bl fence, expandInstances: true) into a row tree with normalized props.
import fs from 'fs';
import { splitTop, head } from './tokenize.mjs';

const ID = /^[0-9a-f]{16}$/;
import { readTokens } from './tokens.mjs';
const TOKN = readTokens().numbers;
const num = (s) => { if (s == null || s === '') return undefined; const head0 = String(s).split(':')[0]; if (head0.startsWith('$')) return TOKN[head0.slice(1)]; const v = parseFloat(head0); return Number.isNaN(v) ? undefined : v; };
const tokOf = (s) => { const m = String(s ?? '').match(/:\$([\w.\-]+)/); return m ? m[1] : undefined; };
const args = (h) => (h.a === undefined ? [] : splitTop(h.a, ','));
const named = (list) => { const o = {}; for (const x of list) { const h = head(x); if (h.a !== undefined) o[h.h] = h.a; else o[x] = true; } return o; };

export function readRows(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const roots = []; const stack = [];
  for (const raw of lines) {
    if (!raw.trim() || raw.startsWith('```') || raw.startsWith('file(')) continue;
    const depth = raw.match(/^ */)[0].length / 2;
    const t = raw.trim();
    if (t.startsWith('#')) continue; // comments / notes
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    const parent = stack[stack.length - 1];
    if (t.startsWith('…')) { if (parent) parent.summarized = true; continue; }
    const toks = splitTop(t);
    const row = { depth, toks, children: [] };
    if (toks[0].startsWith('vr(')) { if (parent) (parent.regionFills ??= []).push(parsePaints(head(toks[1]).b)); continue; }
    if (toks[0].startsWith('spans[')) { if (parent) parent.spans = parseSpans(head(toks[0]).b); continue; }
    if (toks[0].startsWith('override(')) row.override = head(toks[0]).a;
    else if (ID.test(toks[0])) row.id = toks[0];
    if (parent) parent.children.push(row); else roots.push(row);
    stack.push(row);
  }
  const walk = (r) => { r.p = normalize(r); r.children.forEach(walk); };
  roots.forEach(walk);
  return roots;
}

function parseColor(s) {
  // tok(name,#hex) | #hex | solid(COLOR,o(x))
  const h = head(s);
  if (h.h === 'tok') { const [name, hex] = args(h); return { ...hex2rgba(hex), tok: name }; }
  if (h.h === 'solid') { const a = args(h); const c = parseColor(a[0]); const o = a.find((x) => x.startsWith('o(')); if (o) { c.o = num(head(o).a); c.oTok = tokOf(head(o).a); } return c; }
  if (s.startsWith('#')) return hex2rgba(s);
  return { r: 0, g: 0, b: 0, a: 1, unknown: s };
}
function hex2rgba(hex) {
  const m = String(hex).replace('#', '');
  const r = parseInt(m.slice(0, 2), 16) / 255, g = parseInt(m.slice(2, 4), 16) / 255, b = parseInt(m.slice(4, 6), 16) / 255;
  const a = m.length >= 8 ? parseInt(m.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}
const round = (v) => Math.round(v * 10000) / 10000;

export function parsePaints(body) {
  if (!body) return [];
  return splitTop(body, ',').map((p) => {
    const inner = splitTop(p.replace(/^\(/, '').replace(/\)$/, ''), ',');
    const paint = inner[1]; const extra = inner.slice(2);
    const h = head(paint); const out = {};
    if (h.h === 'img') {
      const a = args(h); out.type = 'IMAGE'; out.src = a[0]; out.mode = a[1] || 'fill';
      const cr = a.find((x) => x.startsWith('crop(')); if (cr) out.crop = args(head(cr)).map(Number);
      const o = a.find((x) => x.startsWith('o(')); if (o) out.o = num(head(o).a);
    } else if (h.h === 'linear' || h.h === 'radial') {
      const a = args(h); out.type = h.h === 'linear' ? 'LINEAR' : 'RADIAL';
      if (h.h === 'linear') out.angle = num(a[0]);
      else { out.handles = [num(a[0]), num(a[1]), num(a[2]), num(a[3]), ...args(head(a[4])).map(Number)]; }
      out.stops = a.filter((x) => x.startsWith('stop(')).map((x) => { const s = args(head(x)); const c = parseColor(s[0]); const o = s.find((y) => y.startsWith('o(')); if (o) { c.o = num(head(o).a); } return { c, pos: num(s[1]) }; });
    } else if (h.h === 'blur') { out.type = 'BG_BLUR'; out.radius = num(h.a); }
    else { out.type = 'SOLID'; out.c = parseColor(paint); }
    for (const x of extra) { const e = head(x);
      if (e.h === 'w') { const a = args(e); out.w = a.map(num); out.wTok = tokOf(a[0]); }
      else if (e.h === 'pos') out.pos = e.a; else if (e.h === 'join') out.join = e.a; else if (e.h === 'dashcap' || e.h === 'cap') out.cap = e.a;
      else if (e.h === 'dash') out.dash = args(e).map(Number); else if (e.h === 'miter') out.miter = num(e.a);
      else if (e.h === 'o') out.o = num(e.a); }
    return out;
  });
}

function parseSpans(body) {
  return splitTop(body, ',').map((p) => {
    const a = splitTop(p.replace(/^\(/, '').replace(/\)$/, ''), ',');
    const s = { start: +a[0], end: +a[1] };
    for (const x of a.slice(2)) { const h = head(x);
      if (x.startsWith('#')) s.color = hex2rgba(x);
      else if (h.h === 's') s.size = num(h.a); else if (h.h === 'f') s.family = h.a; else if (h.h === 'ls') s.ls = num(h.a);
      else if (h.h === 'w') s.weight = h.a; else if (['r', 'm', 'sb', 'b', 'bl', 'heavy'].includes(x)) s.weight = x; }
    return s;
  });
}

const WEIGHTS = { r: 400, m: 500, medium: 500, sb: 600, semibold: 600, b: 700, bold: 700, heavy: 800, extrabold: 800, bl: 900, black: 900, regular: 400 };
export const weightOf = (w) => WEIGHTS[String(w).split(':')[0]] ?? (parseInt(w) || 400);

function sizeAxis(s) {
  if (s === undefined) return undefined;
  const [mode, v] = s.split(':');
  if (mode === 'fill') return { m: 'fill', v: num(v) };
  if (mode === 'hug') return { m: 'hug', v: num(v) };
  return { m: 'fixed', v: num(mode) };
}

function normalize(row) {
  const p = { name: undefined };
  for (const tok of row.toks.slice(row.id || row.override ? 1 : 0)) {
    if (tok.startsWith('"')) { p.name = JSON.parse(tok); continue; }
    if (tok.startsWith('#')) continue;
    if (tok.startsWith('$typography.')) { p.textStyle = tok.slice(12); continue; }
    if (tok.startsWith('path:d(')) { p.type ??= 'vector'; p.path = tok.slice(7, -1); continue; }
    const h = head(tok);
    switch (h.h) {
      case 'fr': p.type = 'frame'; break;
      case 'gr': p.type = 'group'; break;
      case 'r': p.type = 'rect'; break;
      case 'c': p.type = 'ellipse'; break;
      case 'mask': p.type = 'mask'; p.maskKind = h.a; break;
      case 'comp': p.comp = true; break;
      case 'clip': p.clip = true; break; case 'no-clip': p.clip = false; break;
      case 'hidden': p.hidden = true; break; case 'no-hidden': p.hidden = false; break;
      case 'abs': p.abs = true; break;
      case 'constrain': p.constrain = true; break;
      case 'isolate': case 'locked': case 'front': case 'back': case 'projds': break;
      case 'al': {
        p.type ??= 'frame'; const a = args(h); const al = { dir: a[0] === 'v' ? 'v' : 'h' };
        for (const x of a.slice(1)) { const e = head(x);
          if (x === 'wrap') al.wrap = true;
          else if (e.h === 'x') al.x = e.a; else if (e.h === 'y') al.y = e.a;
          else if (e.h === 'g') { const g = splitTop(e.a, ','); al.gap = num(g[0]); al.gapTok = tokOf(g[0]); if (g[1] !== undefined) { al.cgap = num(g[1]); al.cgapTok = tokOf(g[1]); } }
          else if (e.h === 'pad') { const v = splitTop(e.a, ','); const n = v.map(num), t = v.map(tokOf);
            const four = (arr) => arr.length === 1 ? [arr[0], arr[0], arr[0], arr[0]] : arr.length === 2 ? [arr[0], arr[1], arr[0], arr[1]] : arr.length === 3 ? [arr[0], arr[1], arr[2], arr[1]] : arr;
            al.pad = four(n); al.padTok = four(t); } }
        p.al = al; break; }
      case 't': {
        p.type = 'text'; const a = splitTop(h.a, ',');
        const tx = { chars: JSON.parse(a[0]), family: a[1]?.split(':')[0], size: num(a[2]), weight: weightOf(a[3] ?? 'r') };
        for (const x of a.slice(4)) { const e = head(x);
          if (e.h === 'align') tx.align = e.a; else if (e.h === 'valign') tx.valign = e.a;
          else if (e.h === 'lh') { const v = splitTop(e.a, ','); if (v[0] === 'auto') tx.lhAuto = true; tx.lh = num(v[v.length - 1]); }
          else if (e.h === 'ls') { tx.ls = num(e.a); tx.lsUnit = /px/.test(e.a) ? 'px' : 'px'; }
          else if (e.h === 'clamp') tx.clamp = num(e.a); else if (e.h === 'case') tx.case = e.a;
          else if (e.h === 'decor' || e.h === 'deco') tx.decoration = e.a; }
        p.text = tx; break; }
      case 'v': {
        p.type = 'vector';
        if (h.a) p.network = parseNetwork(h.a);
        break; }
      case 'svg': p.type = 'icon'; p.icon = h.a.replace(/^icon:/, ''); break;
      case 'line': p.type = 'vector'; p.line = h.a; break;
      case 'bool': p.type = 'bool'; p.op = h.a; break;
      case 'inst': { p.type = 'instance'; const a = args(h); p.inst = { name: a[0].startsWith('"') ? JSON.parse(a[0]) : a[0], canvas: a.find((x) => x.startsWith('canvas('))?.slice(7, -1) }; break; }
      case 'at': p.at = parseAxes(h.a); break;
      case 'variant': p.variant = parseAxes(h.a); break;
      case 'axes': p.axes = splitTop(h.b, ',').map((x) => { const e = head(x); return { name: e.h, values: e.b ? splitTop(e.b, ',') : [] }; }); break;
      case 'p': { const [x, y] = args(h); p.x = num(x); p.y = num(y); break; }
      case 's': { const [w, hh] = args(h); p.w = sizeAxis(w); p.h = sizeAxis(hh); break; }
      case 'ext': { const [w, hh] = args(h); p.extW = num(w); p.extH = num(hh); break; }
      case 'min': { const [w, hh] = args(h); p.minW = num(w); p.minH = num(hh); break; }
      case 'max': { const [w, hh] = args(h); p.maxW = num(w); p.maxH = num(hh); break; }
      case 'f': p.fills = parsePaints(h.b); break;
      case 'st': p.strokes = parsePaints(h.b); break;
      case 'rd': { const a = args(h); p.radius = a.filter((x) => !x.startsWith('smooth(')).map(num); p.radiusTok = tokOf(a[0]); break; }
      case 'shadow': { const o = named(args(h)); const col = Object.keys(o).find((k) => k.startsWith('#') || k.startsWith('tok(')); (p.shadows ??= []).push({ o: num(o.o) ?? 0.25, x: num(o.x) ?? 0, y: num(o.y) ?? 0, blur: num(o.blur) ?? 0, spread: num(o.sp) ?? 0, color: col ? parseColor(col) : { r: 0, g: 0, b: 0, a: 1 }, inner: !!o.inner }); break; }
      case 'eblur': p.layerBlur = num(args(h)[0]); break;
      case 'o': p.opacity = num(h.a); break;
      case 'blend': p.blend = h.a; break;
      case 'pin': { const [hz, vt] = args(h); p.pin = { h: hz, v: vt }; break; }
      case 'rot': p.rot = num(h.a); break;
      case 'flip': p.flip = args(h).map(Number); break;
      case 'cap': break;
      default: (p.unknown ??= []).push(h.h);
    }
  }
  if (row.regionFills) p.fills = row.regionFills[0];
  if (row.spans) p.spans = row.spans;
  return p;
}

function parseAxes(a) {
  const o = {};
  for (const x of splitTop(a, ',')) { const e = head(x); if (e.a !== undefined) o[e.h] = e.a; else o[x] = true; }
  return o;
}

function parseNetwork(a) {
  const o = {};
  for (const x of splitTop(a, ',')) {
    const e = head(x);
    if (e.h === 'nodes') o.vertices = splitTop(e.b, ',').map((n) => { const v = n.slice(1, -1).split(','); return { x: +v[1], y: +v[2], t: v[3] }; });
    else if (e.h === 'edges') o.segments = splitTop(e.b, ',').map((n) => { const v = n.slice(1, -1).split(',').map(Number); return { start: v[1], end: v[2], ts: [v[3], v[4]], te: [v[5], v[6]] }; });
    else if (e.h === 'regions') o.regions = splitTop(e.b, ',').map((n) => { const parts = splitTop(n.slice(1, -1), ','); return { loop: (parts[0].match(/\d+/g) || []).map(Number), hole: parts.includes('hole') }; });
  }
  return o;
}
