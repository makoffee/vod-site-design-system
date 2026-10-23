// Blueprint line tokenizer: splits a row into top-level tokens (paren/bracket/quote aware).
export function splitTop(s, sep = ' ') {
  const out = []; let depth = 0, q = false, cur = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) { cur += ch; if (ch === '\\') { cur += s[++i] ?? ''; continue; } if (ch === '"') q = false; continue; }
    if (ch === '"') { q = true; cur += ch; continue; }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    if (ch === ')' || ch === ']' || ch === '}') depth--;
    if (ch === sep && depth === 0) { if (cur || sep === ',') out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  if (cur || (sep === ',' && out.length)) out.push(cur);
  return out;
}
// "name(args)" -> {h:name, a:"args"} ; "name[..]" -> {h:name, b:".."}
export function head(tok) {
  const m = tok.match(/^([^(\[]*)([(\[])([\s\S]*)[)\]]$/);
  if (!m) return { h: tok };
  return m[2] === '(' ? { h: m[1], a: m[3] } : { h: m[1], b: m[3] };
}
