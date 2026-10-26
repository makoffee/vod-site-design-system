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
(`src/figma-nodes.json`), and Storybook Connect shows the live story inside Figma. A change to a component is made
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
npm run build-storybook  # static Storybook (deployed to GitHub Pages and Chromatic on push to main)
```

## Figma links

When Figma components or key-screen frames are added or renamed, refresh `src/figma-nodes.json`: run
`scripts/figma/links.js` as Figma plugin code (e.g. through the Figma MCP `use_figma` tool), save the returned JSON, then
`node scripts/figma/write-links.mjs <file>`.

## Storybook in Figma (Storybook Connect)

The Storybook is published to Chromatic on every push to `main` (`.github/workflows/chromatic.yml`), and the
Storybook Connect plugin in Figma links each Figma component to its live story.

1. Create a Chromatic project from this GitHub repo (chromatic.com, sign in with GitHub) and copy its project token.
2. Add it as the repository secret `CHROMATIC_PROJECT_TOKEN` (GitHub → Settings → Secrets and variables → Actions),
   then push or run the "Publish Storybook to Chromatic" workflow.
3. List the links: `node scripts/storybook-connect-links.mjs <appId>` (the `appId` is in the Chromatic project URL;
   the Storybook dev server must be running for the story index).
4. In Figma, select a component, run Storybook Connect and paste its story URL from the list.
