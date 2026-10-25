# Brilliant → Figma sync

One-way push of the Brilliant project "sooner.de rebrand" into the Figma file's "Design System", "Components" and "Key Screens" pages
(Brilliant is the source of truth; the Brilliant Figma plugin only imports Figma → Brilliant).

1. Read each canvas through the Brilliant MCP with `expandInstances: true` and save the reads to `data/`
   (`components.x.bl`, `ds.x.bl`, `screens.x.bl`), plus `Styles/default.ds` → `data/default.ds` and full
   geometry for summarized vectors → `data/full-vectors.bl`.
2. `node gen.mjs` converts them (parse → IR → jobs) and packs `runtime.js` + jobs into `out/payload.png`
   (bytes stored in an uncompressed PNG so the plugin can read them back with `getBytesAsync`).
3. Upload `out/payload.png` (and any new images) to the holders on the `Assets` page via
   `upload_assets` + `node upload.mjs out/uploads.json`.
4. Run `loader.js` through `use_figma` until `cursor === total` (one page per call). State lives in the
   `state` text node on `Assets`.

What it produces: `Sooner` variables (with RGBA alpha variants such as `color/surface/glass/10`,
because Figma instances drop paint opacity on variable-bound paints), text and effect styles, every master
as a component or component set, icon glyphs as `Icon/*` components (instance-swappable), and screens built
from instances with only their differences applied as overrides.

## Storybook design links

Stories link their Design tab to Figma through `src/figma-nodes.json` (`figmaComponent("Button")`,
`figmaScreen("Discover | desktop")` in `src/components/_shared/figma.ts`). A sync clears and rebuilds the "Components", "Design System" and "Key Screens" pages (names set in `gen.mjs`
PAGES; renaming a page in Figma means updating PAGES first, or the sync builds new pages beside it), so node ids
change: after every sync run `links.js` through `use_figma`, save the returned JSON and run
`node tools/brilliant-figma/write-links.mjs <file>`.
