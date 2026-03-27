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
			homeTeam: 'Australia',
			awayTeam: 'England',
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
					order: 1,
					declared: false,
					forfeited: false,
					battingTeam: 'home',
					runsScored: 169,
					overs: '20.0',
					fallOfWicket: [],
				},
				{
					order: 2,
					declared: false,
					forfeited: false,
					battingTeam: 'away',
					runsScored: 173,
					overs: '19.3',
					fallOfWicket: [],
				},
			],
		},
	},
} satisfies Story;
