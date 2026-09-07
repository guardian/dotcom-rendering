# Generic Game Page — Multi-Phase Plan

## Objective

Build a new, generic **Game page** design in dotcom-rendering (DCR) that
unifies rendering for all of the Guardian's puzzle/game types (crosswords,
sudoku, word games, trivia/quizzes, etc.) under one shared layout/design,
based on the existing Crossword article layout (`CrosswordLayout.tsx`), which
already visually matches the target design mockup.

This must **not** touch or risk the existing `/crosswords` article rendering
path in any way.

> **Update (post-Phase-1):** the original plan called for this page to be
> hidden behind a server-side AB test (`game-page-experiment`) until it was
> ready for wider testing. Per explicit user request, that gate has since
> been **removed**: routes will instead be mapped/exposed via a separate
> project later, so gating in DCR was only adding friction to local testing
> with no benefit. `POST /GamePage` now always renders for any known `slug`,
> regardless of `serverSideABTests` content. See "Changelog" below.

## Context (condensed)

1. DCR already renders individual crossword articles via the generic Article
   pipeline: CAPI content has `format.design: 'CrosswordDesign'` →
   `decideDesign()` in `src/lib/articleFormat.ts` maps it to
   `ArticleDesign.Crossword` → `src/layouts/DecideLayout.tsx` picks
   `src/layouts/CrosswordLayout.tsx` → the interactive grid is rendered via
   `src/lib/renderElement.tsx` (case
   `'model.dotcomrendering.pageElements.CrosswordElement'`) →
   `src/components/CrosswordComponent.island.tsx` (wraps the
   `@guardian/react-crossword` package as a hydrating Island). This path is
   **not modified** by this work.
2. DCR's `main` branch also has a separate, unrelated "Puzzles Hub"
   (listing/collection page) scaffold: `src/types/puzzlesPage.ts`
   (`FEPuzzlesPageType`, `PuzzleItem`, `PuzzleContainer`, `PuzzleContent`),
   `src/layouts/PuzzlesLayout.tsx`, `src/components/PuzzlesPage.tsx`,
   `src/server/handler.puzzlesPage.web.ts`,
   `src/server/render.puzzlesPage.web.tsx`, registered as
   `app.post('/PuzzlesPage', handlePuzzlesPage)` in `src/server/server.prod.ts`,
   gated by `src/lib/puzzlesHubExperiment.ts` (`isPuzzlesHubEnabled(config)`
   checks `config.serverSideABTests['puzzles-new-hub'] === 'variant'`, 404
   otherwise). This is the HUB/LISTING page (a directory of all games) — a
   **different concept** from what is built here (an individual GAME page,
   analogous to today's individual crossword article page, but generalised to
   other game types). These files are used purely as a pattern/convention
   reference and are **not modified**.
