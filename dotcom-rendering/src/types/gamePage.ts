import type { EditionId } from '../lib/edition';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FENavType } from './frontend';
import type { PuzzleItem } from './puzzlesPage';

/**
 * The instance-specific data for a single Game page: the concrete content
 * (title, setter, date, etc.) resolved by frontend for a given game `slug`.
 *
 * `crosswordData` carries the raw crossword element JSON (the same shape as
 * today's `model.dotcomrendering.pageElements.CrosswordElement`) and is only
 * present when the resolved `GameConfig` for `slug` has
 * `renderMode: 'component'` with `componentKey: 'crossword'`.
 */
export interface GamePageInstance {
	title: string;
	/** e.g. "Quick crossword" — the red label shown in the mockup. */
	puzzleType?: string;
	setterName?: string;
	date?: string;
	specialInstructions?: string;
	/** Only relevant when the resolved `GameConfig.commentsEnabled` is true. */
	discussionId?: string;
	/**
	 * Raw crossword element JSON. Only present when `slug` resolves to the
	 * crossword game. Left as `unknown` here as DCR's `GameConfig` registry
	 * (not this payload type) is the source of truth for how to interpret it.
	 */
	crosswordData?: unknown;
	moreFromPuzzlesAndGames?: PuzzleItem[];
}

/**
 * The request payload contract for `POST /GamePage`, modeled closely on
 * `FEPuzzlesPageType` (see `src/types/puzzlesPage.ts`) for consistency of
 * conventions between the two, unrelated, puzzles-related page types.
 */
export interface FEGamePageType {
	id: string;
	/** Looked up in DCR's `GameConfig` registry (`src/model/games/gameConfigs.ts`). */
	slug: string;
	webTitle: string;
	config: ConfigType;
	nav: FENavType;
	pageFooter: FooterType;
	canonicalUrl: string;
	editionId: EditionId;
	instance: GamePageInstance;
}
