import type { Meta, StoryObj } from '@storybook/react';
import { GalleryIcon, MediaIcon, Pill } from './Pill';

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

export const WithMediaIcon = {
	args: {
		content: <time>3:35</time>,
		icon: <MediaIcon />,
	},
} satisfies Story;

export const WithGalleryIcon = {
	args: {
		content: '10',
		icon: <GalleryIcon />,
		iconSide: 'right',
	},
} satisfies Story;

export const WithGalleryIconAndPrefix = {
	args: {
		content: '10',
		prefix: 'Gallery',
		icon: <GalleryIcon />,
		iconSide: 'right',
	},
} satisfies Story;