3. Real, currently-live puzzle/game types and their properties, grouped
   exactly as the target design mockup groups them ("Crosswords", "Logic
   puzzles", "Word games", "Quizzes and Trivia"):

    | slug                                                                                                        | group              | renderMode | provider/notes                                                              | setter | comments | print | archive |
    | ----------------------------------------------------------------------------------------------------------- | ------------------ | ---------- | --------------------------------------------------------------------------- | ------ | -------- | ----- | ------- |
    | crossword (mini/quick/cryptic/quick-cryptic/sunday-quick/prize/everyman/azed/special/genius/speedy/weekend) | crosswords         | component  | existing `@guardian/react-crossword`, reuse `CrosswordComponent.island.tsx` | ✅     | ✅       | ✅    | ✅      |
    | sudoku-easy                                                                                                 | logic-puzzles      | iframe     | AmuseLabs: `set=guardian-sudoku-easy`                                       | ❌     | ❌       | ✅    | ✅      |
    | sudoku-medium                                                                                               | logic-puzzles      | iframe     | AmuseLabs: `set=guardian-sudoku-medium`                                     | ❌     | ❌       | ✅    | ✅      |
    | sudoku-hard                                                                                                 | logic-puzzles      | iframe     | AmuseLabs: `set=guardian-sudoku-hard`                                       | ❌     | ❌       | ✅    | ✅      |
    | sudoku-killer                                                                                               | logic-puzzles      | iframe     | AmuseLabs: `set=guardian-sudoku-killer`                                     | ❌     | ❌       | ✅    | ✅      |
    | futoshiki                                                                                                   | logic-puzzles      | iframe     | AmuseLabs: `set=guardian-futoshiki`                                         | ❌     | ❌       | ✅    | ✅      |
    | suguru                                                                                                      | logic-puzzles      | iframe     | AmuseLabs: `set=guardian-suguru`                                            | ❌     | ❌       | ✅    | ✅      |
    | word-wheel                                                                                                  | word-games         | iframe     | AmuseLabs: `set=guardian-word-wheel`                                        | ❌     | ❌       | ✅    | ✅      |
    | codeword                                                                                                    | word-games         | iframe     | AmuseLabs: `set=guardian-codeword`                                          | ❌     | ❌       | ✅    | ✅      |
    | wordiply                                                                                                    | word-games         | iframe     | bespoke: `https://www.wordiply.com/`                                        | ❌     | ❌       | ✅    | ✅      |
    | on-the-ball                                                                                                 | trivia-and-quizzes | iframe     | bespoke: `https://sportsreveal.io/guardian`                                 | ❌     | ❌       | ✅    | ✅      |
    | film-reveal                                                                                                 | trivia-and-quizzes | iframe     | bespoke: `https://moviegrid.io/guardian`                                    | ❌     | ❌       | ✅    | ✅      |

    All AmuseLabs games share the exact same URL template
    (`https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1`),
    differing only by the `set=guardian-{slug}` query param — modelled as data,
    not near-duplicate code paths.

## Changelog

- **AB gate removed** (post-Phase-1): the `game-page-experiment` server-side
  AB test gate (`src/lib/gamePageExperiment.ts`, `isGamePageEnabled`) was
  removed from `handleGamePage` per explicit user request. Reasoning: the
  `/GamePage` route will be mapped/exposed to real traffic via a **separate
  project** later, so DCR gating it locally was only adding friction to
  testing with no protective benefit at this stage. `POST /GamePage` now
  always renders for any request with a known `slug`, regardless of
  `config.serverSideABTests` content (the field itself is left in
  `FEGamePageType`/`ConfigType` as harmless, unused-by-DCR data — frontend
  does not need to send any particular value for it). The unknown-slug `404`
  behaviour is unaffected. If/when this page needs to be hidden again (e.g.
  ahead of a public rollout), re-introduce an equivalent gate at that point.

## Multi-phase plan

### Phase 1 — DCR generic Game page (this phase)

Implement, in dotcom-rendering only, a new `POST /GamePage` route + layout +
registry + fixtures + tests, fully independent of the Article/Crossword
pipeline and the Puzzles Hub. See "Phase 1 detail" below.

### Phase 2 — Frontend (Play/Scala) integration (parallel session, out of scope here)

A parallel session builds the `frontend` repo route/controller that resolves
real content for each of the 12 game slugs and POSTs a `FEGamePageType`
payload (see "Handoff contract for frontend" below) to DCR's `POST /GamePage`.
That work is not visible to this session and is not attempted here.

### Phase 3 — Map/expose the route in a separate project (future phase, superseding the original "wire the real AB test" plan)

The route will be mapped/exposed to real traffic via a different project
(rather than DCR/`frontend` gating it with an AB test, as originally
planned). Once phases 1 and 2 are integrated end-to-end in a test
environment: validate that project's routing/exposure mechanism end-to-end,
and validate visually against the target mockup in a non-prod environment
before any public rollout.

## Phase 1 detail — key design decisions

- **Layout composition**: `GameLayout.tsx` is a fresh, self-contained layout —
  not a fork of `CrosswordLayout.tsx`, and not a consumer of Article-domain
  composite components (`ArticleMeta`, `ArticleTitle`, `ArticleBody`), because
  those require a full `ArticleFormat` + `TagType[]` + branding/podcast/avatar
  logic that doesn't exist for a generic game page; fabricating fake Article
  data to satisfy their prop contracts would create more coupling/risk than
  benefit, and is exactly the kind of accidental entanglement with the
  crossword article path this work must avoid.
- However, this does **not** mean re-inventing everything. `GameLayout.tsx`
  directly reuses, unmodified, these existing generic building blocks:
  `Masthead`, `Section`, `GridItem`, `AdSlot`/`HeaderAdSlot`/
  `MobileStickyContainer`, `DiscussionLayout`, `Footer`, `Island`, `SubNav`,
  `DecideLines`, `StraightLines`, `RightColumn`, `StickyBottomBanner`,
  `CommentCount.island` (generic, no `ArticleFormat` dependency), and
  `CrosswordSetter` (generic, `{ setter, profileUrl }` only — reused verbatim
  for the setter byline of any game with `setterEnabled`, in practice only
  crosswords in this dataset). `ShareButton.island` is reused too; it takes an
  `ArticleFormat` purely to branch minor styling, so a small,
  locally-constructed `ArticleFormat` value is passed (reusing existing enum
  values as plain data) — this is read-only reuse, not a modification of
  `articleFormat.ts` or the crossword decision logic.
- Genuinely new, small presentational pieces are added only where nothing
  reusable already exists: the puzzle type/group label ("red label" in the
  mockup), a standalone `PrintButton` (today print is inlined inside
  `ArticleMeta.web.tsx`, not a standalone component), and the "More from
  Puzzles & games" rail (reusing the existing `PuzzleItem` type from
  `src/types/puzzlesPage.ts` for data-shape consistency, without
  importing/modifying internal Puzzles Hub layout components).
