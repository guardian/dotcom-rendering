# Game Page

## What it is

Game Page is a single, generic page template for the Guardian's
**iframe-based** puzzle/game types (sudoku, word games, quizzes/trivia,
etc.). **This repo (dotcom-rendering / DCR) owns the whole thing on the
rendering side**: the `POST /GamePage` endpoint, the `GameConfig` registry
that decides how each game type behaves and renders, and the `GameLayout`
layout/styling. The `frontend` (Play/Scala) repo is responsible for
fetching/assembling per-instance content and POSTing it to this endpoint as
JSON.

**Crosswords are explicitly out of scope**, by product decision, and remain
on their existing, separate `/crosswords/*` flow
(`ArticleDesign.Crossword` / `src/layouts/CrosswordLayout.tsx` / the generic
Article pipeline) — that flow is unrelated to Game Page and is not touched
by, or documented in, this file. Game Page was originally scoped to include
crosswords too; that plan was dropped, and the crossword-specific code that
had been added here (a `component` render mode, `CrosswordComponent`,
`CrosswordLinks`, `CrosswordSetter`, comments, a setter byline) has since
been removed. See `docs/puzzles-game-page-plan.md`'s changelog for that
history if you need it, but treat this file as the current, ongoing truth.

See the `frontend` repo's `docs/game-page.md` for the exact JSON payload
frontend sends today and how to wire up real content for a new slug from the
frontend/content-fetching side. Note: on the frontend side, the standalone
`GamePageController` no longer exists either — its logic was merged into
`PuzzlesPageController`, with all crossword-fetching code removed, matching
this repo's scope reduction.

## Current status: what actually works today

Rendering is wired up for all **11 slugs** currently in the `GameConfig`
registry (`src/model/games/gameConfigs.ts`): `sudoku-easy`, `sudoku-medium`,
`sudoku-hard`, `sudoku-killer`, `futoshiki`, `suguru`, `word-wheel`,
`codeword`, `wordiply`, `on-the-ball`, `film-reveal`. Every one of them
renders via the generic `GameIframe.island.tsx`, which points a sandboxed
iframe at a URL resolved from that entry's `iframe` config (see "Field
reference" below).

This is genuinely wired up and works for all 11 today — Game Page is now
iframe-only **by design**, not as a temporary gap. There is no
component-rendered case at all any more. What frontend actually sends as
instance content beyond the title is currently minimal (see the frontend
doc), but DCR will render whatever it is given.

## Hitting it locally

Start the dev server (from the `dotcom-rendering` sub-directory):

```
make dev
```

This starts webpack-dev-server on `http://localhost:3030`
(`webpack/webpack.config.dev-server.js`).

There is currently **no AB gate** on this route. `src/server/handler.gamePage.web.ts`
today is:

```ts
export const handleGamePage: RequestHandler = ({ body }, res) => {
	const gamePage = validateAsGamePageType(body);

	const gameConfig = getGameConfig(gamePage.slug);

	if (!gameConfig) {
		res.sendStatus(404);
		return;
	}

	const { html, prefetchScripts } = renderGamePage({
		gamePage: { ...gamePage, gameConfig },
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
```

