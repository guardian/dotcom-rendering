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
/** Corner radius of the "In progress" bar. */
export const PUZZLES_PROGRESS_RADIUS = 2;

export const puzzlesFocusOutline = `3px solid ${palette('--puzzles-focus-outline')}`;
