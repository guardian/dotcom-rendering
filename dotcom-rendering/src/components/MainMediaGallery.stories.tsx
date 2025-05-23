import type { Meta, StoryObj } from '@storybook/react';
import { gridContainerDecorator } from '../../.storybook/decorators/gridDecorators';
import { images } from '../../fixtures/generated/images';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { MainMediaGallery } from './MainMediaGallery';

const meta = {
	title: 'Components/MainMediaGallery',
	component: MainMediaGallery,
	decorators: gridContainerDecorator,
} satisfies Meta<typeof MainMediaGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		mainMedia: images[0],
		format: {
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
} satisfies Story;

export const PortraitImage = {
	args: {
		...Default.args,
		mainMedia: images[7],
	},
};
