// Pasted as use_figma code: decode the payload PNG on the Assets page, run the runtime, persist state.
const AP = await figma.getNodeByIdAsync('2660:257'); await AP.loadAsync();
const holder = AP.findOne((n) => n.name === 'data:payload');
const bytes = await figma.getImageByHash(holder.fills[0].imageHash).getBytesAsync();
let pos = 8, width = 0; const idat = [];
while (pos < bytes.length) {
  const len = (bytes[pos] << 24) | (bytes[pos + 1] << 16) | (bytes[pos + 2] << 8) | bytes[pos + 3];
  const type = String.fromCharCode(bytes[pos + 4], bytes[pos + 5], bytes[pos + 6], bytes[pos + 7]);
  if (type === 'IHDR') width = (bytes[pos + 8] << 24) | (bytes[pos + 9] << 16) | (bytes[pos + 10] << 8) | bytes[pos + 11];
  if (type === 'IDAT') idat.push(bytes.subarray(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
let total = 0; for (const c of idat) total += c.length;
const z = new Uint8Array(total); let o = 0; for (const c of idat) { z.set(c, o); o += c.length; }
const raw = new Uint8Array(total); let p = 2, r = 0;
for (;;) { const last = z[p] & 1; const n = z[p + 1] | (z[p + 2] << 8); raw.set(z.subarray(p + 5, p + 5 + n), r); r += n; p += 5 + n; if (last) break; }
const data = new Uint8Array(Math.floor(r / (width + 1)) * width);
for (let y = 0, d = 0; (y + 1) * (width + 1) <= r; y++, d += width) data.set(raw.subarray(y * (width + 1) + 1, (y + 1) * (width + 1)), d);
const L = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];
let text = ''; for (let i = 4; i < 4 + L; i += 8192) text += String.fromCharCode.apply(null, data.subarray(i, Math.min(4 + L, i + 8192)));
const payload = JSON.parse(text);
let st = AP.findOne((n) => n.name === 'state' && n.type === 'TEXT');
const state = st ? JSON.parse(st.characters) : { cursor: 0, map: {}, errors: [] };
const before = state.errors.length;
const AF = Object.getPrototypeOf(async function () {}).constructor;
const res = await new AF('figma', 'ctx', payload.runtime)(figma, { data: payload, state, budget: BUDGET, assetsPage: AP.id });
const newErrors = state.errors.slice(before, before + 15);
state.errors = state.errors.slice(-400);
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
if (!st) { st = figma.createText(); AP.appendChild(st); st.name = 'state'; st.x = -400; }
st.characters = JSON.stringify(state);
return { ...res, newErrors };
