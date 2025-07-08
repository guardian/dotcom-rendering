import type { Meta, StoryObj } from '@storybook/react';
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
} satisfies Meta<typeof AdSlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slots = {} satisfies Story;
