import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { expect, waitFor, within } from 'storybook/test';
import type { FECricketMatchHeader } from '../../frontend/feCricketMatchHeader';
import type {
	FECricketInnings,
	FECricketMatch,
} from '../../frontend/feCricketMatchPage';
import type { ArticleFormat } from '../../lib/articleFormat';
import type { ArticleDeprecated } from '../../types/article';
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
	order: 1,
	description: 'Australia 169/10 (20.0 overs)',
	battingTeam: 'Australia',
	bowlers: [],
	batters: [],
	byes: 0,
	legByes: 0,
	noBalls: 0,
	penalties: 0,
	wides: 0,
	declared: false,
	forfeited: false,
	runsScored: 169,
	overs: '20.0',
	wickets: 0,
	extras: 0,
	fallOfWicket: defaultFallOfWickets,
} satisfies FECricketInnings;

const baseMatch = {
	teams: [
		{
			name: 'Australia',
			id: 'f7f611a1-e667-2aa2-c3e0-6dbc6981cfa4',
			home: true,
			lineup: ['David Warner', 'Travis Head'],
		},
		{
			name: 'England',
			id: 'a359844f-fc07-9cfa-d4cc-9a9ac0d5d075',
			home: false,
			lineup: ['Zak Crawley', 'Alex Lees'],
		},
	],
	innings: [],
	stage: 'Ashes 2025–2026',
	competitionName: 'Second Test Match',
	venueName: 'Brisbane Cricket Ground',
	result: 'pre-match',
	currentDay: 1,
	totalDays: 5,
	gameDate: '2026-01-26T00:00:00',
	officials: [],
	matchId: 'australia-v-england-second-test',
} satisfies FECricketMatch;

const headerData = (cricketMatch: FECricketMatch): FECricketMatchHeader => ({
	cricketMatch,
	liveURL:
		'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
});

const baseArgs = {
	edition: 'UK',
	selectedTab: 'info',
	matchHeaderURL:
		'https://api.nextgen.guardianapps.co.uk/sport/cricket/match-header/2026-06-13/australia-women-s-cricket-team.json',
	refreshInterval: 3_000,
	tabContentId: 'cricket-tab-content',
	getHeaderData: () => getMockData(headerData(baseMatch)),
	article: {
		pageId: 'sport/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
		guardianBaseURL: 'https://www.theguardian.com',
	} as ArticleDeprecated,
	format: {} as ArticleFormat,
} satisfies ComponentProps<typeof CricketMatchHeader>;

const getMockData = (data: FECricketMatchHeader) =>
	new Promise<FECricketMatchHeader>((resolve) => {
		setTimeout(() => resolve(data), 100);
	});

export const Fixture = {
	args: baseArgs,
	play: async ({ canvas, step }) => {
		await step('Fetch match header data and render UI', async () => {
			await waitFor(() =>
				expect(canvas.getByText('Ashes 2025–2026')).toBeInTheDocument(),
			);

			await expect(canvas.getByText('England')).toBeInTheDocument();
			await expect(canvas.getByText('Australia')).toBeInTheDocument();

			await expect(canvas.getByRole('navigation')).toBeInTheDocument();
		});
	},
} satisfies Story;

export const Live = {
	args: {
		...baseArgs,
		getHeaderData: () =>
			Promise.resolve(
				headerData({
					...baseMatch,
					result: 'in-play',
					currentDay: 2,
					innings: [
						{
							...defaultInnings,
							description: 'Australia 169/10 (20.0 overs)',
							battingTeam: 'Australia',
							runsScored: 169,
							overs: '20.0',
							wickets: 0,
							extras: 0,
							fallOfWicket: [],
						},
						{
							...defaultInnings,
							description: 'England 173/3 (19.3 overs)',
							battingTeam: 'England',
							runsScored: 173,
							overs: '19.3',
							wickets: 3,
							extras: 0,
							fallOfWicket: defaultFallOfWickets.slice(0, 3),
						},
					],
				}),
			),
		selectedTab: 'info',
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
		getHeaderData: () =>
			Promise.resolve(
				headerData({
					...baseMatch,
					result: 'in-play',
					currentDay: 2,
					innings: [
						{
							...defaultInnings,
							description: 'Australia 169 all out (20.0 overs)',
							battingTeam: 'Australia',
							runsScored: 169,
							overs: '20.0',
							wickets: 10,
							extras: 0,
							fallOfWicket: defaultFallOfWickets,
						},
					],
				}),
			),
		selectedTab: 'info',
	},
} satisfies Story;

export const Result = {
	args: {
		...baseArgs,
		getHeaderData: () =>
			Promise.resolve(
				headerData({
					...baseMatch,
					result: 'result',
					currentDay: 4,
					innings: [
						{
							...defaultInnings,
							battingTeam: 'Australia',
							runsScored: 245,
							overs: '65.0',
							wickets: 10,
							extras: 0,
						},
						{
							...defaultInnings,
							battingTeam: 'England',
							runsScored: 361,
							overs: '89.5',
							wickets: 10,
							extras: 0,
						},
						{
							...defaultInnings,
							battingTeam: 'Australia',
							runsScored: 258,
							overs: '78.1',
							wickets: 10,
							extras: 0,
						},
						{
							...defaultInnings,
							battingTeam: 'England',
							runsScored: 364,
							overs: '92.5',
							wickets: 10,
							extras: 0,
						},
					],
					fullResult: {
						resultType: 'home-win',
						description: 'Australia win by an innings and 47 runs',
						winner: {
							winType: 'runs',
							team: 'Australia',
							margin: '47',
						},
					},
				}),
			),
		selectedTab: 'info',
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
		getHeaderData: () =>
			Promise.resolve(
				headerData({
					...baseMatch,
					result: 'result',
					innings: [
						{
							...defaultInnings,
							battingTeam: 'Australia',
							runsScored: 186,
							overs: '16.2',
							wickets: 3,
							extras: 0,
							fallOfWicket: defaultFallOfWickets.slice(0, 3),
						},
						{
							...defaultInnings,
							battingTeam: 'England',
							runsScored: 182,
							overs: '20.0',
							wickets: 8,
							extras: 0,
							fallOfWicket: defaultFallOfWickets.slice(0, 8),
						},
					],
					fullResult: {
						resultType: 'home-win',
						winner: {
							winType: 'wickets',
							team: 'Australia',
							margin: '2',
						},
					},
				}),
			),
		selectedTab: 'info',
	},
} satisfies Story;

export const ResultDrawn = {
	args: {
		...baseArgs,
		getHeaderData: () =>
			Promise.resolve(
				headerData({
					...baseMatch,
					result: 'result',
					currentDay: 4,
					innings: [
						{
							...defaultInnings,
							battingTeam: 'Australia',
							runsScored: 302,
							overs: '120.3',
							wickets: 10,
							extras: 0,
						},
						{
							...defaultInnings,
							battingTeam: 'England',
							runsScored: 226,
							overs: '60.2',
							wickets: 10,
							extras: 0,
						},
						{
							...defaultInnings,
							declared: true,
							battingTeam: 'Australia',
							runsScored: 218,
							overs: '72.5',
							wickets: 5,
							extras: 0,
							fallOfWicket: defaultFallOfWickets.slice(0, 5),
						},
						{
							...defaultInnings,
							forfeited: false,
							battingTeam: 'England',
							runsScored: 239,
							overs: '67.4',
							wickets: 7,
							extras: 0,
							fallOfWicket: defaultFallOfWickets.slice(0, 7),
						},
					],
					fullResult: {
						resultType: 'draw',
					},
				}),
			),
		selectedTab: 'info',
	},
} satisfies Story;
