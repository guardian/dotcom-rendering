import { breakpoints } from '@guardian/source/foundations';
import { expect, within } from 'storybook/test';
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
				'light mobile': allModes['light mobile'],
				'light mobileMedium': allModes['light mobileMedium'],
				'light mobileLandscape': {
					globalColourScheme: 'light',
					viewport: breakpoints.mobileLandscape,
				},
				'light phablet': {
					globalColourScheme: 'light',
					viewport: breakpoints.phablet,
				},
				'light tablet': {
					globalColourScheme: 'light',
					viewport: breakpoints.tablet,
				},
				'light desktop': allModes['light desktop'],
				'light leftCol': allModes['light leftCol'],
				'light wide': allModes['light wide'],
			},
		},
	},
	play: async ({ canvasElement, args }) => {
		await expect(
			within(canvasElement).getByRole('heading', {
				name: args.content.frontendData.headline,
				level: 1,
			}),
		).toBeVisible();
		const { documentElement } = canvasElement.ownerDocument;
		await expect(documentElement.scrollWidth).toBeLessThanOrEqual(
			documentElement.clientWidth,
		);
	},
});

export const WithTallMainMedia = Web.extend({
	args: {
		content: {
			...webHostedArticle,
			frontendData: {
				...webHostedArticle.frontendData,
				mainMediaElements: hostedArticle.mainMediaElements.map(
					(element) => {
						if (
							element._type !==
							'model.dotcomrendering.pageElements.ImageBlockElement'
						) {
							return element;
						}
						return {
							...element,
							data: {
								alt: 'Fortnite convergence art with 4 characters in a purple swirl of color',
								credit: 'Composite: Fortnite',
							},
							media: {
								allImages: [
									{
										index: 0,
										fields: {
											isMaster: 'true',
											width: '1920',
											height: '1152',
										},
										mediaType: 'Image',
										mimeType: 'image/jpeg',
										url: 'https://media.guim.co.uk/4bcf63ebab3bfeda5701f957f6a7b13f2597c976/0_0_1920_1152/master/1920.jpg',
									},
								],
							},
							imageSources: element.imageSources.map(
								(source) => ({
									...source,
									srcSet: [
										{
											src: 'https://i.guim.co.uk/img/media/4bcf63ebab3bfeda5701f957f6a7b13f2597c976/0_0_1920_1152/master/1920.jpg?width=700&quality=45&auto=format&fit=max&dpr=2&s=1bdc26f4ed1b54dfdcd6fa96b5f77f84',
											width: 1400,
										},
									],
								}),
							),
						};
					},
				),
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
