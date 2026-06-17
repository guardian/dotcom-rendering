import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';
import type { CricketMatch } from '../../cricketMatchV2';
import type { EditionId } from '../../lib/edition';
import { CricketMatchHeader } from './CricketMatchHeader';

const meta = {
	component: CricketMatchHeader,
} satisfies Meta<typeof CricketMatchHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultFallOfWickets = [
	{
		order: 1,
		name: 'Emilio Gay',
		runs: 16,
	},
	{
		order: 2,
		name: 'Ben Duckett',
		runs: 31,
	},
	{
		order: 3,
		name: 'Jacob Bethell',
		runs: 33,
	},
	{
		order: 4,
		name: 'Joe Root',
		runs: 34,
	},
	{
		order: 5,
		name: 'Jamie Smith',
		runs: 55,
	},
	{
		order: 6,
		name: 'Ben Stokes',
		runs: 94,
	},
	{
		order: 7,
		name: 'Gus Atkinson',
		runs: 108,
	},
	{
		order: 8,
		name: 'Harry Brook',
		runs: 113,
	},
	{
		order: 9,
		name: 'Ollie Robinson',
		runs: 118,
	},
	{
		order: 10,
		name: 'Shoaib Bashir',
		runs: 140,
	},
];

const defaultInnings = {
	description: 'Australia 169/10 (20.0 overs)',
	battingTeam: 'Australia',
	bowlers: [],
	batters: [],
	extras: {
		byes: 0,
		legByes: 0,
		noBalls: 0,
		penalties: 0,
		wides: 0,
	},
	declared: false,
	forfeited: false,
	inningsTotals: {
		runs: 169,
		overs: '20.0',
		wickets: 0,
		extras: 0,
	},
	fallOfWickets: defaultFallOfWickets,
};

const baseArgs = {
	edition: 'UK' as EditionId,
	initialData: {
		kind: 'Fixture' as CricketMatch['kind'],
		series: 'Ashes 2025–2026',
		competition: 'Second Test Match',
		venue: 'Brisbane Cricket Ground',
		matchDate: new Date('2026-01-26'),
		homeTeam: {
			paID: 'f7f611a1-e667-2aa2-c3e0-6dbc6981cfa4',
			name: 'Australia',
			lineup: ['David Warner', 'Travis Head'],
		},
		awayTeam: {
			paID: 'a359844f-fc07-9cfa-d4cc-9a9ac0d5d075',
			name: 'England',
			lineup: ['Zak Crawley', 'Alex Lees'],
		},
		innings: [],
		officials: [],
	},
	selectedTab: 'info' as 'info' | 'live' | 'report',
	matchHeaderURL:
		'https://api.nextgen.guardianapps.co.uk/sport/cricket/match-header/2026-06-13/australia-women-s-cricket-team.json',
	refreshInterval: 3_000,
	getHeaderData: () => Promise.resolve(undefined),
};

export const Fixture = {
	args: baseArgs,
	play: async ({ canvas, canvasElement, step }) => {
		const nav = canvas.getByRole('navigation');

		await step(
			'Placeholder not shown as we have initial data and can render header',
			async () => {
				void expect(
					canvasElement.querySelector('[data-name="placeholder"]'),
				).toBeNull();

				const initialTabs = within(nav).getAllByRole('listitem');

				void expect(initialTabs.length).toBe(1);
				void expect(initialTabs[0]).toHaveTextContent('Scorecard');
			},
		);

		await step('Fetch updated match header data', async () => {
			// Wait for 'Ashes 2025–2026' to appear which indicates match header
			// data has been fetched and the UI updated on the client
			await canvas.findByText('Ashes 2025–2026');
			void canvas.findByText('England');
			void canvas.findByText('Australia');

			const updatedTabs = within(nav).getAllByRole('listitem');
			void expect(updatedTabs.length).toBe(1);
			void expect(updatedTabs[0]).toHaveTextContent('Scorecard');
		});
	},
} satisfies Story;

export const Live = {
	args: {
		...baseArgs,
		initialData: {
			...Fixture.args.initialData,
			kind: 'Live' as CricketMatch['kind'],
			day: 2,
			innings: [
				{
					...defaultInnings,
					description: 'Australia 169/10 (20.0 overs)',
					battingTeam: 'Australia',
					inningsTotals: {
						runs: 169,
						overs: '20.0',
						wickets: 0,
						extras: 0,
					},
					fallOfWickets: [],
				},
				{
					...defaultInnings,
					description: 'England 173/3 (19.3 overs)',
					battingTeam: 'England',
					inningsTotals: {
						runs: 173,
						overs: '19.3',
						wickets: 3,
						extras: 0,
					},
					fallOfWickets: defaultFallOfWickets.slice(0, 3),
				},
			],
		},
		selectedTab: 'info',
		liveURL: new URL(
			'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
		),
	},
	play: async ({ canvas, step }) => {
		await step('Fetch match header data and render UI', async () => {
			// Wait for 'Ashes 2025–2026' to appear which signals match header
			// data has been fetched and the UI rendered on the client
			await canvas.findByText('Ashes 2025–2026');
			void canvas.findByText('England');
			void canvas.findByText('Australia');

			void expect(
				canvas.getByLabelText('169 runs, 0 wickets fallen'),
			).toBeInTheDocument();
			void expect(
				canvas.getByLabelText('173 runs, 3 wickets fallen'),
			).toBeInTheDocument();

			const nav = canvas.getByRole('navigation');
			const tabs = within(nav).getAllByRole('listitem');

			void expect(tabs.length).toBe(2);
			void expect(tabs[0]).toHaveTextContent('Live feed');
			void expect(tabs[1]).toHaveTextContent('Scorecard');
		});
	},
} satisfies Story;

