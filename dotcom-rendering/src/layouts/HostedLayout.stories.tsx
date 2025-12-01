import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { HostedLayout } from './HostedLayout';

const meta = {
	title: 'Layouts/Hosted',
	component: HostedLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
} satisfies Meta<typeof HostedLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Apps = {
	args: {
		renderingTarget: 'Apps',
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
		},
	},
} satisfies Story;

export const Web = {
	args: {
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
} satisfies Story;
