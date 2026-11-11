# Evaluation prompts for generated UI

A small, tool-independent test set: does an AI tool compose sooner.de views correctly from this library? Give the tool
only the **Prompt** (plus access to `RULES-GENERATED-UI.md` and the component contracts from Storybook MCP `/mcp` or
`/manifests/components.json`), then check its output against **Expected** and **Fails if**. Re-run after any component
or rule change.

Scoring per prompt: pass = every Expected item present and no Fails-if item; partial = one Expected item missing; fail
otherwise.

---

## 1. Discover page, English

**Prompt:** Build the English Discover page: a promo at the top, then three film rows (tall posters, wide stills, tall
posters).

**Expected**
- `Header` (`active="discover"`) + content + `Footer`
- `PromoHero` at the top
- Three `FeedRow`s, `kind="tall" | "wide" | "tall"`, each filled with `FilmCard`s of the matching `aspect`
- Placeholder or catalogue film data only

**Fails if:** cards are raw markup; a row is sized so a card is cut off at the edge; posters use any ratio other than
3:4 / 16:9; titles or directors are invented.

## 2. Discover page loading

**Prompt:** Show the Discover page while its rows are still loading.

**Expected**
- Same anatomy as prompt 1
- Each row is `FeedRow loading` with the row's `kind` (whole skeleton cards in the row's ratio)
- One "Loading…" announcement per row (FeedRow's own), none per skeleton

**Fails if:** a spinner; blank areas; skeletons in a different ratio from the cards they replace.

## 3. Film page, German

**Prompt:** Build the German film page for a film from the catalogue: hero with subscribe, rent and trailer, the
details, and a "Featured in" row.

**Expected**
- `Header labels={headerDe}`, `Footer {...footerDe}`
- `FilmHero {...filmHeroDe}` (one `cta-primary` action; watchlist and share as `cta-round` with labels)
- `FilmDetails {...filmDetailsDe}`
- `FeedRow` with the German row title from the catalogue (`getCatalog("de")`)
- Every visible string German

**Fails if:** any English string on the page (e.g. "Synopsis", "Add to Watchlist"); two violet buttons side by side;
German passed through a `locale` prop on a component.

## 4. Search with no results, German

**Prompt:** The German search page after a search for „Xyzzy" found nothing.

**Expected**
- `SearchField {...searchDe}` with the query
- `EmptyState surface="plain"`, `message` "Keine Ergebnisse für „Xyzzy“", `description` from `searchResultsDe.noResultsHint`
- At most one action

**Fails if:** the hint is put in the message; a made-up suggestion list; "Sie" mixed with "du".

## 5. Watchlist, empty and full

**Prompt:** Build the German watchlist page in both states: empty, and with six saved films.

**Expected**
- Logged-in header (`auth="logged-in"`, `active="watchlist"`)
- Title from `watchlistDe.title` ("Merkliste")
- Empty: `EmptyState surface="plain"`, message "Deine Merkliste ist leer"
- Full: `FilmCard`s in the collection grid (same card as the rows)

**Fails if:** a new card component for the grid; "Watchlist", "Meine Liste" or "Merkliste" mixed in one view.

## 6. Account settings

**Prompt:** Build the English account settings page with the language setting, the newsletter switch and a Save
button that only enables after a change.

**Expected**
- Logged-in header, `AccountNav` with `settings` active
- `AccountPanel` holding `SettingRow`s; the newsletter control is a `Switch`
- Save is a `Button` with the disabled state until something changes (visible, not hidden)
- Content capped (`max-w-5xl`)

**Fails if:** settings in raw divs with custom borders; Save hidden instead of disabled; a banner for form errors.

## 7. Delete account

**Prompt:** Add a "Delete account" action to the English profile page.

**Expected**
- `Button variant="cta-danger"` inside the profile `AccountPanel`
- Other inline actions stay `TextAction`

**Fails if:** a red text link; a second destructive style; an invented confirmation text.

## 8. A failed load

**Prompt:** The collection page couldn't load its films. Show that.

**Expected**
- Page anatomy kept (header, collection header if it loaded, footer)
- `EmptyState tone="error"`, message "Something went wrong"
- Action links Home or is left out

**Fails if:** an invented "Try again" label; a red alert banner; a spinner left on screen.

## 9. Subscribe page, German

**Prompt:** Build the German plan selection page with the student offer.

**Expected**
- `SubscriptionPlans layout="subscribe" {...subscriptionPlansSubscribeDe}` with `plans={planList(plansDe)}` and
  `uni={uniOfferDe}` from `src/content/plans.ts`
- Legal paragraph from `subscriptionPlansSubscribeDe.legal`

**Fails if:** prices, plan names or legal text written by the tool; English plan copy.

## 10. Pair a TV, German, mobile

**Prompt:** The German devices page at 393px wide, where the user enters the code from their TV.

**Expected**
- Logged-in header, `AccountNav` with `devices` active
- `DeviceCodeForm` with `accountDe.devicesTitle`, `devicesHint`, `devicesPlaceholder`, `devicesSubmit`
- Nothing wider than the 393 column; long labels wrap

**Fails if:** the English hint "Enter the code shown on your TV or device." appears; fixed widths that overflow at 393.

---

## Results

| Run | Date | Tool | Pass | Partial | Fail | Gaps closed |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 2026-11-11 | Claude agent (repo access, no answer key) | 9 | 1 (3: price label format guessed) | 0 | Rules: AppShell/PageTitle and the film grid named; default language English; rent price format. `de.ts`: one source for the German no-results strings. |

Open gaps from run 1 that need component work: PromoHero has no loading state; DeviceCodeForm has no error state; two
violet plan CTAs side by side in SubscriptionPlans; no confirm dialog for destructive actions.
