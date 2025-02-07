import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import { FootballCompetitionSelect } from './FootballCompetitionSelect';

const meta = {
	title: 'Components/Football Competition Select',
	component: FootballCompetitionSelect,
} satisfies Meta<typeof FootballCompetitionSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		nations: [
			{
				name: 'England',
				competitions: [
					{ tag: 'football/premierleague', name: 'Premier League' },
					{ tag: 'football/championship', name: 'Championship' },
				],
			},
			{
				name: 'Scotland',
				competitions: [
					{
						tag: 'football/scottish-premiership',
						name: 'Scottish Premiership',
					},
				],
			},
		],
		onChange: fn(),
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.selectOptions(
			canvas.getByLabelText('Choose league:'),
			'football/premierleague',
		);
		await waitFor(() =>
			expect(args.onChange).toHaveBeenLastCalledWith(
				'football/premierleague',
			),
		);
	},
} satisfies Story;
