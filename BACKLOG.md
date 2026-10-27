# Backlog

Open design-system work, written as Linear tickets. When the Linear MCP is approved, import these (one issue each,
labels as listed), then delete this file so the backlog lives in one place.

Labels: `figma`, `code`, `storybook`, `copy`, `genui`, `handoff`, `decision`. Priority: P1 (next), P2 (soon), P3 (later).

---

## Generative UI

### Designed states in Figma (loading, empty, error, not found)
`figma` `genui` · P1
Code and Storybook have them (Skeleton, FeedRow loading, EmptyState no-results / error, the 404 and error pages);
Figma doesn't.
- [ ] Skeleton component (poster-tall, poster-wide, square, text, circle) on the Components page
- [ ] FeedRow loading variant (skeleton cards in the row's shape, whole cards only)
- [ ] EmptyState: tone error + description line (no-results hint)
- [ ] Key Screens: Search no results, Not found, Error (EN; DE beside each)

### Code Connect
`genui` `handoff` `decision` · P2
Maps each Figma component to the real code in Dev Mode, so AI tools reading Figma use real components and props.
Blocked on one answer from the devs: **which component library does your generative-UI setup generate into?**
- [ ] Get the devs' answer
- [ ] If this library: Code Connect for every component (CLI files in the repo or Figma UI); check Figma plan supports it
- [ ] If their own repo: hand them the mapping list (Figma component ↔ props) and the story links

### Evaluation prompts for generated UI
`genui` · P2
A small set of prompts ("build a collection page with…", "add a rental row…") with expected component usage, to test
that agents follow RULES-GENERATED-UI.md and the component contracts.
- [ ] 8–10 prompts covering pages, states, language, actions
- [ ] Expected output per prompt (components, props, no raw markup, one language)
- [ ] Run against Storybook MCP and note failures to fix in the contracts

---

## Copy

### Review the proposed German UI strings
`copy` · P1
15 labels had no production German; proposals live in `proposedDe` in `src/i18n/de.ts` (Kollektionen, Magazin,
Alle, Exklusiv, Inhalt, Besetzung, Festivals & Preise, Pressestimmen, Zeig weniger, Rasteransicht, Listenansicht,
Suche löschen, Hilfe & Support, Presse, Cookie-Richtlinie). The Figma DE screens use the same strings.
- [ ] Copy team approves or replaces each string
- [ ] Update `src/i18n/de.ts` and the Figma DE screens together

### German devices hint
`copy` · P2
"Enter the code shown on your TV or device." is still English on the German Devices screens (production has no
German).
- [ ] German string from the copy team; update `accountDe.devicesHint` and the two Figma DE Devices frames

### German watchlist empty text
`copy` · P3
Code says "Deine Watchlist ist leer" (production capture); the production strings file says "Ihre Merkliste ist
leer". Pick one tone (du/Sie) and term.

### Landing DE hero label mismatch
`copy` `decision` · P3
Figma Landing DE desktop: "Kino-Highlights entdecken"; code: "Cinema Highlights". Choose one and align both.

---

## Figma

### English app-store badges on the English Landing
`figma` `code` · P2
The devices block shows the German badges ("Laden auf Apple TV", "Jetzt bei Google Play", "Laden im App Store").
- [ ] Add the official English badge files to `public/images/apps/` and the Figma AppLogos component (EN version)

### "BESTER PREIS" tag clips on Landing Page (v1) DE mobile
`figma` · P3
The yearly plan card's tag is cut at the card edge; cause is the plan name's fixed 237px width, not the copy.

### UNI box bold highlight stops mid-word (DE)
`figma` · P3
On Landing DE and Plan Select DE the bold run covers "7 Tage k" (left over from the English text length).

### EditorialContent CTA as a Button instance
`figma` · P3
Its black CTA is hand-built because it can carry a Spotify icon. Button now has an icon picker, so it can become a
Button cta-black instance with the Spotify mark in the icon slot.

### FeaturedFilmCard compact actions
`figma` `code` `decision` · P3
Subscribe / Rent / Watchlist on the white card are a compact 36px, non-uppercase style that no Button variant
matches. Decide: a Button "compact" size, or keep them component-specific.

### Round-button icon sizes
`figma` · P3
The cta-round icon slot is 24 (plus, share in code); code shows mute at 20 and an empty round button's play at 32.
Decide whether the slot needs a size variant.

---

## Code / Storybook

### Confirm the CollectionHeader tablet ratio
`code` `decision` · P3
Design defines 3:1 desktop and 6:7 mobile; code adds 2:1 between 672 and 1024px so the copy and filters fit.
Confirm or set another ratio, then add a tablet variant in Figma if wanted.

### Deploy the hosted Storybook
`storybook` · P1
Push `main` so GitHub Pages rebuilds; the hosted Storybook's Figma links (and the Figma documentation links to new
stories such as Button cta-black and Plan Select) only work after that.
