import type { ConfigType } from '../types/config';
import type { EditionId } from './edition';

/**
 * The editions the Puzzles & Games hub is available in.
 *
 * To roll the hub out to another edition, add its id here. Keep this in sync
 * with `PuzzlesHubAccess.scala` in `frontend`, which applies the same rule
 * before it ever calls DCR.
 */
export const PUZZLES_HUB_EDITIONS: readonly EditionId[] = ['INT'];

type PuzzlesHubAccessConfig = Pick<ConfigType, 'edition'>;

/**
 * The single source of truth for whether the Puzzles & Games hub (and the
 * puzzle pages, navigation and crossword changes that go with it) is
 * available for this request.
 *
 * True when the request's edition is one of `PUZZLES_HUB_EDITIONS`, or in
 * local development.
 */
export const isPuzzlesHubAvailable = ({
	edition,
}: PuzzlesHubAccessConfig): boolean =>
	process.env.NODE_ENV === 'development' ||
	PUZZLES_HUB_EDITIONS.includes(edition);
