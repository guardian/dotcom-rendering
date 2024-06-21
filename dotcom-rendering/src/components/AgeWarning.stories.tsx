import type { Meta, StoryObj } from '@storybook/react';
import { AgeWarning } from './AgeWarning';

const meta = {
	title: 'Components/Age Warning',
	component: AgeWarning,
} satisfies Meta<typeof AgeWarning>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		age: '10 years old',
	},
} satisfies Story;

export const WithSizeSetToSmall = {
	args: {
		age: '5 months old',
		size: 'small',
	},
} satisfies Story;

export const ScreenReaderVersion = {
	args: {
		age: '20 million years old',
		isScreenReader: true,
	},
	name: 'With Screen Reader True (invisible)',
} satisfies Story;

export const WithOldTextMissingFromInput = {
	args: {
		age: '5 years',
	},
} satisfies Story;
