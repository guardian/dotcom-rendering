# Game Page

## What it is

Game Page is a single, generic page template that unifies all Guardian
puzzle/game types (crosswords, sudoku, word games, quizzes/trivia, etc.)
under one shared layout/design. **This repo (dotcom-rendering / DCR) owns
the whole thing on the rendering side**: the `POST /GamePage` endpoint, the
`GameConfig` registry that decides how each game type behaves and renders,
the `GameLayout` layout/styling, and the component/iframe rendering logic.
The `frontend` (Play/Scala) repo is responsible for fetching/assembling
per-instance content (title, setter, date, crossword data, etc., where any
exists) and POSTing it to this endpoint as JSON.

See the `frontend` repo's `docs/game-page.md` for the exact JSON payload
frontend sends today, how it currently only sources real content for the
`crossword` slug, and how to wire up real content for a new slug from the
frontend/content-fetching side.

## Current status: what actually works today

Rendering is wired up for all **12 slugs** currently in the `GameConfig`
registry (`src/model/games/gameConfigs.ts`):

- **`crossword`** (`renderMode: 'component'`) renders via
  `CrosswordComponent.island.tsx` (the same, unmodified component used by
  today's live `/crosswords` article pages, wrapping `@guardian/react-crossword`),
  hydrated as a critical Island. This is the only slug with a real,
  content-backed setter byline, comments, and a "PDF version" link.
- **The other 11 slugs** — `sudoku-easy`, `sudoku-medium`, `sudoku-hard`,
  `sudoku-killer`, `futoshiki`, `suguru`, `word-wheel`, `codeword`,
  `wordiply`, `on-the-ball`, `film-reveal` (all `renderMode: 'iframe'`) —
  render via the generic `GameIframe.island.tsx`, which points a sandboxed
  `<iframe>` at a URL resolved from each entry's `iframe` config (see
  "Field reference" below). This part is genuinely wired up and works for
  all 11 today; what frontend actually sends as instance content for them is
  currently minimal (see the frontend doc), but DCR will render whatever it
  is given.

So, from DCR's side, there is **no gap between "routed" and "rendering"** —
every slug in the registry renders through one of these two paths. The gap
that exists is on the frontend side (per-instance content sourcing), not
here.

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
the plan doc's changelog at `docs/puzzles-game-page-plan.md` for why).

