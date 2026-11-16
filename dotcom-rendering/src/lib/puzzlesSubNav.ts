import type { LinkType } from '../model/extract-nav';

/**
 * Shared category sub-nav for the main hub, archive, puzzle and crossword pages.
 * Use this list rather than frontend's page-specific `NAV.subNavSections`
 * so the hub includes the same rollout-gated categories as game pages.
 * The hub keeps the parent inline with the category links; archive and game pages
 * supply it separately as `subNavSections.parent`.
 *
 * V0 shows only the parent link. V1 adds Crosswords, Word games and Logic
 * puzzles; V2 also adds Trivia & quizzes, linking to its archive.
 */
export const PUZZLES_SUBNAV_PARENT: LinkType = {
	title: 'Puzzles & games',
	longTitle: 'Puzzles & games',
	url: '/puzzles-and-games',
};

const PUZZLES_SUBNAV_LINKS: LinkType[] = [
	{
		title: 'Crosswords',
		longTitle: 'Crosswords',
		url: '/puzzles-and-games/crosswords/archive',
	},
	{
		title: 'Word games',
		longTitle: 'Word games',
		url: '/puzzles-and-games/word-games/archive',
	},
	{
		title: 'Logic puzzles',
		longTitle: 'Logic puzzles',
		url: '/puzzles-and-games/logic-puzzles/archive',
	},
];

/** Only shown once the v2 tier is on (`isPuzzlesHubV2Enabled`). */
const TRIVIA_SUBNAV_LINK: LinkType = {
	title: 'Trivia & quizzes',
	longTitle: 'Trivia & quizzes',
	url: '/puzzles-and-games/trivia-and-quizzes/archive',
};

export const getPuzzlesSubNavLinks = (
	isV1Enabled: boolean,
	isV2Enabled: boolean,
): LinkType[] => {
	if (!isV1Enabled) return [];
	return isV2Enabled
		? [...PUZZLES_SUBNAV_LINKS, TRIVIA_SUBNAV_LINK]
		: PUZZLES_SUBNAV_LINKS;
};
