import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans15,
} from '@guardian/source/foundations';
import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { defaultFormats } from '../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { GalleryLabs as GalleryLabsFixture } from '../../fixtures/generated/fe-articles/GalleryLabs';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	getAllThemes,
	Pillar,
} from '../lib/articleFormat';
import { palette } from '../palette';
import { enhanceArticleType } from '../types/article';
import { ArticleMeta } from './ArticleMeta.web';

const meta = preview.meta({
	component: ArticleMeta,
	title: 'Components/Article Meta (web)',
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
});

export const Default = meta.story({
	args: {
		// This will be overwritten by `parameters.formats`
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		pageId: '',
		webTitle: '',
		byline: 'Lanre Bakare',
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
		discussionApiUrl: '',
		shortUrlId: '',
	},
	parameters: {
		formats: defaultFormats.filter(
			(format: ArticleFormat) => format.design !== ArticleDesign.Gallery,
		),
	},
	decorators: [leftColumnDecorator],
});

export const WithBranding = meta.story({
	args: {
		...Default.input.args,
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
		config: { darkModeAvailable: true },
		chromatic: {
			modes: {
				horizontal: { disable: true },
				light: allModes.light,
			},
		},
	},
	decorators: [
		leftColumnDecorator,
		(Story) => (
			<>
				<div
					css={css`
						${textSans15};
						background-color: ${sourcePalette.brand[400]};
						color: ${sourcePalette.neutral[100]};
						padding: ${space[2]}px;
					`}
				>
					<span>
						💡 This story uses your local browser preferences to
						choose the light or dark branding logo. Change your
						browser theme to see the difference in light/dark modes.
					</span>
				</div>
				<Story />
			</>
		),
	],
});

export const WithBrandingForAdvertisingPartner = meta.story({
	...WithBranding.input,
	args: {
		...WithBranding.input.args,
		branding: {
			...WithBranding.input.args.branding,
			logo: {
				...WithBranding.input.args.branding.logo,
				label: 'Advertising partner',
			},
			logoForDarkBackground: {
				...WithBranding.input.args.branding.logoForDarkBackground,
				label: 'Advertising partner',
			},
		},
	},
});

export const LiveBlogDesignWithBranding = meta.story({
	args: {
		...WithBranding.input.args,
	},

	parameters: {
		config: { darkModeAvailable: true },

		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
		}),

		chromatic: {
			modes: {
				horizontal: { disable: true },
				'horizontal tablet': allModes['horizontal tablet'],
			},
		},
	},

	decorators: [
		leftColumnDecorator,
		(Story) => (
			<div
				// Demonstrates niche requirement of liveblog article meta
				// on screens below desktop size
				css={css`
					background-color: ${palette('--standfirst-background')};

					${from.desktop} {
						background-color: inherit;
					}
				`}
			>
				<Story />
			</div>
		),
	],

	globals: {
		viewport: {
			value: 'tablet',
			isRotated: false,
		},
	},
});

export const FeatureDesignWithABylineMismatchingTheContributorTag = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		byline: 'Gabriel Smith',
	},
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	},
});

export const FeatureDesignWithSmallBylineImage = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		byline: 'Nicola Slawson',
		tags: [
			{
				id: 'profile/nicola-slawson',
				type: 'Contributor',
				title: 'Nicola Slawson',
				bylineImageUrl:
					'https://uploads.guim.co.uk/2016/11/01/Nicola_Slawson.jpg',
			},
		],
	},
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	},
});

export const CommentDesign = meta.story({
	...Default.input,
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
		}),
	},
});

export const InterviewDesign = meta.story({
	...Default.input,
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
		}),
	},
});

export const ImmersiveDisplay = meta.story({
	...Default.input,
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
		}),
	},
});

export const FeatureDesignWithTwoContributors = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		byline: 'Lanre Bakare and Another Author',
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
			{
				id: 'profile/another-author',
				type: 'Contributor',
				title: 'Another Author',
			},
		],
	},
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	},
});

export const DeadBlogDesign = meta.story({
	...Default.input,
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.DeadBlog,
		}),
	},
});

export const WithNoSecondaryDateline = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		secondaryDateline: '',
	},
});

export const VideoDesignWithSource = meta.story({
	...Default.input,
	args: {
		...Default.input.args,
		source: 'TMN',
		byline: undefined,
		tags: [],
		secondaryDateline: '',
	},
	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Video,
		}),
	},
});

export const GalleryDesign = meta.story({
	args: {
		...Default.input.args,
		isCommentable: true,
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		shortUrlId: '/p/d8ex5',
	},

	parameters: {
		...Default.input.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
		}),
		colourSchemeBackground: {
			light: palette('--article-inner-background'),
			dark: palette('--article-inner-background'),
		},
	},
	decorators: [leftColumnDecorator],
});

const webArticle = enhanceArticleType(GalleryLabsFixture, 'Web');

export const GalleryLabsWithBranding = meta.story({
	args: {
		branding:
			webArticle.frontendData.commercialProperties[
				webArticle.frontendData.editionId
			].branding,
		format: {
			design: webArticle.design,
			display: webArticle.display,
			theme: webArticle.theme,
		},
		pageId: webArticle.frontendData.pageId,
		webTitle: webArticle.frontendData.webTitle,
		byline: webArticle.frontendData.byline,
		tags: webArticle.frontendData.tags,
		primaryDateline: webArticle.frontendData.webPublicationDateDisplay,
		secondaryDateline:
			webArticle.frontendData.webPublicationSecondaryDateDisplay,
		isCommentable: webArticle.frontendData.isCommentable,
		discussionApiUrl: webArticle.frontendData.config.discussionApiUrl,
		shortUrlId: webArticle.frontendData.config.shortUrlId,
	},

	parameters: {
		colourSchemeBackground: {
			light: palette('--article-inner-background'),
			dark: palette('--article-inner-background'),
		},
	},
	decorators: [leftColumnDecorator],
});
