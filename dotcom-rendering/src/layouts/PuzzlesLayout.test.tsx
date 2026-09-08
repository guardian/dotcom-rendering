import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { PuzzlesLayout } from './PuzzlesLayout';

jest.mock('../components/Masthead/Masthead', () => ({
	Masthead: () => <header data-testid="masthead" />,
}));
jest.mock('../components/HeaderAdSlot', () => ({
	HeaderAdSlot: () => <div data-testid="header-ad" />,
}));
jest.mock('../components/Footer', () => ({
	Footer: () => <div data-testid="footer" />,
}));
jest.mock('../components/PuzzlesDirectory', () => ({
	PuzzlesDirectory: () => <div data-testid="directory" />,
}));
jest.mock('../components/Section', () => ({
	Section: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
jest.mock('./lib/stickiness', () => ({
	Stuck: ({ children }: { children: ReactNode }) => children,
}));

const page = (isAdFreeUser = false) => ({
	isAdFreeUser,
	editionId: 'UK',
	contributionsServiceUrl: '',
	config: { switches: {} },
	pageFooter: {},
	layout: {
		filters: [
			{ id: 'logic', title: 'Logic', target: '#logic-puzzles' },
			{ id: 'words', title: 'Word games', target: '#word-games' },
		],
	},
});

describe('PuzzlesLayout', () => {
	const nav = { pillars: [], readerRevenueLinks: { footer: [] } } as never;

	it('renders one branded page title and navigation in blueprint order', () => {
		render(<PuzzlesLayout NAV={nav} puzzlesPage={page() as never} />);
		expect(
			screen.getByRole('heading', { level: 1, name: 'Puzzles & Games' }),
		).toBeInTheDocument();
		expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
		const navElement = screen.getByRole('navigation', {
			name: 'Puzzles categories',
		});
		expect(
			within(navElement)
				.getAllByRole('link')
				.map(({ textContent }) => textContent),
		).toEqual(['Logic', 'Word games']);
		expect(
			within(navElement).getByRole('link', { name: 'Logic' }),
		).toHaveAttribute('aria-current', 'location');
	});

	it('keeps global chrome while respecting ad-free input', () => {
		const { rerender } = render(
			<PuzzlesLayout NAV={nav} puzzlesPage={page(true) as never} />,
		);
		expect(screen.queryByTestId('header-ad')).not.toBeInTheDocument();
		expect(screen.getByTestId('masthead')).toBeInTheDocument();
		expect(screen.getByTestId('footer')).toBeInTheDocument();
		rerender(
			<PuzzlesLayout NAV={nav} puzzlesPage={page(false) as never} />,
		);
		expect(screen.getByTestId('header-ad')).toBeInTheDocument();
	});
});
