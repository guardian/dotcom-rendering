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

	it('renders the hardcoded Puzzles & Games sub-nav row', () => {
		renderPuzzlePageLayout('sudoku-easy');

		for (const name of [
			'Puzzles & games',
			'Crosswords',
			'Word games',
			'Logic puzzles',
			'Trivia & quizzes',
		]) {
			expect(
				screen.getAllByRole('link', { name }).length,
			).toBeGreaterThan(0);
		}
	});

	describe('print button (Sudoku-only, per PR #16700 review)', () => {
		it('renders the print button for a sudoku puzzle', () => {
			renderPuzzlePageLayout('sudoku-easy');

			expect(
				screen.getByRole('button', { name: 'Print' }),
			).toBeInTheDocument();
		});

		it('does not render the print button for word-wheel', () => {
			renderPuzzlePageLayout('word-wheel');

			expect(
				screen.queryByRole('button', { name: 'Print' }),
			).not.toBeInTheDocument();
		});

		it('does not render the print button for wordiply', () => {
			renderPuzzlePageLayout('wordiply');

			expect(
				screen.queryByRole('button', { name: 'Print' }),
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

			expect(
				container.querySelector('#dfp-ad--merchandising-high'),
			).toBeInTheDocument();
			expect(
				container.querySelector('#dfp-ad--merchandising'),
			).toBeInTheDocument();
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
		});
	});
});
