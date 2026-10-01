import { render, screen } from '@testing-library/react';
import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { ConfigProvider } from '../components/ConfigContext';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { PUZZLES_HUB_EXPERIMENT } from '../lib/puzzlesHubExperiment';
import {
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType } from '../types/article';
import type { PuzzleItem } from '../types/puzzlesPage';
import { CrosswordLayout } from './CrosswordLayout';

jest.mock('../lib/bridgetApi', () => jest.fn());
jest.mock('../lib/useMatchMedia', () => ({
	...jest.requireActual('../lib/useMatchMedia'),
	useMatchMedia: jest.fn(() => true),
}));
jest.mock('../lib/usePageViewId', () => ({
	usePageViewId: jest.fn(() => 'test-page-view-id'),
}));
jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: jest.fn(() => ({ kind: 'SignedOut' })),
	useIsSignedIn: jest.fn(() => false),
}));
jest.mock('../lib/useBraze', () => ({
	useBraze: jest.fn().mockReturnValue({
		brazeMessages: {},
		brazeCards: undefined,
		braze: null,
	}),
}));
jest.mock('../lib/useAB', () => ({
	useAB: jest.fn().mockReturnValue(null),
}));

const v0AndV1On = {
	[PUZZLES_HUB_EXPERIMENT]: 'variant',
	...puzzlesHubV1Participation(puzzlesHubV1Experiment.variant),
};

const relatedPuzzles: PuzzleItem[] = [
	{
		id: 'crossword-quick',
		title: 'Quick crossword',
		type: 'crossword',
		set: 'quick',
		cardVariant: 'compact',
		cadence: 'Previous',
		url: '/crosswords/quick/100',
		backgroundColour: '#FCE1CE',
	},
	{
		id: 'crossword-mini',
		title: 'Mini crossword',
		type: 'crossword',
		set: 'mini',
		cardVariant: 'compact',
		cadence: 'Today',
		url: '/crosswords/mini/200',
		backgroundColour: '#FCE1CE',
	},
];

const renderCrosswordLayout = ({
	moreFromPuzzlesAndGames,
	serverSideABTests = {},
}: {
	moreFromPuzzlesAndGames?: PuzzleItem[];
	serverSideABTests?: Record<string, string>;
}) => {
	const article = enhanceArticleType(
		{
			...StandardFixture,
			moreFromPuzzlesAndGames,
			config: { ...StandardFixture.config, serverSideABTests },
		},
		'Web',
	);

	return render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<CrosswordLayout
				article={article.frontendData}
				format={{
					design: ArticleDesign.Crossword,
					display: ArticleDisplay.Standard,
					theme: Pillar.Lifestyle,
				}}
				NAV={extractNAV(StandardFixture.nav)}
			/>
		</ConfigProvider>,
	);
};

describe('CrosswordLayout "More from Puzzles & games" rail', () => {
	it('renders the rail when data is present and v0+v1 are enabled', () => {
		renderCrosswordLayout({
			moreFromPuzzlesAndGames: relatedPuzzles,
			serverSideABTests: v0AndV1On,
		});

		expect(
			screen.getByRole('heading', { name: 'More from Puzzles & games' }),
		).toBeInTheDocument();
		expect(screen.getByText('Quick crossword')).toBeInTheDocument();
		expect(screen.getByText('Mini crossword')).toBeInTheDocument();
	});

	it('does not render the rail when the data is absent, even with v0+v1 enabled', () => {
		renderCrosswordLayout({ serverSideABTests: v0AndV1On });

		expect(
			screen.queryByRole('heading', {
				name: 'More from Puzzles & games',
			}),
		).not.toBeInTheDocument();
	});

	it('does not render the rail when the data is empty, even with v0+v1 enabled', () => {
		renderCrosswordLayout({
			moreFromPuzzlesAndGames: [],
			serverSideABTests: v0AndV1On,
		});

		expect(
			screen.queryByRole('heading', {
				name: 'More from Puzzles & games',
			}),
		).not.toBeInTheDocument();
	});

	it('does not render the rail when v1 is disabled, even with data present', () => {
		renderCrosswordLayout({
			moreFromPuzzlesAndGames: relatedPuzzles,
			serverSideABTests: { [PUZZLES_HUB_EXPERIMENT]: 'variant' },
		});

		expect(
			screen.queryByRole('heading', {
				name: 'More from Puzzles & games',
			}),
		).not.toBeInTheDocument();
	});
});
