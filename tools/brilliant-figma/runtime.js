// Figma-side builder. Runs inside use_figma through new AsyncFunction('figma', 'ctx', source).
// ctx = { data: { jobs }, state: { cursor, map, errors }, deadline }
const { data, state } = ctx;
figma.skipInvisibleInstanceChildren = false;
const map = state.map;                       // brilliant id → figma id (components, sets, placeholders, job parents)
const errors = state.errors;
const fonts = new Set();
const varByName = {};
for (const v of await figma.variables.getLocalVariablesAsync()) varByName[v.name] = v;
const styleByName = {};
for (const s of await figma.getLocalTextStylesAsync()) styleByName[s.name] = s;
const hashes = state.hashes || {};

const STYLE = { 100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black' };
async function font(fam, w) {
  const f = { family: fam || 'DM Sans', style: STYLE[w] || 'Regular' };
  const key = f.family + '|' + f.style;
  if (!fonts.has(key)) { try { await figma.loadFontAsync(f); } catch (e) { f.family = 'DM Sans'; await figma.loadFontAsync(f); } fonts.add(key); }
  return f;
}
const vname = (tok) => tok.replace(/\./g, '/');
async function getNode(bid) { const fid = map[bid]; return fid ? await figma.getNodeByIdAsync(fid) : null; }

function paints(list) {
  const out = [];
  for (const p of list || []) {
    let q;
    if (p.t === 'S') q = { type: 'SOLID', color: p.c, opacity: p.o ?? 1 };
    else if (p.t === 'L' || p.t === 'R') q = { type: p.t === 'L' ? 'GRADIENT_LINEAR' : 'GRADIENT_RADIAL', gradientTransform: p.m, gradientStops: p.s.map((s) => ({ position: s.p, color: s.c })), opacity: p.o ?? 1 };
    else if (p.t === 'I') {
      const h = hashes[p.src];
      if (!h) { q = { type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.24 }, opacity: 1 }; errors.push('missing image ' + p.src); }
      else { q = { type: 'IMAGE', imageHash: h, scaleMode: p.sm === 'CROP' ? 'CROP' : p.sm, opacity: p.o ?? 1 }; if (p.m) q.imageTransform = p.m; }
    }
    if (!q) continue;
    if (p.v && varByName[vname(p.v)] && q.type === 'SOLID') { try { const op = q.opacity; q = figma.variables.setBoundVariableForPaint(q, 'color', varByName[vname(p.v)]); q = { ...q, opacity: op }; } catch (e) {} }
    out.push(q);
  }
  return out;
}

// Figma drops paint opacity on the first assignment of a variable-bound paint; reassign to make it stick.
function setPaints(node, key, list) {
  node[key] = list;
  if (list.some((q) => q.boundVariables && q.opacity !== undefined && q.opacity < 1)) {
    const again = JSON.parse(JSON.stringify(node[key])); again.forEach((q, i) => { if (list[i]) q.opacity = list[i].opacity ?? 1; }); node[key] = again;
  }
}

function applyVisual(node, n) {
  if (n.f !== undefined && 'fills' in node) setPaints(node, 'fills', paints(n.f));
  if (n.s !== undefined && 'strokes' in node) {
    setPaints(node, 'strokes', paints(n.s));
    if (n.sw4) { node.strokeTopWeight = n.sw4[0]; node.strokeRightWeight = n.sw4[1]; node.strokeBottomWeight = n.sw4[2]; node.strokeLeftWeight = n.sw4[3]; }
    else if (n.sw !== undefined) node.strokeWeight = n.sw;
    if (n.sa) try { node.strokeAlign = n.sa; } catch (e) {}
    if (n.sj) node.strokeJoin = n.sj;
    if (n.sc && 'strokeCap' in node) try { node.strokeCap = n.sc; } catch (e) {}
    if (n.sd) node.dashPattern = n.sd;
  }
  if (n.rd && 'cornerRadius' in node) {
    if (n.rd.length === 4) { node.topLeftRadius = n.rd[0]; node.topRightRadius = n.rd[1]; node.bottomRightRadius = n.rd[2]; node.bottomLeftRadius = n.rd[3]; }
    else node.cornerRadius = n.rd[0];
    const v = n.rdv && varByName[vname(n.rdv)];
    if (v && n.rd.length === 1) for (const k of ['topLeftRadius', 'topRightRadius', 'bottomRightRadius', 'bottomLeftRadius']) try { node.setBoundVariable(k, v); } catch (e) {}
  }
  if (n.fx !== undefined && 'effects' in node) node.effects = n.fx.map((e) => (e.type === 'BACKGROUND_BLUR' || e.type === 'LAYER_BLUR') ? { type: e.type, radius: e.radius, visible: true } : e);
  if (n.op !== undefined) node.opacity = n.op;
  if (n.bl) try { node.blendMode = n.bl; } catch (e) {}
  if (n.hid !== undefined) node.visible = !n.hid;
  if (n.clip !== undefined && 'clipsContent' in node) node.clipsContent = !!n.clip;
}

