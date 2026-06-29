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
});

const format = {
	theme: ArticleSpecial.Labs,
	design: ArticleDesign.HostedGallery,
	display: ArticleDisplay.Standard,
};

const appsHostedGallery = enhanceArticleType(hostedGallery, 'Apps');
if (appsHostedGallery.design !== ArticleDesign.HostedGallery) {
	throw new Error('Expected hosted gallery');
}
export const Apps = meta.story({
	args: {
		gallery: appsHostedGallery,
		format,
		renderingTarget: 'Apps',
	},
	parameters: {
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
			},
		},
		config: {
			renderingTarget: 'Apps',
		},
	},
});

const webHostedGallery = enhanceArticleType(hostedGallery, 'Web');
if (webHostedGallery.design !== ArticleDesign.HostedGallery) {
	throw new Error('Expected hosted gallery');
}
export const Web = meta.story({
	args: {
		gallery: webHostedGallery,
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
		config: {
			renderingTarget: 'Web',
		},
	},
});
