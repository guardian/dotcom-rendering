import { render, screen } from '@testing-library/react';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { ConfigProvider } from '../components/ConfigContext';
import { PUZZLES_HUB_EXPERIMENT } from '../lib/puzzlesHubExperiment';
import {
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { extractNAV } from '../model/extract-nav';
import { getPuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { PuzzlePageLayout } from './PuzzlePageLayout';

jest.mock('../lib/bridgetApi', () => jest.fn());
jest.mock('../lib/useMatchMedia', () => ({
	...jest.requireActual('../lib/useMatchMedia'),
	useMatchMedia: jest.fn(() => true),
}));
/**
 * `Masthead`'s `TopBar`/`TopBarSupport`/`ReaderRevenueLinks`/
 * `StickyBottomBanner` all read these two hooks, which fetch real
 * ophan/identity state in a `useEffect` and only resolve after this
 * file's `render()` calls have already returned - React then warns "not
 * wrapped in act(...)" for every one of them, on every test, since nothing
 * here awaits that later, unmocked async resolution. Mocked to return a
 * fixed value synchronously instead, matching `useMatchMedia`'s mock
 * above - not a `PuzzlePageLayout`-specific concern, just this suite's own
 * async noise.
 */
jest.mock('../lib/usePageViewId', () => ({
	usePageViewId: jest.fn(() => 'test-page-view-id'),
}));
jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: jest.fn(() => ({ kind: 'SignedOut' })),
	useIsSignedIn: jest.fn(() => false),
}));
/**
 * `StickyBottomBanner` also reads these two (both backed by `swr`), same
 * mock shape its own `StickyBottomBanner.island.test.tsx` already uses.
 */
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

const renderPuzzlePageLayout = (
	slug: string,
	overrides: Parameters<typeof createPuzzlePage>[1] = {},
) => {
	const puzzlePage = createPuzzlePage(slug, overrides);
	const puzzleConfig = getPuzzleConfig(slug);
	if (!puzzleConfig) throw new Error(`missing config for ${slug}`);

	return render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<PuzzlePageLayout
				puzzlePage={{ ...puzzlePage, puzzleConfig }}
				NAV={extractNAV(puzzlePage.nav)}
				darkModeAvailable={false}
			/>
		</ConfigProvider>,
	);
};