function applyLayout(node, n) {
  if (!n.al) return;
  const a = n.al;
  node.layoutMode = a.d;
  node.itemSpacing = a.g; [node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft] = a.pad.map((v) => Math.max(0, v || 0));
  node.primaryAxisAlignItems = a.pr; node.counterAxisAlignItems = a.cr;
  if (a.wrap) { node.layoutWrap = 'WRAP'; node.counterAxisSpacing = a.cg; }
  const gv = a.gv && varByName[vname(a.gv)]; if (gv) try { node.setBoundVariable('itemSpacing', gv); } catch (e) {}
  if (a.pv) ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach((k, i) => { const v = a.pv[i] && varByName[vname(a.pv[i])]; if (v) try { node.setBoundVariable(k, v); } catch (e) {} });
  const horiz = a.d === 'HORIZONTAL';
  node.primaryAxisSizingMode = (horiz ? n.wm : n.hm) === 'hug' ? 'AUTO' : 'FIXED';
  node.counterAxisSizingMode = (horiz ? n.hm : n.wm) === 'hug' ? 'AUTO' : 'FIXED';
}

function place(node, n, parent) {
  const inAL = parent && 'layoutMode' in parent && parent.layoutMode !== 'NONE';
  if (inAL) {
    if (n.abs) { node.layoutPositioning = 'ABSOLUTE'; if (n.x !== undefined) { node.x = n.x; node.y = n.y; } }
    const canHug = node.type === 'TEXT' || ('layoutMode' in node && node.layoutMode !== 'NONE') || node.type === 'INSTANCE';
    const sz = (m) => (m === 'fill' && !n.abs ? 'FILL' : m === 'hug' && canHug ? 'HUG' : 'FIXED');
    try { if (n.wm) node.layoutSizingHorizontal = sz(n.wm); } catch (e) {}
    try { if (n.hm) node.layoutSizingVertical = sz(n.hm); } catch (e) {}
  } else if (n.x !== undefined) { node.x = n.x; node.y = n.y ?? 0; }
  if (n.pin && 'constraints' in node && (!inAL || n.abs)) try { node.constraints = { horizontal: n.pin[0], vertical: n.pin[1] }; } catch (e) {}
  for (const [k, f] of [['minW', 'minWidth'], ['minH', 'minHeight'], ['maxW', 'maxWidth'], ['maxH', 'maxHeight']]) if (n[k] !== undefined) try { node[f] = n[k]; } catch (e) {}
  if (n.rot && (!inAL || n.abs)) {
    const w = node.width, h = node.height, cx = node.x + w / 2, cy = node.y + h / 2, t = (n.rot * Math.PI) / 180;
    const a = Math.cos(t), b = -Math.sin(t), c = Math.sin(t), d = Math.cos(t);
    node.relativeTransform = [[a, b, cx - (a * w / 2 + b * h / 2)], [c, d, cy - (c * w / 2 + d * h / 2)]];
  }
  if (n.lock && 'lockAspectRatio' in node) try { node.lockAspectRatio(); } catch (e) {}
}

