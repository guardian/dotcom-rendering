import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CricketMatchHeader } from './CricketMatchHeader';

const meta = {
	component: CricketMatchHeader,
} satisfies Meta<typeof CricketMatchHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Live = {
	args: {
		edition: 'UK',
		match: {
			kind: 'Live',
			series: 'Ashes 2025–2026',
			competition: 'Second Test Match',
			venue: 'Brisbane Cricket Ground',
			day: 2,
			matchDate: new Date('2026-01-26'),
			homeTeam: {
				name: 'Australia',
				paID: '44',
			},
			awayTeam: {
				name: 'England',
				paID: '997',
			},
			innings: [
				{
					order: 1,
					battingTeam: 'Australia',
					runs: 169,
					overs: '20.0',
					fallOfWicket: [
						{ order: '1' },
						{ order: '2' },
						{ order: '3' },
						{ order: '4' },
						{ order: '5' },
						{ order: '6' },
						{ order: '7' },
						{ order: '8' },
					],
				},
				{
					order: 2,
					battingTeam: 'England',
					runs: 173,
					overs: '12.5',
					fallOfWicket: [{ order: '1' }],
				},
			],
		},
	},
} satisfies Story;
