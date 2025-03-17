import type { Meta, StoryObj } from '@storybook/react/*';
import { FootballTable } from './FootballTable';

const meta = {
	title: 'Components/Football Table',
	component: FootballTable,
	decorators: [
		// To make it easier to see the top border above the table
		(Story) => (
			<>
				<div css={{ padding: 4 }}></div>
				<Story />
			</>
		),
	],
} satisfies Meta<typeof FootballTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		dividers: [1],
		data: [
			{
				position: 1,
				team: 'Liverpool',
				gamesPlayed: 29,
				won: 21,
				drawn: 7,
				lost: 1,
				goalsFor: 69,
				goalsAgainst: 27,
				goalDifference: 42,
				points: 70,
			},
			{
				position: 2,
				team: 'Arsenal',
				gamesPlayed: 29,
				won: 21,
				drawn: 10,
				lost: 3,
				goalsFor: 53,
				goalsAgainst: 24,
				goalDifference: 29,
				points: 58,
			},
			{
				position: 3,
				team: 'Nottm Forest',
				gamesPlayed: 29,
				won: 16,
				drawn: 6,
				lost: 7,
				goalsFor: 49,
				goalsAgainst: 35,
				goalDifference: 14,
				points: 54,
			},
		],
	},
} satisfies Story;
