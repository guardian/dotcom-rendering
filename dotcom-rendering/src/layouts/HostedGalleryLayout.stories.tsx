import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { hostedGallery } from '../../fixtures/manual/hostedGallery';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { enhanceArticleType } from '../types/article';
import { HostedGalleryLayout } from './HostedGalleryLayout';

const meta = preview.meta({
	title: 'Layouts/HostedGallery',
	component: HostedGalleryLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
});

const format = {
	theme: ArticleSpecial.Labs,
	design: ArticleDesign.HostedGallery,
	display: ArticleDisplay.Standard,
};

export const Apps = meta.story({
	args: {
		content: enhanceArticleType(hostedGallery, 'Apps'),
		format,
		renderingTarget: 'Apps',
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
		},
	},
});

export const Web = meta.story({
	args: {
		content: enhanceArticleType(hostedGallery, 'Web'),
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
});
