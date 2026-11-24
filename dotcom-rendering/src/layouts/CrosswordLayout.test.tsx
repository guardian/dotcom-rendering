import { render, screen } from '@testing-library/react';
import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { ConfigProvider } from '../components/ConfigContext';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { PUZZLE_MODAL_ROOT_ID } from '../lib/puzzleAccess';
import {
	puzzlesHubV3Experiment,
	puzzlesHubV3Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType } from '../types/article';
import type { PuzzleGameSupporting, PuzzleItem } from '../types/puzzlesPage';
import { CrosswordLayout } from './CrosswordLayout';

jest.mock('../lib/bridgetApi', () => jest.fn());
jest.mock('../components/CrosswordComponent.island', () => ({
	CrosswordComponent: () => <div data-testid="crossword" />,
}));
jest.mock('../components/CrosswordAccessGate.island', () => ({
	CrosswordAccessGate: () => <div data-testid="crossword-gate" />,
}));
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

const v3On = puzzlesHubV3Participation(puzzlesHubV3Experiment.variant);

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
	edition = 'UK',
	serverSideABTests = {},
	withQuickSeries = false,
	crosswordType = 'quick',
	puzzleArchivePath,
	withCrossword = false,
	crosswordRequiresSubscription,
}: {
	moreFromPuzzlesAndGames?: PuzzleItem[];
	puzzlesSupporting?: PuzzleGameSupporting;
	edition?: EditionId;
	serverSideABTests?: Record<string, string>;
	withQuickSeries?: boolean;
	crosswordType?: string;
	puzzleArchivePath?: string;
	withCrossword?: boolean;
	crosswordRequiresSubscription?: boolean;
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
			...(withCrossword && {
				// A crossword page has no body blocks of its own: the crossword is
				// the only block, which is the one `ArticleBody` renders.
				blocks: [],
				crossword: {
					crosswordType,
					number: 28000,
					date: Date.UTC(2020, 0, 1),
					entries: [{ id: '1-across' }],
				} as unknown as typeof StandardFixture.crossword,
				crosswordRequiresSubscription,
			}),
			config: { ...StandardFixture.config, edition, serverSideABTests },
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

it('passes crossword context to the metadata share placement', () => {
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
		['ArticleMeta'].map((context) => ({
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
	it('does not render the link when the hub is available', () => {
		renderCrosswordLayout({ edition: 'INT' });

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
			edition: 'INT',
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
		expect(
			screen.getByRole('link', { name: 'Crossword blog' }),
		).toHaveAttribute(
			'data-component',
			'puzzles-useful-links:crossword-page',
		);
		expect(screen.getByText('Sign up to Cluesletter')).toBeInTheDocument();
	});

	it('does not render the section when frontend does not send it', () => {
		renderCrosswordLayout({ edition: 'INT' });

		expect(
			screen.queryByRole('heading', { name: 'Useful links' }),
		).not.toBeInTheDocument();
	});
});

describe('CrosswordLayout "More from Puzzles & games" rail', () => {
	it('renders the rail when data is present and v1 is enabled', () => {
		const { container } = renderCrosswordLayout({
			moreFromPuzzlesAndGames: relatedPuzzles,
			edition: 'INT',
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
		renderCrosswordLayout({ edition: 'INT' });

		expect(
			screen.queryByRole('heading', {
				name: 'More from Puzzles & games',
			}),
		).not.toBeInTheDocument();
	});

	it('does not render the rail when the data is empty, even with v1 enabled', () => {
		renderCrosswordLayout({
			moreFromPuzzlesAndGames: [],
			edition: 'INT',
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
		renderCrosswordLayout({ edition: 'INT' });

		expect(screen.getAllByText('Word games').length).toBeGreaterThan(0);
		expect(screen.getAllByText('Logic puzzles').length).toBeGreaterThan(0);
	});

	it('shows Trivia & quizzes in the sub-nav without experiment participation', () => {
		renderCrosswordLayout({ edition: 'INT' });
		expect(screen.getAllByText('Trivia & quizzes').length).toBeGreaterThan(
			0,
		);
	});

	it('hides SubMeta (topics, share, reuse) and the footer sub-nav', () => {
		const { container } = renderCrosswordLayout({
			edition: 'INT',
		});

		expect(
			screen.queryByText('Explore more on these topics'),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText('Reuse this content'),
		).not.toBeInTheDocument();
		expect(container.querySelectorAll('aside nav').length).toBe(0);
	});

	it('points the title section link at the relative crosswords archive', () => {
		const { container } = renderCrosswordLayout({
			edition: 'INT',
		});

		expect(
			container.querySelector('a[data-component="section"]'),
		).toHaveAttribute('href', '/puzzles-and-games/crosswords/archive');
	});

	it('points the title series link at the archive page frontend sends for the crossword type', () => {
		const { container } = renderCrosswordLayout({
			edition: 'INT',
			withQuickSeries: true,
			puzzleArchivePath: '/puzzles-and-games/crosswords/quick/archive',
		});

		expect(
			container.querySelector('a[data-component="series"]'),
		).toHaveAttribute(
			'href',
			'/puzzles-and-games/crosswords/quick/archive',
		);
		const series = container.querySelector('a[data-component="series"]');
		expect(series).toHaveAttribute('data-link-name', 'article series');
		expect(
			series?.parentElement?.closest('[data-link-name]'),
		).toHaveAttribute(
			'data-link-name',
			'puzzles | in-page-nav | crossword-page',
		);
	});

	it('points the title series link at the crosswords archive when frontend sends no archive page', () => {
		const { container } = renderCrosswordLayout({
			edition: 'INT',
			withQuickSeries: true,
			crosswordType: 'genius',
		});

		expect(
			container.querySelector('a[data-component="series"]'),
		).toHaveAttribute('href', '/puzzles-and-games/crosswords/archive');
	});

	it('applies the new design even when there is no rail data', () => {
		renderCrosswordLayout({ edition: 'INT' });

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

describe('CrosswordLayout premium crosswords', () => {
	it('gates a premium crossword when puzzles hub v3 is on', () => {
		const { container } = renderCrosswordLayout({
			withCrossword: true,
			crosswordRequiresSubscription: true,
			edition: 'INT',
			serverSideABTests: v3On,
		});

		expect(screen.getByTestId('crossword-gate')).toBeInTheDocument();
		expect(screen.queryByTestId('crossword')).not.toBeInTheDocument();
		expect(
			container.querySelector(`main#${PUZZLE_MODAL_ROOT_ID}`),
		).not.toBeNull();
	});

	it.each([
		['no test is on', {}],
		[
			'v3 is in control',
			puzzlesHubV3Participation(puzzlesHubV3Experiment.control),
		],
	])(
		'renders the crossword exactly as before when %s, even if frontend sent the flag',
		(_, serverSideABTests) => {
			const { container } = renderCrosswordLayout({
				withCrossword: true,
				crosswordRequiresSubscription: true,
				edition: 'INT',
				serverSideABTests,
			});

			expect(screen.getByTestId('crossword')).toBeInTheDocument();
			expect(
				screen.queryByTestId('crossword-gate'),
			).not.toBeInTheDocument();
			expect(container.querySelector('main[id]')).toBeNull();
		},
	);

	it('does not gate a crossword frontend did not flag, with v3 on', () => {
		const { container } = renderCrosswordLayout({
			withCrossword: true,
			edition: 'INT',
			serverSideABTests: v3On,
		});

		expect(screen.getByTestId('crossword')).toBeInTheDocument();
		expect(screen.queryByTestId('crossword-gate')).not.toBeInTheDocument();
		expect(container.querySelector('main[id]')).toBeNull();
	});

	it('keeps the skip link target on a gated crossword', () => {
		const { container } = renderCrosswordLayout({
			withCrossword: true,
			crosswordRequiresSubscription: true,
			edition: 'INT',
			serverSideABTests: v3On,
		});

		const targets = container.querySelectorAll('#maincontent');
		expect(targets).toHaveLength(1);
		expect(
			targets[0]?.querySelector('gu-island[name="CrosswordAccessGate"]'),
		).not.toBeNull();
	});

	it('shows no comment count on a gated crossword, and keeps it on an ungated one', () => {
		const commentCount = 'gu-island[name="CommentCount"]';

		const gated = renderCrosswordLayout({
			withCrossword: true,
			crosswordRequiresSubscription: true,
			edition: 'INT',
			serverSideABTests: v3On,
		});
		expect(gated.container.querySelector(commentCount)).toBeNull();
		gated.unmount();

		const ungated = renderCrosswordLayout({
			withCrossword: true,
			edition: 'INT',
			serverSideABTests: v3On,
		});
		expect(ungated.container.querySelector(commentCount)).not.toBeNull();
	});

	it('keeps everything as before for a flagged crossword of a series the Puzzles API does not know', () => {
		const commentCount = 'gu-island[name="CommentCount"]';
		const { container } = renderCrosswordLayout({
			withCrossword: true,
			crosswordType: 'everyman',
			crosswordRequiresSubscription: true,
			edition: 'INT',
			serverSideABTests: v3On,
		});

		expect(screen.getByTestId('crossword')).toBeInTheDocument();
		expect(screen.queryByTestId('crossword-gate')).not.toBeInTheDocument();
		expect(container.querySelector('main[id]')).toBeNull();
		expect(container.querySelector(commentCount)).not.toBeNull();
		expect(container.querySelectorAll('#maincontent')).toHaveLength(1);
	});
});
