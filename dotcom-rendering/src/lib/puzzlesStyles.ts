import { palette } from '../palette';

/**
 * Style values repeated across the Puzzles & games pages that have no
 * equivalent in `@guardian/source`. Numbers are in px.
 */

/** Space between the page edge and the content, below "mobileMedium". */
export const PUZZLES_EDGE_INSET = 10;
/** The 20px inset from "desktop", minus the container's 1px side border. */
export const PUZZLES_BORDERED_INSET = 19;
/** Inset of the content beside the left column's 1px divider. */
export const PUZZLES_COLUMN_INSET = 9;
/** Space between rows of puzzle cards from "tablet". */
export const PUZZLES_ROW_GAP = 26;

/**
 * Width of the left column of the Puzzle Page and archive grids. The "More
 * from" rail and the calendar legend line up with it.
 */
export const PUZZLES_LEFT_COLUMN = { leftCol: 140, wide: 220 } as const;
/** Width of the section title column of the hub. */
export const PUZZLES_TITLE_COLUMN = { leftCol: 170, wide: 250 } as const;
/** Space above a hub section title, below "leftCol". */
export const PUZZLES_SECTION_TITLE_TOP = 6;
/** Maximum width of the hub's cards and useful links. */
export const PUZZLES_CONTENT_MAX_WIDTH = { tablet: 700, desktop: 940 } as const;

/** The "In progress" bar shown on cards and in the archive. */
export const PUZZLES_PROGRESS_BAR = {
	width: 80,
	height: 3,
	radius: 2,
} as const;
/** Background of the unfilled part of the "In progress" bar. */
export const puzzlesProgressTrackBackground =
	'color-mix(in srgb, currentColor 20%, transparent)';
/** The tick shown next to "Played". */
export const PUZZLES_PLAYED_BADGE = { size: 14, icon: 11 } as const;

export const puzzlesFocusOutline = `3px solid ${palette('--puzzles-focus-outline')}`;
