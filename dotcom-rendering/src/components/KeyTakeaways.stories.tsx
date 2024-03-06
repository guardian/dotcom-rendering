import { Meta, StoryObj } from '@storybook/react';
import { KeyTakeaways } from './KeyTakeaways';

const meta: Meta<typeof KeyTakeaways> = {
	component: KeyTakeaways,
	title: 'Components/KeyTakeaways',
};

export default meta;

type Story = StoryObj<typeof KeyTakeaways>;

export const Default: Story = {};