Generate fixture JSON for all 12 slugs using the `tsx` devDependency (no
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
# crossword — component render, renders the interactive grid once hydrated:
curl -i -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" --data @/tmp/game-fixtures/crossword.json

# any iframe-rendered slug, e.g. sudoku-easy:
curl -i -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-easy.json

# unknown slug -> 404:
curl -i -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" \
  --data @<(python3 -c "import json; d=json.load(open('/tmp/game-fixtures/crossword.json')); d['slug']='not-a-real-game'; print(json.dumps(d))")
```

### All 12 slugs, one by one

Once you've run the fixture-dump script above (`/tmp/game-fixtures/<slug>.json`
for each of the 12 slugs), here is the exact local command to hit each one
individually. **These are DCR's own local `POST` endpoint, not a real,
browsable end-user URL** — `/GamePage` only accepts `POST` requests with a
JSON body; DCR is not directly browsable by real users without `frontend` in
front of it constructing and sending that body (see the `frontend` repo's
`docs/game-page.md` for the real, user-facing routes it exposes).

| `slug`          | `gameGroup`          | `renderMode` | local command                                                                                                                      |
| --------------- | -------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `crossword`     | `crosswords`         | `component`  | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/crossword.json`     |
| `sudoku-easy`   | `logic-puzzles`      | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-easy.json`   |
| `sudoku-medium` | `logic-puzzles`      | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-medium.json` |
| `sudoku-hard`   | `logic-puzzles`      | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-hard.json`   |
| `sudoku-killer` | `logic-puzzles`      | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/sudoku-killer.json` |
| `futoshiki`     | `logic-puzzles`      | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/futoshiki.json`     |
| `suguru`        | `logic-puzzles`      | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/suguru.json`        |
| `word-wheel`    | `word-games`         | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/word-wheel.json`    |
| `codeword`      | `word-games`         | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/codeword.json`      |
| `wordiply`      | `word-games`         | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/wordiply.json`      |
| `on-the-ball`   | `trivia-and-quizzes` | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/on-the-ball.json`   |
| `film-reveal`   | `trivia-and-quizzes` | `iframe`     | `curl -i -X POST http://localhost:3030/GamePage -H "Content-Type: application/json" --data @/tmp/game-fixtures/film-reveal.json`   |

All twelve should return `200`. For the `component` row (`crossword`) the
response HTML hydrates into an interactive crossword grid; for every
`iframe` row it hydrates into a sandboxed `<iframe>` pointed at that slug's
resolved provider URL (see `GameConfig.iframe`/`resolveIframeUrl()` in the
"Field reference" section below).

`docs/puzzles-game-page-plan.md` has a longer, step-by-step version of this
(all 12 slugs, expected behaviour per `renderMode`), written during initial
implementation — this doc is the ongoing reference, that one is a
point-in-time planning/tracking record.

## How to configure/add a new game type

This is the most important section for anyone extending Game Page. There are
up to three places to touch, and (currently, honestly) one of them is not as
generic as it should be — read (3) carefully.

### 1. Add an entry to the `GameConfig` registry

File: **`src/model/games/gameConfigs.ts`**. Add a new key to the exported
`gameConfigs` record, keyed by the exact `slug` string frontend will send.
Every entry needs:

```ts
{
  slug: '<the-slug>',           // MUST equal the object key (validated at load time, see below)
  gameGroup: 'crosswords' | 'logic-puzzles' | 'word-games' | 'trivia-and-quizzes',
  renderMode: 'component' | 'iframe',
  // exactly one of the following two, matching renderMode:
  componentKey: '<key>',         // renderMode: 'component' only
  iframe: { provider: '<name>', urlTemplate: '<url, may contain {slug}>' }, // renderMode: 'iframe' only
  setterEnabled: boolean,
  commentsEnabled: boolean,
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
`gameGroup`/`renderMode` isn't one of the known values, a `component` entry
is missing `componentKey`, an `iframe` entry is missing `iframe`, or an entry
has both/neither. This is a real, load-time fail-fast check — get the shape
right and it self-verifies; get it wrong and the app won't boot rather than
silently misbehaving at request time. `src/model/games/gameConfigs.test.ts`
covers this validation and is the place to add a test for a new entry too.

### 2. If `renderMode: 'component'`, register the React component

File: **`src/lib/gameComponents.ts`**. This file exports a
`componentKey -> component` map (`gameComponents`) intended as the lookup
DCR uses for `component`-rendered games, plus an `isGameComponentKey` type
guard. **Today it only has one entry (`crossword -> CrosswordComponent`).**

### 3. `GameLayout.tsx` — read this before assuming "just add config and go"

For the 11 `iframe` slugs, the layout genuinely is fully generic: adding a
new AmuseLabs/bespoke-iframe entry to the registry (step 1) requires **no**
changes to `src/layouts/GameLayout.tsx` — `GameContent` calls the generic
`resolveIframeUrl(gameConfig)` + `GameIframe` for any `renderMode: 'iframe'`
config, unconditionally.

**For a new `renderMode: 'component'` game type, this is currently NOT
fully generic and honesty requires flagging it:** `GameLayout.tsx`'s
`GameContent` component does not actually consult the
`src/lib/gameComponents.ts` registry from step 2 — it hardcodes the
crossword case directly:

```ts
if (gameConfig.renderMode === 'component') {
	if (hasCrosswordData(gameConfig, instance)) {
		return (
			<Island priority="critical" defer={{ until: 'visible' }}>
				<CrosswordComponent
					data={instance.crosswordData as CrosswordProps['data']}
					canRenderAds={true}
				/>
			</Island>
		);
	}
	return null;
}
```

`src/lib/gameComponents.ts` is, right now, **unused dead code** — nothing
imports `gameComponents` or `isGameComponentKey` outside of that file itself.
So: adding a **second** `component`-rendered game type today requires editing
`GameContent` in `GameLayout.tsx` by hand to add a branch for it (and, if it
needs its own header/PDF-link-style extras like `CrosswordLinks`, those are
similarly hardcoded to the crossword case right now and would need a
similar new conditional). Wiring `GameContent` to actually look up
`gameComponents[gameConfig.componentKey]` generically would be a reasonable
follow-up refactor before a second `component` game type is added, rather
than continuing to hardcode more cases — flagged here rather than silently
worked around.

### 4. Nothing else changes on the DCR side

No route changes, no handler changes, no validation changes are needed for a
new registry entry — `handleGamePage` looks up `GameConfig` by whatever
`slug` frontend sends, and 404s only for slugs missing from the registry.
The only thing needed from `frontend` is a request whose `slug` matches your
new registry key exactly — see the `frontend` repo's `docs/game-page.md`
(its "how to configure/add a new game type" section) for what to add there
(e.g. `iframeSlugTitles`, or a real content-fetch path if the new game needs
one).

## Field reference

### `GameConfig` (`src/model/games/gameConfigs.ts`)

| Field                | Type                                                                      | What it actually controls                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`               | `string`                                                                  | The identifier frontend sends in `FEGamePageType.slug`; must equal this entry's key in the `gameConfigs` record. Used to resolve which config applies to an incoming request, and (for `iframe` configs) substituted into `iframe.urlTemplate`.                                                                                                                                                                                 |
| `gameGroup`          | `'crosswords' \| 'logic-puzzles' \| 'word-games' \| 'trivia-and-quizzes'` | Decides the fallback puzzle-type label text (`gameGroupLabels` in `GameLayout.tsx`) shown when `instance.puzzleType` isn't sent, and whether that label renders as a real link — only `'crosswords'` currently has an entry in `puzzleGroupHrefs` (linking to `/crosswords`); every other group renders the label as plain, non-linked text because there's no hub page to link to yet.                                         |
| `renderMode`         | `'component' \| 'iframe'`                                                 | Which branch of `GameContent` (in `GameLayout.tsx`) renders the puzzle body. `'component'` renders a React component looked up (today: hardcoded, see step 3 above) by `componentKey`. `'iframe'` renders `GameIframe` pointed at `resolveIframeUrl(gameConfig)`.                                                                                                                                                               |
| `componentKey`       | `string \| undefined`                                                     | Required (and only meaningful) when `renderMode: 'component'`. Intended as the lookup key into `src/lib/gameComponents.ts`'s `gameComponents` map; today only `'crossword'` is meaningful, since `GameContent` doesn't yet consult that map generically.                                                                                                                                                                        |
| `iframe.provider`    | `string \| undefined`                                                     | Required when `renderMode: 'iframe'`. A human-readable label for which third-party (or in-house) provider serves the game (`'amuselabs'`, `'wordiply'`, `'sportsreveal'`, `'moviegrid'`). Not currently rendered anywhere in the UI — informational/documentation only.                                                                                                                                                         |
| `iframe.urlTemplate` | `string \| undefined`                                                     | Required when `renderMode: 'iframe'`. The iframe `src` URL. May contain a literal `{slug}` token, replaced with this config's `slug` by `resolveIframeUrl()` (e.g. the AmuseLabs template `https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1` becomes `...set=guardian-sudoku-easy...` for the `sudoku-easy` entry). Bespoke providers like `wordiply` have no `{slug}` token and are used as-is. |
| `setterEnabled`      | `boolean`                                                                 | Whether `GameLayout` renders the `CrosswordSetter` byline. Actually shown only when this is `true` **and** the request's `instance.setterName` is present — currently only the `crossword` entry has this `true`.                                                                                                                                                                                                               |
| `commentsEnabled`    | `boolean`                                                                 | Whether `GameLayout` renders the comment count (`CommentCount.island`) in the meta row and the comments `Section`/`DiscussionLayout` further down the page. Actually shown only when this is `true` **and** the request's `instance.discussionId` is present — currently only `crossword` has this `true`.                                                                                                                      |
| `shareEnabled`       | `boolean`                                                                 | Whether the `ShareButton.island` renders in the meta row. All 12 current entries have this `true`.                                                                                                                                                                                                                                                                                                                              |
| `printEnabled`       | `boolean`                                                                 | Whether the `PrintButton` (a small `window.print()` button local to `GameLayout.tsx`) renders in the meta row. All 12 current entries have this `true`.                                                                                                                                                                                                                                                                         |
| `hasArchive`         | `boolean`                                                                 | **Not currently consumed anywhere in rendering.** All 12 entries set this `true`; there's no archive-link UI in `GameLayout` yet that reads it. Reserved for a future "browse past puzzles" feature — treat it as a documented placeholder, not a working feature, until something actually branches on it.                                                                                                                     |

### `FEGamePageType` / `instance` (`src/types/gamePage.ts`)

This is the exact request contract `POST /GamePage` validates
(`validateAsGamePageType` in `src/model/validate.ts`) and accepts. It should
match the frontend repo's equivalent table — flag a mismatch as a bug in
either doc if you spot one.

| Field                              | Type                                                   | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                               | `string`                                               | Any stable identifier for the page instance; used as `pageId` for `Masthead`/`ShareButton`, and as part of the generated `id="game-page-<slug>"` fixture convention (not enforced by validation).                                                                                                                                                                                                                                                                                                                                                                              |
| `slug`                             | `string`                                               | Looked up in the `GameConfig` registry; unknown slug -> `404`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `webTitle`                         | `string`                                               | Page `<title>` / share text.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `config`                           | `ConfigType`                                           | Same shape frontend sends for `/Article`, `/PuzzlesPage`, etc. Validated only for having a `serverSideABTests: Record<string, string>` shape (`isPuzzlesConfig`, shared helper) — its content is otherwise unused by this route (no AB gate).                                                                                                                                                                                                                                                                                                                                  |
| `nav`                              | `FENavType`                                            | Same shape as other routes; extracted via `extractNAV()` before rendering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `pageFooter`                       | `FooterType`                                           | Same shape as other routes; passed straight to `Footer`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `canonicalUrl`                     | `string`                                               | Used for the page's canonical link tag.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `editionId`                        | `EditionId` (`'UK' \| 'US' \| 'AU' \| 'INT' \| 'EUR'`) | Validated against the known edition set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `instance.title`                   | `string` (required)                                    | Rendered as the page `<h1>`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `instance.puzzleType`              | `string?`                                              | The red "kicker" label text (e.g. `"Quick crossword"`); falls back to a `gameGroup`-derived label (see `GameConfig.gameGroup` above) if omitted.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `instance.setterName`              | `string?`                                              | Rendered via `CrosswordSetter` only if `GameConfig.setterEnabled` is also `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `instance.date`                    | `string?`                                              | Rendered as a **raw, unformatted string** next to the meta row — DCR does no date parsing/formatting/timezone conversion. Frontend must pre-format this.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `instance.specialInstructions`     | `string?`                                              | Rendered as a plain `<p>` in the meta area.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `instance.discussionId`            | `string?`                                              | Used as the discussion `shortUrlId` for both `CommentCount` and `DiscussionLayout`, only if `GameConfig.commentsEnabled` is also `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `instance.crosswordData`           | `unknown?`                                             | **Not structurally validated at all** by `validateAsGamePageType` — only checked for presence. Only meaningful when the resolved `GameConfig` is the `crossword` entry; passed straight through (cast) to `CrosswordComponent`/`CrosswordLinks` as `CrosswordProps['data']` (a `CAPICrossword`-shaped object from `@guardian/react-crossword` — `crosswordType`, `date`, `dimensions`, `entries[]`, `id`, `name`, `number`, `solutionAvailable`, optional `pdf`, etc.). Sending malformed data for a crossword request will fail at React-render time, not at validation time. |
| `instance.moreFromPuzzlesAndGames` | `PuzzleItem[]?` (from `src/types/puzzlesPage.ts`)      | **Genuinely rendered**, if present and non-empty: shown as a "More from Puzzles & games" list (`RelatedGamesRail` in `GameLayout.tsx`) — currently a plain `<ul>` of links/titles, not a styled card rail. Each item is validated with the same `isPuzzleItem` helper used by the (unrelated) Puzzles Hub payload.                                                                                                                                                                                                                                                             |

## Known limitations / not yet implemented

- **No access control of any kind.** The AB gate (`game-page-experiment`)
  was removed per explicit request (see `docs/puzzles-game-page-plan.md`'s
  changelog) — any request with a valid body and a known `slug` renders. The
  route is expected to be exposed to real traffic via a separate project
  later; that's out of DCR's hands but is why there's currently no gate here.
- **Only `crossword` has a real `component` implementation**, and adding a
  second one is not yet a config-only change — see "How to configure/add a
  new game type" step 3 above. `src/lib/gameComponents.ts`'s registry exists
  but is unused dead code today.
- **`hasArchive` is a documented placeholder, not a working feature** — no
  UI reads it yet.
- **`instance.crosswordData` isn't structurally validated** — a malformed
  payload for the `crossword` slug will fail at render time inside
  `CrosswordComponent`/`CrosswordLinks`, not with a clean `400`.
- **`instance.date` is opaque, unformatted text** — no date/locale handling
  exists in DCR for Game Page.
- **The "More from Puzzles & games" rail is minimal** (`RelatedGamesRail`):
  a plain list, not the card-based rail style used elsewhere on the site —
  nobody has sent real `moreFromPuzzlesAndGames` data end-to-end yet, so this
  hasn't been visually refined against real content.
- **Visual parity with the real DCR crossword page** (compare locally
  against `http://localhost:9000/crosswords/quick/17578?dcr=true`, **not**
  the plain URL, which can fall back to a legacy non-DCR render if the
  `DCRCrosswords` switch is off) has had two known gaps fixed so far: the
  "PDF version" link (`CrosswordLinks`) and the puzzle-type label rendering
  as a real, styled section link rather than plain text. No other visual
  differences have been reported as of this writing, but this comparison
  hasn't been exhaustively re-verified after every change — treat the real
  crossword page as the source of truth for anything that looks off, and
  update this section when new gaps are found and fixed.
- **The Puzzles Hub (`src/layouts/PuzzlesLayout.tsx` and friends) is a
  separate, unrelated feature** (a directory/listing page) and is not
  touched by, or documented in, this file.