- `GameConfig` may carry a couple of extra optional fields beyond the minimal
  spec if useful during implementation, keeping the registry as the single
  source of structural truth rather than hard-coding text in the layout.

## Progress tracker

- [x] Create this plan doc, commit as first commit
- [x] `src/types/gamePage.ts` — `FEGamePageType`
- [x] `src/model/games/gameConfigs.ts` — `GameConfig` type + registry for all 12 slugs
- [x] `src/lib/gamePageExperiment.ts` — ~~`isGamePageEnabled` gate (`game-page-experiment`)~~ **removed post-Phase-1** (see Changelog)
- [x] `src/lib/gameComponents.ts` — componentKey → component registry (`crossword` → `CrosswordComponent.island`)
- [x] `src/components/GameIframe.island.tsx` — generic sandboxed iframe island
- [x] `src/layouts/GameLayout.tsx` — new generic layout
- [x] `src/server/handler.gamePage.web.ts` + `src/server/render.gamePage.web.tsx`
- [x] Register `POST /GamePage` in `server.prod.ts` and `server.dev.ts` (+ dev `GET` passthrough route)
- [x] `fixtures/manual/gamePage.ts` — fixtures for all 12 slugs
- [x] Tests: handler, gate, registry validation (mirroring `handler.puzzlesPage.web.test.ts` / `validate.puzzlesPage.test.ts` patterns)
- [x] Lint / typecheck / targeted tests green
- [x] Manual validation steps + frontend handoff contract written up below
- [x] Mark this phase done in this doc

**Phase 1 (DCR) is complete.** All items above are implemented, committed
locally to `afs/puzzles-game-page`, and verified with `tsc --noEmit`,
`eslint`, and the targeted Jest suites below (no full-suite/unrelated runs
were needed). The existing Crossword article path and Puzzles Hub files were
not modified in any way beyond the two purely-additive edits noted below.

Files added:

- `src/types/gamePage.ts`
- `src/model/games/gameConfigs.ts` (+ `gameConfigs.test.ts`)
- `src/lib/gameComponents.ts`
- `src/components/GameIframe.island.tsx`
- `src/components/GamePage.tsx`
- `src/layouts/GameLayout.tsx`
- `src/server/handler.gamePage.web.ts` (+ `.test.ts`)
- `src/server/render.gamePage.web.tsx`
- `fixtures/manual/gamePage.ts`
- `src/model/validate.gamePage.test.ts`

> `src/lib/gamePageExperiment.ts` (+ its test) was added in the initial
> Phase 1 commit and then **removed** in a follow-up commit — see Changelog.

Files edited (purely additive, no existing exports/behaviour changed):

- `src/model/validate.ts` — added `validateAsGamePageType`, reusing the
  module's existing private helpers (`isRecord`, `isNonEmptyString`,
  `isOptionalString`, `isPuzzlesConfig`, `isPuzzleItem`, `editions`); no
  existing validator touched.
