import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import preview from '../../.storybook/preview';
import { CrosswordSelect } from './CrosswordSelect.editions';

const meta = preview.meta({
	title: 'Components/Crossword Select (Editions)',
	component: CrosswordSelect,
});

export const NoCrosswords = meta.story({
	args: {
		crosswordsByDate: {},
		date: 'Monday',
		crosswordIndex: 0,
		onDateChange: fn(),
		onCrosswordIndexChange: fn(),
	},
});

export const SomeCrosswords = meta.story({
	args: {
		...NoCrosswords.input.args,
		crosswordsByDate: {
			Monday: [
				{ name: 'A Monday Crossword' },
				{ name: 'Another Monday Crossword' },
			],
			Tuesday: [
				{ name: 'A Tuesday Crossword' },
				{ name: 'Another Tuesday Crossword' },
			],
		},
	},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Select 'Tuesday'", async () => {
			await userEvent.selectOptions(
				canvas.getByLabelText('Date'),
				'Tuesday',
			);
			await waitFor(() =>
				expect(args.onDateChange).toHaveBeenLastCalledWith('Tuesday'),
			);
		});

		await step("Select the second 'Tuesday' crossword", async () => {
			await userEvent.selectOptions(
				canvas.getByLabelText('Crossword'),
				'1',
			);
			await waitFor(() =>
				expect(args.onCrosswordIndexChange).toHaveBeenLastCalledWith(1),
			);
		});

		await step("Select 'Monday'", async () => {
			await userEvent.selectOptions(
				canvas.getByLabelText('Date'),
				'Monday',
			);
			await waitFor(() =>
				expect(args.onDateChange).toHaveBeenLastCalledWith('Monday'),
			);
		});
	},
});
