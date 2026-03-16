import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { hostedArticle } from '../../fixtures/manual/hostedArticle';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { enhanceArticleType } from '../types/article';
import type { Branding } from '../types/branding';
import { HostedArticleLayout } from './HostedArticleLayout';

const meta = {
	title: 'Layouts/HostedArticle',
	component: HostedArticleLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
} satisfies Meta<typeof HostedArticleLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const format = {
	theme: ArticleSpecial.Labs,
	design: ArticleDesign.HostedArticle,
	display: ArticleDisplay.Standard,
};

export const Apps = {
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
} satisfies Story;

export const Web = {
	args: {
		content: enhanceArticleType(hostedArticle, 'Web'),
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
} satisfies Story;

export const WithoutAccentColour = {
	args: {
		content: {
			...enhanceArticleType(hostedArticle, 'Web'),
			frontendData: {
				...enhanceArticleType(hostedArticle, 'Web').frontendData,
				commercialProperties: {
					...enhanceArticleType(hostedArticle, 'Web').frontendData
						.commercialProperties,
					UK: {
						...enhanceArticleType(hostedArticle, 'Web').frontendData
							.commercialProperties.UK,

						branding: {
							...enhanceArticleType(hostedArticle, 'Web')
								.frontendData.commercialProperties.UK.branding,
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
} satisfies Story;
