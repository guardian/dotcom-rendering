import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { defaultFormats } from '../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../.storybook/modes';
import { getAllThemes } from '../lib/format';
import { ArticleMetaApps } from './ArticleMeta.apps';

const meta = {
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
} satisfies Meta<typeof ArticleMetaApps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithFollowStory = {
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
		formats: defaultFormats,
	},
} satisfies Story;

export const WithFollowStoryNoTitle = {
	...WithFollowStory,
	args: {
		...WithFollowStory.args,
		byline: 'Lanre Bakare',
	},
} satisfies Story;

export const WithAvatarAndFollowStory = {
	args: {
		...WithFollowStory.args,
		isCommentable: true,
	},
	parameters: {
		...WithFollowStory.parameters,
		formats: getAllThemes({
			...WithFollowStory.args.format,
			design: ArticleDesign.Feature,
		}),
	},
} satisfies Story;

export const WithAvatarNoTitleAndFollowStory = {
	...WithAvatarAndFollowStory,
	args: {
		...WithAvatarAndFollowStory.args,
		byline: 'Lanre Bakare',
	},
} satisfies Story;

export const ImmersiveAndFollowStory = {
	args: {
		...WithFollowStoryNoTitle.args,
		format: {
			...WithFollowStoryNoTitle.args.format,
			display: ArticleDisplay.Immersive,
		},
	},
	parameters: {
		...WithFollowStoryNoTitle.parameters,
		formats: undefined,
	},
} satisfies Story;

export const ImmersiveWithMultipleContributorsStory = {
	...ImmersiveAndFollowStory,
	args: {
		...ImmersiveAndFollowStory.args,
		byline: 'Lanre Bakare in New York and Laura Banks in London',
		tags: [
			...ImmersiveAndFollowStory.args.tags,
			{
				id: 'profile/laura-banks',
				type: 'Contributor',
				title: 'Laura Banks',
			},
		],
	},
} satisfies Story;

export const WithMultipleContributors = {
	...WithFollowStory,
	args: {
		...ImmersiveWithMultipleContributorsStory.args,
	},
} satisfies Story;

export const WithBrandingStory = {
	args: {
		...WithFollowStory.args,
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
		...WithFollowStory.parameters,
		formats: undefined,
	},
} satisfies Story;

export const WithBrandingStoryForAdvertisingPartner = {
	args: {
		...WithBrandingStory.args,
		branding: {
			...WithBrandingStory.args.branding,
			logo: {
				...WithBrandingStory.args.branding.logo,
				label: 'Advertising partner',
			},
			logoForDarkBackground: {
				...WithBrandingStory.args.branding.logoForDarkBackground,
				label: 'Advertising partner',
			},
		},
	},
	parameters: {
		...WithBrandingStory.parameters,
		config: {
			...WithBrandingStory.parameters.config,
		},
	},
} satisfies Story;
