import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react/*';
import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { defaultFormats } from '../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../.storybook/modes';
import { getAllThemes } from '../lib/format';
import { ArticleTitle } from './ArticleTitle';

const meta = {
	component: ArticleTitle,
	title: 'Components/Article Title',
	decorators: [leftColumnDecorator],
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Meta<typeof ArticleTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StandardDesign = {
	args: {
		tags: [],
		guardianBaseURL: 'https://theguardian.com',
		shouldShowTagLink: false,
		sectionLabel: 'Brexit',
		sectionUrl: 'brexit',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
			design: ArticleDesign.Standard,
		},
	},
} satisfies Story;

export const StandardDesignWithBlogTag = {
	args: {
		...StandardDesign.args,
		tags: [
			{
				id: '',
				title: 'Blog title',
				type: 'Blog',
			},
		],
	},
	name: 'Standard Design, with blog tag',
} satisfies Story;

export const StandardDesignWithOpinionTag = {
	args: {
		...StandardDesign.args,
		tags: [
			{
				id: '',
				title: 'Opinion title',
				type: 'Opinion',
			},
		],
	},
	name: 'Standard Design, with opinion tag',
} satisfies Story;

export const StandardDesignWithSeriesTag = {
	args: {
		...StandardDesign.args,
		tags: [
			{
				id: '',
				title: 'Series title',
				type: 'Series',
			},
		],
	},
	name: 'Standard Design, with series tag',
} satisfies Story;

export const StandardDesignSpecialReportThemeWithSeriesTag = {
	args: {
		...StandardDesignWithSeriesTag.args,
		format: {
			...StandardDesignWithSeriesTag.args.format,
			theme: ArticleSpecial.SpecialReport,
		},
	},
	name: 'Standard Design, Special Report Theme, with series tag',
} satisfies Story;

export const StandardDesignSpecialReportAltThemeWithSeriesTag = {
	args: {
		...StandardDesignWithSeriesTag.args,
		format: {
			...StandardDesignWithSeriesTag.args.format,
			theme: ArticleSpecial.SpecialReportAlt,
		},
	},
	name: 'Standard Design, Special Report Alt Theme, with series tag',
} satisfies Story;

export const StandardDesignLabsThemeWithSeriesTag = {
	args: {
		...StandardDesignWithSeriesTag.args,
		format: {
			...StandardDesignWithSeriesTag.args.format,
			theme: ArticleSpecial.Labs,
		},
	},
	name: 'Standard Design, Labs Theme, with series tag',
} satisfies Story;

export const StandardDesignWithSeriesTagAndLongTitle = {
	args: {
		...StandardDesign.args,
		tags: [
			{
				id: '',
				title: "Edward Snowden's choice of Hong Kong as haven is a high-stakes gamble",
				type: 'Series',
			},
		],
	},
	name: 'Standard Design, with series tag and long title',
} satisfies Story;

export const StandardDesignWithSeriesTagAndLongWord = {
	args: {
		...StandardDesign.args,
		tags: [
			{
				id: '',
				title: 'Antidisestablishmentarianism',
				type: 'Series',
			},
		],
	},
	name: 'Standard Design, with series tag and long word',
} satisfies Story;

export const CommentDesignImmersiveDisplay = {
	args: {
		...StandardDesign.args,
		format: {
			display: ArticleDisplay.Immersive,
			theme: Pillar.Sport,
			design: ArticleDesign.Comment,
		},
	},
	name: 'Comment Design, Immersive Display',
} satisfies Story;

export const CommentDesignImmersiveDisplayWithBlogTag = {
	args: {
		...CommentDesignImmersiveDisplay.args,
		tags: StandardDesignWithBlogTag.args.tags,
	},
	name: 'Comment Design, Immersive Display, with blog tag',
} satisfies Story;

export const ReviewDesignImmersiveDisplayWithSeriesTagAndLongTitle = {
	args: {
		...StandardDesign.args,
		format: {
			display: ArticleDisplay.Immersive,
			theme: Pillar.Sport,
			design: ArticleDesign.Review,
		},
		tags: [
			{
				id: '',
				title: 'Series title with the addition of some more text to see how this wraps',
				type: 'Series',
			},
		],
	},
	name: 'Review Design, Immersive Display, with series tag and long title',
} satisfies Story;

export const LiveBlogDesignWithBlogTag = {
	args: {
		...StandardDesignWithBlogTag.args,
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
			design: ArticleDesign.LiveBlog,
		},
	},
	parameters: {
		colourSchemeBackground: {
			light: '#005689',
			dark: '#004e7c',
		},
		colourSchemeTextColour: {
			light: '#fff',
			dark: '#fff',
		},
	},
	name: 'LiveBlog Design, with blog tag',
} satisfies Story;

export const LiveBlogDesignWithBlogTagAndMatch = {
	args: {
		...LiveBlogDesignWithBlogTag.args,
		isMatch: true,
	},
	parameters: {
		colourSchemeBackground: {
			light: '#ffe500',
			dark: '#f3c100',
		},
		colourSchemeTextColour: {
			dark: '#000',
		},
	},
	name: 'LiveBlog Design, with blog tag and match',
} satisfies Story;

export const DeadBlogDesignMultipleThemesWithBlogTag = {
	args: {
		...LiveBlogDesignWithBlogTag.args,
	},
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
		}),
	},
	name: 'DeadBlog Design, Multiple Themes, with blog tag',
} satisfies Story;

export const MultipleFormatsWithBlogTag = {
	...StandardDesignWithBlogTag,
	parameters: {
		formats: defaultFormats,
	},
	name: 'Multiple Formats, with blog tag',
} satisfies Story;
