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
		competition: {
			name: 'Premier League',
			url: 'https://www.theguardian.com/football/premierleague/table',
		},
		linkToFullTable: true,
		dividers: [1],
		data: [
			{
				position: 1,
				team: {
					name: 'Liverpool',
					id: '9',
					url: 'https://www.theguardian.com/football/arsenal',
				},
				gamesPlayed: 29,
				won: 21,
				drawn: 7,
				lost: 1,
				goalsFor: 69,
				goalsAgainst: 27,
				goalDifference: 42,
				points: 70,
				results: [
					{
						self: { name: 'Liverpool', score: 1 },
						foe: { name: 'Chelsea', score: 0 },
					},
					{
						self: { name: 'Liverpool', score: 3 },
						foe: { name: 'Arsenal', score: 5 },
					},
					{
						self: { name: 'Liverpool', score: 0 },
						foe: { name: 'West Ham', score: 0 },
					},
					{
						self: { name: 'Liverpool', score: 8 },
						foe: { name: 'Tottenham', score: 10 },
					},
					{
						self: { name: 'Liverpool', score: 0 },
						foe: { name: 'Brighton', score: 0 },
					},
					{
						self: { name: 'Liverpool', score: 0 },
						foe: { name: 'Blackburn', score: 0 },
					},
				],
			},
			{
				position: 2,
				team: {
					name: 'Arsenal',
					id: '1006',
					url: 'https://www.theguardian.com/football/arsenal',
				},
				gamesPlayed: 29,
				won: 21,
				drawn: 10,
				lost: 3,
				goalsFor: 53,
				goalsAgainst: 24,
				goalDifference: 29,
				points: 58,
				results: [
					{
						self: { name: 'Arsenal', score: 4 },
						foe: { name: 'Brighton', score: 0 },
					},
					{
						self: { name: 'Arsenal', score: 3 },
						foe: { name: 'Manchester United', score: 0 },
					},
					{
						self: { name: 'Arsenal', score: 5 },
						foe: { name: 'West Ham', score: 0 },
					},
					{
						self: { name: 'Arsenal', score: 9 },
						foe: { name: 'Manchester City', score: 0 },
					},
					{
						self: { name: 'Arsenal', score: 0 },
						foe: { name: 'Tottenham', score: 0 },
					},
					{
						self: { name: 'Arsenal', score: 0 },
						foe: { name: 'Blackburn', score: 0 },
					},
				],
			},
			{
				position: 3,
				team: {
					name: 'Nottm Forest',
					id: '15',
					url: 'https://www.theguardian.com/football/nottinghamforest',
				},
				gamesPlayed: 29,
				won: 16,
				drawn: 6,
				lost: 7,
				goalsFor: 49,
				goalsAgainst: 35,
				goalDifference: 14,
				points: 54,
				results: [
					{
						self: { name: 'Nottm Forest', score: 4 },
						foe: { name: 'Brighton', score: 4 },
					},
					{
						self: { name: 'Nottm Forest', score: 0 },
						foe: { name: 'Manchester United', score: 0 },
					},
					{
						self: { name: 'Nottm Forest', score: 0 },
						foe: { name: 'West Ham', score: 7 },
					},
					{
						self: { name: 'Nottm Forest', score: 9 },
						foe: { name: 'Manchester City', score: 0 },
					},
					{
						self: { name: 'Nottm Forest', score: 10 },
						foe: { name: 'Tottenham', score: 0 },
					},
					{
						self: { name: 'Nottm Forest', score: 0 },
						foe: { name: 'Blackburn', score: 0 },
					},
				],
			},
		],
	},
} satisfies Story;
