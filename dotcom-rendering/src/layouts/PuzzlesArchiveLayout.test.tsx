import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { PuzzlesArchiveLayout } from './PuzzlesArchiveLayout';

jest.mock('../components/Masthead/Masthead', () => ({
	Masthead: () => <header data-testid="masthead" />,
}));
jest.mock('../components/Footer', () => ({
	Footer: () => <div data-testid="footer" />,
}));
jest.mock('../components/Island', () => ({
	Island: () => null,
}));
jest.mock('../components/RelatedPuzzlesRail', () => ({
	RelatedPuzzlesRail: () => <div data-testid="more-puzzles" />,
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
	layout: { containers: [] },
	archive: {
		category: 'word-games',
		title: 'Word games',
		moreFrom: [{ id: 'sudoku-easy' }],
	},
});

const slotIds = () =>
	Array.from(document.querySelectorAll('.js-ad-slot'), (slot) => slot.id);

describe('PuzzlesArchiveLayout', () => {
	const nav = { pillars: [], readerRevenueLinks: { footer: [] } } as never;

	it('renders the header, right, bottom banner and mobile slots', () => {
		render(
			<PuzzlesArchiveLayout NAV={nav} puzzlesPage={page() as never} />,
		);
		expect(slotIds()).toEqual([
			'dfp-ad--top-above-nav',
			'dfp-ad--right',
			'dfp-ad--inline1--mobile',
			'dfp-ad--fronts-banner-1',
		]);
	});

	it('does not render ad slots for ad-free users', () => {
		render(
			<PuzzlesArchiveLayout
				NAV={nav}
				puzzlesPage={page(true) as never}
			/>,
		);
		expect(slotIds()).toEqual([]);
	});
});
