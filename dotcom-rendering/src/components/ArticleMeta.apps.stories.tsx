import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { defaultFormats } from '../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { GalleryLabs as GalleryLabsFixture } from '../../fixtures/generated/fe-articles/GalleryLabs';
import type { ArticleFormat } from '../lib/articleFormat';
import {
	ArticleDesign,
	ArticleDisplay,
	getAllThemes,
	Pillar,
} from '../lib/articleFormat';
import { palette } from '../palette';
import { enhanceArticleType } from '../types/article';
import { ArticleMetaApps } from './ArticleMeta.apps';

const meta = preview.meta({
	component: ArticleMetaApps,
	title: 'Components/Article Meta (apps)',
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
				'vertical tablet': allModes['vertical tablet'],
			},
		},
	},
	decorators: [leftColumnDecorator],
});

export const WithFollowStory = meta.story({
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		byline: 'Lanre Bakare Chief music writer',
		tags: [
			{
				id: 'profile/lanre-bakare',
				type: 'Contributor',
				title: 'Lanre Bakare',
				twitterHandle: 'lanre_bakare',
				bylineImageUrl:
					'https://uploads.guim.co.uk/2017/10/06/Lanre-Bakare,-L.png',
				bylineLargeImageUrl:
					'https://uploads.guim.co.uk/2017/10/06/Lanre-Bakare,-L.png',
			},
		],
		primaryDateline: 'Sun 12 Jan 2020 18.00 GMT',
		secondaryDateline: 'Last modified on Sun 12 Jan 2020 21.00 GMT',
		isCommentable: false,
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		shortUrlId: '/p/zemg8',
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
		},
		formats: defaultFormats.filter(
			(format: ArticleFormat) => format.design !== ArticleDesign.Gallery,
		),
	},
});

export const WithFollowStoryNoTitle = meta.story({
	...WithFollowStory.input,
	args: {
		...WithFollowStory.input.args,
		byline: 'Lanre Bakare',
	},
});

export const WithAvatarAndFollowStory = meta.story({
	args: {
		...WithFollowStory.input.args,
		isCommentable: true,
	},
	parameters: {
		...WithFollowStory.input.parameters,
		formats: getAllThemes({
			...WithFollowStory.input.args.format,
			design: ArticleDesign.Feature,
		}),
	},
});

export const WithAvatarNoTitleAndFollowStory = meta.story({
	...WithAvatarAndFollowStory.input,
	args: {
		...WithAvatarAndFollowStory.input.args,
		byline: 'Lanre Bakare',
	},
});

export const ImmersiveAndFollowStory = meta.story({
	args: {
		...WithFollowStoryNoTitle.input.args,
		format: {
			...WithFollowStoryNoTitle.input.args.format,
			display: ArticleDisplay.Immersive,
		},
	},
	parameters: {
		...WithFollowStoryNoTitle.input.parameters,
		formats: undefined,
	},
});

export const ImmersiveWithMultipleContributorsStory = meta.story({
	...ImmersiveAndFollowStory.input,
	args: {
		...ImmersiveAndFollowStory.input.args,
		byline: 'Lanre Bakare in New York and Laura Banks in London',
		tags: [
			...ImmersiveAndFollowStory.input.args.tags,
			{
				id: 'profile/laura-banks',
				type: 'Contributor',
				title: 'Laura Banks',
			},
		],
	},
});

export const WithMultipleContributors = meta.story({
	...WithFollowStory.input,
	args: {
		...ImmersiveWithMultipleContributorsStory.input.args,
	},
});

export const WithBrandingStory = meta.story({
	args: {
		...WithFollowStory.input.args,
		isCommentable: true,
		branding: {
			brandingType: { name: 'sponsored' },
			sponsorName: 'theguardian.org',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/57ba1d00-b2bd-4f6d-ba35-15a82b8d9507-0094b90a-bdb8-4e97-b866-dcf49179b29d-theguardian.org.png',
				dimensions: {
					width: 280,
					height: 180,
				},
				link: 'https://theguardian.org/',
				label: 'Supported by',
			},
			logoForDarkBackground: {
				src: 'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/58a1e08d-cd4a-47a5-966a-4846b0461642-46629471-cb0b-4c59-9a06-1ef23778b41f-theguardian.org2.png',
				dimensions: {
					width: 280,
					height: 180,
				},
				link: 'https://theguardian.org/',
				label: 'Supported by',
			},
			aboutThisLink:
				'https://www.theguardian.com/environment/2023/jan/06/about-animals-farmed-investigating-modern-farming-around-the-world',
		},
	},
	parameters: {
		...WithFollowStory.input.parameters,
		formats: undefined,
	},
});

export const WithBrandingStoryForAdvertisingPartner = meta.story({
	args: {
		...WithBrandingStory.input.args,
		branding: {
			...WithBrandingStory.input.args.branding,
			logo: {
				...WithBrandingStory.input.args.branding.logo,
				label: 'Advertising partner',
			},
			logoForDarkBackground: {
				...WithBrandingStory.input.args.branding.logoForDarkBackground,
				label: 'Advertising partner',
			},
		},
	},
	parameters: {
		...WithBrandingStory.input.parameters,
		config: {
			...WithBrandingStory.input.parameters.config,
		},
	},
});

export const GalleryDesign = meta.story({
	args: {
		...WithFollowStory.input.args,
		isCommentable: true,
	},
	parameters: {
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
		}),
		config: {
			renderingTarget: 'Apps',
		},
		colourSchemeBackground: {
			light: palette('--article-inner-background'),
			dark: palette('--article-inner-background'),
		},
	},
});

const appArticle = enhanceArticleType(GalleryLabsFixture, 'Web');
export const GalleryLabsWithBranding = meta.story({
	args: {
		branding:
			appArticle.frontendData.commercialProperties[
				appArticle.frontendData.editionId
			].branding,
		format: {
			design: appArticle.design,
			display: appArticle.display,
			theme: appArticle.theme,
		},
		pageId: appArticle.frontendData.pageId,
		byline: appArticle.frontendData.byline,
		tags: appArticle.frontendData.tags,
		primaryDateline: appArticle.frontendData.webPublicationDateDisplay,
		secondaryDateline:
			appArticle.frontendData.webPublicationSecondaryDateDisplay,
		isCommentable: appArticle.frontendData.isCommentable,
		discussionApiUrl: appArticle.frontendData.config.discussionApiUrl,
		shortUrlId: appArticle.frontendData.config.shortUrlId,
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
		},
		colourSchemeBackground: {
			light: palette('--article-inner-background'),
			dark: palette('--article-inner-background'),
		},
	},
});
