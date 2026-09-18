import type { PuzzleConfig } from '../../src/model/puzzles/puzzleConfigs';
import { puzzleConfigs } from '../../src/model/puzzles/puzzleConfigs';
import type { FEPuzzlePageType } from '../../src/types/puzzlePage';
import type { PuzzleItem } from '../../src/types/puzzlesPage';
import { Standard } from '../generated/fe-articles/Standard';

const sampleMoreFromPuzzlesAndGames: PuzzleItem[] = [
	{
		id: 'sudoku-easy-daily',
		title: 'Sudoku easy',
		type: 'sudoku-easy',
		set: 'all',
		cardVariant: 'compact',
		cadence: 'Daily',
		slug: 'sudoku-easy',
	},
	{
		id: 'word-wheel-daily',
		title: 'Word wheel',
		type: 'word-wheel',
		set: 'all',
		cardVariant: 'compact',
		cadence: 'Daily',
		slug: 'word-wheel',
	},
];

/**
 * Illustrative canonical URL matching `frontend`'s public URL shape for
 * puzzle pages (top-level, mirroring crosswords, distinct from the
 * `/puzzles-and-games` hub), purely a fixture value, not something DCR
 * validates or enforces the shape of.
 */
const canonicalUrlForSlug = (slug: string): string => {
	const sudokuMatch = /^sudoku-(.+)$/.exec(slug);
	if (sudokuMatch) {
		return `https://www.theguardian.com/sudoku/${sudokuMatch[1]}`;
	}
	return `https://www.theguardian.com/${slug}`;
};

/**
 * Builds a `FEPuzzlePageType` fixture for the given `slug`, defaulting to a
 * generic instance for that slug's `PuzzleConfig`. Pass `overrides` to
 * customise individual fields (deep-merged only one level for `instance`).
 */
export const createPuzzlePage = (
	slug: string,
	overrides: Partial<FEPuzzlePageType> = {},
): FEPuzzlePageType => {
	const puzzleConfig = puzzleConfigs[slug];

	if (!puzzleConfig) {
		throw new Error(`Unknown puzzle slug in fixture: ${slug}`);
	}

	return {
		id: `puzzle-page-${slug}`,
		slug,
		webTitle: `${slug} | The Guardian`,
		config: {
			...Standard.config,
			contentType: 'Game',
			serverSideABTests: { 'puzzles-new-hub': 'variant' },
		},
		nav: Standard.nav,
		pageFooter: Standard.pageFooter,
		canonicalUrl: canonicalUrlForSlug(slug),
		editionId: Standard.editionId,
		instance: {
			title: `${slug} puzzle`,
			puzzleDate: '2026-09-11',
			moreFromPuzzlesAndGames: sampleMoreFromPuzzlesAndGames,
		},
		isAdFreeUser: false,
		...overrides,
	};
};

/** One fixture per supported slug, for local dev preview and tests. */
export const puzzlePageFixtures: Record<string, FEPuzzlePageType> = Object.keys(
	puzzleConfigs,
).reduce<Record<string, FEPuzzlePageType>>((acc, slug) => {
	acc[slug] = createPuzzlePage(slug);
	return acc;
}, {});

/**
 * A fixture-only illustrative preview/share image URL. None of the real
 * `puzzleConfigs` registry entries have a real image configured yet (see
 * docs/puzzle-page.md) - this exists purely so both the with-image and
 * without-image branches of Puzzle Page's OG/Twitter metadata have fixture
 * and test coverage, without inventing a placeholder image for the real
 * registry itself.
 */
export const samplePuzzleImageUrl =
	'https://i.guim.co.uk/img/media/fixture-only-example/puzzle-preview.jpg?width=1200&height=630&quality=85';

/**
 * Returns a copy of `slug`'s real `PuzzleConfig` with `image` set to
 * `samplePuzzleImageUrl` - a fixture-only variant for exercising the
 * with-image branch (the real registry entry itself is left untouched).
 */
export const createPuzzleConfigWithImage = (slug: string): PuzzleConfig => {
	const puzzleConfig = puzzleConfigs[slug];

	if (!puzzleConfig) {
		throw new Error(`Unknown puzzle slug in fixture: ${slug}`);
	}

	return { ...puzzleConfig, image: samplePuzzleImageUrl };
};
