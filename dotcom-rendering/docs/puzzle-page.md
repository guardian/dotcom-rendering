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

**Access control is enforced on both sides.** `frontend` gates reader
access to these routes via its existing `PuzzlesHubExperiment`/
`puzzles-new-hub` AB test before it ever POSTs to DCR. DCR's own
`/PuzzlePage` endpoint additionally checks the same `puzzles-new-hub`
participation itself (via `isPuzzlesHubEnabled`, mirroring
`/PuzzlesPage`'s hub gate) and returns `404` when it isn't enabled for the
request, so the endpoint isn't left relying solely on `frontend` never
calling it (see "Hitting it locally" below).

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
**`iframe` is a discriminated union keyed by `provider`
(`PuzzleProvider = 'amuselabs' | 'wordiply'`), each entry holds only the
minimal, provider-specific identity data needed to build its iframe URL,
not a pre-baked final URL string.** AmuseLabs entries carry a `set`
identifier (e.g. `'guardian-sudoku-easy'`, `'guardian-killer-sudoku-medium'`);
Wordiply carries its `baseUrl`. Building the actual URL, including which
query params a given provider does or doesn't accept, is the job of a
per-provider strategy module, `src/lib/puzzleIframeUrl.ts`, not this
registry:

- `buildAmuseLabsUrl(config, context)` builds `set`/`embed=1`/`idx=1`,
  then conditionally `uid` (only when signed in, confirmed against the
  native apps' real AmuseLabs integration) and always `darkMode=0|1` (a
  plain literal query value, also confirmed, unlike `uid` this is never
  conditionally omitted).
- `buildWordiplyUrl(config, context)` returns `config.baseUrl` unmodified,
  deliberately minimal pending confirmation of what query params Wordiply
  actually supports (none today).
- `resolvePuzzleIframeUrl(config, context)` dispatches on
  `config.iframe.provider` to the right builder, and is the single entry
  point callers should use. It is exhaustively type-checked (a `never`
  check in the switch's default branch), so adding a new `PuzzleProvider`
  to the union without also adding its builder is a compile error, not a
  silent runtime gap.

This replaces an earlier design that blindly applied the same query
params (`uid`, and DCR's own `guardian-puzzle-context` JSON blob) to
every provider regardless of what it actually supports. That was
fragile, and already conceptually wrong even though harmless in practice
with only 2 V0 providers (one of which happens to ignore unknown params).
It also replaces an even earlier design where every AmuseLabs-hosted
entry's URL was built from one shared template, substituting DCR's own
`slug` in for AmuseLabs' `set=guardian-*` query param, a real, live bug:
nothing guarantees a provider's own naming convention matches our
internal slug, and it already silently didn't for `sudoku-killer` (its
real, confirmed AmuseLabs `set` is `guardian-killer-sudoku-medium`, not
`guardian-sudoku-killer`, a different word order plus an unexplained
"-medium" suffix that is genuinely part of the real, working identifier).
Every AmuseLabs entry's `set` is now written out independently in the
registry, confirmed against the native Android/iOS apps' own real,
working AmuseLabs integration, so a future change to one entry can never
silently or accidentally affect another.

`guardian-puzzle-context` (DCR's own JSON-encoded context blob, unrelated
to any one provider) deliberately stays **outside** this per-provider
strategy: it is applied uniformly to every provider regardless of
`iframe.provider`, by `buildPuzzleIframeSrc` in
`PuzzleIframe.island.tsx`, layered on top of whatever
`resolvePuzzleIframeUrl` already resolved. This is DCR's own additional
channel, not a provider-specific mechanism, providers that don't
understand it simply ignore it, so it is correctly generic where `uid`/
`darkMode` are correctly provider-specific.

### Hitting it locally

Start the dev server (from the `dotcom-rendering` sub-directory):

```
make dev
```

This starts webpack-dev-server on `http://localhost:3030`
(`webpack/webpack.config.dev-server.js`).

`src/server/handler.puzzlePage.web.ts` validates the body
(`validateAsPuzzlePageType`), checks the request's `puzzles-new-hub`
participation via `isPuzzlesHubEnabled` (`404` if not enabled), looks up
the `PuzzleConfig` for the request's `slug` (`404` if unknown), and only
then renders. Fixtures generated below set `serverSideABTests` to
`{ 'puzzles-new-hub': 'variant' }` so they pass this gate; `NODE_ENV=development`
also bypasses it locally.

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
iframe-based slug already using a supported provider:

1. Add a new key to `src/model/puzzles/puzzleConfigs.ts`'s `puzzleConfigs`
   record (`slug`, `puzzleGroup`, `iframe`, `shareEnabled`, `printEnabled`,
   `hasArchive`, `title`, `description`, optional `image`).
   **`printEnabled` is currently `true` only for the 4 sudoku entries, by
   explicit product decision (PR #16700 review): existing readers rely on
   printing to play Sudoku, since there isn't really another way to do
   that on the web, and the current static Sudoku page is being retired
   once V0 ships. No other puzzle currently needs print.** Don't default a
   new entry to `printEnabled: true` without a similarly explicit product
   reason, see `PuzzleConfig.printEnabled`'s doc comment.
   What `iframe`
   needs depends on the provider:
    - **Another AmuseLabs-hosted puzzle** (the common case): reuse the
      `amuseLabsPuzzle(slug, puzzleGroup, title, description, set, printEnabled)`
      helper, supplying that puzzle's own confirmed AmuseLabs `set`
      identifier and whether it should show the print button (see above).
      `buildAmuseLabsUrl` (`src/lib/puzzleIframeUrl.ts`) is reused
      automatically, no new builder needed. **`set` must be confirmed
      against the actual provider (or a source that has itself confirmed
      it, e.g. the native apps' own working integration), not derived
      from `slug` or copied from another entry.** Never assume AmuseLabs'
      own naming convention matches our internal slug: the killer-sudoku
      incident is a direct, confirmed example of that assumption silently
      being wrong.
    - **A genuinely new provider** (e.g. MovieGrid, returning in a future
      version, not in the V0 registry today): needs its own
      `PuzzleIframeConfig` union variant, its own builder function in
      `src/lib/puzzleIframeUrl.ts`, and a new case in
      `resolvePuzzleIframeUrl`'s dispatcher (the `never` exhaustiveness
      check will fail to compile until this is done). This is a new,
      additive strategy, not a blind copy-paste of `buildAmuseLabsUrl`'s
      logic, a new provider's confirmed query param support may differ
      (see the iframe URL strategy description in "The V0 puzzle set"
      above).
      `validatePuzzleConfigs` runs once at module load and throws
      immediately if the entry is malformed (mismatched `slug`, unknown
      `puzzleGroup`, an invalid provider-specific `iframe` config, empty
      `title`/`description`, or a present-but-empty `image`).
      **Write real, curated copy for `title`/`description`**, sourced from
      the product team's SEO spreadsheet for that puzzle (see "SEO" below for
      the exact `{date}` templating mechanism). It becomes the page's
      `<title>` and `<meta name="description">` and their derived Open
      Graph/Twitter equivalents, don't copy-paste one template string across
      entries with only the slug swapped in.
2. Nothing else changes on the DCR side: `PuzzlePageLayout.tsx` passes the
   resolved `puzzleConfig` straight to `PuzzleIframe`, which resolves the
   iframe URL itself (client-side, since it needs the reader's live
   sign-in/dark-mode state, see "User/context info passed to the puzzle
   iframe" below). The only thing needed from `frontend` is a request whose
   `slug` matches the new registry key exactly (see the `frontend` repo's
   `docs/puzzle-page.md`).

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
  iframe `src` (e.g., for an AmuseLabs entry, whose builder also adds
  `darkMode`, see below:
  `?set=guardian-sudoku-easy&embed=1&idx=1&darkMode=0&guardian-puzzle-context=%7B%22userId%22%3Anull%2C%22darkMode%22%3Afalse%2C%22puzzleDate%22%3Anull%7D`,
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

**A separate, plain `uid=<userId>` query parameter, and a plain
`darkMode=0|1` query parameter, are also appended by AmuseLabs' own
builder (`buildAmuseLabsUrl`, see "The V0 puzzle set" above), alongside
`guardian-puzzle-context`.** `uid` is only appended when the reader is
signed in (omitted entirely, not sent as `uid=null` or empty, when signed
out); `darkMode=0|1` is always appended (never conditionally omitted,
unlike `uid`). Both are genuinely different, independently-confirmed
mechanisms from `guardian-puzzle-context` above, and are AmuseLabs-specific,
**not** sent to Wordiply (which has no confirmed query param support of
any kind yet): the native (Android/iOS) apps' own real, working AmuseLabs
integration appends `&uid=<value>` as a plain query parameter when the
user is authenticated ("If the user is authenticated, we add
&uid=<puzzleId>") and a `darkMode=0|1` literal value, and DCR adopted the
same query parameter names/patterns once confirmed. Both are additive,
not a replacement, `guardian-puzzle-context` still carries its own
`darkMode`/`puzzleDate` fields too, applied uniformly to every provider
regardless of what that provider's own builder adds (see "The V0 puzzle
set" above for why this split exists). `uid`'s value is sourced identically
to `guardian-puzzle-context.userId` (`idToken.claims.legacy_identity_id`);
the native apps call their equivalent value a "puzzleId", but there is no
independent confirmation that identifier format matches ours, only that
this exact query parameter name/pattern is what they use for their own
equivalent value (see "Open questions" below).

The iframe reloads automatically whenever any part of the context, `uid`,
or `darkMode` changes while the reader is already on the page: sign in,
sign out, switching accounts, or the reader's OS switching light/dark
theme. The component subscribes to both auth state changes
(`src/lib/identity.ts`'s `subscribeToAuthStateChange()`, a thin wrapper
around the `@guardian/identity-auth` client's own
`authStateManager.subscribe`) and colour-scheme changes (via
`useMatchMedia`'s own reactivity), and since the iframe's `src` is derived
directly from the current context, React gives the `<iframe>` a new `src`
value whenever either changes, which the browser treats as a fresh
navigation, so no manual reload call is needed. The `postMessage` above
fires again after every such reload too.

### Iframe height at narrower viewports

The puzzle iframe's `frameStyles` (`PuzzleIframe.island.tsx`) increases its
`min-height` below the `tablet` breakpoint (via this codebase's existing
`from`/`until` breakpoint mixins from `@guardian/source/foundations`, the
same convention already used in `PuzzlePageLayout.tsx`), rather than a
single fixed height at every viewport width. This exists because AmuseLabs'
own iframe content has its own internal responsive behaviour, independent
of the iframe element's own dimensions: per PR #16700 review (Gustavo),
some puzzles have a menu that sits to the side of the puzzle grid on wider
screens, but moves _below_ the grid at narrower screen sizes, needing
noticeably more vertical space than the desktop layout does. Without
enough `min-height` at those narrower widths, that reflowed menu risks
being clipped or requiring an extra scroll the reader doesn't expect.

**The exact extra height needed is genuinely unconfirmed, not just an
unverified guess dressed up as a fact.** There is no confirmed, exact pixel
value from AmuseLabs for how much taller the reflowed layout actually is,
and this has not yet been tested against a real AmuseLabs embed on a real
mobile device (platform access is being arranged separately). The current
value (`900px` below `until.tablet`, versus `500px` at wider viewports) is
a deliberately generous best-effort estimate, intended to avoid
under-shooting and clipping content, not a confirmed figure. **This must be
revisited once the team can actually test against the real embed**, both
the breakpoint chosen and the exact height value may need adjusting once
real data is available.

This codebase does have an existing generic postMessage-based iframe
auto-resize convention (`iframeMessenger.enableAutoResize()`, used by
`UnsafeEmbedBlockComponent.island.tsx`/`InstagramBlockComponent.island.tsx`
for Guardian-authored interactive/embed content), but it does not apply
here: it requires Guardian's own `iframe-messenger` script to run _inside_
the iframe's own content, which is only possible for content DCR itself
controls, not a third-party-hosted AmuseLabs/Wordiply page. A real,
provider-confirmed auto-resize mechanism (if AmuseLabs offers one) would
need separate external confirmation before adopting; this was not invented
here.

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
  field within it. On dark mode specifically: AmuseLabs does document a
  real, confirmed postMessage-based dark-mode API of its own
  (`{ type: 'updateDarkMode', darkMode: boolean }`) - but it is a
  completely separate message shape from `guardian-puzzle-context`, isn't
  sent by DCR today, and needs to be explicitly enabled per series by
  AmuseLabs before it does anything (see the dark-mode bullet below for
  detail). Whether `guardian-puzzle-context`'s own `darkMode` field (or
  anything else in it) does anything at all remains exactly as unconfirmed
  as before.
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
- **The real AmuseLabs archive URL is still unknown, and today's `idx=1`
  is a "today only" hack that cannot show a specific past puzzle.**
  `PuzzleConfig.hasArchive` exists on every registry entry (currently
  always `true`) but is **not consumed anywhere in rendering.** There is
  no archive-link UI, and no archive URL field exists in the registry at
  all. A URL seen during the original proof-of-concept was only there as
  an illustrative example, not a verified production AmuseLabs archive
  URL. Per the AmuseLabs integration doc shared by the product team
  (confirmed against native app behaviour): "The apps currently use
  `idx=1` for the latest puzzle. Archive URLs should use the stable `id`
  instead... Do not add `idx=1`, as that selects the latest puzzle instead
  of the archived one." All 5 of our AmuseLabs entries' `buildAmuseLabsUrl`
  builder (`src/lib/puzzleIframeUrl.ts`) hardcodes `idx=1`, which is
  correct only for "today's puzzle" (V0's only real use case), it is
  **not** valid for showing a specific past date's puzzle. Building
  calendar/archive functionality (V1) will require swapping `idx=1` for
  `id={realProviderPuzzleId}` in that one shared builder function (a
  small, contained change, not a per-entry rewrite, since the builder is
  the single place that assembles the AmuseLabs URL), where that real
  per-puzzle id must come from a not-yet-built archive API, it cannot be
  derived or guessed from a date locally. Treat sourcing that real archive
  URL/id mechanism from the team as a hard blocker for calendar/archive
  work, not a nice-to-have. **A related, current gap worth being explicit
  about**: `instance.puzzleDate` is accepted, displayed next to the title,
  and passed through to the iframe context (see above), but it does
  **not** actually change which puzzle instance the iframe shows. The
  iframe always shows the provider's own "latest" puzzle via `idx=1`,
  regardless of `puzzleDate`'s value, so the date shown on the page and
  the puzzle actually embedded can silently diverge once `puzzleDate`
  ever points anywhere other than today.
- **Today's `puzzleConfigs.ts` registry (with its explicit, per-entry
  `set`/`baseUrl` identity data, resolved into a URL by
  `src/lib/puzzleIframeUrl.ts`) is a deliberate V0-only stopgap, expected
  to be superseded by a future "Puzzles Server".** Per direct guidance
  from the product/design lead, the long-term architecture intends for
  puzzle URLs (and progress data) to come from a server-side "Puzzles
  Server"/API layer (not yet built), which `frontend` would call to get
  puzzle metadata including URLs, rather than DCR statically hardcoding
  them in a registry file. A shared internal architecture document
  ("Puzzles hub 3P API requirements") describes this in more detail: a
  future Archive API (returning puzzle date/URL/id/title per puzzle), a
  future Progress API (tracking user completion/score/state per puzzle,
  phased: local-device-only first, then a thin API wrapper, then a
  backing database), and confirms the exact real AmuseLabs URL parameter
  conventions already implemented here (`set`, `id` vs `idx=1`, `embed=1`,
  `uid`, `darkMode=0|1`), plus MovieGrid/sportsreveal's simpler convention
  (base URL plus a client-added `darkMode` param only, no confirmed `uid`
  support for those two providers). `puzzleConfigs.ts`'s current registry,
  with its explicit, per-entry identity data, is a deliberate,
  correct-for-now V0 solution, not the intended final architecture. When
  the Puzzles Server/Archive API materialises, this registry's statically
  configured values are expected to be replaced or supplemented by
  dynamically-fetched values, at minimum for archive/calendar navigation,
  likely eventually for the "today" URL too. This is a known, anticipated
  future refactor, not a surprise to discover later. **Do not attempt to
  build against this future API now, it does not exist yet**, this bullet
  exists purely so a future reader/maintainer has this context without
  needing it
  rediscovered from scratch.
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

    **AmuseLabs' own, separate, real light/dark-mode API is now confirmed, and
    DCR does not use it.** Per AmuseLabs' public integration docs
    (<https://amuselabs.com/docs/integration/iframe-communication/#switching-lightdark-mode>,
    read 2026-09-25): the parent page can switch an already-loaded puzzle's
    theme live, without reloading the iframe, by posting
    `{ type: 'updateDarkMode', darkMode: true | false }` to
    `iframe.contentWindow`. This is a **different, AmuseLabs-owned message
    shape**, entirely separate from DCR's own `guardian-puzzle-context`
    blob above - AmuseLabs' docs don't mention `guardian-puzzle-context` at
    all, which is consistent with that shape still being unconfirmed. Two
    things to know before anyone relies on this:
    1. **It requires prior enablement per series**: AmuseLabs' docs state
       "Dark mode syncing via `postMessage` must be enabled for your
       series. Contact us to enable it." - there's no evidence in this
       codebase or its docs that this has been requested/confirmed for any
       of the Guardian's series.
    2. **DCR does not currently send this message at all.** Today, when the
       reader's OS theme changes while on the page, `PuzzleIframe` instead
       gives the `<iframe>` a fresh `src` (a new `darkMode=0|1` query
       param), which the browser treats as a full reload - see "The iframe
       reloads automatically..." above. That achieves the same
       reader-visible outcome (correct theme shown) through a different,
       already-working mechanism, not through this API. Adopting
       `updateDarkMode` instead (to avoid the reload) would be a genuinely
       new, separately-scoped change, not something already covered by the
       existing reload behaviour.

    The same AmuseLabs docs page also documents several iframe→parent
    message types not currently consumed anywhere in this codebase,
    including `PUZZLE_PROGRESS` and `PUZZLE_COMPLETE` - worth checking first
    if "No saved puzzle state / progress persistence" (below) is ever picked
    up, since it may already be the API that bullet says doesn't exist yet
    (unconfirmed either way; not read in detail here beyond their names).

- **Responsive/mobile layout has not been explicitly verified** for Puzzle
  Page or the puzzle iframes themselves (which are entirely provider-
  controlled content). This includes the puzzle iframe's own `min-height`
  at narrower viewports (see "Iframe height at narrower viewports" above):
  the current, generously-estimated value has not been tested against a
  real AmuseLabs embed on a real mobile device, and must be revisited once
  that testing is possible.
- **DCR does not validate that `puzzleDate` is a real, sensible calendar
  date.** Beyond the existing shape check (a non-empty string), nothing in
  DCR confirms `puzzleDate` is an actual calendar date (e.g. rejecting a
  nonexistent `"2026-02-30"`) or a sensible one (e.g. rejecting a wildly
  out-of-range date). Deeper, format-level validation of the date-in-URL
  value is `frontend`'s responsibility at the route level (per its own
  task); true calendar/business-logic validity (e.g. "did this puzzle
  actually exist on this date") is not validated anywhere in the stack yet.
- **DCR's `/PuzzlePage` endpoint now has its own route-level access
  control**, checking `puzzles-new-hub` participation via
  `isPuzzlesHubEnabled` and returning `404` when it isn't enabled, in
  addition to (not instead of) `frontend`'s existing
  `PuzzlesHubExperiment`/`puzzles-new-hub` gate that decides whether a
  reader ever reaches one of these puzzle-page URLs in the first place.
  DCR also has a real, cumulative, code-change-free kill-switch for
  individual _feature tiers_ within the rendered page, see "Feature-tier
  rollout gating (v0/v1/v2)" below.
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
from the public entirely. v0 is now enforced at both layers: `frontend`'s
route-level `PuzzlesHubExperiment` check decides whether a request reaches
`/PuzzlePage` at all, and DCR's `handlePuzzlePage` independently checks
`isPuzzlesHubEnabled` before rendering, so the endpoint isn't left relying
solely on `frontend` never calling it. On top of that v0 gate,
`PuzzlePageLayout.tsx`'s "More from Puzzles & Games" rail is further gated
behind `isPuzzlesHubV1Enabled` (since that rail is v1-scoped, not v0).
When future v1/v2 work is implemented (calendar, progress indicators,
sign-in message, on-the-ball/film-reveal, etc.), it should be gated behind
`isPuzzlesHubV1Enabled`/`isPuzzlesHubV2Enabled` respectively, using the
helpers above, the same way the related-content rail already is.

**No `frontend` repo changes are needed for any of this.** `frontend`'s
existing route-level `PuzzlesHubExperiment` gate (already reusing
`puzzles-new-hub`) is unaffected by `puzzles-new-hub-v1`/
`puzzles-new-hub-v2` and doesn't need to check them.

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
