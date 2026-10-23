# Brilliant → Figma sync

One-way push of the Brilliant project "sooner.de rebrand" into the Figma file as `brilliant-*` pages
(Brilliant is the source of truth; the Brilliant Figma plugin only imports Figma → Brilliant).

1. Read each canvas through the Brilliant MCP with `expandInstances: true` and save the reads to `data/`
   (`components.x.bl`, `ds.x.bl`, `screens.x.bl`), plus `Styles/default.ds` → `data/default.ds` and full
   geometry for summarized vectors → `data/full-vectors.bl`.
2. `node gen.mjs` converts them (parse → IR → jobs) and packs `runtime.js` + jobs into `out/payload.png`
   (bytes stored in an uncompressed PNG so the plugin can read them back with `getBytesAsync`).
3. Upload `out/payload.png` (and any new images) to the holders on the `brilliant-assets` page via
   `upload_assets` + `node upload.mjs out/uploads.json`.
4. Run `loader.js` through `use_figma` until `cursor === total` (one page per call). State lives in the
   `state` text node on `brilliant-assets`.

What it produces: `brilliant-tokens` variables (with RGBA alpha variants such as `color/surface/glass/10`,
because Figma instances drop paint opacity on variable-bound paints), text and effect styles, every master
as a component or component set, icon glyphs as `Icon/*` components (instance-swappable), and screens built
from instances with only their differences applied as overrides.
