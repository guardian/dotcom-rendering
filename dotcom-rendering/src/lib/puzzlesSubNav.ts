import type { LinkType } from '../model/extract-nav';

/**
 * Shared category sub-nav for the main hub, archive, puzzle and crossword pages.
 * Use this list rather than frontend's page-specific `NAV.subNavSections`
 * so the hub includes the same rollout-gated categories as game pages.
 * The hub keeps the parent inline with the category links; archive and game pages
 * supply it separately as `subNavSections.parent`.
 *
 * Without hub access only the parent link is shown. Hub access (edition gate)
 * adds Crosswords, Word games, Logic puzzles and Trivia & quizzes.
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
	{
		title: 'Trivia & quizzes',
		longTitle: 'Trivia & quizzes',
		url: '/puzzles-and-games/trivia-and-quizzes/archive',
	},
];

export const getPuzzlesSubNavLinks = (isHubAvailable: boolean): LinkType[] =>
	isHubAvailable ? PUZZLES_SUBNAV_LINKS : [];
