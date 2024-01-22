import type { Meta, StoryObj } from '@storybook/react';
import { DiscussionServerSide } from './DiscussionServerSide';

const meta: Meta<typeof DiscussionServerSide> = {
	title: 'components/DiscussionServerSide',
	component: DiscussionServerSide,
};

export default meta;

type Story = StoryObj<typeof DiscussionServerSide>;

export const Default: Story = {
	args: {},
};
