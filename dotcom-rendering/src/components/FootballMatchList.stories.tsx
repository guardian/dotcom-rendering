import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { allModes } from '../../.storybook/modes';
import { initialDays, moreDays } from '../../fixtures/manual/footballData';
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

export const NoMoreDays = {
	args: {
		...Default.args,
		getMoreDays: undefined,
	},
} satisfies Story;
