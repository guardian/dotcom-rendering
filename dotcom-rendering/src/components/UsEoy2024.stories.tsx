import type { Meta, StoryObj } from '@storybook/react';
import { UsEoy2024 } from './UsEoy2024Wrapper.importable';

const meta = {
	title: 'Components/UsEoy2024',
	component: UsEoy2024,
} satisfies Meta<typeof UsEoy2024>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		tickerData: {
			total: 1000000,
			goal: 2000000,
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		submitTrackingEvent: () => {},
		date: new Date('2024-11-26T00:00:00Z'),
	},
} satisfies Story;

export const FinalCountdown = {
	args: {
		tickerData: {
			total: 1000000,
			goal: 2000000,
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		submitTrackingEvent: () => {},
		date: new Date('2024-12-26T00:00:00Z'),
	},
} satisfies Story;