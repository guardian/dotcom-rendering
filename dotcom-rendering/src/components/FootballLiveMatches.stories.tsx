import type { Meta, StoryObj } from '@storybook/react';
import { FootballLiveMatches as FootballLiveMatchesComponent } from './FootballLiveMatches';
import { userEvent, within } from '@storybook/test';

const meta = {
	title: 'Components/Football Live Matches',
	component: FootballLiveMatchesComponent,
	decorators: [
		// To make it easier to see the top border above the date
		(Story) => (
			<>
				<div css={{ padding: 4 }}></div>
				<Story />
			</>
		),
	],
} satisfies Meta<typeof FootballLiveMatchesComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialDays = [
	{
		date: new Date('2025-01-24T00:00:00Z'),
		competitions: [
			{
				competitionId: '635',
				name: 'Serie A',
				nation: 'European',
				matches: [
					{
						dateTime: new Date('2025-01-24T11:11:00Z'),
						paId: '4482093',
						homeTeam: {
							name: 'Torino',
							score: 10,
						},
						awayTeam: {
							name: 'Cagliari',
							score: 0,
						},
						status: 'FT',
					},
					{
						dateTime: new Date('2025-01-24T19:45:00Z'),
						paId: '4482890',
						homeTeam: {
							name: 'Auxerre',
							score: 0,
						},
						awayTeam: {
							name: 'St Etienne',
							score: 0,
						},
						status: 'FT',
					},
				],
			},
			{
				competitionId: '650',
				name: 'La Liga',
				nation: 'European',
				matches: [
					{
						dateTime: new Date('2025-01-24T20:00:00Z'),
						paId: '4482835',
						homeTeam: {
							name: 'Las Palmas',
							score: 2,
						},
						awayTeam: {
							name: 'Osasuna',
							score: 3,
						},
						status: 'FT',
					},
				],
			},
		],
	},
];

export const FootballLiveMatches = {
	args: {
		edition: 'UK',
		initialDays,
		getMoreDays: () => Promise.resolve(initialDays),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const more = canvas.getByRole('button');
		await userEvent.click(more);
	},
} satisfies Story;
