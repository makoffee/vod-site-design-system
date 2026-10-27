# Backlog

Tickets for the Linear project "Sooner Design System". After import, delete this file so the backlog lives in one place.

Labels: `figma`, `code`, `storybook`, `i18n`, `genui`, `handoff`, `decision` · Priority: P1 next, P2 soon, P3 later.

Figma file: [Sooner Design System v2](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2) ·
Storybook: [makoffee.github.io/vod-site-design-system](https://makoffee.github.io/vod-site-design-system)

---

### 1. Designed states in Figma: loading, empty, error, not found
`figma` `genui` · P1
Code and Storybook define these states; Figma does not yet.
- [ ] Skeleton component (poster-tall, poster-wide, square, text, circle)
- [ ] FeedRow `loading` variant, whole cards in the row's aspect
- [ ] EmptyState `tone=error` and description line
- [ ] Key Screens: Search no results, Not found, Error (EN and DE)

Links: [FeedRow](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-29212) ·
[EmptyState](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-31444) ·
[Storybook: FeedRow loading](https://makoffee.github.io/vod-site-design-system/?path=/story/feeds-feedrow--loading)
Usage: generated UI uses these states instead of ad-hoc spinners or blank areas; designers and agents pick them like
any other variant.

### 2. Code Connect mapping
`genui` `handoff` `decision` · P2
Show the real component and props in Figma Dev Mode, and give AI tools reading Figma the actual code.
- [ ] Decide the target codebase (this library or the product codebase)
- [ ] Map each Figma component and its properties to the code component and props
- [ ] Confirm the Figma plan supports Code Connect

Usage: a developer or agent inspecting a Figma component gets a ready import and prop set instead of generated CSS.

### 3. Evaluation prompts for generated UI
`genui` · P2
A small test set that checks agents compose pages from the library correctly.
- [ ] 8–10 prompts (pages, states, actions, language)
- [ ] Expected components and props per prompt
- [ ] Run against Storybook MCP; fix gaps in component descriptions or `RULES-GENERATED-UI.md`

Usage: re-run after component or rule changes to catch regressions in AI output.

### 4. Approve proposed German UI strings
`i18n` · P1
15 UI labels use proposed German in `proposedDe` (`src/i18n/de.ts`): Collections, Magazine, All, Exclusive, Synopsis,
Casting, Festivals & Awards, Quotes and reviews, Show less, Grid view, List view, Clear search, Help & Support, Press,
Cookie Policy.
- [ ] Approve or replace each string
- [ ] Apply in `src/i18n/de.ts` and the DE frames in Figma

Usage: components take every string as a prop; this file is the single German source for all platforms.

### 5. German string for the device pairing hint
`i18n` · P2
"Enter the code shown on your TV or device." has no German yet.
- [ ] Add `accountDe.devicesHint` and update the DE Devices frames

Links: [Account · Devices | DE | desktop](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-50539) ·
[mobile](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-50642)

### 6. One German term for the empty watchlist
`i18n` · P3
Two variants exist ("Deine Watchlist ist leer", "Ihre Merkliste ist leer"). Pick one form of address and one term,
apply in code and Figma.

### 7. Align the DE landing hero label
`i18n` `decision` · P3
Figma and code use different labels for the first hero action. Pick one and apply in both.

Links: [Landing Page | DE | desktop](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-33278)

### 8. Localized app-store badges
`figma` `code` `i18n` · P2
The badge set is German only. Add EN and DE variants (official badge artwork) to AppLogos and to
`public/images/apps/`, selected by the screen's language.

Links: [AppLogos](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-30366) ·
[Landing Page | EN | desktop](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-34444)

### 9. PlanCard tag fits on narrow cards
`figma` · P3
On narrow cards the plan tag clips at the card edge because the plan name has a fixed width. Make the name fill and
let the tag wrap or shrink.

Links: [PlanCard](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-28085) ·
[Landing Page (v1) | DE | mobile](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-36040)

### 10. UniOffer emphasis follows its text
`figma` · P3
The bold emphasis range in the DE text ends mid-word. Make the emphasized part its own text run or prop so it
follows any language.

Links: [UniOffer](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-28108) ·
[Plan Select | DE | desktop](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-37284)

### 11. EditorialContent action as a Button instance
`figma` · P3
Its action is a hand-built frame. Replace with Button `cta-black` and use the Button icon picker for the optional
icon.

Links: [EditorialContent](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-29416) ·
[Button](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-27490)
Usage: one Button definition for every action keeps props, states and icons consistent for agents and devs.

### 12. Compact Button size
`figma` `code` `decision` · P3
FeaturedFilmCard actions use a 36px non-uppercase style that no Button size covers. Decide: add a Button size or
keep the style local to the component.

Links: [FeaturedFilmCard](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-28958) ·
[Storybook: Button](https://makoffee.github.io/vod-site-design-system/?path=/story/components-button--primary-md-default)

### 13. Round Button icon sizes
`figma` `code` · P3
Round buttons use 20, 24 and 32px icons in different places; the Figma slot is 24. Decide whether to add an icon
size property.

### 14. CollectionHeader tablet ratio
`figma` `code` `decision` · P3
Code uses 6:7 below 672px, 2:1 from 672px, 3:1 from 1024px. Confirm the tablet ratio and add a tablet variant in
Figma if needed.

Links: [CollectionHeader](https://www.figma.com/design/uVA7tqdgZDMe6JK3M8AZQb/Sooner-Design-System-v2?node-id=2721-29935) ·
[Storybook](https://makoffee.github.io/vod-site-design-system/?path=/story/collections-collectionheader--default)

### 15. Keep Storybook and Figma links current
`storybook` `handoff` · P2
- [ ] Deploy Storybook after merges to `main` (GitHub Pages)
- [ ] After adding or renaming components or frames: refresh `src/figma-nodes.json` and the Figma documentation links
  (see README "Storybook links in Figma")

Usage: every Figma component opens its story, and every story opens its Figma component.
