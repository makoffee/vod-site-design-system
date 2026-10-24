# Rules for generated UI

These rules are for people and for agents that compose sooner.de pages from this library. Each component's contract
(description, props, stories) comes from Storybook: MCP at `/mcp`, manifest at `/manifests/components.json`. The
contract says what a component does; this file says how the pieces go together. When a rule and production disagree,
the rule wins: production has drifted, the design has not.

## 1. Build only from the library

- Compose pages from components in `src/components` (exported from `@/components`). Don't recreate a card, button,
  input or row with raw markup when a component exists.
- If nothing fits, stop and ask for a component. Don't improvise one-off styles.
- Style only with theme classes: `bg-black`, `text-white`, `text-white/60`, `bg-white/10`, `border-white/10`,
  `bg-sooner-primary`, `rounded-sooner`, the `text-display-*` / `text-heading-*` / `text-label` type styles and the
  Tailwind spacing scale. No hex values, no `[arbitrary]` colours or sizes.
- `className` on a component is for layout (width, margin, grid placement), never for recolouring it.

## 2. Page anatomy

- Every page is `Header` + content + `Footer`. Logged-in pages (account, watchlist) use the logged-in header
  (`auth="logged-in"`).
- Content sits on black. Section rhythm comes from the components; don't add dividers or background bands between
  feeds.
- Reference compositions live in `src/screens/*.tsx` (Discover, Film, Collection, Search, Account, Watchlist, Landing,
  Auth, Onboarding). Copy their structure before inventing a new one.

## 3. Actions

| Need | Use |
| --- | --- |
| The one main action of a view | `Button variant="cta-primary"` (violet). One per view. |
| Secondary action next to it | `Button variant="cta-ghost"` (glass) |
| Submit on login / signup | `Button variant="cta-white"`, as in `AuthForm` |
| Destructive (delete account) | `Button variant="cta-danger"` |
| Small inline action in a row ("Edit", "Add") | `TextAction`, never an underlined link |
| Icon-only action (add to watchlist, share) | `Button variant="cta-round"` with an `aria-label` |

Never put two violet buttons side by side.

## 4. Surfaces

- **Ghost glass** (`bg-white/10` + blur): controls that sit on content, such as inputs, chips, ghost buttons, filters.
- **Floating glass** (`bg-black/80` + blur): only for layers that content scrolls under (the sticky header, the login
  dialog backdrop).
- **Panels** (`AccountPanel`, white/5 with a white/10 hairline): grouped settings and details on account pages.
- Dark only. There is no light theme.

## 5. Films and feeds

- A feed is `FeedRow` filled with `FilmCard`s (or tiles). Rows show **whole cards only**: never a card cut off at the
  edge.
- Posters keep their ratio: `tall` is 3:4 boxart, `wide` is a 16:9 still. Never stretch or crop to another ratio.
- Film data comes from the catalogue. Never invent titles, directors, years, quotes or availability.
- Grids of saved or listed films (watchlist, collection) use the same `FilmCard` in a grid, not a new card.

## 6. States

Every view that loads data designs four states: loading, content, empty, error. Examples live in Storybook (FeedRow
Loading, EmptyState NoResults / LoadError, Screens Search no results / Not found / Error).

- Loading: keep the layout and show `Skeleton`s in the shape of what's coming (posters stay 3:4 / 16:9). A feed
  uses `FeedRow loading`. Announce "Loading…" once per region (FeedRow does), not per skeleton. No spinners.
- Nothing to show: `EmptyState` (`surface="panel"` inside account pages, `surface="plain"` on a full page), with at
  most one action. Search: "No results for „…“" plus the hint as `description`.
- Failed to load: `EmptyState tone="error"` with production "Something went wrong". It looks as calm as an empty
  state; it is announced as an alert. There is no production retry label yet, so don't invent one: link Home or
  leave the action out.
- Page not found: production "The page could not be found" / "We can't find the page you're looking for", link Home.
- Overflow: long German labels, long e-mails and long titles wrap; one-line elements (Chip) truncate. Never let text
  push a layout wider than its column; check at 393.
- Disabled actions stay visible with their disabled state (for example Save before anything changed). Don't hide them.
- Form errors belong to the field (`TextInput state="error"`), not to a banner.

## 7. Copy and language

- One language per view. A German screen is German from header to footer, an English screen English. Never mix.
- Components have no language of their own: no `locale` prop, no copy tables, no German variants. They take every
  string (or data object, like a plan) as props, with English defaults. German screens pass German strings from
  `src/i18n/de.ts` (for example `{...filmCardDe}`, `labels={headerDe}`) and German plan content from
  `src/content/plans.ts` (`plansDe`).
- Component examples use generic placeholder content ("Film Title", "Director Name", Lorem ipsum). Real content
  belongs to screens and plan blocks only.
- Use real product copy. If the copy doesn't exist yet, leave the component's English default or a clearly marked
  placeholder. Never make up marketing lines, prices or legal text.
- Buttons are short verbs ("Subscribe", "Continue", "Save").

## 8. Layout and responsiveness

- Components are sized by their container (container queries), not the viewport. Give a component a slot with a width
  and let it adapt; don't pass viewport breakpoints into it.
- Designed widths: 1440 desktop, 393 mobile. Check both.
- Content width is capped by the page (`max-w-5xl` for account, full bleed for feeds). Don't let text lines run the
  full 1440.

## 9. Accessibility

- Every interactive element is a real `button`, `a` or form control (the components already are). Keep their labels:
  pass `ariaLabel` / `label` props when the visible text isn't enough.
- Focus rings are white and must stay visible on black. Don't remove outlines.
- Images inside cards are decorative (`alt=""`); the card's accessible name carries the title.
