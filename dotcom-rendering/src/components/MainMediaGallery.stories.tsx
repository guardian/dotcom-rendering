import type { Meta, StoryObj } from '@storybook/react';
import { images } from '../../fixtures/generated/images';
import { grid } from '../grid';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { MainMediaGallery } from './MainMediaGallery';

const meta = {
	title: 'Components/MainMediaGallery',
	component: MainMediaGallery,
} satisfies Meta<typeof MainMediaGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstStory = {
	args: {
		mainMedia: images[0],
		format: {
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
	decorators: [
		// To make it easier to see the top border above the date
		(Story) => (
			<div css={[grid.container]}>
				<Story />
			</div>
		),
	],
} satisfies Story;
