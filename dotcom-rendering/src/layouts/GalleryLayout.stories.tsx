import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { Gallery as GalleryFixture } from '../../fixtures/generated/fe-articles/Gallery';
import { storyPackage } from '../../fixtures/generated/story-package';
import { WithBranding } from '../components/ArticleMeta.web.stories';
import { ArticleDesign } from '../lib/articleFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType, type Gallery } from '../types/article';
import { GalleryLayout } from './GalleryLayout';

const meta = {
	title: 'Layouts/Gallery',
	component: GalleryLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
} satisfies Meta<typeof GalleryLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const addBrandingAndAffiliateDisclaimer = (gallery: Gallery): Gallery => ({
	...gallery,
	frontendData: {
		...gallery.frontendData,
		affiliateLinksDisclaimer: 'true',
		webPublicationDateDeprecated: '2020-03-28T07:27:19.000Z',
		commercialProperties: {
			...gallery.frontendData.commercialProperties,
			UK: {
				...gallery.frontendData.commercialProperties.UK,
				branding: WithBranding.args.branding,
			},
		},
	},
});

const appsArticle = enhanceArticleType(
	{
		...GalleryFixture,
		hasStoryPackage: true,
		storyPackage,
	},
	'Apps',
);

if (appsArticle.design !== ArticleDesign.Gallery) {
	throw new Error('Expected gallery');
}

export const Apps = {
	args: {
		renderingTarget: 'Apps',
		gallery: addBrandingAndAffiliateDisclaimer(appsArticle),
	},
	parameters: {
		formats: [
			{
				design: appsArticle.design,
				display: appsArticle.display,
				theme: appsArticle.theme,
			},
		],
		config: {
			renderingTarget: 'Apps',
		},
	},
} satisfies Story;

const webArticle = enhanceArticleType(
	{
		...GalleryFixture,
		hasStoryPackage: true,
		storyPackage,
	},
	'Web',
);

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
		gallery: addBrandingAndAffiliateDisclaimer(webArticle),
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

export const WebWithoutMainMedia = {
	args: {
		renderingTarget: 'Web',
		NAV: {
			...extractNAV(webArticle.frontendData.nav),
			selectedPillar: getCurrentPillar(webArticle.frontendData),
		},
		gallery: {
			...addBrandingAndAffiliateDisclaimer(webArticle),
			mainMedia: undefined,
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
