import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { PreferredSourceButton } from './PreferredSourceButton';

const meta = {
	component: PreferredSourceButton,
	decorators: [leftColumnDecorator],
} satisfies Meta<typeof PreferredSourceButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Story;
