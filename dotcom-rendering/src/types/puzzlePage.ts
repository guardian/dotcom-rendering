import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';
import type { PuzzleItem } from './puzzlesPage';

/**
 * The instance-specific data for a single Puzzle Page: the concrete content
 * (currently just the title, plus optional related-content links) resolved
 * by frontend for a given puzzle `slug`.
 *
 * Puzzle Page is scoped to iframe-based puzzles only, there is no
 * component-rendered case (crosswords remain on their existing, separate
 * `/crosswords/*` flow), so this type carries no crossword-specific fields.
 */
export interface PuzzlePageInstance {
	title: string;
	puzzleId?: string;
	/**
	 * Which day's puzzle the reader wants to see, as a plain date string
	 * (e.g. `"2026-09-11"`). `frontend` now always resolves and sends this
	 * for every request (its Puzzle Page URLs carry a date segment), so it
	 * is rendered as a human-readable date next to the page title
	 * (`formatPuzzleDate` in `src/lib/puzzleDate.ts`) and passed straight
	 * through, unformatted, as `PuzzleContext.puzzleDate` to the puzzle
	 * iframe (`src/components/PuzzleIframe.island.tsx`). DCR still treats
	 * the field as optional and does not parse the URL or own the
	 * date-in-path/redirect-to-archive logic itself, it just receives
	 * whatever `frontend` resolved. See "Open questions" in
	 * `docs/puzzle-page.md`.
	 *
	 * Unrelated to the removed crossword-only `date` field this type used
	 * to have (a formatted *display* string like "Mon 7 Sep 2026"):
	 * `puzzleDate` is a *request/selection* input, not display text.
	 */
	puzzleDate?: string;
	moreFromPuzzlesAndGames?: PuzzleItem[];
}

/**
 * The request payload contract for `POST /PuzzlePage`, modeled closely on
 * `FEPuzzlesPageType` (see `src/types/puzzlesPage.ts`) for consistency of
 * conventions between the two, unrelated, puzzles-related page types.
 */
export interface FEPuzzlePageType {
	id: string;
	/** Looked up in DCR's `PuzzleConfig` registry (`src/model/puzzles/puzzleConfigs.ts`). */
	slug: string;
	webTitle: string;
	config: ConfigType;
	nav: FENavType;
	pageFooter: FooterType;
	canonicalUrl: string;
	editionId: EditionId;
	instance: PuzzlePageInstance;
	/**
	 * Whether the requesting reader has paid for an ad-free subscription,
	 * mirroring the same top-level field every other DCR page contract
	 * carries (`ArticleDeprecated`/`Front`/`TagPage`/`SportDataPage`/
	 * `FEPuzzlesPageType`, the sibling Puzzles Hub type - see
	 * `PuzzlesLayout.tsx`'s `!puzzlesPage.isAdFreeUser` and
	 * `src/lib/canRenderAds.ts`). Puzzle Page's contract did not carry this
	 * field until now, a real gap: ads were rendered unconditionally,
	 * risking showing them to a reader who has actually paid not to see
	 * them. `PuzzlePageLayout.tsx` now gates every ad slot on
	 * `canRenderAds(puzzlePage)` (reusing the shared, generic helper) the
	 * same way every other ad-supported page type already does.
	 *
	 * **Optional**, not required: unlike `FEPuzzlesPageType` (a page type
	 * `frontend` was already sending this field for), `frontend`'s existing
	 * `/PuzzlePage` requests do not send it yet - `frontend` needs its own,
	 * coordinated follow-up change to start doing so (see
	 * `docs/puzzle-page.md`'s note on cross-repo contract changes). Making
	 * it required here would have broken every real request in the
	 * meantime with a `500`/validation failure. Treated as `false`
	 * (ads-eligible) when absent via `puzzlePage.isAdFreeUser ?? false` in
	 * `PuzzlePageLayout.tsx`, matching this contract's pre-existing
	 * behaviour (ads always rendered) until `frontend` is updated.
	 */
	isAdFreeUser?: boolean;
}
