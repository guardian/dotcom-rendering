import { render, screen } from '@testing-library/react';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { ConfigProvider } from '../components/ConfigContext';
import {
	puzzlesHubExperiment,
	puzzlesHubParticipation,
} from '../lib/puzzlesHubExperiment';
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
	...puzzlesHubParticipation(puzzlesHubExperiment.variant),
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
	it('renders the page title', () => {
		renderPuzzlePageLayout('sudoku-easy');

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'sudoku-easy puzzle',
			}),
		).toBeInTheDocument();
	});

	it('renders a human-readable puzzleDate next to the title when present', () => {
		renderPuzzlePageLayout('sudoku-easy');

		expect(screen.getByText('11 September 2026')).toBeInTheDocument();
	});

	it('does not render a date when puzzleDate is absent', () => {
		renderPuzzlePageLayout('sudoku-easy', {
			instance: {
				...createPuzzlePage('sudoku-easy').instance,
				puzzleDate: undefined,
			},
		});

		expect(screen.queryByText('11 September 2026')).not.toBeInTheDocument();
	});

	it('renders the puzzleGroup label as plain, non-linked text', () => {
		renderPuzzlePageLayout('sudoku-easy');

		expect(
			screen.queryByRole('link', { name: 'Logic puzzles' }),
		).not.toBeInTheDocument();
		expect(screen.getByText('Logic puzzles')).toBeInTheDocument();
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
				screen.getByText('More from Puzzles & games'),
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
				screen.queryByText('More from Puzzles & games'),
			).not.toBeInTheDocument();
		});

		it('does not render the rail when data is present but neither v0 nor v1 is enabled (default fixture state)', () => {
			renderPuzzlePageLayout('sudoku-easy');

			expect(
				screen.queryByText('More from Puzzles & games'),
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
				screen.queryByText('More from Puzzles & games'),
			).not.toBeInTheDocument();
		});

		it('does not render the rail when data is present and v0 is enabled but v1 is not', () => {
			renderPuzzlePageLayout('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests: puzzlesHubParticipation(
						puzzlesHubExperiment.variant,
					),
				},
			});

			expect(
				screen.queryByText('More from Puzzles & games'),
			).not.toBeInTheDocument();
		});
	});
});
