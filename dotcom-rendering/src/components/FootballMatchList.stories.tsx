import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { allModes } from '../../.storybook/modes';
import {
	initialDays,
	moreDays,
	nextPageNoJsUrl,
} from '../../fixtures/manual/footballData';
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
				'vertical wide': allModes['splitVertical'],
			},
		},
	},
} satisfies Meta<typeof FootballMatchList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		now: '2025-03-24T15:53:12.604Z',
		edition: 'US',
		guardianBaseUrl: 'https://www.theguardian.com',
		initialDays,
		getMoreDays: () => Promise.resolve(ok(moreDays)),
		nextPageNoJsUrl,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Get element with area role link (anchor tag) with the visible text content "More"
		const moreLink = canvas.getByRole('link', { name: /more/i });
		// Assert the href exists
		void expect(moreLink).toHaveAttribute('href', nextPageNoJsUrl);

		// Get the button element with the visible text content "More" and click it
		const moreButton = await canvas.findByRole('button', { name: /more/i });
		await userEvent.click(moreButton);

		const newDays = canvasElement.querySelectorAll('section');
		// Assert that the number of sections has increased
		void expect(newDays.length).toBeGreaterThan(initialDays.length);
	},
} satisfies Story;

export const ErrorGettingMore = {
	args: {
		...Default.args,
		getMoreDays: () => Promise.resolve(error('failed')),
	},
	play: Default.play,
} satisfies Story;

export const NoMoreDays = {
	args: {
		...Default.args,
		getMoreDays: undefined,
	},
} satisfies Story;
