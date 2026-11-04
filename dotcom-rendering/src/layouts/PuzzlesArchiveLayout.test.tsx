import '@testing-library/jest-dom';
import { palette } from '@guardian/source/foundations';
import { render, screen } from '@testing-library/react';
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

	it('renders the trivia archive with its Labs palette', () => {
		const puzzlesPage = page(true);
		render(
			<PuzzlesArchiveLayout
				NAV={nav}
				puzzlesPage={
					{
						...puzzlesPage,
						archive: {
							...puzzlesPage.archive,
							category: 'trivia-and-quizzes',
							title: 'Trivia & quizzes',
						},
					} as never
				}
			/>,
		);

		expect(
			screen.getByRole('heading', { level: 1, name: 'Trivia & quizzes' }),
		).toBeInTheDocument();
		expect(screen.getByRole('main')).toHaveStyle({
			'--puzzles-primary': palette.labs[200],
			'--puzzles-tint': palette.labs[700],
		});
	});

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

	it('renders the archive category as the page H1', () => {
		render(
			<PuzzlesArchiveLayout
				NAV={nav}
				puzzlesPage={page(true) as never}
			/>,
		);

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Word games',
			}),
		).toBeInTheDocument();
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
