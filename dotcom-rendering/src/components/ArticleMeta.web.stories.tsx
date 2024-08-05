import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
	textSans15,
} from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { defaultFormats } from '../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../.storybook/modes';
import { getAllThemes } from '../lib/format';
import { palette } from '../palette';
import { ArticleMeta } from './ArticleMeta.web';

const meta = {
	component: ArticleMeta,
	title: 'Components/Article Meta (web)',
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Meta<typeof ArticleMeta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
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
		formats: defaultFormats,
	},
	decorators: [leftColumnDecorator],
} satisfies Story;

export const WithBranding = {
	args: {
		...Default.args,
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
} satisfies Story;

export const WithBrandingForAdvertisingPartner = {
	...WithBranding,
	args: {
		...WithBranding.args,
		branding: {
			...WithBranding.args.branding,
			logo: {
				...WithBranding.args.branding.logo,
				label: 'Advertising partner',
			},
			logoForDarkBackground: {
				...WithBranding.args.branding.logoForDarkBackground,
				label: 'Advertising partner',
			},
		},
	},
} satisfies Story;

export const LiveBlogDesignWithBranding = {
	args: {
		...WithBranding.args,
	},
	parameters: {
		config: { darkModeAvailable: true },
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
		}),
		viewport: {
			defaultViewport: 'tablet',
		},
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
} satisfies Story;

export const FeatureDesignWithABylineMismatchingTheContributorTag = {
	...Default,
	args: {
		...Default.args,
		byline: 'Gabriel Smith',
	},
	parameters: {
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	},
} satisfies Story;

export const FeatureDesignWithSmallBylineImage = {
	...Default,
	args: {
		...Default.args,
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
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	},
} satisfies Story;

export const CommentDesign = {
	...Default,
	parameters: {
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
		}),
	},
} satisfies Story;

export const InterviewDesign = {
	...Default,
	parameters: {
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
		}),
	},
} satisfies Story;

export const ImmersiveDisplay = {
	...Default,
	parameters: {
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
		}),
	},
} satisfies Story;

export const FeatureDesignWithTwoContributors = {
	...Default,
	args: {
		...Default.args,
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
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	},
} satisfies Story;

export const DeadBlogDesign = {
	...Default,
	parameters: {
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.DeadBlog,
		}),
	},
} satisfies Story;

export const WithNoSecondaryDateline = {
	...Default,
	args: {
		...Default.args,
		secondaryDateline: '',
	},
} satisfies Story;

export const VideoDesignWithSource = {
	...Default,
	args: {
		...Default.args,
		source: 'TMN',
		byline: undefined,
		tags: [],
		secondaryDateline: '',
	},
	parameters: {
		...Default.parameters,
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Video,
		}),
	},
} satisfies Story;
