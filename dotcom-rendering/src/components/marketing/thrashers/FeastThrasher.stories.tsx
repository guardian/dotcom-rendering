import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FeastThrasher } from './FeastThrasher';

const meta = {
	title: 'Components/Marketing/Thrashers/FeastThrasher',
	component: FeastThrasher,
} satisfies Meta<typeof FeastThrasher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
