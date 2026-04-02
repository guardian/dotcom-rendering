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
					runsScored: 511,
					overs: '10.0',
					fallOfWicket: 0,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 172,
					overs: '69.2',
					fallOfWicket: 0,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'Australia',
					runsScored: 334,
					overs: '28.2',
					fallOfWicket: 2,
				},
				{
					declared: false,
					forfeited: false,
					battingTeam: 'England',
					runsScored: 241,
					overs: '75.2',
					fallOfWicket: 0,
				},
			],
		},
	},
} satisfies Story;
