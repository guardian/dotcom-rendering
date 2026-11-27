import type { LinkType } from '../model/extract-nav';

/**
 * Shared category sub-nav for the main hub, archive, puzzle and crossword pages.
 * Use this list rather than frontend's page-specific `NAV.subNavSections`
 * so the hub includes the same categories as game pages.
 * The hub keeps the parent inline with the category links; archive and game pages
 * supply it separately as `subNavSections.parent`.
 */
export const PUZZLES_SUBNAV_PARENT: LinkType = {
	title: 'Puzzles & games',
	longTitle: 'Puzzles & games',
	url: '/puzzles-and-games',
};

export const PUZZLES_SUBNAV_LINKS: LinkType[] = [
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
	{
		title: 'Trivia & quizzes',
		longTitle: 'Trivia & quizzes',
		url: '/puzzles-and-games/trivia-and-quizzes/archive',
	},
];