export const LiveYetToBat = {
	name: 'Live (Team yet to bat)',
	args: {
		...baseArgs,
		edition: 'UK' as EditionId,
		initialData: {
			...Fixture.args.initialData,
			kind: 'Live',
			day: 2,
			innings: [
				{
					...defaultInnings,
					description: 'Australia 169 all out (20.0 overs)',
					battingTeam: 'Australia',
					inningsTotals: {
						runs: 169,
						overs: '20.0',
						wickets: 10,
						extras: 0,
					},
					fallOfWickets: defaultFallOfWickets,
				},
			],
		},
		selectedTab: 'info',
		liveURL: new URL(
			'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
		),
	},
} satisfies Story;

export const Result = {
	args: {
		...baseArgs,
		edition: 'UK' as EditionId,
		initialData: {
			...Fixture.args.initialData,
			kind: 'Result',
			day: 4,
			innings: [
				{
					...defaultInnings,
					battingTeam: 'Australia',
					inningsTotals: {
						runs: 245,
						overs: '65.0',
						wickets: 10,
						extras: 0,
					},
				},
				{
					...defaultInnings,
					battingTeam: 'England',
					inningsTotals: {
						runs: 361,
						overs: '89.5',
						wickets: 10,
						extras: 0,
					},
				},
				{
					...defaultInnings,
					battingTeam: 'Australia',
					inningsTotals: {
						runs: 258,
						overs: '78.1',
						wickets: 10,
						extras: 0,
					},
				},
				{
					...defaultInnings,
					battingTeam: 'England',
					inningsTotals: {
						runs: 364,
						overs: '92.5',
						wickets: 10,
						extras: 0,
					},
				},
			],
			result: {
				type: 'home-win',
				description: 'Australia win by an innings and 47 runs',
				winner: {
					type: 'runs',
					team: 'Australia',
					margin: 47,
				},
			},
		},
		selectedTab: 'info',
		liveURL: new URL(
			'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
		),
	},
	play: async ({ canvas, step }) => {
		await step('Fetch match header data and render UI', async () => {
			// Wait for 'Ashes 2025–2026' to appear which signals match header
			// data has been fetched and the UI rendered on the client
			await canvas.findByText('Ashes 2025–2026');
			void canvas.findByText('England');
			void canvas.findByText('Australia');

			const nav = canvas.getByRole('navigation');
			const tabs = within(nav).getAllByRole('listitem');

			void expect(tabs.length).toBe(2);
			void expect(tabs[0]).toHaveTextContent('Live feed');
			void expect(tabs[1]).toHaveTextContent('Scorecard');
		});
	},
} satisfies Story;

export const ResultWinByWickets = {
	args: {
		...baseArgs,
		edition: 'UK' as EditionId,
		initialData: {
			...Fixture.args.initialData,
			kind: 'Result',
			innings: [
				{
					...defaultInnings,
					battingTeam: 'Australia',
					inningsTotals: {
						runs: 186,
						overs: '16.2',
						wickets: 3,
						extras: 0,
					},
					fallOfWickets: defaultFallOfWickets.slice(0, 3),
				},
				{
					...defaultInnings,
					battingTeam: 'England',
					inningsTotals: {
						runs: 182,
						overs: '20.0',
						wickets: 8,
						extras: 0,
					},
					fallOfWickets: defaultFallOfWickets.slice(0, 8),
				},
			],
			result: {
				type: 'home-win',
				winner: {
					type: 'wickets',
					team: 'Australia',
					margin: 2,
				},
			},
		},
		selectedTab: 'info',

		liveURL: new URL(
			'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
		),
	},
} satisfies Story;

export const ResultDrawn = {
	args: {
		...baseArgs,
		edition: 'UK' as EditionId,
		initialData: {
			...Fixture.args.initialData,
			kind: 'Result',
			day: 4,
			innings: [
				{
					...defaultInnings,
					battingTeam: 'Australia',
					inningsTotals: {
						runs: 302,
						overs: '120.3',
						wickets: 10,
						extras: 0,
					},
				},
				{
					...defaultInnings,
					battingTeam: 'England',
					inningsTotals: {
						runs: 226,
						overs: '60.2',
						wickets: 10,
						extras: 0,
					},
				},
				{
					...defaultInnings,
					declared: true,
					battingTeam: 'Australia',
					inningsTotals: {
						runs: 218,
						overs: '72.5',
						wickets: 5,
						extras: 0,
					},
					fallOfWickets: defaultFallOfWickets.slice(0, 5),
				},
				{
					...defaultInnings,
					forfeited: false,
					battingTeam: 'England',
					inningsTotals: {
						runs: 239,
						overs: '67.4',
						wickets: 7,
						extras: 0,
					},
					fallOfWickets: defaultFallOfWickets.slice(0, 7),
				},
			],
			result: {
				type: 'draw',
			},
		},
		selectedTab: 'info',
		liveURL: new URL(
			'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
		),
	},
} satisfies Story;
