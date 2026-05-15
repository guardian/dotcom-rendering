import { expect, waitFor, within } from 'storybook/test';
import preview from '../../.storybook/preview';
import {
	crypticCrossword,
	quickCrossword,
} from '../../fixtures/manual/editionsCrossword';
import { Crosswords } from './Crosswords.editions';

const meta = preview.meta({
	title: 'Components/Crosswords (Editions)',
	component: Crosswords,
});

export const UKTimezone = meta.story({
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
					const clue = canvas.getByText(
						`${args.crosswords[0]?.entries[0]?.clue}`,
					);
					void expect(clue).toBeInTheDocument();
				});
			},
		);
	},
});

export const AnotherTimezone = meta.story({
	...UKTimezone.input,
	args: {
		...UKTimezone.input.args,
		timeZone: 'Australia/Sydney',
	},
});
