import type { LinkType } from '../model/extract-nav';

/**
 * A hardcoded replica of the real crossword page's header sub-nav row
 * (`Masthead`/`Titlepiece/SubNav.tsx`, fed by `NAV.subNavSections` there -
 * e.g. "Crosswords / Blog / Quick / Sunday quick / ..."), per explicit
 * design direction: the same visual row/pattern, but with Puzzles & Games'
 * own top-level categories instead of Crosswords' own series list.
 *
 * `NAV.subNavSections` (as sent by `frontend`) reflects generic,
 * page-specific navigation `frontend` resolves for its own pages; Puzzle
 * Page requests don't carry a meaningful equivalent of the crossword
 * page's series sub-nav, so this is a fixed, design-provided list instead
 * of anything derived from `NAV`/`FEPuzzlePageType`.
 *
 * None of "Crosswords"/"Word games"/"Logic puzzles"/"Trivia & quizzes" have
 * a real V0 equivalent (per explicit design direction, V0 is scoped to the
 * single puzzle instance itself), so the whole row of child links is only
 * shown once the v1 rollout tier is active for this request
 * (`isPuzzlesHubV1Enabled`, the same flag gating the "More from Puzzles &
 * Games" rail) - the `PUZZLES_SUBNAV_PARENT` "Puzzles & games" link
 * is the only one still shown on V0. "Crosswords"/"Word games"/"Logic
 * puzzles" link to their existing production archive pages (`frontend`,
 * not DCR), per explicit design direction; "Trivia & quizzes" is only added with v2 and links to its
 * (not yet built) DCR hub instead, and is expected to 404 until that work
 * ships, exactly like this layout's other pre-existing "not built yet"
 * placeholder links (see `docs/puzzle-page.md`).
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
