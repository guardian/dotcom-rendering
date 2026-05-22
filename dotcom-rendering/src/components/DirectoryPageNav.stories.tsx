import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { BetaABTests } from '../experiments/lib/beta-ab-tests';
import { setBetaABTests } from '../lib/useAB';
import { DirectoryPageNav } from './DirectoryPageNav';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ConfigProvider } from './ConfigContext';

const mockAB = new BetaABTests({
	isServer: true,
	serverSideABTests: {
		'webx-world-cup-2026-subnav': 'enable',
	},
});
setBetaABTests(mockAB);

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

export const WorldCup2026MatchCenter = meta.story({
	args: {
		pageId: 'football/world-cup-2026/overview',
	},
});

export const WorldCup2026ArticleWeb = meta.story({
	args: {
		pageId: 'football/2026/may/19/brazils-world-cup-squad-offers-a-hint-of-the-magical-pragmatism-of-1994',
		pageTags: [
			{
				id: 'football/world-cup-2026',
				type: 'Topic',
				title: 'World Cup 2026',
			},
		],
	},
});

export const WorldCup2026ArticleApp = meta.story({
	render: (args) => (
		<ConfigProvider
			value={{
				renderingTarget: 'Apps',
				darkModeAvailable: true,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<DirectoryPageNav {...args} />
		</ConfigProvider>
	),
	args: {
		pageId: 'football/2026/may/19/brazils-world-cup-squad-offers-a-hint-of-the-magical-pragmatism-of-1994',
		pageTags: [
			{
				id: 'football/world-cup-2026',
				type: 'Topic',
				title: 'World Cup 2026',
			},
		],
	},
	parameters: {
		chromatic: {
			modes: {
				'apps light': allModes['light'],
				'apps dark': allModes['dark'],
			},
		},
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
