// Rebind legacy token aliases to their canonical names (values are identical, so nothing moves).
// Usage: node rebind.mjs <compact read file> > out/rebind-<canvas>.bl
import fs from 'fs';
import { splitTop } from './tokenize.mjs';

export const MAP = {
  'spacing.space.8': 'spacing.sm', 'spacing.space.12': 'spacing.md', 'spacing.space.16': 'spacing.lg', 'spacing.space.24': 'spacing.xl',
  'radius.4': 'radius.sm', 'radius.8': 'radius.lg', 'radius.10': 'radius.sooner', 'radius.12': 'radius.xl', 'radius.16': 'radius.2xl', 'radius.24': 'radius.3xl',
  'color.neutral.black': 'color.black', 'color.neutral.white': 'color.white', 'color.neutral.100': 'color.gray.100', 'color.neutral.200': 'color.gray.200',
  'color.purple.deep': 'color.surface.uni',
};
const re = new RegExp('(\\$|tok\\()(' + Object.keys(MAP).map((k) => k.replace(/\./g, '\\.')).join('|') + ')(?![\\w.-])', 'g');
const fix = (s) => s.replace(re, (m, pre, name) => pre + MAP[name]);

const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n');
const out = []; const stack = [];
for (const raw of lines) {
  if (!raw.trim() || raw.startsWith('```') || raw.startsWith('file(') || raw.trim().startsWith('#')) continue;
  const depth = raw.match(/^ */)[0].length / 2; const t = raw.trim();
  while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
  const toks = splitTop(t);
  const id = /^[0-9a-f]{16}$/.test(toks[0]) ? toks[0] : null;
  if (re.test(t)) {
    re.lastIndex = 0;
    const changed = toks.slice(1).filter((x) => { const r = re.test(x); re.lastIndex = 0; return r; }).map(fix);
    if (id) out.push(`${id} ${changed.join(' ')}`);
    else if (toks[0].startsWith('override(')) {
      const inst = [...stack].reverse().find((s) => s.id && s.inst);
      out.push(`${inst.id}\n  ${toks[0]} ${changed.join(' ')}`);
    }
  }
  re.lastIndex = 0;
  stack.push({ depth, id, inst: toks.some((x) => x.startsWith('inst(')) });
}
console.log(out.join('\n'));