- `src/server/server.prod.ts` / `src/server/server.dev.ts` — added the
  `/GamePage` route registrations alongside (not instead of) the existing
  ones.

Targeted test commands run and green:

```
pnpm test -- --testPathPattern "gamePage|gameConfigs"     # 3 suites, 33 tests (post AB-gate removal)
pnpm test -- --testPathPattern "puzzlesPage|puzzlesHubExperiment|validate\."  # confirms no regression: 5 suites, 61 tests
pnpm tsc --noEmit                                          # clean
pnpm exec eslint --quiet <all files listed above>          # clean
```

## Manual validation steps

These steps use only this branch (`afs/puzzles-game-page`) — no `frontend`
repo required.

### 1. Start the DCR dev server

From the `dotcom-rendering` sub-directory:

```
make dev
```

This starts webpack-dev-server on **http://localhost:3030** (per
`webpack/webpack.config.dev-server.js`). Wait for `DEV server running on
http://localhost:3030` and the initial bundle build to finish (first build
can take a couple of minutes).

> If port 3030 is already in use by another process on your machine, stop it
> first (`make dev` will fail with `EADDRINUSE` otherwise).

### 2. Generate fixture JSON files for all 12 slugs

From the `dotcom-rendering` sub-directory, run (uses the `tsx` devDependency
already in the project, no extra install needed):

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

This writes one JSON file per slug to `/tmp/game-fixtures/<slug>.json`. DCR no
longer checks `config.serverSideABTests` for `/GamePage` (the AB gate was
removed — see Changelog), so its content is irrelevant; these fixtures leave
it as an empty object.

### 3. Request each slug and check the expected behaviour

**Component-rendered slug (`crossword`)** — expect `200 OK` and, once the
page hydrates in a browser, an interactive crossword grid (via
`CrosswordComponent.island.tsx`), a setter byline, working share/print
buttons, and a comment count:

```
curl -i -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" \
  --data @/tmp/game-fixtures/crossword.json
```

To view it rendered in a browser rather than just curl the HTML, use the dev
server's GET-with-fixture convention, e.g. open:
`http://localhost:3030/GamePage/https://www.theguardian.com/games/crossword`
is **not** applicable here (that convention fetches real prod content by
URL); for a local fixture, `POST` the JSON with a tool like Postman/Insomnia,
or use a tiny local HTML form / `fetch()` in the browser console pointed at
`http://localhost:3030/GamePage` with the JSON body — the response is a full
HTML document you can save and open directly in a browser to inspect
visually.

**iframe-rendered slugs** (11 remaining: `sudoku-easy`, `sudoku-medium`,
`sudoku-hard`, `sudoku-killer`, `futoshiki`, `suguru`, `word-wheel`,
`codeword`, `wordiply`, `on-the-ball`, `film-reveal`) — expect `200 OK` and,
once hydrated, a sandboxed `<iframe>` pointing at the resolved provider URL
(AmuseLabs URL with `set=guardian-<slug>` for the first 8, or the bespoke
provider URL for the last 3), no setter byline, no comments, but share/print
controls present:

```
for slug in sudoku-easy sudoku-medium sudoku-hard sudoku-killer futoshiki suguru word-wheel codeword wordiply on-the-ball film-reveal; do
  echo "=== $slug ==="
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3030/GamePage \
    -H "Content-Type: application/json" \
    --data @/tmp/game-fixtures/$slug.json
done
```

All should print `200`.

### 4. No AB gate — `serverSideABTests` content is irrelevant

There is no AB gate on `/GamePage` anymore (removed post-Phase-1, see
Changelog). `POST /GamePage` renders successfully for a known `slug`
regardless of `config.serverSideABTests` content — no header/query-param
workaround is needed. You can confirm this directly:

```
# empty serverSideABTests still renders (200):
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" --data @/tmp/game-fixtures/crossword.json

# an arbitrary/unrelated serverSideABTests value still renders (200):
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" \
  --data @<(python3 -c "import json; d=json.load(open('/tmp/game-fixtures/crossword.json')); d['config']['serverSideABTests']={'unrelated-test':'variant'}; print(json.dumps(d))")
```

Both should print `200`.

### 5. Unknown slug

