import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { allModes } from '../../.storybook/modes';
import type { FootballMatches } from '../footballMatches';
import { error, ok } from '../lib/result';
import { FootballMatchList } from './FootballMatchList';

const meta = {
	title: 'Components/Football Match List',
	component: FootballMatchList,
	decorators: [
		// To make it easier to see the top border above the date
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
			},
		},
	},
} satisfies Meta<typeof FootballMatchList>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialDays: FootballMatches = [
	{
		date: new Date('2025-01-24T00:00:00Z'),
		competitions: [
			{
				competitionId: '635',
				name: 'Serie A',
				nation: 'European',
				matches: [
					{
						kind: 'Live',
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
						status: '1st',
					},
					{
						kind: 'Fixture',
						dateTime: new Date('2025-01-24T19:45:00Z'),
						paId: '4482890',
						homeTeam: 'Auxerre',
						awayTeam: 'St Etienne',
					},
				],
			},
			{
				competitionId: '650',
				name: 'La Liga',
				nation: 'European',
				matches: [
					{
						kind: 'Result',
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
						comment: 'AET',
					},
				],
			},
			{
				competitionId: '650',
				name: 'FA Cup',
				nation: 'European',
				matches: [
					{
						kind: 'Result',
						dateTime: new Date('2025-01-25T20:00:00Z'),
						paId: '4482836',
						homeTeam: {
							name: 'Brighton & Hove Albion Women',
							score: 1,
						},
						awayTeam: {
							name: 'Crystal Palace Women',
							score: 1,
						},
						comment:
							'Brighton & Hove Albion Women won 4 - 3 on penalties...',
					},
				],
			},
		],
	},
];

export const Default = {
	args: {
		edition: 'UK',
		initialDays,
		getMoreDays: () => Promise.resolve(ok(initialDays)),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const moreButtons = canvas.getAllByRole('button');
		for (const moreButton of moreButtons) {
			await userEvent.click(moreButton);
		}
	},
} satisfies Story;

export const ErrorGettingMore = {
	args: {
		...Default.args,
		getMoreDays: () => Promise.resolve(error('failed')),
	},
	play: Default.play,
} satisfies Story;
