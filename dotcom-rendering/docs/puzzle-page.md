# Puzzle Page

## What is implemented

Puzzle Page is a single, generic page template for the Guardian's
**iframe-based** puzzles (sudoku, word games, etc.). **dotcom-rendering
(DCR) owns the whole thing on the rendering side**: the `POST /PuzzlePage`
endpoint, the `PuzzleConfig` registry that decides how each puzzle behaves
and renders, and the `PuzzlePageLayout` layout/styling. The `frontend`
(Play/Scala) repo is responsible for fetching/assembling per-instance
content and POSTing it to this endpoint as JSON — see the `frontend` repo's
`docs/puzzle-page.md` (formerly `docs/game-page.md`; its standalone
`GamePageController` no longer exists either, having been merged into
`PuzzlesPageController` there) for the exact JSON payload it sends and how
to wire up a new puzzle from the content-fetching side.

**Crosswords are explicitly out of scope**, by product decision, and remain
entirely on their existing, separate `/crosswords/*` flow
(`ArticleDesign.Crossword` / `src/layouts/CrosswordLayout.tsx` / the generic
Article pipeline) — that flow is unrelated to Puzzle Page and is not
described further in this file.

Readers reach individual puzzles via `frontend`'s public, top-level URLs —
mirroring how crosswords are already routed — e.g. `/sudoku/easy`,
`/word-wheel`, `/wordiply` (nested only where the puzzle itself has
variants, like sudoku's difficulty levels). This is separate from the
Puzzles Hub (the directory/listing page, unrelated to Puzzle Page), which
stays at `/puzzles-and-games`. None of this is DCR's own routing — it's
`frontend`'s public URL structure, and does not affect DCR's `/PuzzlePage`
endpoint/contract at all; it's mentioned here only so example URLs
elsewhere in this doc stay accurate.

**Access control lives entirely on the `frontend` side, not here.** DCR's
own `/PuzzlePage` endpoint is, and remains, ungated (see "Hitting it
locally" below). `frontend` gates reader access to these routes via its
existing `PuzzlesHubExperiment`/`puzzles-new-hub` AB test before it ever
POSTs to DCR — DCR does not re-implement or duplicate that gating.

### The V0 puzzle set

The `PuzzleConfig` registry (`src/model/puzzles/puzzleConfigs.ts`) currently
contains exactly 6 slugs, all rendered via the generic sandboxed
`PuzzleIframe.island.tsx` component:

| `slug`          | `puzzleGroup`   | provider               |
| --------------- | --------------- | ---------------------- |
| `sudoku-easy`   | `logic-puzzles` | AmuseLabs              |
| `sudoku-medium` | `logic-puzzles` | AmuseLabs              |
| `sudoku-hard`   | `logic-puzzles` | AmuseLabs              |
| `sudoku-killer` | `logic-puzzles` | AmuseLabs              |
| `word-wheel`    | `word-games`    | AmuseLabs              |
| `wordiply`      | `word-games`    | bespoke (wordiply.com) |

Codeword, futoshiki, suguru, and the trivia/quizzes puzzles (on-the-ball,
film-reveal) were removed from the registry for V0 and may return later.
All AmuseLabs-hosted entries share one URL template
(`https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1`),
differing only by the `{slug}` substitution.

### Hitting it locally

Start the dev server (from the `dotcom-rendering` sub-directory):

```
make dev
```

This starts webpack-dev-server on `http://localhost:3030`
(`webpack/webpack.config.dev-server.js`).

There is currently **no AB gate** on this route.
`src/server/handler.puzzlePage.web.ts` validates the body
(`validateAsPuzzlePageType`), looks up the `PuzzleConfig` for the request's
`slug` (`404` if unknown), and renders unconditionally otherwise — no
`serverSideABTests`/participation check of any kind (see "Open questions"
below for the AB-gate/kill-switch situation).

Generate fixture JSON for all 6 slugs using the `tsx` devDependency (no
extra install needed) and `fixtures/manual/puzzlePage.ts`'s
`createPuzzlePage`/`puzzlePageFixtures`:

```
cat > /tmp/dump-puzzle-fixtures.ts <<'EOF'
import * as fs from 'fs';
import { puzzlePageFixtures } from './fixtures/manual/puzzlePage';

fs.mkdirSync('/tmp/puzzle-fixtures', { recursive: true });
for (const [slug, page] of Object.entries(puzzlePageFixtures)) {
	fs.writeFileSync(`/tmp/puzzle-fixtures/${slug}.json`, JSON.stringify(page, null, 2));
}
console.log('wrote', Object.keys(puzzlePageFixtures).length, 'fixtures to /tmp/puzzle-fixtures');
EOF
pnpm exec tsx /tmp/dump-puzzle-fixtures.ts
```

Then hit the route directly. **This is DCR's own local `POST` endpoint, not
a real, browsable end-user URL** — `/PuzzlePage` only accepts `POST`
requests with a JSON body; DCR is not directly browsable by real users
without `frontend` in front of it constructing and sending that body.

| `slug`          | local command                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `sudoku-easy`   | `curl -i -X POST http://localhost:3030/PuzzlePage -H "Content-Type: application/json" --data @/tmp/puzzle-fixtures/sudoku-easy.json`   |
| `sudoku-medium` | `curl -i -X POST http://localhost:3030/PuzzlePage -H "Content-Type: application/json" --data @/tmp/puzzle-fixtures/sudoku-medium.json` |
| `sudoku-hard`   | `curl -i -X POST http://localhost:3030/PuzzlePage -H "Content-Type: application/json" --data @/tmp/puzzle-fixtures/sudoku-hard.json`   |
| `sudoku-killer` | `curl -i -X POST http://localhost:3030/PuzzlePage -H "Content-Type: application/json" --data @/tmp/puzzle-fixtures/sudoku-killer.json` |
| `word-wheel`    | `curl -i -X POST http://localhost:3030/PuzzlePage -H "Content-Type: application/json" --data @/tmp/puzzle-fixtures/word-wheel.json`    |
| `wordiply`      | `curl -i -X POST http://localhost:3030/PuzzlePage -H "Content-Type: application/json" --data @/tmp/puzzle-fixtures/wordiply.json`      |

All six should return `200`, hydrating into a sandboxed iframe pointed at
that slug's resolved provider URL. An unknown slug (or a known slug renamed
to something else in the request body) returns `404`.

### How to configure/add a new puzzle

Both steps are config-only — the layout does not need any changes for a new
iframe-based slug:

1. Add a new key to `src/model/puzzles/puzzleConfigs.ts`'s `puzzleConfigs`
   record (`slug`, `puzzleGroup`, `iframe: { provider, urlTemplate }`,
   `shareEnabled`, `printEnabled`, `hasArchive`, `description`, optional
   `image`). If it's another AmuseLabs-hosted puzzle, reuse the
   `amuseLabsPuzzle(slug, puzzleGroup, description)` helper (note: this
   helper doesn't take `image` — set it afterwards on the returned object
   if/when a real image is available for that puzzle).
   `validatePuzzleConfigs` runs once at module load and throws immediately
   if the entry is malformed (mismatched `slug`, unknown `puzzleGroup`,
   empty `iframe.provider`/`iframe.urlTemplate`, empty `description`, or a
   present-but-empty `image`).
   **Write real, distinct, human-quality copy for `description`** — it
   becomes the page's `<meta name="description">` and its derived Open
   Graph/Twitter description (see "SEO" below); don't copy-paste one
   template string across entries with only the slug swapped in.
2. Nothing else changes on the DCR side: `PuzzlePageLayout.tsx`'s
   `PuzzlePageContent` unconditionally renders `PuzzleIframe` pointed at
   `resolveIframeUrl(puzzleConfig)` for every registry entry. The only thing
   needed from `frontend` is a request whose `slug` matches the new
   registry key exactly (see the `frontend` repo's `docs/puzzle-page.md`).

### SEO: meta description, Open Graph, Twitter card

Each `PuzzleConfig` entry carries a curated `description` (a short,
genuinely-written meta description, distinct per puzzle — see step 1
above) and an optional `image` (a full preview/share image URL).
`render.puzzlePage.web.tsx` derives the page's SEO metadata from these via
a small, pure, directly-unit-tested function,
`buildPuzzlePageMetaData(webTitle, puzzleConfig)`
(`src/server/render.puzzlePage.web.test.ts`):

- The page's `<meta name="description">` (previously hardcoded to `''`,
  which silently fell back to DCR's generic, site-wide description — a
  real SEO gap, since a generic/absent description risks Google or social
  previews auto-generating a snippet from page content instead of showing
  clean, curated copy).
- `openGraphData: { 'og:title': webTitle, 'og:description': description }`,
  plus `'og:image': image` **only when `puzzleConfig.image` is set**.
- `twitterData: { 'twitter:title': webTitle, 'twitter:description': description }`,
  plus `'twitter:image': image` **only when `puzzleConfig.image` is set**.

**When `image` is unset, `og:image`/`twitter:image` are omitted entirely**
(not sent empty, not defaulted to a placeholder) — `htmlPageTemplate`'s
`generateMetaTags()` only emits a `<meta>` tag for keys actually present in
the object it's given, so an absent key simply produces no tag. This is a
deliberate, confirmed decision, not an oversight: **DCR has no site-wide
default/fallback share image anywhere** for pages without one (checked
`frontend`'s `MetaData.opengraphProperties`/`SimplePage` — no image is set
by default there either, only via explicit per-page overrides), so an
unset `image` here matches existing sitewide behaviour rather than needing
a new default asset. **None of the 6 current V0 puzzles have a real image
configured** — this is a placeholder capability for whenever real,
licensed preview images are provided by the team, not filled in as part of
adding the field.

Puzzle Page has no separate source of Open Graph/Twitter copy (unlike
Article, where `frontend` sends its own `openGraphData`/`twitterData`), so
these are derived directly from `webTitle`/`description`/`image` rather
than requiring bespoke copy per field.

### The `FEPuzzlePageType` request contract

`POST /PuzzlePage` validates the body against `FEPuzzlePageType`
(`src/types/puzzlePage.ts`, validated by `validateAsPuzzlePageType` in
`src/model/validate.puzzlePage.ts`):

| Field                              | Type                                                   | Notes                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                               | `string`                                               | Any stable identifier for the page instance.                                                                                                                                                                                                                                                               |
| `slug`                             | `string`                                               | Looked up in the `PuzzleConfig` registry; unknown slug → `404`.                                                                                                                                                                                                                                            |
| `webTitle`                         | `string`                                               | Page `<title>` / share text.                                                                                                                                                                                                                                                                               |
| `config`                           | `ConfigType`                                           | Same shape frontend sends for `/Article`, `/PuzzlesPage`, etc. Only checked for a `serverSideABTests: Record<string, string>` shape — content otherwise unused (no AB gate today).                                                                                                                         |
| `nav`                              | `FENavType`                                            | Same shape as other routes.                                                                                                                                                                                                                                                                                |
| `pageFooter`                       | `FooterType`                                           | Same shape as other routes.                                                                                                                                                                                                                                                                                |
| `canonicalUrl`                     | `string`                                               | Canonical link tag.                                                                                                                                                                                                                                                                                        |
| `editionId`                        | `EditionId` (`'UK' \| 'US' \| 'AU' \| 'INT' \| 'EUR'`) | Validated against the known edition set.                                                                                                                                                                                                                                                                   |
| `instance.title`                   | `string` (required)                                    | Rendered as the page `<h1>` and the iframe `title` attribute.                                                                                                                                                                                                                                              |
| `instance.puzzleDate`              | `string?` (e.g. `"2026-09-11"`)                        | Which day's puzzle the reader wants to see. Accepted and validated as an optional string only — **not yet wired into any rendering or the iframe URL** (see "Open questions"). Prep work for a future V1 calendar-navigation feature; unrelated to the removed crossword-only `date` display-string field. |
| `instance.moreFromPuzzlesAndGames` | `PuzzleItem[]?` (from `src/types/puzzlesPage.ts`)      | Rendered as a plain "More from Puzzles & games" list when present and non-empty.                                                                                                                                                                                                                           |

### User/context info passed to the puzzle iframe

`src/components/PuzzleIframe.island.tsx` passes a combined `PuzzleContext`
about the current reader to the puzzle provider two ways:

- As a single JSON-encoded `guardian-puzzle-context` query parameter on the
  iframe `src` (e.g.
  `?set=guardian-sudoku-easy&embed=1&idx=1&guardian-puzzle-context=%7B%22userId%22%3Anull%2C%22darkMode%22%3Afalse%7D`,
  which decodes to `{"userId":null,"darkMode":false}`), present from the
  iframe's very first request. Unlike the parameter's previous `userId`-only
  form, this is always included — the context shape always carries both
  fields, so there's no "nothing to add" case to omit it for.
- Via `window.postMessage({ type: 'guardian-puzzle-context', context }, '*')`
  (the `PuzzleContextMessage` shape), sent to the iframe once it has loaded.

```ts
interface PuzzleContext {
	userId: string | null;
	darkMode: boolean;
}
```

- **`userId`** is the reader's `idToken.claims.legacy_identity_id` (resolved
  via `src/lib/identity.ts`'s `getAuthStatus()`), the same identifier
  already used to build MyAccount links elsewhere in DCR
  (`TopBarMyAccount.tsx`) — **not** the OIDC `sub` claim some other, newer
  API integrations in DCR use instead. `null` when the reader is signed out.
- **`darkMode`** is whether dark mode is currently actually active for this
  reader — both of the following must be true:
    1. `darkModeAvailable`, the existing server-side `webx-dark-mode-web` AB
       test flag for this page/request, already read via `useConfig()` in
       `PuzzlePage.tsx` and threaded down through `PuzzlePageLayout.tsx` to
       `PuzzleIframe` the same way it already reaches `rootStyles()` for the
       page chrome's own dark mode support (see `src/lib/rootStyles.ts`) — no
       new source of truth was introduced for this.
    2. The reader's OS/browser actually preferring dark
       (`prefers-color-scheme: dark`), checked reactively via DCR's existing,
       generic `src/lib/useMatchMedia.ts` hook (already used elsewhere in DCR,
       e.g. `ArticleMeta.web.tsx`) — not a new media-query mechanism.

    When `darkModeAvailable` is `false`, `darkMode` is always `false` and the
    media query isn't even consulted.

The iframe reloads automatically whenever either half of the context
changes while the reader is already on the page — sign in, sign out,
switching accounts, or the reader's OS switching light/dark theme: the
component subscribes to both auth state changes
(`src/lib/identity.ts`'s `subscribeToAuthStateChange()`, a thin wrapper
around the `@guardian/identity-auth` client's own
`authStateManager.subscribe`) and colour-scheme changes (via
`useMatchMedia`'s own reactivity), and since the iframe's `src` is derived
directly from the current context, React gives the `<iframe>` a new `src`
value whenever either changes, which the browser treats as a fresh
navigation — no manual reload call needed. The `postMessage` above fires
again after every such reload too.

## Open questions / known limitations

- **The `PuzzleContextMessage` shape needs confirming with
  AmuseLabs/Wordiply.**
  `{ type: 'guardian-puzzle-context', context: { userId: string | null,
darkMode: boolean } }` and the `?guardian-puzzle-context=<JSON>` query
  parameter are DCR's proposal, documented in code
  (`src/components/PuzzleIframe.island.tsx`), but neither has been confirmed
  against what AmuseLabs or Wordiply actually expect to receive — including
  whether `legacy_identity_id` (rather than the OIDC `sub` claim) is the
  right identifier format for them, and whether either provider's iframe
  even supports a dark-mode signal in the first place (see the dark-mode
  bullet below). This needs external coordination before relying on it for
  anything beyond best-effort personalisation.
- **The auth-state-change subscription is a new mechanism in this
  codebase.** `subscribeToAuthStateChange()` uses the underlying
  `@guardian/identity-auth` client's own public `authStateManager.subscribe`
  API (not an invented event bus), but this is its first use anywhere in
  DCR — every other existing call site only checks auth status once, on
  mount. It has unit test coverage but has not been validated against a
  real sign-in flow in a running browser; treat it as unproven until that
  happens.
- **Whether the `userId` passthrough is actually useful to
  AmuseLabs/Wordiply for anything (personalisation, analytics, save state)
  has not been validated end-to-end** — this ships the plumbing DCR can
  control (URL param + postMessage), not a confirmed integration.
- **No saved puzzle state / progress persistence.** There is no API today
  for a puzzle's in-progress state to be saved against a Guardian account
  and restored later (e.g. via `postMessage` round-tripping progress data).
  This has been deliberately deferred until such an API exists.
- **The real AmuseLabs archive URL is still unknown.** `PuzzleConfig.hasArchive`
  exists on every registry entry (currently always `true`) but is **not
  consumed anywhere in rendering** — there is no archive-link UI, and no
  archive URL field exists in the registry at all. A URL seen during the
  original proof-of-concept was only there as an illustrative example, not
  a verified production AmuseLabs archive URL. The correct URL needs to be
  sourced from the team before an archive feature can be built on top of
  `hasArchive`; do not guess or reuse the POC URL as-is.
- **Dark mode: the page chrome supports it, and a dark-mode signal is now
  sent to the puzzle iframe, but whether the provider actually honours it is
  unverified.** DCR has genuine, pre-existing dark mode support
  (`src/lib/rootStyles.ts`, gated behind the `webx-dark-mode-web`
  server-side AB test flag via `darkModeAvailable`), and Puzzle Page wires
  this through identically to every other DCR page type
  (`render.puzzlePage.web.tsx` → `PuzzlePage.tsx` → `rootStyles()`), so the
  masthead/footer/text/background chrome should follow dark mode correctly
  when that flag is enabled. `PuzzleIframe` also now sends `darkMode` (see
  "User/context info passed to the puzzle iframe" above) via the
  `guardian-puzzle-context` query parameter and `postMessage` — but whether
  AmuseLabs or Wordiply actually read or honour that signal at all is
  unconfirmed (see the `PuzzleContextMessage` open question above). This has
  not been visually verified in either light or dark mode.
- **Responsive/mobile layout has not been explicitly verified** for Puzzle
  Page or the puzzle iframes themselves (which are entirely provider-
  controlled content).
- **`instance.puzzleDate` is accepted but not yet used for anything.** It is
  validated as an optional string and otherwise ignored — DCR always shows
  whichever puzzle the resolved `slug`'s provider iframe URL happens to
  serve "live" today, regardless of `puzzleDate`. Wiring this into the
  actual iframe URL (so a specific past date's puzzle is shown) is deferred
  to V1, pending investigation into whether/how each provider's iframe URL
  scheme (AmuseLabs, Wordiply) supports requesting a specific historical
  date at all.
- **DCR's `/PuzzlePage` endpoint itself has no access control or
  kill-switch that doesn't require a code change and redeploy.** The AB
  gate (`game-page-experiment`) that originally hid this page in DCR was
  removed entirely (see git history). Reader-facing access control now
  lives on the `frontend` side instead, via its existing
  `PuzzlesHubExperiment`/`puzzles-new-hub` AB test gating which readers
  ever reach one of these puzzle-page URLs in the first place — DCR itself
  still has no equivalent gate or kill-switch of its own in front of
  `/PuzzlePage`. If DCR's endpoint is ever exposed to traffic that bypasses
  `frontend`'s gating (e.g. hit directly), there is currently nothing
  stopping it from rendering.
- **The Puzzles Hub (`src/layouts/PuzzlesLayout.tsx` and friends) is a
  separate, unrelated feature** (a directory/listing page) and is not
  documented in this file.

### SEO risks to revisit before shipping calendar/archive features

**Read this before adding date-specific URLs (V1 calendar navigation) or
any archive/pagination UI to Puzzle Page.** No page in Puzzle Page today
creates unbounded or paginated URLs (there is no archive UI yet, despite
`PuzzleConfig.hasArchive` existing — see above), so this isn't an active
problem yet. It becomes one the moment calendar or archive work begins, and
should be raised as an explicit design question at the _start_ of that
work, not discovered after launch.

- **Date-specific URLs risk creating duplicate/thin indexable pages.**
  Once `instance.puzzleDate` (or a real calendar UI) lets readers reach a
  specific past date's puzzle via a URL — whether a query param or a path
  segment — every such URL must either (a) carry a `canonical` pointing
  back to the puzzle's main/"today" URL, if individual dates aren't meant
  to be indexed separately, or (b) be a deliberate, explicit decision to
  index each date individually with genuinely distinct content/copy per
  date. This must be decided explicitly before shipping, not left as an
  accidental side effect of adding date-awareness to the URL.
- **Archive/pagination features carry a known, real risk of poor search
  indexing if built carelessly.** A concrete, existing cautionary example
  elsewhere on the Guardian site: the crossword archive/search listing is
  currently indexed by Google with a generic, unhelpful title
  ("Crossword | Page 2 of 1082") and a garbled, listing-style meta
  description auto-scraped from page content (a concatenated list of
  puzzle names) rather than a clean, curated one — a direct consequence of
  paginated listing pages being indexed individually without proper
  `canonical`/`noindex`/curated-metadata handling. Any future Puzzle Page
  archive feature must avoid this from the start: genuinely curated
  titles/descriptions per archive page (never auto-generated from a list of
  contents, the same principle behind `PuzzleConfig.description` above),
  and an explicit `canonical`/`noindex`/pagination-indexing strategy decided
  upfront — not defaulting to "index everything" and finding out later.
