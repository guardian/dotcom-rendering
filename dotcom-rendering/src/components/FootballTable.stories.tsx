import type { Meta, StoryObj } from '@storybook/react/*';
import { allModes } from '../../.storybook/modes';
import { FootballTable as FootballTableComponent } from './FootballTable';

const meta = {
	title: 'Components/Football Table',
	component: FootballTableComponent,
	decorators: [
		// To make it easier to see the top border above the table
		(Story) => (
			<>
				<div css={{ padding: 4 }}></div>
				<Story />
			</>
		),
	],
	parameters: {
		chromatic: {
			modes: {
				'vertical mobile': allModes['vertical mobile'],
				'vertical desktop': allModes['vertical desktop'],
				'vertical wide': allModes['splitVertical'],
			},
		},
	},
} satisfies Meta<typeof FootballTableComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FootballTable = {
	args: {
		competitionName: 'Premier League',
		competitionUrl: '/football/premierleague',
		guardianBaseUrl: 'https://www.theguardian.com',
		table: {
			linkToFullTable: true,
			dividers: [1],
			entries: [
				{
					position: 1,
					team: {
						name: 'Liverpool',
						id: '9',
						url: '/football/liverpool',
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
							id: '1',
							self: { name: 'Liverpool', score: 1 },
							foe: { name: 'Chelsea', score: 0 },
						},
						{
							id: '2',
							self: { name: 'Liverpool', score: 3 },
							foe: { name: 'Arsenal', score: 5 },
						},
						{
							id: '3',
							self: { name: 'Liverpool', score: 0 },
							foe: { name: 'West Ham', score: 0 },
						},
						{
							id: '4',
							self: { name: 'Liverpool', score: 8 },
							foe: { name: 'Tottenham', score: 10 },
						},
						{
							id: '5',
							self: { name: 'Liverpool', score: 0 },
							foe: { name: 'Brighton', score: 0 },
						},
					],
				},
				{
					position: 2,
					team: {
						name: 'Arsenal',
						id: '1006',
						url: '/football/arsenal',
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
							id: '1',
							self: { name: 'Arsenal', score: 4 },
							foe: { name: 'Brighton', score: 0 },
						},
						{
							id: '2',
							self: { name: 'Arsenal', score: 3 },
							foe: { name: 'Manchester United', score: 0 },
						},
						{
							id: '3',
							self: { name: 'Arsenal', score: 5 },
							foe: { name: 'West Ham', score: 0 },
						},
						{
							id: '4',
							self: { name: 'Arsenal', score: 9 },
							foe: { name: 'Manchester City', score: 0 },
						},
						{
							id: '5',
							self: { name: 'Arsenal', score: 0 },
							foe: { name: 'Tottenham', score: 0 },
						},
					],
				},
				{
					position: 3,
					team: {
						name: 'Nottm Forest',
						id: '15',
						url: '/football/nottinghamforest',
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
							id: '1',
							self: { name: 'Nottm Forest', score: 4 },
							foe: { name: 'Brighton', score: 4 },
						},
						{
							id: '2',
							self: { name: 'Nottm Forest', score: 0 },
							foe: { name: 'Manchester United', score: 0 },
						},
						{
							id: '3',
							self: { name: 'Nottm Forest', score: 0 },
							foe: { name: 'West Ham', score: 7 },
						},
						{
							id: '4',
							self: { name: 'Nottm Forest', score: 9 },
							foe: { name: 'Manchester City', score: 0 },
						},
						{
							id: '5',
							self: { name: 'Nottm Forest', score: 10 },
							foe: { name: 'Tottenham', score: 0 },
						},
					],
				},
			],
		},
	},
} satisfies Story;
