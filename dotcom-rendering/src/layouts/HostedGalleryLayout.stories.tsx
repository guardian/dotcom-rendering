import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { hostedGallery } from '../../fixtures/manual/hostedGallery';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { enhanceArticleType } from '../types/article';
import { HostedGalleryLayout } from './HostedGalleryLayout';

const meta = {
	title: 'Layouts/HostedGallery',
	component: HostedGalleryLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
} satisfies Meta<typeof HostedGalleryLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Apps = {
	args: {
		content: enhanceArticleType(hostedGallery, 'Apps'),
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.HostedArticle,
			display: ArticleDisplay.Standard,
		},
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
		content: enhanceArticleType(hostedGallery, 'Web'),
		format: {
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.HostedArticle,
			display: ArticleDisplay.Standard,
		},
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
} satisfies Story;
