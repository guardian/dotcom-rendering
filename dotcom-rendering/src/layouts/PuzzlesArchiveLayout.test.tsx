import '@testing-library/jest-dom';
import { palette } from '@guardian/source/foundations';
import { render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import { Island } from '../components/Island';
import { SubNav } from '../components/Masthead/Titlepiece/SubNav';
import {
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
	puzzlesHubV2Experiment,
	puzzlesHubV2Participation,
} from '../lib/puzzlesHubVersionExperiment';
import { extractNAV, type NavType } from '../model/extract-nav';
import { PuzzlesArchiveLayout } from './PuzzlesArchiveLayout';
import archiveStories, {
	LogicPuzzles,
	WordGames,
} from './PuzzlesArchiveLayout.stories';

jest.mock('../components/Masthead/Masthead', () => ({
	Masthead: ({ nav }: { nav: NavType }) => (
		<header data-testid="masthead">
			{nav.subNavSections && (
				<SubNav
					subNavSections={nav.subNavSections}
					currentNavLink={nav.currentNavLink}
				/>
			)}
		</header>
	),
}));
jest.mock('../components/Footer', () => ({
	Footer: () => <div data-testid="footer" />,
}));
jest.mock('../components/Island', () => ({
	Island: jest.fn(() => null),
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
	config: { switches: {}, serverSideABTests: {} },
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
	const nav = extractNAV(createPuzzlesPage().nav);

	it.each([
		['Crosswords', archiveStories.args],
		['Word games', { ...archiveStories.args, ...WordGames.args }],
		['Logic puzzles', { ...archiveStories.args, ...LogicPuzzles.args }],
	] as const)(
		'shows all V2 subnav links and keeps %s selected in the archive story',
		(title, args) => {
			render(<PuzzlesArchiveLayout {...args} />);
			const masthead = within(screen.getByTestId('masthead'));

			expect(
				masthead.getAllByRole('link').map((link) => ({
					title: link.textContent,
					url: link.getAttribute('href'),
				})),
			).toEqual([
				{ title: 'Puzzles & games', url: '/puzzles-and-games' },
				{
					title: 'Crosswords',
					url: '/puzzles-and-games/crosswords/archive',
				},
				{
					title: 'Word games',
					url: '/puzzles-and-games/word-games/archive',
				},
				{
					title: 'Logic puzzles',
					url: '/puzzles-and-games/logic-puzzles/archive',
				},
				{
					title: 'Trivia & quizzes',
					url: '/puzzles-and-games/trivia-and-quizzes/archive',
				},
			]);
			expect(
				masthead
					.getByRole('link', { name: title })
					.querySelector('span'),
			).toHaveTextContent(title);
		},
	);

	it.each([
		['V1 only', true, false, 4],
		['V2 without V1', false, true, 1],
		['neither tier', false, false, 1],
	] as const)(
		'hides trivia for %s',
		(_description, isV1Enabled, isV2Enabled, expectedLinkCount) => {
			const { puzzlesPage } = archiveStories.args;
			render(
				<PuzzlesArchiveLayout
					NAV={nav}
					puzzlesPage={{
						...puzzlesPage,
						config: {
							...puzzlesPage.config,
							serverSideABTests: {
								...puzzlesHubV1Participation(
									isV1Enabled
										? puzzlesHubV1Experiment.variant
										: puzzlesHubV1Experiment.control,
								),
								...puzzlesHubV2Participation(
									isV2Enabled
										? puzzlesHubV2Experiment.variant
										: puzzlesHubV2Experiment.control,
								),
							},
						},
					}}
				/>,
			);
			const masthead = within(screen.getByTestId('masthead'));

			expect(
				masthead.queryByRole('link', { name: 'Trivia & quizzes' }),
			).not.toBeInTheDocument();
			expect(masthead.getAllByRole('link')).toHaveLength(
				expectedLinkCount,
			);
		},
	);

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

	it('passes the archive source into the More-from island', () => {
		jest.mocked(Island).mockClear();
		render(
			<PuzzlesArchiveLayout
				NAV={nav}
				puzzlesPage={page(true) as never}
			/>,
		);
		expect(Island).toHaveBeenCalledWith(
			expect.objectContaining({
				children: expect.objectContaining({
					props: expect.objectContaining({
						source: 'archive',
						items: page(true).archive.moreFrom,
					}),
				}),
			}),
			expect.anything(),
		);
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
