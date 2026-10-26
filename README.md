# Sooner component library

The React + Tailwind component library behind sooner.de, documented in Storybook and mirrored in Figma.

## Where things live

| | Source of truth for | |
| --- | --- | --- |
| **Code** (`src/components`, `src/app/globals.css`) | Components, props, tokens | What the app and generative-UI tools build with |
| **Storybook** | Component inventory and usage examples | Every component and prop is documented; the contract agents read via Storybook MCP (`/mcp`) and `/manifests/components.json` |
| **Figma** (`uVA7tqdgZDMe6JK3M8AZQb`) | Design: components, key screens, explorations | Pages: Design System, Components, Key Screens, _archive. Edited directly; nothing overwrites it |
| `RULES-GENERATED-UI.md` | How pages are composed | Read it before generating or editing pages |

Code and Figma are linked, not synced: each story's Design tab opens its Figma component or screen
(`src/figma-nodes.json`), and each Figma component's documentation link opens its story. A change to a component is made
in code (with its story) and in the Figma component; a change to a token is made in `globals.css` and in the Figma
"Sooner" variables.

Copy: components are English-only and take every string as a prop. German UI strings live in `src/i18n/de.ts`, plan
copy in `src/content/plans.ts`, production content in `src/content/*` (passed in by the app routes). Storybook shows
placeholder content only.

## Commands

```bash
npm run storybook        # Storybook on :6006
npm run dev              # the app (German routes, /en for English) on :3000
npx vitest run --project=storybook   # story tests (render, interactions, a11y)
npm run build-storybook  # static Storybook (deployed to GitHub Pages on push to main)
```

## Figma links

When Figma components or key-screen frames are added or renamed, refresh `src/figma-nodes.json`: run
`scripts/figma/links.js` as Figma plugin code (e.g. through the Figma MCP `use_figma` tool), save the returned JSON, then
`node scripts/figma/write-links.mjs <file>`.

## Storybook links in Figma

Every Figma component's documentation link opens its story on the hosted Storybook
(https://makoffee.github.io/vod-site-design-system, deployed by GitHub Pages on push to `main`). It shows in the
component's properties in design mode and in Dev Mode. To refresh after adding components or renaming stories:
`node scripts/figma/story-links.mjs > links.json`, then run `scripts/figma/set-story-links.js` as Figma plugin code with
those links.
