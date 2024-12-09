import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';
import {
	crypticCrossword,
	quickCrossword,
} from '../../fixtures/manual/editionsCrossword';
import { Crosswords } from './Crosswords.editions';

const meta = {
	title: 'Components/Crosswords (Editions)',
	component: Crosswords,
} satisfies Meta<typeof Crosswords>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UKTimezone = {
	args: {
		crosswords: [
			quickCrossword,
			crypticCrossword,
			{
				...quickCrossword,
				date: '2024-11-02T23:00:00Z',
				dateSolutionAvailable: '2024-11-02T23:00:00Z',
				entries: quickCrossword.entries.map((entry) => ({
					...entry,
					clue: 'Another quick crossword clue',
				})),
			},
			{
				...crypticCrossword,
				date: '2024-11-02T23:00:00Z',
				dateSolutionAvailable: '2024-11-02T23:00:00Z',
				entries: crypticCrossword.entries.map((entry) => ({
					...entry,
					clue: 'Another cryptic crossword clue',
				})),
			},
		],
		timeZone: 'Europe/London',
	},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step(
			'Tuesday quick crossword is rendered initially',
			async () => {
				await waitFor(() => {
					const clue = args.crosswords[0]?.entries[0]?.clue;
					const listItem = canvas.getByText(clue as string);
					return expect(listItem).toBeInTheDocument();
				});
			},
		);
	},
} satisfies Story;

export const AnotherTimezone = {
	...UKTimezone,
	args: {
		...UKTimezone.args,
		timeZone: 'Australia/Sydney',
	},
};
