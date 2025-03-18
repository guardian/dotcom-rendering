import type { Meta, StoryObj } from '@storybook/react/*';
import { formTorino } from '../../fixtures/manual/footballData';
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
		data: [
			{
				position: 1,
				team: 'Torino',
				gamesPlayed: 29,
				won: 21,
				drawn: 7,
				lost: 1,
				goalsFor: 69,
				goalsAgainst: 27,
				goalDifference: 42,
				points: 70,
				form: formTorino,
			},
		],
	},
} satisfies Story;
