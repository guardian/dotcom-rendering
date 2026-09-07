# Generic Game Page — Multi-Phase Plan

## Objective

Build a new, generic **Game page** design in dotcom-rendering (DCR) that
unifies rendering for all of the Guardian's puzzle/game types (crosswords,
sudoku, word games, trivia/quizzes, etc.) under one shared layout/design,
based on the existing Crossword article layout (`CrosswordLayout.tsx`), which
already visually matches the target design mockup.

This must **not** touch or risk the existing `/crosswords` article rendering
path in any way, and must be hidden from the general public in production
behind the existing server-side AB test framework, testable by manually
forcing participation.

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

   | slug | group | renderMode | provider/notes | setter | comments | print | archive |
   |---|---|---|---|---|---|---|---|
   | crossword (mini/quick/cryptic/quick-cryptic/sunday-quick/prize/everyman/azed/special/genius/speedy/weekend) | crosswords | component | existing `@guardian/react-crossword`, reuse `CrosswordComponent.island.tsx` | ✅ | ✅ | ✅ | ✅ |
   | sudoku-easy | logic-puzzles | iframe | AmuseLabs: `set=guardian-sudoku-easy` | ❌ | ❌ | ✅ | ✅ |
   | sudoku-medium | logic-puzzles | iframe | AmuseLabs: `set=guardian-sudoku-medium` | ❌ | ❌ | ✅ | ✅ |
   | sudoku-hard | logic-puzzles | iframe | AmuseLabs: `set=guardian-sudoku-hard` | ❌ | ❌ | ✅ | ✅ |
   | sudoku-killer | logic-puzzles | iframe | AmuseLabs: `set=guardian-sudoku-killer` | ❌ | ❌ | ✅ | ✅ |
   | futoshiki | logic-puzzles | iframe | AmuseLabs: `set=guardian-futoshiki` | ❌ | ❌ | ✅ | ✅ |
   | suguru | logic-puzzles | iframe | AmuseLabs: `set=guardian-suguru` | ❌ | ❌ | ✅ | ✅ |
   | word-wheel | word-games | iframe | AmuseLabs: `set=guardian-word-wheel` | ❌ | ❌ | ✅ | ✅ |
   | codeword | word-games | iframe | AmuseLabs: `set=guardian-codeword` | ❌ | ❌ | ✅ | ✅ |
   | wordiply | word-games | iframe | bespoke: `https://www.wordiply.com/` | ❌ | ❌ | ✅ | ✅ |
   | on-the-ball | trivia-and-quizzes | iframe | bespoke: `https://sportsreveal.io/guardian` | ❌ | ❌ | ✅ | ✅ |
   | film-reveal | trivia-and-quizzes | iframe | bespoke: `https://moviegrid.io/guardian` | ❌ | ❌ | ✅ | ✅ |

   All AmuseLabs games share the exact same URL template
   (`https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1`),
   differing only by the `set=guardian-{slug}` query param — modelled as data,
   not near-duplicate code paths.

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

### Phase 3 — Wire the real AB test + production validation (future phase)

Once phases 1 and 2 are integrated end-to-end in a test environment: create
the real `game-page-experiment` server-side AB test in the AB testing
framework/config used by `frontend`/Fastly, validate the header/participation
flow end-to-end (request header → Play → `config.serverSideABTests` on the
POST body → DCR gate), and validate visually against the target mockup in a
non-prod environment before any public rollout.

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
- [ ] `src/types/gamePage.ts` — `FEGamePageType`
- [ ] `src/model/games/gameConfigs.ts` — `GameConfig` type + registry for all 12 slugs
- [ ] `src/lib/gamePageExperiment.ts` — `isGamePageEnabled` gate (`game-page-experiment`)
- [ ] `src/lib/gameComponents.ts` — componentKey → component registry (`crossword` → `CrosswordComponent.island`)
- [ ] `src/components/GameIframe.island.tsx` — generic sandboxed iframe island
- [ ] `src/layouts/GameLayout.tsx` — new generic layout
- [ ] `src/server/handler.gamePage.web.ts` + `src/server/render.gamePage.web.tsx`
- [ ] Register `POST /GamePage` in `server.prod.ts` and `server.dev.ts` (+ dev `GET` passthrough route)
- [ ] `fixtures/manual/gamePage.ts` — fixtures for all 12 slugs
- [ ] Tests: handler, gate, registry validation (mirroring `handler.puzzlesPage.web.test.ts` / `validate.puzzlesPage.test.ts` patterns)
- [ ] Lint / typecheck / targeted tests green
- [ ] Manual validation steps + frontend handoff contract written up below
- [ ] Mark this phase done in this doc

## Manual validation steps

_(to be filled in as the final step of this phase, once the implementation is complete)_

## Handoff contract for frontend

_(to be filled in as the final step of this phase — exact `FEGamePageType` JSON shape to `POST` to `/GamePage`)_
