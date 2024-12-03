import type { Meta, StoryObj } from '@storybook/react';
import { AuEoy2024 } from './AuEoy2024Wrapper.importable';

const meta = {
	title: 'Components/AusEoy2024',
	component: AuEoy2024,
} satisfies Meta<typeof AuEoy2024>;

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
	},
} satisfies Story;
