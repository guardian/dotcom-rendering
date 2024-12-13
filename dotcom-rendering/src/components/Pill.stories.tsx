import { SvgCamera } from '@guardian/source/react-components';
import type { Meta, StoryObj } from '@storybook/react';
import { Pill } from './Pill';
import { SvgMediaControlsPlay } from './SvgMediaControlsPlay';

const meta: Meta<typeof Pill> = {
	title: 'Components/Pill',
	component: Pill,
	args: {
		content: 'Pill',
	},
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof Pill>;

export const Default = {} satisfies Story;

export const WithVideoIcon = {
	args: {
		content: <time>3:35</time>,
		icon: <SvgMediaControlsPlay />,
	},
} satisfies Story;

export const WithGalleryIcon = {
	args: {
		content: '10',
		icon: <SvgCamera />,
		iconSide: 'right',
	},
} satisfies Story;

export const WithGalleryIconAndPrefix = {
	args: {
		content: '10',
		prefix: 'Gallery',
		icon: <SvgCamera />,
		iconSide: 'right',
	},
} satisfies Story;
