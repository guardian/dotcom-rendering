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
					runsScored: 169,
					overs: '20.0',
					fallOfWicket: 0,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 173,
					overs: '19.3',
					fallOfWicket: 3,
				},
			],
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
					runsScored: 169,
					overs: '20.0',
					fallOfWicket: 10,
				},
			],
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
					runsScored: 245,
					overs: '65.0',
					fallOfWicket: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 361,
					overs: '89.5',
					fallOfWicket: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runsScored: 258,
					overs: '78.1',
					fallOfWicket: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 364,
					overs: '92.5',
					fallOfWicket: 10,
				},
			],
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
					runsScored: 186,
					overs: '16.2',
					fallOfWicket: 3,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 182,
					overs: '20.0',
					fallOfWicket: 8,
				},
			],
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
					runsScored: 302,
					overs: '120.3',
					fallOfWicket: 10,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 226,
					overs: '60.2',
					fallOfWicket: 10,
				},
				{
					declared: true,
					forfeited: false,
					battingTeam: 'Australia',
					runsScored: 218,
					overs: '72.5',
					fallOfWicket: 5,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 239,
					overs: '67.4',
					fallOfWicket: 7,
				},
			],
		},
	},
} satisfies Story;
