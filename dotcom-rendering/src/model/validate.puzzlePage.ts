import { isString } from '@guardian/libs';
import type { FEPuzzlePageType } from '../types/puzzlePage';
import {
	editions,
	isNonEmptyString,
	isOptionalString,
	isPuzzleItem,
	isPuzzlesConfig,
	isRecord,
} from './validate';

/**
 * Puzzle Page's own validation, split out from the general `validate.ts`
 * per PR #16700 review feedback ("wondering if it might be better placed
 * in something like puzzles.validate.ts... so we're not mixing too much
 * code with the user-related logic"). Reuses the small set of generic
 * helpers (`isRecord`, `isNonEmptyString`, `isPuzzlesConfig`, `isPuzzleItem`,
 * `editions`) exported from `validate.ts` rather than duplicating them.
 *
 * Note: unlike some other DCR page types, there was no pre-existing
 * `validate.<pageType>.ts` file to mirror here — every other page type's
 * validator (including the unrelated Puzzles Hub's `validateAsPuzzlesPageType`)
 * still lives in the shared `validate.ts`, only their *tests* are split
 * into per-page-type files (e.g. `validate.puzzlesPage.test.ts`). This file
 * establishes the new, more separated convention requested in review for
 * Puzzle Page specifically, rather than claiming to follow an existing one.
 */

const isPuzzlePageInstance = (value: unknown): boolean => {
	if (!isRecord(value)) return false;

	return (
		isNonEmptyString(value.title) &&
		isOptionalString(value.puzzleDate) &&
		(value.moreFromPuzzlesAndGames === undefined ||
			(Array.isArray(value.moreFromPuzzlesAndGames) &&
				value.moreFromPuzzlesAndGames.every((item) =>
					isPuzzleItem(item, false),
				)))
	);
};

export const validateAsPuzzlePageType = (data: unknown): FEPuzzlePageType => {
	if (
		isRecord(data) &&
		isNonEmptyString(data.id) &&
		isNonEmptyString(data.slug) &&
		isNonEmptyString(data.webTitle) &&
		isPuzzlesConfig(data.config) &&
		isRecord(data.nav) &&
		isRecord(data.pageFooter) &&
		isNonEmptyString(data.canonicalUrl) &&
		isString(data.editionId) &&
		editions.has(String(data.editionId)) &&
		isPuzzlePageInstance(data.instance)
	) {
		return data as unknown as FEPuzzlePageType;
	}

	throw new TypeError('Unable to validate request body for puzzle page.');
};
