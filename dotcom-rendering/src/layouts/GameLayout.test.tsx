import { render, screen } from '@testing-library/react';
import { createGamePage } from '../../fixtures/manual/gamePage';
import { ConfigProvider } from '../components/ConfigContext';
import { extractNAV } from '../model/extract-nav';
import { getGameConfig } from '../model/games/gameConfigs';
import { GameLayout } from './GameLayout';

jest.mock('../lib/bridgetApi', () => jest.fn());
jest.mock('../lib/useMatchMedia', () => ({
	...jest.requireActual('../lib/useMatchMedia'),
	useMatchMedia: jest.fn(() => true),
}));

const renderGameLayout = (
	slug: string,
	overrides: Parameters<typeof createGamePage>[1] = {},
) => {
	const gamePage = createGamePage(slug, overrides);
	const gameConfig = getGameConfig(slug);
	if (!gameConfig) throw new Error(`missing config for ${slug}`);

	return render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<GameLayout
				gamePage={{ ...gamePage, gameConfig }}
				NAV={extractNAV(gamePage.nav)}
			/>
		</ConfigProvider>,
	);
};

describe('GameLayout', () => {
	it('renders the page title', () => {
		renderGameLayout('sudoku-easy');

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'sudoku-easy puzzle',
			}),
		).toBeInTheDocument();
	});

	it('renders the gameGroup label as plain, non-linked text', () => {
		renderGameLayout('sudoku-easy');

		expect(
			screen.queryByRole('link', { name: 'Logic puzzles' }),
		).not.toBeInTheDocument();
		expect(screen.getByText('Logic puzzles')).toBeInTheDocument();
	});

	it('renders a "More from Puzzles & games" rail when moreFromPuzzlesAndGames is present', () => {
		renderGameLayout('sudoku-easy');

		expect(
			screen.getByText('More from Puzzles & games'),
		).toBeInTheDocument();
	});

	it('does not render the related rail when moreFromPuzzlesAndGames is empty', () => {
		renderGameLayout('sudoku-easy', {
			instance: {
				...createGamePage('sudoku-easy').instance,
				moreFromPuzzlesAndGames: [],
			},
		});

		expect(
			screen.queryByText('More from Puzzles & games'),
		).not.toBeInTheDocument();
	});
});