i.e. any request with a **structurally valid** `FEGamePageType` body and a
**known** `slug` renders unconditionally (`200`); an unknown `slug` gets
`404`; a structurally invalid body throws (surfaces as a `500` via Express's
default error handling, same as `/PuzzlesPage` and other routes). There is
no `serverSideABTests`/participation check of any kind — it was removed (see
`docs/puzzles-game-page-plan.md`'s changelog for why).

Generate fixture JSON for all 11 slugs using the `tsx` devDependency (no
extra install needed) and `fixtures/manual/gamePage.ts`'s `createGamePage`/
`gamePageFixtures`:

```
cat > /tmp/dump-game-fixtures.ts <<'EOF'
import * as fs from 'fs';
import { gamePageFixtures } from './fixtures/manual/gamePage';

fs.mkdirSync('/tmp/game-fixtures', { recursive: true });
for (const [slug, page] of Object.entries(gamePageFixtures)) {
	fs.writeFileSync(`/tmp/game-fixtures/${slug}.json`, JSON.stringify(page, null, 2));
}
console.log('wrote', Object.keys(gamePageFixtures).length, 'fixtures to /tmp/game-fixtures');
EOF
pnpm exec tsx /tmp/dump-game-fixtures.ts
```

Then hit the route directly:

```
curl -i -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-easy.json

# unknown slug -> 404:
curl -i -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" \
  --data @<(python3 -c "import json; d=json.load(open('/tmp/game-fixtures/sudoku-easy.json')); d['slug']='not-a-real-game'; print(json.dumps(d))")
```

`docs/puzzles-game-page-plan.md` has a longer, step-by-step version of this,
written during initial implementation — this doc is the ongoing reference,
that one is a point-in-time planning/tracking record (and predates the
crossword-scope removal, so treat anything crossword-related in it as
historical, not current).

### All 11 slugs, one by one

Once you've run the fixture-dump script above (`/tmp/game-fixtures/<slug>.json`
for each of the 11 slugs), here is the exact local command to hit each one
individually. **These are DCR's own local `POST` endpoint, not a real,
browsable end-user URL** — `/GamePage` only accepts `POST` requests with a
JSON body; DCR is not directly browsable by real users without `frontend` in
front of it constructing and sending that body (see the `frontend` repo's
`docs/game-page.md` for the real, user-facing routes it exposes).

