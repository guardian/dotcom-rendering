import type { Meta, StoryObj } from '@storybook/react';
import { Gallery as GalleryFixture } from '../../fixtures/generated/fe-articles/Gallery';
import { ArticleDesign } from '../lib/articleFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType } from '../types/article';
import { GalleryLayout } from './GalleryLayout';

const meta = {
	title: 'Layouts/Gallery',
	component: GalleryLayout,
} satisfies Meta<typeof GalleryLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const appsArticle = enhanceArticleType(GalleryFixture, 'Apps');

if (appsArticle.design !== ArticleDesign.Gallery) {
	throw new Error('Expected gallery');
}

export const Apps = {
	args: {
		renderingTarget: 'Apps',
		gallery: appsArticle,
		format: {
			design: appsArticle.design,
			display: appsArticle.display,
			theme: appsArticle.theme,
		},
	},
	parameters: {
		formats: [
			{
				design: appsArticle.design,
				display: appsArticle.display,
				theme: appsArticle.theme,
			},
		],
	},
} satisfies Story;

const webArticle = enhanceArticleType(GalleryFixture, 'Web');

if (webArticle.design !== ArticleDesign.Gallery) {
	throw new Error('Expected gallery');
}

export const Web = {
	args: {
		renderingTarget: 'Web',
		NAV: {
			...extractNAV(webArticle.frontendData.nav),
			selectedPillar: getCurrentPillar(webArticle.frontendData),
		},
		gallery: webArticle,
		format: {
			design: webArticle.design,
			display: webArticle.display,
			theme: webArticle.theme,
		},
	},
	parameters: {
		formats: [
			{
				design: webArticle.design,
				display: webArticle.display,
				theme: webArticle.theme,
			},
		],
	},
} satisfies Story;
