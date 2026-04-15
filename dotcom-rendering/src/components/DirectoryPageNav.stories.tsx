import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { DirectoryPageNav } from './DirectoryPageNav';

const meta = preview.meta({
	component: DirectoryPageNav,
	title: 'Components/Directory Page Nav',
	parameters: {
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
				'light desktop': allModes['light desktop'],
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
});

export const WomensEuro2025 = meta.story({
	args: {
		pageId: 'football/women-s-euro-2025/table',
	},
});

export const WorldCup2026 = meta.story({
	args: {
		pageId: 'football/world-cup-2026',
	},
});

export const WorldCup2026Fixtures = meta.story({
	args: {
		pageId: 'football/world-cup-2026/fixtures',
	},
});

export const OtherCompetition = meta.story({
	args: {
		pageId: 'football/premierleague/table',
	},
});

export const WinterOlympics = meta.story({
	args: {
		pageId: 'sport/winter-olympics-2026',
	},
});
