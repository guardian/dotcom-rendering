# Puzzle Page

## What is implemented

Puzzle Page is a single, generic page template for the Guardian's
**iframe-based** puzzles (sudoku, word games, etc.). **dotcom-rendering
(DCR) owns the whole thing on the rendering side**: the `POST /PuzzlePage`
endpoint, the `PuzzleConfig` registry that decides how each puzzle behaves
and renders, and the `PuzzlePageLayout` layout/styling. The `frontend`
(Play/Scala) repo is responsible for fetching/assembling per-instance
content and POSTing it to this endpoint as JSON. See the `frontend` repo's
`docs/puzzle-page.md` (formerly `docs/game-page.md`; its standalone
`GamePageController` no longer exists either, having been merged into
`PuzzlesPageController` there) for the exact JSON payload it sends and how
to wire up a new puzzle from the content-fetching side.

**Crosswords are explicitly out of scope**, by product decision, and remain
entirely on their existing, separate `/crosswords/*` flow
(`ArticleDesign.Crossword` / `src/layouts/CrosswordLayout.tsx` / the generic
Article pipeline). That flow is unrelated to Puzzle Page and is not
described further in this file.

Readers reach individual puzzles via `frontend`'s public, top-level URLs,
mirroring how crosswords are already routed, e.g. `/sudoku/easy`,
`/word-wheel`, `/wordiply` (nested only where the puzzle itself has
variants, like sudoku's difficulty levels). This is separate from the
Puzzles Hub (the directory/listing page, unrelated to Puzzle Page), which
stays at `/puzzles-and-games`. None of this is DCR's own routing, it's
`frontend`'s public URL structure, and does not affect DCR's `/PuzzlePage`
endpoint/contract at all; it's mentioned here only so example URLs
elsewhere in this doc stay accurate.

**Access control lives entirely on the `frontend` side, not here.** DCR's
own `/PuzzlePage` endpoint is, and remains, ungated (see "Hitting it
locally" below). `frontend` gates reader access to these routes via its
existing `PuzzlesHubExperiment`/`puzzles-new-hub` AB test before it ever
POSTs to DCR. DCR does not re-implement or duplicate that gating.

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
**Each entry's `iframe.url` is its own complete, independently-written URL,
there is deliberately no shared URL template or `{slug}`-style
substitution mechanism.** There used to be one: every AmuseLabs-hosted
entry's URL was built from a shared template
(`https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1`)
by substituting DCR's own `slug` in for AmuseLabs' `set=guardian-*` query
param. That was a real, live bug: nothing guarantees a provider's own
naming convention matches our internal slug, and it already silently
didn't for `sudoku-killer` (its real, confirmed AmuseLabs `set` is
`killer-sudoku-medium`, not `sudoku-killer`, a different word order plus
an unexplained "-medium" suffix that is genuinely part of the real,
working identifier). The fix (confirmed against the native Android/iOS
apps' own real, working AmuseLabs integration) was to remove the shared
template entirely, not just patch that one instance: every entry now
specifies its own complete, independent, hardcoded URL, so a future
change to one entry can never silently or accidentally affect another.

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
`slug` (`404` if unknown), and renders unconditionally otherwise, with no
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
a real, browsable end-user URL.** `/PuzzlePage` only accepts `POST`
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

Both steps are config-only. The layout does not need any changes for a new
iframe-based slug:

1. Add a new key to `src/model/puzzles/puzzleConfigs.ts`'s `puzzleConfigs`
   record (`slug`, `puzzleGroup`, `iframe: { provider, url }`,
   `shareEnabled`, `printEnabled`, `hasArchive`, `title`, `description`,
   optional `image`). If it's another AmuseLabs-hosted puzzle, reuse the
   `amuseLabsPuzzle(slug, puzzleGroup, title, description, url)` helper
   (note: this helper doesn't take `image`, set it afterwards on the
   returned object if/when a real image is available for that puzzle).
   **`iframe.url` must be that puzzle's own complete, explicit iframe URL,
   confirmed against the actual provider (or a source that has itself
   confirmed it against the provider, e.g. the native apps' own working
   integration), not derived from `slug` or copied from another entry.**
   Never assume a provider's own naming convention matches our internal
   slug: the killer-sudoku incident above is a direct, confirmed example
   of that assumption silently being wrong. `validatePuzzleConfigs` runs
   once at module load and throws immediately if the entry is malformed
   (mismatched `slug`, unknown `puzzleGroup`, missing `iframe.provider`,
   a missing/empty/non-absolute `iframe.url`, empty `title`/`description`,
   or a present-but-empty `image`).
   **Write real, curated copy for `title`/`description`**, sourced from
   the product team's SEO spreadsheet for that puzzle (see "SEO" below for
   the exact `{date}` templating mechanism). It becomes the page's
   `<title>` and `<meta name="description">` and their derived Open
   Graph/Twitter equivalents, don't copy-paste one template string across
   entries with only the slug swapped in.
2. Nothing else changes on the DCR side: `PuzzlePageLayout.tsx`'s
   `PuzzlePageContent` unconditionally renders `PuzzleIframe` pointed at
   `resolveIframeUrl(puzzleConfig)` for every registry entry. The only thing
   needed from `frontend` is a request whose `slug` matches the new
   registry key exactly (see the `frontend` repo's `docs/puzzle-page.md`).

### SEO: title, meta description, Open Graph, Twitter card

Each `PuzzleConfig` entry carries `title` and `description` templates
(sourced verbatim from the product team's SEO spreadsheet, confirmed
against per-field character budgets, title max 60 characters, description
max 157 characters, both accounting for the date's length) and an
optional `image` (a full preview/share image URL). Both `title` and
`description` may contain a `{date}` placeholder token, substituted at
render time with `instance.puzzleDate` formatted as a short "d MMM yy"
date (e.g. `"2026-09-15" -> "15 Sep 26"`, via `formatPuzzleDateShort` in
`src/lib/puzzleDate.ts`, deliberately distinct from `formatPuzzleDate`'s
long, human-readable on-page display form, e.g. "15 September 2026").
For example, `sudoku-easy`'s `title` template
`"Easy sudoku {date} - logic puzzle | The Guardian"` resolves, for
`puzzleDate: "2026-09-15"`, to
`"Easy sudoku 15 Sep 26 - logic puzzle | The Guardian"`. If `puzzleDate`
is absent, the placeholder and any now-redundant surrounding
whitespace/punctuation are tidied up automatically (see
`resolvePuzzleTitle`/`resolvePuzzleDescription`'s implementation), rather
than leaving a literal double space or a stray space before a full stop.

`render.puzzlePage.web.tsx` derives the page's SEO metadata from these via
a small, pure, directly-unit-tested function,
`buildPuzzlePageMetaData(puzzleConfig, puzzleDate)`
(`src/server/render.puzzlePage.web.test.ts`):

- The resolved `title` becomes the page's `<title>` tag.
- The resolved `description` becomes the page's
  `<meta name="description">` (previously hardcoded to `''`, which
  silently fell back to DCR's generic, site-wide description, a real SEO
  gap, since a generic/absent description risks Google or social previews
  auto-generating a snippet from page content instead of showing clean,
  curated copy).
- `openGraphData: { 'og:title': title, 'og:description': description }`,
  plus `'og:image': image` **only when `puzzleConfig.image` is set**.
- `twitterData: { 'twitter:title': title, 'twitter:description': description }`,
  plus `'twitter:image': image` **only when `puzzleConfig.image` is set**.

**`webTitle` (the plain string `frontend` sends, e.g. `"Sudoku (easy)"`)
is _not_ used for the `<title>` tag or `og:title`/`twitter:title` any
more.** It has no date and no SEO suffix, so it can't satisfy the
spreadsheet's exact copy. Investigating its other uses in the render
pipeline before this change confirmed exactly one other real use:
`PuzzlePageLayout.tsx` still passes `webTitle` to `ShareButton.island.tsx`
for the share button's pre-filled share text/subject (native share sheet
title/text, email subject line), which is unrelated to SEO metadata and
is unaffected by this change. `webTitle` remains a required field in the
`FEPuzzlePageType` contract for that reason.

**When `image` is unset, `og:image`/`twitter:image` are omitted entirely**
(not sent empty, not defaulted to a placeholder). `htmlPageTemplate`'s
`generateMetaTags()` only emits a `<meta>` tag for keys actually present in
the object it's given, so an absent key simply produces no tag. This is a
deliberate, confirmed decision, not an oversight: **DCR has no site-wide
default/fallback share image anywhere** for pages without one (checked
`frontend`'s `MetaData.opengraphProperties`/`SimplePage`, no image is set
by default there either, only via explicit per-page overrides), so an
unset `image` here matches existing sitewide behaviour rather than needing
a new default asset. **None of the 6 current V0 puzzles have a real image
configured.** This is a placeholder capability for whenever real,
licensed preview images are provided by the team, not filled in as part of
adding the field.

Puzzle Page has no separate source of Open Graph/Twitter copy (unlike
Article, where `frontend` sends its own `openGraphData`/`twitterData`), so
these are derived directly from `title`/`description`/`image` rather than
requiring bespoke copy per field.

**Target search terms are documented, not implemented as a meta tag.**
The product spreadsheet also includes a "Search terms" column per puzzle
(e.g. for `word-wheel`: "daily word wheel, word wheel puzzle, word wheel
online, word wheel game, guardian word wheel, word wheel for today,
guardian word wheel today"). This is content/SEO-strategy reference, the
search terms the copy should naturally support, not a literal meta tag:
major search engines ignore `<meta name="keywords">` entirely today, so it
provides no real SEO benefit. Each puzzle's search-term list is recorded
as a code comment directly above its registry entry in
`puzzleConfigs.ts`, for content-team/future-maintainer traceability, and
is **not** rendered as a `<meta name="keywords">` tag anywhere.

**Crawl/index behaviour already matches the product requirement (no code
change needed).** The spreadsheet asks for all 6 V0 puzzle pages to allow
robots.txt and be indexed. `htmlPageTemplate.ts`'s `doNotIndex()` only
forces `noindex` outside `PROD`, or for canonical URLs containing
`tracking/commissioningdesk` (an unrelated, allow-listed exception for a
couple of specific URLs). None of the 6 puzzle pages' canonical URLs match
that pattern, so none of them hit the `noindex` branch in production;
they are indexed normally, as required.

**Out of scope for this registry, not implemented:** the product
spreadsheet includes SEO copy for several other pages, the Puzzles & Games
hub page, a "Word games" landing page, a "Logic puzzles" landing page, a
"Trivia and quizzes" landing page, a generic "Sudoku" landing page, and
Crosswords/Word games/Logic puzzles archive pages. None of these pages
exist in this codebase yet (no routes, no controllers), some are
explicitly future V1/V2 work per the rollout plan (see "Feature-tier
rollout gating" below). Their SEO copy is not implementable here until
those pages are actually built (elsewhere, e.g. the separate, existing
Puzzles Hub feature for the hub page, or future archive/landing page
work), this doc note exists so that work isn't discovered as a surprise
gap later.

### The `FEPuzzlePageType` request contract

`POST /PuzzlePage` validates the body against `FEPuzzlePageType`
(`src/types/puzzlePage.ts`, validated by `validateAsPuzzlePageType` in
`src/model/validate.puzzlePage.ts`):

| Field                              | Type                                                   | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                               | `string`                                               | Any stable identifier for the page instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `slug`                             | `string`                                               | Looked up in the `PuzzleConfig` registry; unknown slug → `404`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `webTitle`                         | `string`                                               | Used for the share button's pre-filled share text/subject only. **Not** used for the `<title>` tag or `og:title`/`twitter:title` (see "SEO" above), those come from the resolved `PuzzleConfig.title` instead.                                                                                                                                                                                                                                                                                                                                                                       |
| `config`                           | `ConfigType`                                           | Same shape frontend sends for `/Article`, `/PuzzlesPage`, etc. Only checked for a `serverSideABTests: Record<string, string>` shape, content otherwise unused (no AB gate today).                                                                                                                                                                                                                                                                                                                                                                                                    |
| `nav`                              | `FENavType`                                            | Same shape as other routes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `pageFooter`                       | `FooterType`                                           | Same shape as other routes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `canonicalUrl`                     | `string`                                               | Canonical link tag.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `editionId`                        | `EditionId` (`'UK' \| 'US' \| 'AU' \| 'INT' \| 'EUR'`) | Validated against the known edition set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `instance.title`                   | `string` (required)                                    | Rendered as the page `<h1>` and the iframe `title` attribute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `instance.puzzleDate`              | `string?` (e.g. `"2026-09-11"`)                        | Which day's puzzle the reader wants to see. Rendered as a human-readable date (e.g. "11 September 2026") next to the page title, passed through unformatted as `PuzzleContext.puzzleDate` to the puzzle iframe (see below), and used (short-formatted) to resolve the `{date}` placeholder in `PuzzleConfig.title`/`description` (see "SEO" above). `frontend` now always resolves and sends this for every request (its Puzzle Page URLs carry a date segment), though DCR still treats the field as optional and simply omits/tidies up the display/context/SEO value when absent. |
| `instance.moreFromPuzzlesAndGames` | `PuzzleItem[]?` (from `src/types/puzzlesPage.ts`)      | Rendered as a plain "More from Puzzles & games" list when present and non-empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### User/context info passed to the puzzle iframe

`src/components/PuzzleIframe.island.tsx` passes a combined `PuzzleContext`
about the current reader to the puzzle provider two ways:

- As a single JSON-encoded `guardian-puzzle-context` query parameter on the
  iframe `src` (e.g.
  `?set=guardian-sudoku-easy&embed=1&idx=1&guardian-puzzle-context=%7B%22userId%22%3Anull%2C%22darkMode%22%3Afalse%2C%22puzzleDate%22%3Anull%7D`,
  which decodes to `{"userId":null,"darkMode":false,"puzzleDate":null}`),
  present from the iframe's very first request. Unlike the parameter's
  previous `userId`-only form, this is always included: the context shape
  always carries all three fields, so there's no "nothing to add" case to
  omit it for.
- Via `window.postMessage({ type: 'guardian-puzzle-context', context }, '*')`
  (the `PuzzleContextMessage` shape), sent to the iframe once it has loaded.

```ts
interface PuzzleContext {
	userId: string | null;
	darkMode: boolean;
	puzzleDate: string | null;
}
```

- **`userId`** is the reader's `idToken.claims.legacy_identity_id` (resolved
  via `src/lib/identity.ts`'s `getAuthStatus()`), the same identifier
  already used to build MyAccount links elsewhere in DCR
  (`TopBarMyAccount.tsx`). This is **not** the OIDC `sub` claim some other,
  newer API integrations in DCR use instead. `null` when the reader is
  signed out.
- **`darkMode`** is whether dark mode is currently actually active for this
  reader. Both of the following must be true:
    1. `darkModeAvailable`, the existing server-side `webx-dark-mode-web` AB
       test flag for this page/request, already read via `useConfig()` in
       `PuzzlePage.tsx` and threaded down through `PuzzlePageLayout.tsx` to
       `PuzzleIframe` the same way it already reaches `rootStyles()` for the
       page chrome's own dark mode support (see `src/lib/rootStyles.ts`). No
       new source of truth was introduced for this.
    2. The reader's OS/browser actually preferring dark
       (`prefers-color-scheme: dark`), checked reactively via DCR's existing,
       generic `src/lib/useMatchMedia.ts` hook (already used elsewhere in DCR,
       e.g. `ArticleMeta.web.tsx`). Not a new media-query mechanism.

    When `darkModeAvailable` is `false`, `darkMode` is always `false` and the
    media query isn't even consulted.

- **`puzzleDate`** is `instance.puzzleDate` passed straight through
  unformatted (the raw `YYYY-MM-DD` string, not the "11 September 2026"
  display text rendered next to the title), so third-party providers get
  the machine-readable form. `null` when `instance.puzzleDate` is absent.
  DCR does not parse the Puzzle Page URL or own the date-in-path/
  redirect-to-archive logic itself: it purely receives whatever date
  `frontend` resolved and sent in the request payload, and passes it on. See
  `frontend`'s own documentation for how it resolves and redirects on the
  date-in-URL structure.

**A separate, plain `uid=<userId>` query parameter is also appended
alongside `guardian-puzzle-context`**, only when the reader is signed in
(omitted entirely, not sent as `uid=null` or empty, when signed out). This
is a genuinely different, independently-confirmed mechanism from
`guardian-puzzle-context` above: the native (Android/iOS) apps' own real,
working AmuseLabs integration appends `&uid=<value>` as a plain query
parameter when the user is authenticated ("If the user is authenticated,
we add &uid=<puzzleId>"), and DCR adopted the same query parameter
name/pattern once confirmed. It is additive, not a replacement,
`guardian-puzzle-context` still carries dark mode and puzzle date, for
which there is no separately-confirmed mechanism yet. `uid`'s value is
sourced identically to `guardian-puzzle-context.userId`
(`idToken.claims.legacy_identity_id`); the native apps call their
equivalent value a "puzzleId", but there is no independent confirmation
that identifier format matches ours, only that this exact query parameter
name/pattern is what they use for their own equivalent value (see "Open
questions" below).

The iframe reloads automatically whenever any part of the context or `uid`
changes while the reader is already on the page: sign in, sign out,
switching accounts, or the reader's OS switching light/dark theme. The
component subscribes to both auth state changes
(`src/lib/identity.ts`'s `subscribeToAuthStateChange()`, a thin wrapper
around the `@guardian/identity-auth` client's own
`authStateManager.subscribe`) and colour-scheme changes (via
`useMatchMedia`'s own reactivity), and since the iframe's `src` is derived
directly from the current context, React gives the `<iframe>` a new `src`
value whenever either changes, which the browser treats as a fresh
navigation, so no manual reload call is needed. The `postMessage` above
fires again after every such reload too.

## Open questions / known limitations

- **The `PuzzleContextMessage` shape (`guardian-puzzle-context`) is still
  unconfirmed with AmuseLabs/Wordiply; `uid` specifically is now
  confirmed.**
  `{ type: 'guardian-puzzle-context', context: { userId: string | null,
darkMode: boolean, puzzleDate: string | null } }` and the
  `?guardian-puzzle-context=<JSON>` query parameter remain DCR's own
  proposal, documented in code (`src/components/PuzzleIframe.island.tsx`),
  neither has been confirmed against what AmuseLabs or Wordiply actually
  expect to receive, including whether `legacy_identity_id` (rather than
  the OIDC `sub` claim) is the right identifier format for the `userId`
  field within it, and whether either provider's iframe even supports a
  dark-mode signal in the first place (see the dark-mode bullet below).
  The separate, plain `uid=<userId>` query parameter (see "User/context
  info passed to the puzzle iframe" above), by contrast, **is** confirmed:
  sourced from the native (Android/iOS) apps' own real, working AmuseLabs
  integration, which uses this exact query parameter name/pattern for
  their own equivalent identity value. That confirmation does not extend
  to the identifier _format_: the native apps call their value a
  "puzzleId", and there is no independent confirmation that
  `legacy_identity_id` is the same format as whatever they send, only that
  the `uid` query parameter itself, and the pattern of "include only when
  signed in, omit entirely when signed out", is confirmed correct. This
  needs external coordination before relying on `guardian-puzzle-context`
  for anything beyond best-effort personalisation.
- **The auth-state-change subscription is a new mechanism in this
  codebase.** `subscribeToAuthStateChange()` uses the underlying
  `@guardian/identity-auth` client's own public `authStateManager.subscribe`
  API (not an invented event bus), but this is its first use anywhere in
  DCR. Every other existing call site only checks auth status once, on
  mount. It has unit test coverage but has not been validated against a
  real sign-in flow in a running browser; treat it as unproven until that
  happens.
- **Whether the `userId` passthrough is actually useful to
  AmuseLabs/Wordiply for anything (personalisation, analytics, save state)
  has not been validated end-to-end.** This ships the plumbing DCR can
  control (URL param + postMessage), not a confirmed integration.
- **No saved puzzle state / progress persistence.** There is no API today
  for a puzzle's in-progress state to be saved against a Guardian account
  and restored later (e.g. via `postMessage` round-tripping progress data).
  This has been deliberately deferred until such an API exists.
- **The real AmuseLabs archive URL is still unknown.** `PuzzleConfig.hasArchive`
  exists on every registry entry (currently always `true`) but is **not
  consumed anywhere in rendering.** There is no archive-link UI, and no
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
  `guardian-puzzle-context` query parameter and `postMessage`, but whether
  AmuseLabs or Wordiply actually read or honour that signal at all is
  unconfirmed (see the `PuzzleContextMessage` open question above). This has
  not been visually verified in either light or dark mode.
- **Responsive/mobile layout has not been explicitly verified** for Puzzle
  Page or the puzzle iframes themselves (which are entirely provider-
  controlled content).
- **DCR does not validate that `puzzleDate` is a real, sensible calendar
  date.** Beyond the existing shape check (a non-empty string), nothing in
  DCR confirms `puzzleDate` is an actual calendar date (e.g. rejecting a
  nonexistent `"2026-02-30"`) or a sensible one (e.g. rejecting a wildly
  out-of-range date). Deeper, format-level validation of the date-in-URL
  value is `frontend`'s responsibility at the route level (per its own
  task); true calendar/business-logic validity (e.g. "did this puzzle
  actually exist on this date") is not validated anywhere in the stack yet.
- **DCR's `/PuzzlePage` endpoint itself still has no route-level access
  control** (unchanged from before). `frontend`'s existing
  `PuzzlesHubExperiment`/`puzzles-new-hub` AB test gate decides whether a
  reader ever reaches one of these puzzle-page URLs in the first place;
  DCR's endpoint renders unconditionally for any request with a known
  `slug`. **What has changed**: DCR now has a real, cumulative,
  code-change-free kill-switch for individual _feature tiers_ within the
  rendered page, see "Feature-tier rollout gating (v0/v1/v2)" below. This
  addresses the previous "no kill-switch" limitation for feature-level
  rollback; it does not add route-level gating to `/PuzzlePage` itself
  (that remains `frontend`'s responsibility, unchanged).
- **The Puzzles Hub (`src/layouts/PuzzlesLayout.tsx` and friends) is a
  separate, unrelated feature** (a directory/listing page) and is not
  documented in this file.

### Feature-tier rollout gating (v0/v1/v2)

The Puzzles & Games rollout uses a 3-tier, **cumulative** AB-test/
kill-switch structure (`ab-testing/config/abTests.ts`), so any rollout
phase can be turned on/off, or rolled back to an earlier phase, without
a DCR code change or redeploy. This is per the product rollout plan (v0 =
w/c 5 Oct launch, v1 = w/c 12 Oct launch, v2 = no date confirmed yet).

- **`puzzles-new-hub` (v0, the master switch)**: gates the baseline
  experience, the new Puzzles Hub page, and the 6 V0 puzzle pages (sudoku
  x4, word-wheel, wordiply) with no archive, no calendar, no progress
  indicators, no sign-in prompt, no related-content rail, and a hub
  sub-nav with no links yet. Turning this off hides everything, including
  every later tier.
- **`puzzles-new-hub-v1`**: the w/c 12 Oct layer, **on top of v0**. It does
  nothing unless `puzzles-new-hub` is _also_ enabled. Activates: full hub
  sub-nav links, a sign-in-to-track-progress message, a calendar/archive
  view for crosswords/logic-puzzles/word-games (not Wordiply), progress
  indicators, the "More from Puzzles & Games" rail, newsletter signup, and
  changes to the existing crossword page (print CTA repositioning, "play
  other puzzles" container).
- **`puzzles-new-hub-v2`**: a future layer, **on top of v0+v1**. It does
  nothing unless both `puzzles-new-hub` and `puzzles-new-hub-v1` are
  _also_ enabled. Activates: On the Ball/Film Reveal (Trivia and Quizzes),
  a "Most played" container, EventKit-driven navigation, migrating
  existing crossword pages onto the Puzzle Page template, and
  search-engine mobile app nudges. No launch date confirmed yet; kept at
  0% until that work begins.

The cumulative design is deliberate: it's impossible to end up with, say,
v2 features showing while v0 is switched off, since each tier's gate
function requires every tier below it to also pass. To roll back a single
phase without a deploy, flip only that tier's `audienceSize`/`status` in
`abTests.ts` and leave the tier(s) below it untouched (e.g. to roll back
from v1 to v0, turn off `puzzles-new-hub-v1` only).

The corresponding gate-check helpers live in DCR:

- `isPuzzlesHubEnabled` (`src/lib/puzzlesHubExperiment.ts`), v0 only.
- `isPuzzlesHubV1Enabled`/`isPuzzlesHubV2Enabled`
  (`src/lib/puzzlesHubVersionExperiment.ts`), cumulative, as described
  above.

**Current state**: all three tiers sit at `audienceSize: 0/100`, hidden
from the public entirely, same as before this structure existed. Today,
only one DCR-rendered feature actually checks a tier gate:
`PuzzlePageLayout.tsx`'s "More from Puzzles & Games" rail, gated behind
`isPuzzlesHubV1Enabled` (since that rail is v1-scoped, not v0). Every
other v0-scoped feature currently in this codebase renders unconditionally
at the DCR level. v0's "gating" today is really just `frontend`'s
route-level `PuzzlesHubExperiment` check deciding whether a request
reaches `/PuzzlePage` at all, not a DCR-side render-time check. When
future v1/v2 work is implemented (calendar, progress indicators, sign-in
message, on-the-ball/film-reveal, etc.), it should be gated behind
`isPuzzlesHubV1Enabled`/`isPuzzlesHubV2Enabled` respectively, using the
helpers above, the same way the related-content rail already is.

**No `frontend` repo changes are needed for any of this.** `frontend`
doesn't render Puzzle Page UI itself, so feature-tier gating naturally
lives entirely on the DCR side. `frontend`'s existing route-level
`PuzzlesHubExperiment` gate (already reusing `puzzles-new-hub`) is
unaffected by `puzzles-new-hub-v1`/`puzzles-new-hub-v2` and doesn't need
to check them. It only ever needed to decide whether a reader reaches
`/PuzzlePage` at all, which is still governed by v0 alone.

### SEO risks to revisit before shipping calendar/archive features

**Read this before adding date-specific URLs (V1 calendar navigation) or
any archive/pagination UI to Puzzle Page.** No page in Puzzle Page today
creates unbounded or paginated URLs (there is no archive UI yet, despite
`PuzzleConfig.hasArchive` existing, see above), so this isn't an active
problem yet. It becomes one the moment calendar or archive work begins, and
should be raised as an explicit design question at the _start_ of that
work, not discovered after launch.

- **Date-specific URLs risk creating duplicate/thin indexable pages.**
  Once `instance.puzzleDate` (or a real calendar UI) lets readers reach a
  specific past date's puzzle via a URL, whether a query param or a path
  segment, every such URL must either (a) carry a `canonical` pointing
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
  puzzle names) rather than a clean, curated one, a direct consequence of
  paginated listing pages being indexed individually without proper
  `canonical`/`noindex`/curated-metadata handling. Any future Puzzle Page
  archive feature must avoid this from the start: genuinely curated
  titles/descriptions per archive page (never auto-generated from a list of
  contents, the same principle behind `PuzzleConfig.description` above),
  and an explicit `canonical`/`noindex`/pagination-indexing strategy decided
  upfront, not defaulting to "index everything" and finding out later.
