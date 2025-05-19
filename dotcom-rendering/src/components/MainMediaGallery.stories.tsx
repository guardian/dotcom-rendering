import type { Meta, StoryObj } from '@storybook/react';
import { MainMediaGallery } from './MainMediaGallery';

const meta = {
	title: 'Components/MainMediaGallery',
	component: MainMediaGallery,
} satisfies Meta<typeof MainMediaGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstStory = {
	args: {},
} satisfies Story;
