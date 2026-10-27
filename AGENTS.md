<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Current state of this project

- This is the sooner.de component library: React + Tailwind v4 components and tokens (`src/components`,
  `src/app/globals.css`) are the source of truth. Storybook documents them; read the component contract from
  Storybook MCP (`/mcp`) or `/manifests/components.json` rather than reading source or screenshots.
- Figma (file `uVA7tqdgZDMe6JK3M8AZQb`, "Sooner Design System v2") is edited directly and mirrors the components;
  icons are Lucide (same names as `lucide-react`) plus the Sooner basket and binocular. There is no design-tool sync.
- Components are English-only and take every string as a prop; German lives in `src/i18n/de.ts`, plan copy in
  `src/content/plans.ts`, production content in `src/content/*`. Storybook shows placeholder content only.
- Never mix languages in one view. Rows show whole cards only; posters keep 3:4 / 16:9.
- Work items live in Linear (EYZ Media team, project "Sooner Design System"), not in chat history or repo files.

## Composing UI from this library

Before generating or editing pages, read `RULES-GENERATED-UI.md` (composition, actions, surfaces, states, language)
and the component contracts from Storybook MCP (`/mcp`) or `/manifests/components.json`.
