import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CricketMatchHeader } from './CricketMatchHeader';

const meta = {
	component: CricketMatchHeader,
} satisfies Meta<typeof CricketMatchHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fixture = {
	args: {
		edition: 'UK',
		match: {
			kind: 'Fixture',
			series: 'Ashes 2025–2026',
			competition: 'Second Test Match',
			venue: 'Brisbane Cricket Ground',
			matchDate: new Date('2026-01-26'),
			officials: [
				'P R Reiffel',
				'R K Illingworth',
				'J S Wilson',
				'H D P K Dharmasena',
				'R S Madugalle',
			],
			homeTeam: {
				paID: 'f7f611a1-e667-2aa2-c3e0-6dbc6981cfa4',
				name: 'Australia',
			},
			awayTeam: {
				paID: 'a359844f-fc07-9cfa-d4cc-9a9ac0d5d075',
				name: 'England',
			},
			innings: [],
		},
		tabs: {
			selected: 'info',
			sportKind: 'cricket',
			matchKind: 'Fixture',
		},
	},
} satisfies Story;

export const Live = {
	args: {
		edition: 'UK',
		match: {
			...Fixture.args.match,
			kind: 'Live',
			day: 2,
			innings: [
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runs: 169,
					overs: '20.0',
					fallOfWickets: 0,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runs: 173,
					overs: '19.3',
					fallOfWickets: 3,
				},
			],
		},
		tabs: {
			selected: 'info',
			sportKind: 'cricket',
			matchKind: 'Live',
			liveURL: new URL(
				'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
			),
		},
	},
} satisfies Story;

export const LiveYetToBat = {
	name: 'Live (Team yet to bat)',
	args: {
		edition: 'UK',
		match: {
			...Fixture.args.match,
			kind: 'Live',
			day: 2,
			innings: [
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runs: 169,
					overs: '20.0',
					fallOfWickets: 10,
				},
			],
		},
		tabs: {
			selected: 'info',
			sportKind: 'cricket',
			matchKind: 'Live',
			liveURL: new URL(
				'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
			),
		},
	},
} satisfies Story;

export const Result = {
	args: {
		edition: 'UK',
		match: {
			...Fixture.args.match,
			kind: 'Result',
			day: 4,
			innings: [
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runs: 245,
					overs: '65.0',
					fallOfWickets: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runs: 361,
					overs: '89.5',
					fallOfWickets: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runs: 258,
					overs: '78.1',
					fallOfWickets: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runs: 364,
					overs: '92.5',
					fallOfWickets: 10,
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
		tabs: {
			selected: 'info',
			sportKind: 'cricket',
			matchKind: 'Result',
			liveURL: new URL(
				'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
			),
		},
	},
} satisfies Story;

export const ResultWinByWickets = {
	args: {
		edition: 'UK',
		match: {
			...Fixture.args.match,
			kind: 'Result',
			innings: [
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runs: 186,
					overs: '16.2',
					fallOfWickets: 3,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runs: 182,
					overs: '20.0',
					fallOfWickets: 8,
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
		tabs: {
			selected: 'info',
			sportKind: 'cricket',
			matchKind: 'Result',
			liveURL: new URL(
				'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
			),
		},
	},
} satisfies Story;

export const ResultDrawn = {
	args: {
		edition: 'UK',
		match: {
			...Fixture.args.match,
			kind: 'Result',
			day: 4,
			innings: [
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runs: 302,
					overs: '120.3',
					fallOfWickets: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runs: 226,
					overs: '60.2',
					fallOfWickets: 10,
				},
				{
					declared: true,
					forfeited: false,
					battingTeam: 'Australia',
					runs: 218,
					overs: '72.5',
					fallOfWickets: 5,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runs: 239,
					overs: '67.4',
					fallOfWickets: 7,
				},
			],
			result: {
				type: 'draw',
			},
		},
		tabs: {
			selected: 'info',
			sportKind: 'cricket',
			matchKind: 'Result',
			liveURL: new URL(
				'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
			),
		},
	},
} satisfies Story;
