import { hostedPaletteDecorator } from '../../.storybook/decorators/themeDecorator';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { hostedArticle } from '../../fixtures/manual/hostedArticle';
import { hostedOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { customMockFetch } from '../lib/mockRESTCalls';
import type { Article } from '../types/article';
import { enhanceArticleType } from '../types/article';
import { HostedArticleLayout } from './HostedArticleLayout';

const mockOnwardsContentFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl: `${hostedArticle.config.ajaxUrl}/${hostedArticle.config.pageId}/onward.json`,
		mockedStatus: 200,
		mockedBody: { trails: hostedOnwardsTrails },
	},
]);

const { hostedCampaignColour = '' } =
	hostedArticle.commercialProperties.UK.branding ?? {};

const meta = preview.meta({
	title: 'Layouts/HostedArticle',
	component: HostedArticleLayout,
	parameters: {
		config: { darkModeAvailable: true },
	},
	render: (args) => {
		global.fetch = mockOnwardsContentFetch;
		return <HostedArticleLayout {...args} />;
	},
	decorators: hostedPaletteDecorator(hostedCampaignColour),
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
				'vertical mobileMedium': allModes['vertical mobileMedium'],
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
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
});

const overrideBranding = (article: Article): Article => {
	const brandingWithoutAccentColour = {
		sponsorName: 'Croatia NTB',
		logo: {
			src: 'https://static.theguardian.com/commercial/sponsor/27/Mar/2026/2bd1de6c-47ce-4152-9031-66ce0b1bd96f-croatia_pos_140.png',
			dimensions: {
				width: 140,
				height: 90,
			},
			link: 'https://croatia.hr/en-gb/why-visit-croatia-in-spring/spring-is-meant-to-be-felt',
			label: 'Paid for by',
		},
		logoForDarkBackground: {
			src: 'https://static.theguardian.com/commercial/sponsor/27/Mar/2026/6f3bc0bd-41ef-4970-9cd7-c75fd1e8a0ce-croatia_pos_140.png',
			dimensions: {
				width: 140,
				height: 90,
			},
			link: 'https://croatia.hr/en-gb/why-visit-croatia-in-spring/spring-is-meant-to-be-felt',
			label: 'Paid for by',
		},
		aboutThisLink:
			'https://www.theguardian.com/info/2016/jan/25/content-funding',
		hostedCampaignColour: '',
	};

	return {
		...article,
		frontendData: {
			...article.frontendData,
			commercialProperties: {
				...article.frontendData.commercialProperties,
				UK: {
					...article.frontendData.commercialProperties.UK,
					branding: brandingWithoutAccentColour,
				},
			},
		},
	};
};

export const WithoutAccentColour = meta.story({
	args: {
		content: overrideBranding(webHostedArticle),
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
	decorators: hostedPaletteDecorator(''),
});

const overrideMainMediaCaption = (article: Article): Article => ({
	...article,
	frontendData: {
		...article.frontendData,
		mainMediaElements: [
			...article.frontendData.mainMediaElements.map((el) => {
				if (
					el._type ===
					'model.dotcomrendering.pageElements.ImageBlockElement'
				) {
					return {
						...el,
						data: {
							caption: '',
							credit: '',
							alt: '',
						},
					};
				}
				return el;
			}),
		],
	},
});

export const WithoutMainMediaCaption = meta.story({
	args: {
		content: overrideMainMediaCaption(webHostedArticle),
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
});
