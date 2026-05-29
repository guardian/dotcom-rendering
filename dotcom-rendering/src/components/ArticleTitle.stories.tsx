import { leftColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { defaultFormats } from '../../.storybook/decorators/splitThemeDecorator';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	getAllThemes,
	Pillar,
} from '../lib/articleFormat';
import { ArticleTitle } from './ArticleTitle';

const meta = preview.meta({
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
});

export const StandardDesign = meta.story({
	args: {
		tags: [],
		guardianBaseURL: 'https://theguardian.com',
		sectionLabel: 'Brexit',
		sectionUrl: 'brexit',
		format: {
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
			design: ArticleDesign.Standard,
		},
	},
});

export const StandardDesignWithBlogTag = meta.story({
	args: {
		...StandardDesign.input.args,
		tags: [
			{
				id: '',
				title: 'Blog title',
				type: 'Blog',
			},
		],
	},
	name: 'Standard Design, with blog tag',
});

export const StandardDesignWithOpinionTag = meta.story({
	args: {
		...StandardDesign.input.args,
		tags: [
			{
				id: '',
				title: 'Opinion title',
				type: 'Opinion',
			},
		],
	},
	name: 'Standard Design, with opinion tag',
});

export const StandardDesignWithSeriesTag = meta.story({
	args: {
		...StandardDesign.input.args,
		tags: [
			{
				id: '',
				title: 'Series title',
				type: 'Series',
			},
		],
	},
	name: 'Standard Design, with series tag',
});

export const StandardDesignSpecialReportThemeWithSeriesTag = meta.story({
	args: {
		...StandardDesignWithSeriesTag.input.args,
		format: {
			...StandardDesignWithSeriesTag.input.args.format,
			theme: ArticleSpecial.SpecialReport,
		},
	},
	name: 'Standard Design, Special Report Theme, with series tag',
});

export const StandardDesignSpecialReportAltThemeWithSeriesTag = meta.story({
	args: {
		...StandardDesignWithSeriesTag.input.args,
		format: {
			...StandardDesignWithSeriesTag.input.args.format,
			theme: ArticleSpecial.SpecialReportAlt,
		},
	},
	name: 'Standard Design, Special Report Alt Theme, with series tag',
});

export const StandardDesignLabsThemeWithSeriesTag = meta.story({
	args: {
		...StandardDesignWithSeriesTag.input.args,
		format: {
			...StandardDesignWithSeriesTag.input.args.format,
			theme: ArticleSpecial.Labs,
		},
	},
	name: 'Standard Design, Labs Theme, with series tag',
});

export const StandardDesignWithSeriesTagAndLongTitle = meta.story({
	args: {
		...StandardDesign.input.args,
		tags: [
			{
				id: '',
				title: "Edward Snowden's choice of Hong Kong as haven is a high-stakes gamble",
				type: 'Series',
			},
		],
	},
	name: 'Standard Design, with series tag and long title',
});

export const StandardDesignWithSeriesTagAndLongWord = meta.story({
	args: {
		...StandardDesign.input.args,
		tags: [
			{
				id: '',
				title: 'Antidisestablishmentarianism',
				type: 'Series',
			},
		],
	},
	name: 'Standard Design, with series tag and long word',
});

export const CommentDesignImmersiveDisplay = meta.story({
	args: {
		...StandardDesign.input.args,
		format: {
			display: ArticleDisplay.Immersive,
			theme: Pillar.Sport,
			design: ArticleDesign.Comment,
		},
	},
	name: 'Comment Design, Immersive Display',
});

export const CommentDesignImmersiveDisplayWithBlogTag = meta.story({
	args: {
		...CommentDesignImmersiveDisplay.input.args,
		tags: StandardDesignWithBlogTag.input.args.tags,
	},
	name: 'Comment Design, Immersive Display, with blog tag',
});

export const ReviewDesignImmersiveDisplayWithSeriesTagAndLongTitle = meta.story(
	{
		args: {
			...StandardDesign.input.args,
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
	},
);

export const LiveBlogDesignWithBlogTag = meta.story({
	args: {
		...StandardDesignWithBlogTag.input.args,
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
});

export const LiveBlogDesignWithBlogTagAndMatch = meta.story({
	args: {
		...LiveBlogDesignWithBlogTag.input.args,
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
});

export const DeadBlogDesignMultipleThemesWithBlogTag = meta.story({
	args: {
		...LiveBlogDesignWithBlogTag.input.args,
	},
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
		}),
	},
	name: 'DeadBlog Design, Multiple Themes, with blog tag',
});

export const MultipleFormatsWithBlogTag = meta.story({
	...StandardDesignWithBlogTag.input,
	parameters: {
		formats: defaultFormats,
	},
	name: 'Multiple Formats, with blog tag',
});

export const GalleryDesignWithSeries = meta.story({
	args: {
		...StandardDesign.input.args,
		tags: [
			{
				id: '',
				title: 'Blog title',
				type: 'Series',
			},
		],
	},
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
		}),
	},
});

export const GalleryDesignLabThemeWithoutSeries = meta.story({
	args: {
		...StandardDesign.input.args,
		format: {
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Gallery,
		},
	},
});
