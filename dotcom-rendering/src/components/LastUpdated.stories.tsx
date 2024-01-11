import type { Meta, StoryObj } from '@storybook/react';
import { LastUpdated } from './LastUpdated';

const meta: Meta = {
	component: LastUpdated,
	title: 'Components/LastUpdated',
};

type Story = StoryObj<typeof LastUpdated>;

export const Default: Story = {
	args: { lastUpdated: 1613763519000, editionId: 'UK' },
};

export default meta;