async function applyText(node, n, isNew) {
  const t = n.tx; if (!t) return;
  const f = await font(t.fam, t.w);
  if (!isNew) for (const seg of node.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(seg.fontName);
  node.fontName = f;
  node.characters = t.c;
  node.fontSize = t.sz;
  node.lineHeight = t.lh === 'auto' || t.lh === undefined ? { unit: 'AUTO' } : { unit: 'PERCENT', value: Math.round(t.lh * 10000) / 100 };
  node.letterSpacing = { unit: 'PIXELS', value: t.ls || 0 };
  node.textAlignHorizontal = t.al;
  if (t.va) node.textAlignVertical = t.va;
  node.textCase = t.cs || 'ORIGINAL';
  if (n.ts && styleByName[n.ts]) { try { await node.setTextStyleIdAsync(styleByName[n.ts].id); } catch (e) {} }
  for (const s of n.sp || []) {
    const end = Math.min(s.b, node.characters.length); if (s.a >= end) continue;
    if (s.w || s.fam) node.setRangeFontName(s.a, end, await font(s.fam || t.fam, s.w || t.w));
    if (s.sz) node.setRangeFontSize(s.a, end, s.sz);
    if (s.ls !== undefined) node.setRangeLetterSpacing(s.a, end, { unit: 'PIXELS', value: s.ls });
    if (s.c) node.setRangeFills(s.a, end, [{ type: 'SOLID', color: s.c }]);
  }
}

function sizeText(node, n) {
  if (n.wm === 'hug' && n.hm === 'hug') node.textAutoResize = 'WIDTH_AND_HEIGHT';
  else { node.resize(Math.max(n.w || 1, 0.01), Math.max(n.h || 1, 0.01)); node.textAutoResize = n.hm === 'hug' ? 'HEIGHT' : 'NONE'; }
  if (n.tx && n.tx.cl) { try { node.textTruncation = 'ENDING'; node.maxLines = n.tx.cl; } catch (e) {} }
}

function insert(parent, node, index) {
  if (index !== undefined && index >= 0 && index <= parent.children.length) parent.insertChild(index, node); else parent.appendChild(node);
}

// Build an IR node under parent. Returns the created node.
async function build(n, parent, index) {
  let node;
  try {
    switch (n.k) {
      case 'T': {
        node = figma.createText(); insert(parent, node, index);
        await applyText(node, n, true); applyVisual(node, n); sizeText(node, n); place(node, n, parent); break;
      }
      case 'R': case 'E': {
        node = n.k === 'R' ? figma.createRectangle() : figma.createEllipse(); insert(parent, node, index);
        node.resize(Math.max(n.w || 1, 0.01), Math.max(n.h || 1, 0.01)); applyVisual(node, n); place(node, n, parent); break;
      }
      case 'V': {
        node = figma.createVector();
        if (n.vnet) await node.setVectorNetworkAsync(n.vnet);
        else if (n.vp) node.vectorPaths = [{ windingRule: 'NONZERO', data: n.vp }];
        const ox = node.x, oy = node.y; insert(parent, node, index);
        if (!n.vnet && !n.vp) node.resize(Math.max(n.w || 1, 0.01), Math.max(n.h || 1, 0.01));
        applyVisual(node, n);
        const nn = { ...n, x: (n.x ?? 0) + ox, y: (n.y ?? 0) + oy, wm: 'fixed', hm: 'fixed' };
        place(node, nn, parent);
        if (n.summarized) errors.push('summarized vector ' + n.i);
        break;
      }
      case 'SVG': {
        const fr = figma.createNodeFromSvg(n.svg);
        node = fr.children.length === 1 ? fr.children[0] : figma.flatten([...fr.children], fr);
        if (node.type !== 'VECTOR') node = figma.flatten([node]);
        insert(parent, node, index); fr.remove();
        node.resize(Math.max(n.w || 1, 0.01), Math.max(n.h || 1, 0.01));
        applyVisual(node, n); place(node, n, parent); break;
      }
      case 'I': {
        const comp = await getNode(n.m);
        if (!comp) { errors.push('no master for ' + n.i + ' → ' + n.m); node = figma.createFrame(); node.fills = []; insert(parent, node, index); node.resize(Math.max(n.w || 1, 0.01), Math.max(n.h || 1, 0.01)); place(node, n, parent); break; }
        node = comp.createInstance(); insert(parent, node, index);
        if (n.wm !== 'hug' || n.hm !== 'hug') try { node.resize(Math.max(n.w ?? node.width, 0.01), Math.max(n.h ?? node.height, 0.01)); } catch (e) {}
        place(node, n, parent);
        await applyOverride(node, n, true);
        for (const op of n.ops || []) {
          let t = node; for (const i of op.path) t = t && t.children ? t.children[i] : null;
          if (!t) { errors.push('op path ' + n.i + ' ' + op.path.join('.')); continue; }
          try {
            if (op.swap) { const c = await getNode(op.swap); if (c && t.type === 'INSTANCE') t.swapComponent(c); }
            await applyOverride(t, op, false);
          } catch (e) { errors.push('op ' + n.i + ' ' + op.path.join('.') + ': ' + e.message); }
        }
        break;
      }
      default: { // F, C, G, M, P
        node = n.k === 'C' ? figma.createComponent() : figma.createFrame();
        insert(parent, node, index);
        node.fills = [];
        node.clipsContent = false;
        node.resize(Math.max(n.w || 1, 0.01), Math.max(n.h || 1, 0.01));
        if (n.k !== 'P') { applyVisual(node, n); applyLayout(node, n); }
        place(node, n, parent);
        for (const c of n.c || []) await build(c, node);
        if ((n.k === 'G' || n.k === 'M') && node.children.length) {
          const kids = [...node.children];
          if (n.k === 'M') { const m = kids[kids.length - 1]; m.isMask = true; node.insertChild(0, m); }
          const idx = parent.children.indexOf(node);
          const g = figma.group([...node.children], parent, idx);
          g.name = n.n || (n.k === 'M' ? 'Mask' : 'Group');
          if (n.hid) g.visible = false;
          node.remove(); node = g;
        }
      }
    }
    if (n.n !== undefined && node.type !== 'GROUP') node.name = n.k === 'P' ? '⟨pending⟩ ' + n.n : (n.vn && n.k === 'C' ? n.vn : n.n);
    if (n.k === 'C' && n.vn) node.name = n.vn;
    if (n.keep || n.k === 'C' || n.k === 'P') map[n.i] = node.id;
  } catch (e) { errors.push('build ' + n.i + ' (' + n.k + ' ' + (n.n || '') + '): ' + e.message); }
  return node;
}

async function applyOverride(node, o, isRoot) {
  if (o.tx && node.type === 'TEXT') await applyText(node, o, false);
  applyVisual(node, o);
  if (o.al && 'layoutMode' in node && node.layoutMode !== 'NONE') {
    const a = o.al; node.itemSpacing = a.g; [node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft] = a.pad.map((v) => Math.max(0, v || 0));
    node.primaryAxisAlignItems = a.pr; node.counterAxisAlignItems = a.cr;
  }
  if (!isRoot && (o.w !== undefined || o.h !== undefined)) {
    const p = node.parent; const inAL = p && 'layoutMode' in p && p.layoutMode !== 'NONE';
    if (o.wm === 'fixed' || o.hm === 'fixed') try { node.resize(Math.max(o.w ?? node.width, 0.01), Math.max(o.h ?? node.height, 0.01)); } catch (e) {}
    if (inAL) { try { if (o.wm) node.layoutSizingHorizontal = o.wm === 'fill' ? 'FILL' : o.wm === 'hug' ? 'HUG' : 'FIXED'; } catch (e) {} try { if (o.hm) node.layoutSizingVertical = o.hm === 'fill' ? 'FILL' : o.hm === 'hug' ? 'HUG' : 'FIXED'; } catch (e) {} }
  }
  if (!isRoot && o.x !== undefined) try { node.x = o.x; node.y = o.y; } catch (e) {}
}

// ── jobs ──────────────────────────────────────────────────────────────────────────────────────────────
async function pageNamed(name) {
  let p = figma.root.children.find((x) => x.name === name);
  if (!p) { p = figma.createPage(); p.name = name; }
  return p;
}

async function runJob(job) {
  if (job.t === 'page') { const p = await pageNamed(job.name); map['page:' + job.name] = p.id; return 'page'; }
  if (job.t === 'build') {
    const parent = job.parent.startsWith('page:') ? await figma.getNodeByIdAsync(map[job.parent]) : await getNode(job.parent);
    if (!parent) { errors.push('no parent ' + job.parent); return; }
    let index;
    if (job.replace) { const ph = await getNode(job.replace); if (ph) { index = ph.parent.children.indexOf(ph); const n = await build(job.node, ph.parent, index); if (n) ph.remove(); return; } }
    await build(job.node, parent, job.index);
    return;
  }
  if (job.t === 'combine') {
    const ph = await getNode(job.replace);
    const comps = []; for (const b of job.variants) { const c = await getNode(b); if (c) comps.push(c); }
    const parent = ph.parent, idx = parent.children.indexOf(ph);
    const set = figma.combineAsVariants(comps, parent, idx);
    const n = job.node; set.name = n.n;
    set.fills = []; applyVisual(set, n);
    set.resize(Math.max(n.w || 1, 1), Math.max(n.h || 1, 1));
    for (const v of job.pos) { const c = await getNode(v.i); if (c) { c.x = v.x; c.y = v.y; } }
    place(set, n, parent);
    if (n.desc) set.description = n.desc;
    map[n.i] = set.id; ph.remove();
    return;
  }
  if (job.t === 'tokens') return await tokens(job);
  if (job.t === 'hashes') {
    const ap = await figma.getNodeByIdAsync(ctx.assetsPage); await ap.loadAsync();
    state.hashes = state.hashes || {};
    for (const r of ap.children) if (r.name.startsWith('img:') && r.fills && r.fills[0] && r.fills[0].imageHash) state.hashes[r.name.slice(4)] = r.fills[0].imageHash;
    Object.assign(hashes, state.hashes);
    return 'hashes ' + Object.keys(state.hashes).length;
  }
  if (job.t === 'describe') { for (const [bid, d] of job.items) { const c = await getNode(bid); if (c && (c.type === 'COMPONENT_SET' || c.type === 'COMPONENT')) c.description = d; } return; }
}

async function tokens(job) {
  let col = (await figma.variables.getLocalVariableCollectionsAsync()).find((c) => c.name === job.collection);
  if (!col) col = figma.variables.createVariableCollection(job.collection);
  const mode = col.modes[0].modeId; col.renameMode(mode, 'Default');
  const existing = {}; for (const v of await figma.variables.getLocalVariablesAsync()) if (v.variableCollectionId === col.id) existing[v.name] = v;
  const made = {};
  for (const t of job.vars) {
    const v = existing[t.name] || figma.variables.createVariable(t.name, col, t.type);
    v.scopes = t.scopes; if (t.hidden) v.hiddenFromPublishing = true; if (t.desc) v.description = t.desc;
    v.setValueForMode(mode, t.value); made[t.name] = v; varByName[t.name] = v;
  }
  for (const t of job.vars) if (t.alias && made[t.alias]) made[t.name].setValueForMode(mode, { type: 'VARIABLE_ALIAS', id: made[t.alias].id });
  for (const s of job.textStyles) {
    const st = styleByName[s.name] || figma.createTextStyle(); st.name = s.name;
    st.fontName = await font(s.fam, s.w); st.fontSize = s.sz;
    st.lineHeight = { unit: 'PERCENT', value: Math.round(s.lh * 10000) / 100 }; st.letterSpacing = { unit: 'PERCENT', value: Math.round(s.ls * 10000) / 100 };
    if (s.desc) st.description = s.desc; styleByName[s.name] = st;
  }
  const effects = {}; for (const e of await figma.getLocalEffectStylesAsync()) effects[e.name] = e;
  for (const e of job.effectStyles) { const st = effects[e.name] || figma.createEffectStyle(); st.name = e.name; st.effects = e.effects; }
  return 'tokens ' + job.vars.length + ' vars, ' + job.textStyles.length + ' text styles';
}

const log = [];
const t0 = Date.now();
while (state.cursor < data.jobs.length) {
  const job = data.jobs[state.cursor];
  if (job.t === 'page' && state.pageSet && state.pageSet !== job.name) break; // one page switch per call
  if (job.t === 'page') { const r = await runJob(job); const p = await figma.getNodeByIdAsync(map['page:' + job.name]); await figma.setCurrentPageAsync(p); state.pageSet = job.name; state.cursor++; continue; }
  if (state.pageSet === undefined && job.page) { const p = await figma.getNodeByIdAsync(map['page:' + job.page]); await figma.setCurrentPageAsync(p); state.pageSet = job.page; }
  if (job.page && state.pageSet !== job.page) break;
  const r = await runJob(job); if (r) log.push(r);
  state.cursor++;
  if (Date.now() - t0 > ctx.budget) break;
}
delete state.pageSet;
return { cursor: state.cursor, total: data.jobs.length, ms: Date.now() - t0, log, errors: errors.length };
