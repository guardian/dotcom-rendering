import type { Meta, StoryObj } from '@storybook/react';
import { Pill } from './Pill';

const meta: Meta<typeof Pill> = {
	title: 'Components/Pill',
	component: Pill,
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default = {} satisfies Story;
