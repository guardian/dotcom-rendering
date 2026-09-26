import { isString } from '@guardian/libs';
import type { FEPuzzlePageType } from '../types/puzzlePage';
import type { PuzzleCardVariant, PuzzleItem } from '../types/puzzlesPage';

/**
 * Puzzle Page's own validation, split out from the general `validate.ts`
 * per PR #16700 review feedback ("wondering if it might be better placed
 * in something like puzzles.validate.ts... so we're not mixing too much
 * code with the user-related logic").
 *
 * Note: unlike some other DCR page types, there was no pre-existing
 * `validate.<pageType>.ts` file to mirror here, every other page type's
 * validator (including the unrelated Puzzles Hub's `validateAsPuzzlesPageType`)
 * still lives in the shared `validate.ts`, only their *tests* are split
 * into per-page-type files (e.g. `validate.puzzlesPage.test.ts`). This file
 * establishes the new, more separated convention requested in review for
 * Puzzle Page specifically, rather than claiming to follow an existing one.
 *
 * These helpers used to be imported from the shared `validate.ts`
 * (`isRecord`, `isNonEmptyString`, `isOptionalString`, `isPuzzlesConfig`,
 * `isPuzzleItem`, `editions`). They are now defined locally in this file
 * instead: `validate.ts`'s Puzzles Hub validation logic (`isPuzzleItem` and
 * friends) is owned by, and actively evolving under, a different team's
 * work (the Puzzles Hub listing page), and depending on those shared
 * exports meant this file's compilation was at risk of breaking whenever
 * that unrelated logic changed shape, exactly what happened when that
 * team's rewrite (merged via `main`) removed the exported helpers and the
 * `puzzleCardVariants`/`puzzlePageVariants` value-arrays this file's
 * `isPuzzleItem` depended on. Puzzle Page's validation is intentionally
 * self-contained now: no dependency on `validate.ts`'s internals at all.
 */

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === 'string' && value.trim().length > 0;

const isOptionalString = (value: unknown): boolean =>
	value === undefined || typeof value === 'string';

const isStringRecord = (value: unknown): boolean =>
	isRecord(value) && Object.values(value).every(isString);

const isPuzzlesConfig = (value: unknown): boolean =>
	isRecord(value) && isStringRecord(value.serverSideABTests);

const editions = new Set(['UK', 'US', 'AU', 'INT', 'EUR']);

const stableIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const colourPattern = /^#[0-9a-f]{6}$/i;

const isOptionalColour = (value: unknown): boolean =>
	value === undefined ||
	(typeof value === 'string' && colourPattern.test(value));

const puzzleCardVariants: PuzzleCardVariant[] = [
	'large',
	'primary',
	'compact',
	'archive',
];

/**
 * Validates a single `PuzzleItem` (used for `instance.moreFromPuzzlesAndGames`
 * entries). `archiveSlot` controls whether an `'archive'` `cardVariant` is
 * required (`true`) or disallowed, requiring a non-empty `cadence` instead
 * (`false`); Puzzle Page always calls this with `archiveSlot: false`, since
 * the "More from Puzzles & Games" rail is not an archive slot.
 */
const isPuzzleItem = (
	value: unknown,
	archiveSlot: boolean,
): value is PuzzleItem => {
	if (!isRecord(value)) return false;
	const cardVariant = value.cardVariant;
	const pageVariant = value.variant;

	return (
		isNonEmptyString(value.id) &&
		stableIdPattern.test(value.id) &&
		isNonEmptyString(value.title) &&
		isNonEmptyString(value.type) &&
		isNonEmptyString(value.set) &&
		isString(cardVariant) &&
		puzzleCardVariants.includes(cardVariant as PuzzleCardVariant) &&
		(archiveSlot
			? cardVariant === 'archive'
			: cardVariant !== 'archive' && isNonEmptyString(value.cadence)) &&
		isOptionalString(value.cadence) &&
		isOptionalString(value.url) &&
		isOptionalString(value.image) &&
		isOptionalString(value.slug) &&
		(value.index === undefined || Number.isInteger(value.index)) &&
		(pageVariant === undefined || isString(pageVariant)) &&
		isOptionalColour(value.backgroundColour)
	);
};

const isPuzzlePageInstance = (value: unknown): boolean => {
	if (!isRecord(value)) return false;

	return (
		isNonEmptyString(value.title) &&
		isOptionalString(value.puzzleId) &&
		isOptionalString(value.puzzleDate) &&
		(value.moreFromPuzzlesAndGames === undefined ||
			(Array.isArray(value.moreFromPuzzlesAndGames) &&
				value.moreFromPuzzlesAndGames.every((item) =>
					isPuzzleItem(item, false),
				)))
	);
};

const isOptionalBoolean = (value: unknown): boolean =>
	value === undefined || typeof value === 'boolean';

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
		isPuzzlePageInstance(data.instance) &&
		// `isAdFreeUser` is optional, not required: `frontend` does not
		// send it yet on real `/PuzzlePage` requests (needs its own,
		// coordinated follow-up change - see `FEPuzzlePageType.isAdFreeUser`'s
		// doc comment), so requiring it here would 500 every real request
		// until then.
		isOptionalBoolean(data.isAdFreeUser)
	) {
		return data as unknown as FEPuzzlePageType;
	}

	throw new TypeError('Unable to validate request body for puzzle page.');
};