| `slug`          | `gameGroup`          | local command                                                                                                                      |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `sudoku-easy`   | `logic-puzzles`      | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-easy.json`   |
| `sudoku-medium` | `logic-puzzles`      | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-medium.json` |
| `sudoku-hard`   | `logic-puzzles`      | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-hard.json`   |
| `sudoku-killer` | `logic-puzzles`      | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-killer.json` |
| `futoshiki`     | `logic-puzzles`      | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/futoshiki.json`     |
| `suguru`        | `logic-puzzles`      | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/suguru.json`        |
| `word-wheel`    | `word-games`         | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/word-wheel.json`    |
| `codeword`      | `word-games`         | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/codeword.json`      |
| `wordiply`      | `word-games`         | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/wordiply.json`      |
| `on-the-ball`   | `trivia-and-quizzes` | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/on-the-ball.json`   |
| `film-reveal`   | `trivia-and-quizzes` | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/film-reveal.json`   |

All eleven should return `200`, hydrating into a sandboxed iframe pointed at
that slug's resolved provider URL (see
`GameConfig.iframe`/`resolveIframeUrl()` in the "Field reference" section
below).

## How to configure/add a new game type

There are two places to touch, and both are genuinely config-only — the
layout does not need any changes for a new iframe-based slug.

### 1. Add an entry to the `GameConfig` registry

File: **`src/model/games/gameConfigs.ts`**. Add a new key to the exported
`gameConfigs` record, keyed by the exact `slug` string frontend will send.
Every entry needs:

```ts
{
  slug: '<the-slug>',           // MUST equal the object key (validated at load time, see below)
  gameGroup: 'crosswords' | 'logic-puzzles' | 'word-games' | 'trivia-and-quizzes',
  iframe: { provider: '<name>', urlTemplate: '<url, may contain {slug}>' },
  shareEnabled: boolean,
  printEnabled: boolean,
  hasArchive: boolean,
}
```

If the new game is another AmuseLabs-hosted title (like the existing
sudoku/futoshiki/suguru/word-wheel/codeword entries), reuse the
`amuseLabsGame(slug, gameGroup)` helper already in that file rather than
writing the object out by hand.

`validateGameConfigs(gameConfigs)` runs once at module load and throws a
`TypeError` immediately if: the entry's `slug` doesn't match its object key,
`gameGroup` isn't one of the known values, or `iframe.provider`/
`iframe.urlTemplate` is missing/empty. This is a real, load-time fail-fast
check — get the shape right and it self-verifies; get it wrong and the app
won't boot rather than silently misbehaving at request time.
`src/model/games/gameConfigs.test.ts` covers this validation and is the
place to add a test for a new entry too.

### 2. Nothing else changes on the DCR side

`GameLayout.tsx`'s `GameContent` unconditionally renders `GameIframe`
pointed at `resolveIframeUrl(gameConfig)` for every entry — there is no
branching left to extend, so adding a registry entry (step 1) is the whole
change on this side. No route changes, no handler changes, no validation
changes are needed either — `handleGamePage` looks up `GameConfig` by
whatever `slug` frontend sends, and 404s only for slugs missing from the
registry.

The only thing needed from `frontend` is a request whose `slug` matches your
new registry key exactly — see the `frontend` repo's `docs/game-page.md`
(its "how to configure/add a new game type" section) for what to add there
(e.g. `iframeSlugTitles`).

## Field reference

### `GameConfig` (`src/model/games/gameConfigs.ts`)

| Field                | Type                                                                      | What it actually controls                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`               | `string`                                                                  | The identifier frontend sends in `FEGamePageType.slug`; must equal this entry's key in the `gameConfigs` record. Used to resolve which config applies to an incoming request, and substituted into `iframe.urlTemplate`.                                                                                                                                                                  |
| `gameGroup`          | `'crosswords' \| 'logic-puzzles' \| 'word-games' \| 'trivia-and-quizzes'` | Decides the puzzle-type label text (`gameGroupLabels` in `GameLayout.tsx`), rendered as plain, non-linked text — there's no per-group hub page to link to yet. No current registry entry uses `'crosswords'` (that value is retained in the type purely as a taxonomy label, not as rendering logic — crosswords have no presence in this registry).                                      |
| `iframe.provider`    | `string`                                                                  | A human-readable label for which third-party (or in-house) provider serves the game (`'amuselabs'`, `'wordiply'`, `'sportsreveal'`, `'moviegrid'`). Not currently rendered anywhere in the UI — informational/documentation only.                                                                                                                                                         |
| `iframe.urlTemplate` | `string`                                                                  | The iframe `src` URL. May contain a literal `{slug}` token, replaced with this config's `slug` by `resolveIframeUrl()` (e.g. the AmuseLabs template `https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1` becomes `...set=guardian-sudoku-easy...` for the `sudoku-easy` entry). Bespoke providers like `wordiply` have no `{slug}` token and are used as-is. |
| `shareEnabled`       | `boolean`                                                                 | Whether the `ShareButton.island` renders in the meta row. All 11 current entries have this `true`.                                                                                                                                                                                                                                                                                        |
| `printEnabled`       | `boolean`                                                                 | Whether the `PrintButton` (a small `window.print()` button local to `GameLayout.tsx`) renders in the meta row. All 11 current entries have this `true`.                                                                                                                                                                                                                                   |
| `hasArchive`         | `boolean`                                                                 | **Not currently consumed anywhere in rendering.** All 11 entries set this `true`; there's no archive-link UI in `GameLayout` yet that reads it. Reserved for a future "browse past puzzles" feature — treat it as a documented placeholder, not a working feature, until something actually branches on it.                                                                               |

Removed in the crossword-scope reduction: `renderMode` (there was only ever
one mode left — `iframe` — once `component` was removed, so the field itself
was removed rather than kept as dead, always-`'iframe'` data) and
`componentKey` (had no meaning without a `component` render mode).
`setterEnabled` and `commentsEnabled` were also removed — every remaining
registry entry had them permanently `false` once crossword (their only
`true` case) was removed, and the rendering code they gated (a setter
byline, a comment count, a comments section) was deleted along with them
(see "Known limitations" below for the reasoning in full).

### `FEGamePageType` / `instance` (`src/types/gamePage.ts`)

This is the exact request contract `POST /GamePage` validates
(`validateAsGamePageType` in `src/model/validate.ts`) and accepts. It should
match the frontend repo's equivalent table — flag a mismatch as a bug in
either doc if you spot one.

