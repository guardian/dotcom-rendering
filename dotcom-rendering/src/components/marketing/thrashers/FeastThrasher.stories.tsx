import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FeastThrasher as FeastThrasherComponent } from './FeastThrasher';

const meta = {
	title: 'Components/Marketing/Thrashers/FeastThrasher',
	component: FeastThrasherComponent,
} satisfies Meta<typeof FeastThrasherComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FeastThrasher: Story = {
	args: {
		renderingTarget: 'Web',
	},
};

export const FeastThrasherApps: Story = {
	args: {
		renderingTarget: 'Apps',
	},
};
