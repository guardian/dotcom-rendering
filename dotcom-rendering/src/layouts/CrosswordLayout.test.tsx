import { render, screen } from '@testing-library/react';
import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { ConfigProvider } from '../components/ConfigContext';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import {
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
	puzzlesHubV2Experiment,
	puzzlesHubV2Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType } from '../types/article';
import type { PuzzleGameSupporting, PuzzleItem } from '../types/puzzlesPage';
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

const v1On = puzzlesHubV1Participation(puzzlesHubV1Experiment.variant);
const v1AndV2On = {
	...v1On,
	...puzzlesHubV2Participation(puzzlesHubV2Experiment.variant),
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
	puzzlesSupporting,
	serverSideABTests = {},
	withQuickSeries = false,
	crosswordType = 'quick',
	puzzleArchivePath,
}: {
	moreFromPuzzlesAndGames?: PuzzleItem[];
	puzzlesSupporting?: PuzzleGameSupporting;
	serverSideABTests?: Record<string, string>;
	withQuickSeries?: boolean;
	crosswordType?: string;
	puzzleArchivePath?: string;
}) => {
	const article = enhanceArticleType(
		{
			...StandardFixture,
			moreFromPuzzlesAndGames,
			puzzlesSupporting,
			puzzleArchivePath,
			...(withQuickSeries && {
				tags: [
					{
						id: 'crosswords/series/quick',
						type: 'Series',
						title: 'Quick',
					},
				],
				crossword: {
					crosswordType,
					date: Date.UTC(2026, 10, 8),
					entries: [],
				} as unknown as typeof StandardFixture.crossword,
			}),
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

it('passes crossword context to both metadata share placements', () => {
	const { container } = renderCrosswordLayout({ withQuickSeries: true });
	const shareProps = Array.from(
		container.querySelectorAll('gu-island[name="ShareButton"]'),
		(island) =>
			JSON.parse(island.getAttribute('props')!) as {
				context: string;
				puzzleTrackingContext: unknown;
			},
	);
	expect(
		shareProps.map(({ context, puzzleTrackingContext }) => ({
			context,
			puzzleTrackingContext,
		})),
	).toEqual(
		['ArticleMeta', 'SubMeta'].map((context) => ({
			context,
			puzzleTrackingContext: {
				slug: 'quick',
				date: '2026-11-08',
				provider: 'guardian-crossword',
			},
		})),
	);
});

describe('CrosswordLayout app download link', () => {
	it('renders the link when v1 is disabled', () => {
		renderCrosswordLayout({});

		expect(
			screen.getByRole('link', { name: 'Download the Guardian app' }),
		).toBeInTheDocument();
	});

	it('does not render the link when v1 is enabled', () => {
		renderCrosswordLayout({ serverSideABTests: v1On });

		expect(
			screen.queryByRole('link', { name: 'Download the Guardian app' }),
		).not.toBeInTheDocument();
	});
});

describe('CrosswordLayout useful links', () => {
	const puzzlesSupporting: PuzzleGameSupporting = {
		usefulLinks: [
			{
				title: 'Crossword blog',
				url: 'https://www.theguardian.com/crosswords/crossword-blog',
			},
		],
		newsletter: {
			identityName: 'cluesletter',
			name: 'Cluesletter',
			frequency: 'Weekly',
			description: 'News and clues',
		},
	};

	it('renders the links and newsletter when frontend sends them and v1 is enabled', () => {
		renderCrosswordLayout({
			puzzlesSupporting,
			serverSideABTests: v1On,
		});

		expect(
			screen.getByRole('heading', { name: 'Useful links' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'Crossword blog' }),
		).toHaveAttribute(
			'href',
			'https://www.theguardian.com/crosswords/crossword-blog',
		);
		expect(screen.getByText('Sign up to Cluesletter')).toBeInTheDocument();
	});

	it('does not render the section when frontend does not send it', () => {
		renderCrosswordLayout({ serverSideABTests: v1On });

		expect(
			screen.queryByRole('heading', { name: 'Useful links' }),
		).not.toBeInTheDocument();
	});

	it('does not render the section when v1 is disabled, even with data present', () => {
		renderCrosswordLayout({ puzzlesSupporting });

		expect(
			screen.queryByRole('heading', { name: 'Useful links' }),
		).not.toBeInTheDocument();
	});
});

describe('CrosswordLayout "More from Puzzles & games" rail', () => {
	it('renders the rail when data is present and v1 is enabled', () => {
		const { container } = renderCrosswordLayout({
			moreFromPuzzlesAndGames: relatedPuzzles,
			serverSideABTests: v1On,
		});

		expect(
			screen.getByRole('heading', { name: 'More from Puzzles & games' }),
		).toBeInTheDocument();
		expect(screen.getByText('Quick crossword')).toBeInTheDocument();
		expect(screen.getByText('Mini crossword')).toBeInTheDocument();
		expect(
			screen
				.getByRole('link', { name: /Quick crossword Previous/ })
				.closest('[data-component]'),
		).toHaveAttribute('data-component', 'puzzles-more-from:crossword-page');
		const props = container
			.querySelector('gu-island[name="RelatedPuzzlesRailEnhanced"]')
			?.getAttribute('props');
		expect(JSON.parse(props!)).toEqual(
			expect.objectContaining({ source: 'crossword-page' }),
		);
	});

	it('does not render the rail when the data is absent, even with v1 enabled', () => {
		renderCrosswordLayout({ serverSideABTests: v1On });

		expect(
			screen.queryByRole('heading', {
				name: 'More from Puzzles & games',
			}),
		).not.toBeInTheDocument();
	});

	it('does not render the rail when the data is empty, even with v1 enabled', () => {
		renderCrosswordLayout({
			moreFromPuzzlesAndGames: [],
			serverSideABTests: v1On,
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
			serverSideABTests: {},
		});

		expect(
			screen.queryByRole('heading', {
				name: 'More from Puzzles & games',
			}),
		).not.toBeInTheDocument();
	});
});

describe('CrosswordLayout Puzzle Page design (v1)', () => {
	it('uses the puzzles sub-nav instead of the crosswords one', () => {
		renderCrosswordLayout({ serverSideABTests: v1On });

		expect(screen.getAllByText('Word games').length).toBeGreaterThan(0);
		expect(screen.getAllByText('Logic puzzles').length).toBeGreaterThan(0);
	});

	it('shows Trivia & quizzes in the sub-nav only when v2 is enabled', () => {
		const { unmount } = renderCrosswordLayout({
			serverSideABTests: v1On,
		});
		expect(screen.queryAllByText('Trivia & quizzes')).toHaveLength(0);
		unmount();

		renderCrosswordLayout({ serverSideABTests: v1AndV2On });
		expect(screen.getAllByText('Trivia & quizzes').length).toBeGreaterThan(
			0,
		);
	});

	it('hides SubMeta (topics, share, reuse) and the footer sub-nav', () => {
		const { container } = renderCrosswordLayout({
			serverSideABTests: v1On,
		});

		expect(
			screen.queryByText('Explore more on these topics'),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText('Reuse this content'),
		).not.toBeInTheDocument();
		expect(container.querySelectorAll('aside nav').length).toBe(0);
	});

	it('keeps the original design when v1 is disabled', () => {
		renderCrosswordLayout({
			serverSideABTests: {},
		});

		expect(screen.queryAllByText('Word games')).toHaveLength(0);
		expect(
			screen.getByText('Explore more on these topics'),
		).toBeInTheDocument();
	});

	it('points the title section link at the relative crosswords archive', () => {
		const { container } = renderCrosswordLayout({
			serverSideABTests: v1On,
		});

		expect(
			container.querySelector('a[data-component="section"]'),
		).toHaveAttribute('href', '/puzzles-and-games/crosswords/archive');
	});

	it('points the title series link at the archive page frontend sends for the crossword type', () => {
		const { container } = renderCrosswordLayout({
			serverSideABTests: v1On,
			withQuickSeries: true,
			puzzleArchivePath: '/puzzles-and-games/crosswords/quick/archive',
		});

		expect(
			container.querySelector('a[data-component="series"]'),
		).toHaveAttribute(
			'href',
			'/puzzles-and-games/crosswords/quick/archive',
		);
	});

	it('points the title series link at the crosswords archive when frontend sends no archive page', () => {
		const { container } = renderCrosswordLayout({
			serverSideABTests: v1On,
			withQuickSeries: true,
			crosswordType: 'genius',
		});

		expect(
			container.querySelector('a[data-component="series"]'),
		).toHaveAttribute('href', '/puzzles-and-games/crosswords/archive');
	});

	it('keeps the original title series link when v1 is disabled', () => {
		const { container } = renderCrosswordLayout({
			serverSideABTests: {},
			withQuickSeries: true,
		});

		expect(
			container.querySelector('a[data-component="series"]'),
		).toHaveAttribute(
			'href',
			expect.stringMatching(/crosswords\/series\/quick$/),
		);
	});

	it('keeps the original title section link when v1 is disabled', () => {
		const { container } = renderCrosswordLayout({
			serverSideABTests: {},
		});

		expect(
			container.querySelector('a[data-component="section"]'),
		).not.toHaveAttribute('href', '/puzzles-and-games/crosswords/archive');
	});

	it('applies the new design even when there is no rail data', () => {
		renderCrosswordLayout({ serverSideABTests: v1On });

		expect(
			screen.queryByRole('heading', {
				name: 'More from Puzzles & games',
			}),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText('Explore more on these topics'),
		).not.toBeInTheDocument();
	});
});
