// Builds design-review/index.html: design PNG (Brilliant export) next to the Storybook capture,
// grouped per component, with the notes in design-review/notes.json.
// Run scripts/capture-stories.mjs first.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "design-review");
const sizes = JSON.parse(readFileSync(join(dir, "sizes.json"), "utf8"));
const notesFile = join(dir, "notes.json");
const notes = existsSync(notesFile) ? JSON.parse(readFileSync(notesFile, "utf8")) : { components: {}, decisions: [], gaps: [] };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const groups = {};
for (const id of Object.keys(sizes).sort()) {
  const m = id.match(/^(?:components|feeds|discover|film|collections|search)-([^-]+)--(.+)$/);
  if (!m) continue; // screens / boards are references only
  const [, comp, variant] = m;
  (groups[comp] ??= []).push({ id, variant });
}

const section = (comp) => {
  const n = notes.components[comp] ?? {};
  const rows = groups[comp]
    .map(({ id, variant }) => {
      const s = sizes[id];
      const delta = `${s.design.w / 2}×${s.design.h / 2} → ${s.story.w / 2}×${s.story.h / 2}`;
      const vn = n.variants?.[variant];
      return `<tr>
  <th scope="row">${esc(variant)}<span class="dim">${delta} px</span>${vn ? `<p class="vnote">${esc(vn)}</p>` : ""}</th>
  <td><img loading="lazy" src="../design-refs/${id}.png" alt="Design: ${esc(comp)} ${esc(variant)}"></td>
  <td><img loading="lazy" src="story/${id}.png" alt="Storybook: ${esc(comp)} ${esc(variant)}"></td>
</tr>`;
    })
    .join("\n");
  const list = (title, items) =>
    items?.length ? `<h3>${title}</h3><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";
  return `<section id="${comp}">
<h2>${esc(n.title ?? comp)} <span class="status ${n.status ?? ""}">${esc(n.status ?? "")}</span></h2>
${n.summary ? `<p>${esc(n.summary)}</p>` : ""}
<div class="notes">${list("Differences", n.differences)}${list("Fixed in this pass", n.fixed)}</div>
<table><thead><tr><th>Variant</th><th>Design (Brilliant)</th><th>Storybook</th></tr></thead><tbody>
${rows}
</tbody></table></section>`;
};

const order = [...new Set([...(notes.order ?? []), ...Object.keys(groups).sort()])];
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Design vs Storybook</title>
<style>
:root{color-scheme:dark;--bg:#111;--panel:#1e1e1e;--line:#333;--text:#eee;--muted:#999;--ok:#05df72;--warn:#fac800;--bad:#ff6568}
body{margin:0;background:var(--bg);color:var(--text);font:14px/1.5 system-ui,sans-serif}
header,main{max-width:1500px;margin:0 auto;padding:16px}
nav{display:flex;flex-wrap:wrap;gap:8px}nav a{color:var(--text);background:var(--panel);padding:4px 10px;border-radius:999px;text-decoration:none}
h2{margin-top:48px;border-bottom:1px solid var(--line);padding-bottom:8px}h3{font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin:16px 0 4px}
.status{font-size:12px;padding:2px 8px;border-radius:999px;background:var(--panel);vertical-align:middle}
.status.match{color:var(--ok)}.status.close{color:var(--warn)}.status.differs{color:var(--bad)}
.notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px}
table{width:100%;border-collapse:collapse;margin-top:16px;table-layout:fixed}
th,td{border-top:1px solid var(--line);padding:12px;vertical-align:top;text-align:left}
thead th{color:var(--muted);font-weight:500}tbody th{width:220px;font-weight:600}
.dim{display:block;color:var(--muted);font-weight:400;font-size:12px}.vnote{font-weight:400;color:var(--warn);font-size:12px}
td img{max-width:100%;height:auto;background:#1e1e1e;image-rendering:auto}
.lists{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:24px}
@media (max-width:700px){tbody th{width:auto}table,thead,tbody,tr,th,td{display:block}}
</style></head><body>
<header><h1>Design vs Storybook</h1>
<p>Left: PNG exported from the Brilliant master (scale 2, window background). Right: the matching Storybook story captured at 2× on the app's black canvas. Sizes are in CSS px.</p>
<nav>${order.map((c) => `<a href="#${c}">${esc(notes.components[c]?.title ?? c)}</a>`).join("")}<a href="#decisions">Decisions</a></nav></header>
<main>
<section id="decisions" class="lists">
<div><h2>Needs a decision</h2><ul>${notes.decisions.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
<div><h2>Design gaps (fixed in code, flagged for the design)</h2><ul>${notes.gaps.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
</section>
${order.filter((c) => groups[c]).map(section).join("\n")}
</main></body></html>`;

writeFileSync(join(dir, "index.html"), html);
console.log("wrote design-review/index.html");
