import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import { allModes } from '../../.storybook/modes';
import { regions } from '../../fixtures/manual/footballData';
import { FootballCompetitionSelect as FootballCompetitionSelectComponent } from './FootballCompetitionSelect';

const meta = {
	title: 'Components/Football Competition Select',
	component: FootballCompetitionSelectComponent,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof FootballCompetitionSelectComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballCompetitionSelect = {
	args: {
		regions,
		kind: 'FootballResult',
		pageId: 'football/live',
		onChange: fn(),
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);

		const selects = canvas.getAllByLabelText('Choose league:');

		for (const select of selects) {
			await userEvent.selectOptions(
				select,
				'/football/premierleague/live',
			);
			await waitFor(() =>
				expect(args.onChange).toHaveBeenLastCalledWith(
					'/football/premierleague/live',
				),
			);
		}
	},
} satisfies Story;
