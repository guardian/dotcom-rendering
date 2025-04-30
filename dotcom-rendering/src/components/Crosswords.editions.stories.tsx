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
				date: 1730598000000,
				dateSolutionAvailable: 1730598000000,
				entries: quickCrossword.entries.map((entry) => ({
					...entry,
					clue: 'Another quick crossword clue',
				})),
			},
			{
				...crypticCrossword,
				date: 1730598000000,
				dateSolutionAvailable: 1730598000000,
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
					const clue = canvas.getByRole('listitem');
					return expect(clue.textContent).toEqual(
						`1${args.crosswords[0]?.entries[0]?.clue}`,
					);
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
