import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { rightColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { AdSlot } from './AdSlot.apps';

const meta = {
	component: AdSlot,
	title: 'Components/Ad Slot (apps)',
	decorators: [rightColumnDecorator],
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
				'light desktop': allModes['light desktop'],
			},
		},
		viewport: {
			defaultViewport: 'mobileMedium',
		},
	},
	args: {
		onClickSupportButton: fn(),
	},
} satisfies Meta<typeof AdSlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstSlot = {
	args: {
		isFirstAdSlot: true,
	},
} satisfies Story;

export const OtherSlots = {
	args: {
		isFirstAdSlot: false,
	},
} satisfies Story;