| Field                              | Type                                                   | Notes                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                               | `string`                                               | Any stable identifier for the page instance; used as `pageId` for `Masthead`/`ShareButton`, and as part of the generated `id="game-page-<slug>"` fixture convention (not enforced by validation).                                                                                                                  |
| `slug`                             | `string`                                               | Looked up in the `GameConfig` registry; unknown slug -> `404`.                                                                                                                                                                                                                                                     |
| `webTitle`                         | `string`                                               | Page `<title>` / share text.                                                                                                                                                                                                                                                                                       |
| `config`                           | `ConfigType`                                           | Same shape frontend sends for `/Article`, `/PuzzlesPage`, etc. Validated only for having a `serverSideABTests: Record<string, string>` shape (`isPuzzlesConfig`, shared helper) — its content is otherwise unused by this route (no AB gate).                                                                      |
| `nav`                              | `FENavType`                                            | Same shape as other routes; extracted via `extractNAV()` before rendering.                                                                                                                                                                                                                                         |
| `pageFooter`                       | `FooterType`                                           | Same shape as other routes; passed straight to `Footer`.                                                                                                                                                                                                                                                           |
| `canonicalUrl`                     | `string`                                               | Used for the page's canonical link tag.                                                                                                                                                                                                                                                                            |
| `editionId`                        | `EditionId` (`'UK' \| 'US' \| 'AU' \| 'INT' \| 'EUR'`) | Validated against the known edition set.                                                                                                                                                                                                                                                                           |
| `instance.title`                   | `string` (required)                                    | Rendered as the page `<h1>`, and as the iframe `title` attribute for accessibility.                                                                                                                                                                                                                                |
| `instance.moreFromPuzzlesAndGames` | `PuzzleItem[]?` (from `src/types/puzzlesPage.ts`)      | **Genuinely rendered**, if present and non-empty: shown as a "More from Puzzles & games" list (`RelatedGamesRail` in `GameLayout.tsx`) — currently a plain `<ul>` of links/titles, not a styled card rail. Each item is validated with the same `isPuzzleItem` helper used by the (unrelated) Puzzles Hub payload. |

Removed in the crossword-scope reduction: `puzzleType`, `setterName`,
`date`, `specialInstructions`, `discussionId`, `crosswordData` — these were
only ever populated for the crossword case, which no longer exists in this
feature. Frontend has already stopped sending all of them (they were always
`undefined` on the frontend side even before this repo's fields were
removed).

## Known limitations / not yet implemented

- **No access control of any kind.** The AB gate (`game-page-experiment`)
  was removed per explicit request (see `docs/puzzles-game-page-plan.md`'s
  changelog) — any request with a valid body and a known `slug` renders. The
  route is expected to be exposed to real traffic via a separate project
  later; that's out of DCR's hands but is why there's currently no gate here.
- **`hasArchive` is a documented placeholder, not a working feature** — no
  UI reads it yet.
- **The "More from Puzzles & games" rail is minimal** (`RelatedGamesRail`):
  a plain list, not the card-based rail style used elsewhere on the site —
  nobody has sent real `moreFromPuzzlesAndGames` data end-to-end yet, so this
  hasn't been visually refined against real content.
- **No setter byline, no comments, no "PDF version" link.** These existed
  briefly while Game Page still included the crossword slug (backed by
  `CrosswordSetter`, `DiscussionLayout`/`CommentCount.island`, and
  `CrosswordLinks` respectively) and were removed along with the crossword
  case, since none of the 11 remaining iframe-based games have any
  equivalent concept today (`setterEnabled`/`commentsEnabled` were always
  `false` for all of them). If a future iframe-based game type genuinely
  needs comments or a byline, that rendering will need to be re-added
  deliberately — it is not lurking anywhere as dead code today.
- **Crosswords are out of scope by design, not by gap.** They remain
  entirely on the pre-existing `/crosswords/*` / `ArticleDesign.Crossword` /
  `CrosswordLayout.tsx` flow, which this doc does not cover.
- **The Puzzles Hub (`src/layouts/PuzzlesLayout.tsx` and friends) is a
  separate, unrelated feature** (a directory/listing page) and is not
  touched by, or documented in, this file.
