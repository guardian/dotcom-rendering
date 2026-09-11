import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
		containers: [],
	},
});

describe('PuzzlesLayout', () => {
	const nav = { pillars: [], readerRevenueLinks: { footer: [] } } as never;

	it('renders one branded page title without category filters', () => {
		render(<PuzzlesLayout NAV={nav} puzzlesPage={page() as never} />);
		expect(
			screen.getByRole('heading', { level: 1, name: 'Puzzles & Games' }),
		).toBeInTheDocument();
		expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
		expect(
			screen.queryByRole('navigation', { name: 'Puzzles categories' }),
		).not.toBeInTheDocument();
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
