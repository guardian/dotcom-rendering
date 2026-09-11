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
 * Puzzle Page is scoped to iframe-based puzzles only — there is no
 * component-rendered case (crosswords remain on their existing, separate
 * `/crosswords/*` flow), so this type carries no crossword-specific fields.
 */
export interface PuzzlePageInstance {
	title: string;
	/**
	 * Which day's puzzle the reader wants to see, as a plain date string
	 * (e.g. `"2026-09-11"`). This is prep work for a future V1
	 * calendar-navigation feature (the reader will be able to navigate from
	 * a calendar to a specific past puzzle, so the page won't always show
	 * "today's" puzzle) — DCR currently accepts and validates this field
	 * but does **not** yet wire it into any rendering logic or the iframe
	 * URL. See "Open questions" in `docs/puzzle-page.md`.
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
}
