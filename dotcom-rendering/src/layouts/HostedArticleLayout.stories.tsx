import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { hostedArticle } from '../../fixtures/manual/hostedArticle';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { enhanceArticleType } from '../types/article';
import type { Branding } from '../types/branding';
import { HostedArticleLayout } from './HostedArticleLayout';

const meta = preview.meta({
	title: 'Layouts/HostedArticle',
	component: HostedArticleLayout,
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
	design: ArticleDesign.HostedArticle,
	display: ArticleDisplay.Standard,
};

export const Apps = meta.story({
	args: {
		content: enhanceArticleType(hostedArticle, 'Apps'),
		format,
		renderingTarget: 'Apps',
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
			darkModeAvailable: true,
		},
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
			},
		},
	},
});

const webHostedArticle = enhanceArticleType(hostedArticle, 'Web');

export const Web = meta.story({
	args: {
		content: webHostedArticle,
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
});

export const WithoutAccentColour = meta.story({
	args: {
		content: {
			...webHostedArticle,
			frontendData: {
				...webHostedArticle.frontendData,
				commercialProperties: {
					...webHostedArticle.frontendData.commercialProperties,
					UK: {
						...webHostedArticle.frontendData.commercialProperties
							.UK,

						branding: {
							...webHostedArticle.frontendData
								.commercialProperties.UK.branding,
							hostedCampaignColour: undefined,
						} as Branding,
					},
				},
			},
		},
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
});
