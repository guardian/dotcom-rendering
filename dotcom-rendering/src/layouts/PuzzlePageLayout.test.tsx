import { render, screen } from '@testing-library/react';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { ConfigProvider } from '../components/ConfigContext';
import { extractNAV } from '../model/extract-nav';
import { getPuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { PuzzlePageLayout } from './PuzzlePageLayout';

jest.mock('../lib/bridgetApi', () => jest.fn());
jest.mock('../lib/useMatchMedia', () => ({
	...jest.requireActual('../lib/useMatchMedia'),
	useMatchMedia: jest.fn(() => true),
}));

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

	it('renders the puzzleGroup label as plain, non-linked text', () => {
		renderPuzzlePageLayout('sudoku-easy');

		expect(
			screen.queryByRole('link', { name: 'Logic puzzles' }),
		).not.toBeInTheDocument();
		expect(screen.getByText('Logic puzzles')).toBeInTheDocument();
	});

	it('renders a "More from Puzzles & games" rail when moreFromPuzzlesAndGames is present', () => {
		renderPuzzlePageLayout('sudoku-easy');

		expect(
			screen.getByText('More from Puzzles & games'),
		).toBeInTheDocument();
	});

	it('does not render the related rail when moreFromPuzzlesAndGames is empty', () => {
		renderPuzzlePageLayout('sudoku-easy', {
			instance: {
				...createPuzzlePage('sudoku-easy').instance,
				moreFromPuzzlesAndGames: [],
			},
		});

		expect(
			screen.queryByText('More from Puzzles & games'),
		).not.toBeInTheDocument();
	});
});
