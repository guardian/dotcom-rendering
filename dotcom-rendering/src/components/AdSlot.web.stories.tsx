import type { Meta, StoryObj } from '@storybook/react';
import { rightColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { AdSlot } from './AdSlot.web';
import { ArticleDisplay } from '../lib/articleFormat';

const meta = {
	component: AdSlot,
	title: 'Components/Ad Slot (web)',
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

export const RightStandard = {
	args: {
		position: 'right',
		display: ArticleDisplay.Standard,
	},
} satisfies Story;
