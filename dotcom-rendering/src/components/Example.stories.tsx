import { Meta, StoryObj } from '@storybook/react';
import { Example } from './Example';

const meta: Meta<typeof Example> = {
	title: 'components/Example',
	component: Example,
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Default: Story = {
	args: {},
};