describe('PuzzlePageLayout', () => {
	it('renders the design-provided headline text, not raw instance.title', () => {
		renderPuzzlePageLayout('sudoku-easy');

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Easy sudoku',
			}),
		).toBeInTheDocument();
	});

	it('renders a dateline-style puzzleDate next to the title when present', () => {
		renderPuzzlePageLayout('sudoku-easy');

		expect(screen.getByText('Fri 11 Sep 2026')).toBeInTheDocument();
	});

	it('does not render a date when puzzleDate is absent', () => {
		renderPuzzlePageLayout('sudoku-easy', {
			instance: {
				...createPuzzlePage('sudoku-easy').instance,
				puzzleDate: undefined,
			},
		});

		expect(screen.queryByText('Fri 11 Sep 2026')).not.toBeInTheDocument();
	});

	it('renders the puzzle family name as the series kicker, and the puzzleGroup label as the section link below it', () => {
		const { container } = renderPuzzlePageLayout('sudoku-easy');

		expect(
			container.querySelector('a[data-component="series"]'),
		).toHaveTextContent('Sudoku');
		expect(
			container.querySelector('a[data-component="section"]'),
		).toHaveTextContent('Logic puzzles');
	});

	it('renders the series/section links as root-relative paths, not absolute production URLs', () => {
		const { container } = renderPuzzlePageLayout('sudoku-easy');

		expect(
			container.querySelector('a[data-component="series"]'),
		).toHaveAttribute(
			'href',
			'/puzzles-and-games/logic-puzzles/sudoku-easy',
		);
		expect(
			container.querySelector('a[data-component="section"]'),
		).toHaveAttribute('href', '/puzzles-and-games/logic-puzzles');
	});

	/**
	 * "Logic puzzles" is ambiguous by accessible name alone: the
	 * `ArticleTitle` section kicker link (`data-component="section"`,
	 * relative href, always rendered - see the test above) has the exact
	 * same text as this sub-nav child link. Sub-nav child links are looked
	 * up by their (unique) href instead of by role/name to avoid matching
	 * the wrong element.
	 */
	const subNavChildHrefs = {
		Crosswords:
			'https://www.theguardian.com/puzzles-and-games/crosswords/archive',
		'Word games':
			'https://www.theguardian.com/puzzles-and-games/word-games/archive',
		'Logic puzzles':
			'https://www.theguardian.com/puzzles-and-games/logic-puzzles/archive',
		'Trivia & quizzes': '/puzzles-and-games/trivia-and-quizzes',
	};

	it('renders only the "Puzzles & games" parent sub-nav link on V0 (default fixture state)', () => {
		const { container } = renderPuzzlePageLayout('sudoku-easy');

		expect(
			screen.getAllByRole('link', { name: 'Puzzles & games' }).length,
		).toBeGreaterThan(0);

		for (const href of Object.values(subNavChildHrefs)) {
			expect(
				container.querySelector(`a[href="${href}"]`),
			).not.toBeInTheDocument();
		}
	});

	describe('sub-nav child links (Crosswords/Word games/Logic puzzles/Trivia & quizzes, v1-scoped feature)', () => {
		it('does not render when v1 is enabled but v0 is not', () => {
			const { container } = renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: puzzlesHubV1Participation(
						puzzlesHubV1Experiment.variant,
					),
				},
			});

			for (const href of Object.values(subNavChildHrefs)) {
				expect(
					container.querySelector(`a[href="${href}"]`),
				).not.toBeInTheDocument();
			}
		});

		it('does not render when v0 is enabled but v1 is not', () => {
			const { container } = renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: { [PUZZLES_HUB_EXPERIMENT]: 'variant' },
				},
			});

			for (const href of Object.values(subNavChildHrefs)) {
				expect(
					container.querySelector(`a[href="${href}"]`),
				).not.toBeInTheDocument();
			}
		});

		it('renders all four, with the production archive URLs for Crosswords/Word games/Logic puzzles, when both v0 and v1 are enabled', () => {
			const { container } = renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: v0AndV1On,
				},
			});

			for (const [name, href] of Object.entries(subNavChildHrefs)) {
				const link = container.querySelector(`a[href="${href}"]`);
				expect(link).toBeInTheDocument();
				expect(link).toHaveTextContent(name);
			}
		});
	});

	describe('print button (Sudoku-only, per PR #16700 review)', () => {
		it('renders the print button for a sudoku puzzle', () => {
			renderPuzzlePageLayout('sudoku-easy');

			expect(
				screen.getByRole('button', { name: 'Print version' }),
			).toBeInTheDocument();
		});

		it('does not render the print button for word-wheel', () => {
			renderPuzzlePageLayout('word-wheel');

			expect(
				screen.queryByRole('button', { name: 'Print version' }),
			).not.toBeInTheDocument();
		});

		it('does not render the print button for wordiply', () => {
			renderPuzzlePageLayout('wordiply');

			expect(
				screen.queryByRole('button', { name: 'Print version' }),
			).not.toBeInTheDocument();
		});
	});

	describe('"More from Puzzles & Games" rail (v1-scoped feature)', () => {
		it('renders the rail when data is present AND v0+v1 are both enabled', () => {
			renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: v0AndV1On,
				},
			});

			expect(
				screen.getByRole('heading', {
					name: 'More from Puzzles & games',
				}),
			).toBeInTheDocument();
		});

		it('does not render the rail when moreFromPuzzlesAndGames is empty, even with v0+v1 enabled', () => {
			renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: v0AndV1On,
				},
				instance: {
					...createPuzzlePage('sudoku-easy').instance,
					moreFromPuzzlesAndGames: [],
				},
			});

			expect(
				screen.queryByRole('heading', {
					name: 'More from Puzzles & games',
				}),
			).not.toBeInTheDocument();
		});

		it('does not render the rail when data is present but neither v0 nor v1 is enabled (default fixture state)', () => {
			renderPuzzlePageLayout('sudoku-easy');

			expect(
				screen.queryByRole('heading', {
					name: 'More from Puzzles & games',
				}),
			).not.toBeInTheDocument();
		});

		it('does not render the rail when data is present and v1 is enabled but v0 is not', () => {
			renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: puzzlesHubV1Participation(
						puzzlesHubV1Experiment.variant,
					),
				},
			});

			expect(
				screen.queryByRole('heading', {
					name: 'More from Puzzles & games',
				}),
			).not.toBeInTheDocument();
		});

		it('does not render the rail when data is present and v0 is enabled but v1 is not', () => {
			renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: { [PUZZLES_HUB_EXPERIMENT]: 'variant' },
				},
			});

			expect(
				screen.queryByRole('heading', {
					name: 'More from Puzzles & games',
				}),
			).not.toBeInTheDocument();
		});
	});

	describe('ads (isAdFreeUser, canRenderAds)', () => {
		it('renders ad slots for a non-ad-free reader', () => {
			const { container } = renderPuzzlePageLayout('sudoku-easy', {
				isAdFreeUser: false,
			});

			const headerSlot = container.querySelector(
				'#dfp-ad--top-above-nav',
			);
			expect(headerSlot).toBeInTheDocument();
			expect(
				headerSlot?.closest('[data-print-layout="hide"]')
					?.parentElement,
			).toBe(container);
			expect(
				container.querySelector('#dfp-ad--merchandising-high'),
			).toBeInTheDocument();
			const game = container.querySelector(
				'[data-layout="PuzzlePageLayout"] article',
			);
			const mobileSlot = container.querySelector(
				'#dfp-ad--crossword-banner-mobile',
			);
			expect(game).toBeInTheDocument();
			expect(mobileSlot).toHaveClass(
				'js-ad-slot',
				'ad-slot--crossword-banner-mobile',
			);
			expect(mobileSlot).toHaveAttribute(
				'data-name',
				'crossword-banner-mobile',
			);
			expect(game?.compareDocumentPosition(mobileSlot as Node)).toBe(
				Node.DOCUMENT_POSITION_FOLLOWING,
			);
		});

		it('does not render any ad slots for an ad-free reader', () => {
			const { container } = renderPuzzlePageLayout('sudoku-easy', {
				isAdFreeUser: true,
			});

			expect(
				container.querySelector('#dfp-ad--merchandising-high'),
			).not.toBeInTheDocument();
			expect(
				container.querySelector('#dfp-ad--merchandising'),
			).not.toBeInTheDocument();
			expect(
				container.querySelector('#dfp-ad--right'),
			).not.toBeInTheDocument();
			expect(
				container.querySelector('#dfp-ad--crossword-banner-mobile'),
			).not.toBeInTheDocument();
		});
	});
});
