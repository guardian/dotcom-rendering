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
	it('renders a working PDF version link when crosswordData.pdf is present', () => {
		renderGameLayout('crossword', {
			instance: {
				...createGamePage('crossword').instance,
				crosswordData: {
					...(createGamePage('crossword').instance
						.crosswordData as Record<string, unknown>),
					pdf: 'https://example.com/crossword.pdf',
				},
			},
		});

		const pdfLink = screen.getByRole('link', { name: 'PDF version' });
		expect(pdfLink).toHaveAttribute(
			'href',
			'https://example.com/crossword.pdf',
		);
	});

	it('does not render a PDF version link when crosswordData.pdf is absent', () => {
		renderGameLayout('crossword');

		expect(
			screen.queryByRole('link', { name: 'PDF version' }),
		).not.toBeInTheDocument();
	});

	it('does not render CrosswordLinks for a non-crossword slug', () => {
		renderGameLayout('sudoku-easy');

		expect(
			screen.queryByRole('link', { name: 'PDF version' }),
		).not.toBeInTheDocument();
	});

	it('renders the crosswords group label as a styled link to /crosswords', () => {
		renderGameLayout('crossword');

		const label = screen.getByRole('link', { name: 'Quick crossword' });
		expect(label).toHaveAttribute('href', '/crosswords');
	});

	it('renders a non-crosswords group label as plain, non-linked text', () => {
		renderGameLayout('sudoku-easy');

		expect(
			screen.queryByRole('link', { name: 'Logic puzzles' }),
		).not.toBeInTheDocument();
		expect(screen.getByText('Logic puzzles')).toBeInTheDocument();
	});
});