```
curl -i -X POST http://localhost:3030/GamePage \
  -H "Content-Type: application/json" \
  --data @<(python3 -c "import json; d=json.load(open('/tmp/game-fixtures/crossword.json')); d['slug']='not-a-real-game'; print(json.dumps(d))")
```

Expect `404 Not Found` (unknown slugs are not in DCR's `GameConfig` registry —
this check is unrelated to the removed AB gate and still applies).

### 6. Automated checks

```
cd dotcom-rendering
pnpm tsc --noEmit
pnpm exec eslint --quiet src/model/validate.ts src/server/server.dev.ts src/server/server.prod.ts \
  fixtures/manual/gamePage.ts src/components/GameIframe.island.tsx src/components/GamePage.tsx \
  src/layouts/GameLayout.tsx src/lib/gameComponents.ts src/model/games/ \
  src/model/validate.gamePage.test.ts src/server/handler.gamePage.web.test.ts \
  src/server/handler.gamePage.web.ts src/server/render.gamePage.web.tsx src/types/gamePage.ts
pnpm test -- --testPathPattern "gamePage|gameConfigs"
```

## Handoff contract for frontend

Frontend (Play/Scala) should `POST` a JSON body matching `FEGamePageType`
(`src/types/gamePage.ts`) to DCR's `POST /GamePage`. Field-by-field:

```ts
interface FEGamePageType {
	id: string; // any stable identifier for this page instance
	slug: string; // MUST be one of the 12 slugs DCR's registry knows about:
	// crossword, sudoku-easy, sudoku-medium, sudoku-hard,
	// sudoku-killer, futoshiki, suguru, word-wheel, codeword,
	// wordiply, on-the-ball, film-reveal
	// (an unknown slug gets a 404 from DCR)
	webTitle: string;
	config: ConfigType; // the same shape frontend already sends for /Article,
	// /PuzzlesPage etc. `config.serverSideABTests` can be included for
	// forward-compatibility but DCR does NOT check it for /GamePage — there
	// is no AB gate on this route (removed post-Phase-1, see Changelog).
	// Any value (including an empty object) works; the page always renders
	// for a known `slug`.
	nav: FENavType; // same shape as for /Article, /PuzzlesPage
	pageFooter: FooterType; // same shape as for /Article, /PuzzlesPage
	canonicalUrl: string;
	editionId: EditionId; // 'UK' | 'US' | 'AU' | 'INT' | 'EUR'
	instance: {
		title: string; // required
		puzzleType?: string; // e.g. "Quick crossword" — the red label
		setterName?: string; // only meaningful if the slug's GameConfig has setterEnabled
		date?: string; // free-form display date string
		specialInstructions?: string;
		discussionId?: string; // only meaningful if the slug's GameConfig has commentsEnabled
		crosswordData?: unknown; // ONLY for slug: 'crossword' — the raw crossword
		// element JSON, same shape as today's
		// model.dotcomrendering.pageElements.CrosswordElement
		// (a CAPICrossword: crosswordType, date, dimensions,
		// entries[], id, name, number, solutionAvailable, ...)
		moreFromPuzzlesAndGames?: PuzzleItem[]; // same PuzzleItem shape as src/types/puzzlesPage.ts
	};
}
```

Notes for frontend:

- DCR owns which slugs exist and how each one is rendered/gated (setter,
  comments, share, print, archive) via its own `GameConfig` registry — frontend
  does not need to send any of that structural metadata, only `slug` plus the
  per-instance content in `instance`.
- For all 11 non-crossword slugs, `instance.crosswordData` should be omitted;
  DCR resolves the iframe `src` itself from its registry (AmuseLabs URL
  template with `set=guardian-<slug>`, or the bespoke provider URL) — frontend
  does not need to construct or send any iframe URL.
- A concrete, realistic example fixture for every slug is available in this
  branch at `fixtures/manual/gamePage.ts` (`createGamePage(slug)` /
  `gamePageFixtures`) and can be dumped to JSON with the `tsx` script in
  step 2 above — use these as the ground truth for the exact JSON shape.
- There is no AB test to satisfy for `/GamePage` to render — frontend does
  not need to send any particular `serverSideABTests` value. (The route will
  instead be mapped/exposed to real traffic via a separate project later; see
  Changelog and Phase 3.)
