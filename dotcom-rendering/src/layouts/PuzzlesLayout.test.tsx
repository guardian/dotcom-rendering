import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { PuzzlesLayout } from './PuzzlesLayout';

jest.mock('../components/Masthead/Masthead', () => ({
	Masthead: () => <header data-testid="masthead" />,
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
		expect(document.querySelector('.js-ad-slot')).not.toBeInTheDocument();
		expect(screen.getByTestId('masthead')).toBeInTheDocument();
		expect(screen.getByTestId('footer')).toBeInTheDocument();
		rerender(
			<PuzzlesLayout NAV={nav} puzzlesPage={page(false) as never} />,
		);
		expect(
			document.getElementById('dfp-ad--top-above-nav'),
		).toBeInTheDocument();
		expect(
			document.getElementById('dfp-ad--mobile-above-nav'),
		).not.toBeInTheDocument();
	});
	it('renders the illustrated header with responsive sources and a fixed height', () => {
		render(<PuzzlesLayout NAV={nav} puzzlesPage={page() as never} />);
		const header = screen
			.getByRole('heading', {
				level: 1,
				name: 'Puzzles & Games',
			})
			.closest('header')!;
		expect(header).toHaveStyle({ height: '230px' });
		expect(header).toHaveStyle({ background: '#fef9f5' });
		const picture = header.querySelector('picture')!;
		const sources = Array.from(picture.querySelectorAll('source'));
		const expected = [
			[1728, 'header-desktop-1728px'],
			[1300, 'header-wide-1440px'],
			[1140, 'header-leftcol-1280px'],
			[980, 'header-desktop-1024px'],
			[768, 'header-tablet-979px'],
			[740, 'header-tablet-768px'],
			[660, 'header-mobile-phablet-669px'],
			[480, 'header-mobile-landscape-480px'],
			[375, 'header-mobile-medium-393px'],
		];
		expect(sources).toHaveLength(expected.length);
		for (const [index, [width, filename]] of expected.entries()) {
			expect(sources[index]).toHaveAttribute(
				'media',
				`(min-width: ${width}px)`,
			);
			expect(sources[index]).toHaveAttribute(
				'srcset',
				`https://i.guim.co.uk/img/uploads/2026/09/15/${filename}.png?width=440&dpr=2&s=none`,
			);
		}
		expect(picture.querySelector('img')).toHaveAttribute(
			'src',
			'https://i.guim.co.uk/img/uploads/2026/09/15/header-mobile-360px.png?width=440&dpr=2&s=none',
		);
		expect(picture.querySelector('img')).toHaveAttribute(
			'alt',
			'An owl carrying a crossword grid beside an octopus reading a puzzle',
		);
		expect(picture.querySelector('img')).not.toHaveAttribute('aria-hidden');
	});
});
