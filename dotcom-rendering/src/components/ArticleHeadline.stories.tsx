import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/format';
import { formatToString, getAllThemes } from '../lib/format';
import { palette } from '../palette';
import { ArticleHeadline } from './ArticleHeadline';
import { Standfirst } from './Standfirst';

const meta = {
	component: ArticleHeadline,
	title: 'Components/Article Headline',
	decorators: [
		centreColumnDecorator,
		(Story, { args }) => (
			<Story
				args={{
					...args,
					headlineString: `This is a headline with ${formatToString(
						args.format,
					)}`,
				}}
			/>
		),
	],
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitHorizontal,
			},
		},
	},
} satisfies Meta<typeof ArticleHeadline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StandardDesign = {
	args: {
		// This will be overwritten by the headline component decorator above
		headlineString: 'This is an example of a headline',
		// This will be overwritten by `parameters.formats`
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
		tags: [],
		webPublicationDateDeprecated: '',
	},
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}),
	},
} satisfies Story;

export const FeatureDesign = {
	...StandardDesign,
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.Feature,
			display: ArticleDisplay.Standard,
		}),
	},
} satisfies Story;

export const InterviewDesignShowcaseDisplay = {
	args: {
		...StandardDesign.args,
		format: {
			display: ArticleDisplay.Showcase,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
		byline: 'Byline text',
	},
	name: 'Interview Design, Showcase Display',
} satisfies Story;

export const InterviewDesignShowcaseDisplayBylineLink = {
	args: {
		...InterviewDesignShowcaseDisplay.args,
		tags: [
			{
				id: 'profile/byline-text',
				type: 'Contributor',
				title: 'Byline text',
			},
		],
	},
	name: 'Interview Design, Showcase Display, with byline link',
} satisfies Story;

export const InterviewDesignShowcaseDisplayNoByline = {
	args: {
		...InterviewDesignShowcaseDisplay.args,
		byline: undefined,
	},
	name: 'Interview Design, Showcase Display, no byline',
} satisfies Story;

export const InterviewDesignStandardDisplay = {
	args: {
		...InterviewDesignShowcaseDisplay.args,
		format: {
			...InterviewDesignShowcaseDisplay.args.format,
			display: ArticleDisplay.Standard,
		},
	},
	name: 'Interview Design, Standard Display',
} satisfies Story;

export const InterviewDesignStandardDisplaySpecialReportTheme = {
	args: {
		...InterviewDesignStandardDisplay.args,
		format: {
			...InterviewDesignStandardDisplay.args.format,
			theme: ArticleSpecial.SpecialReport,
		},
	},
	name: 'Interview Design, Standard Display, Special Report Theme',
} satisfies Story;

export const InterviewDesignStandardDisplayNoByline = {
	args: {
		...InterviewDesignStandardDisplay.args,
		byline: undefined,
	},
	name: 'Interview Design, Standard Display, no byline',
} satisfies Story;

export const CommentDesignOpinionTheme = {
	args: {
		...StandardDesign.args,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Opinion,
		},
	},
	name: 'Comment Design, Opinion Theme',
} satisfies Story;

export const AnalysisDesign = {
	...StandardDesign,
	parameters: {
		formats: getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Analysis,
		}),
	},
} satisfies Story;

export const GalleryDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.Gallery,
		},
	},
} satisfies Story;

export const ReviewDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.Review,
		},
	},
} satisfies Story;

export const PhotoEssayDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.PhotoEssay,
		},
	},
} satisfies Story;

export const ExplainerDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.Explainer,
		},
	},
} satisfies Story;

export const QuizDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.Quiz,
		},
	},
} satisfies Story;

export const RecipeDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.Recipe,
		},
	},
} satisfies Story;

export const ImmersiveDisplay = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			display: ArticleDisplay.Immersive,
		},
	},
} satisfies Story;

export const CommentDesignImmersiveDisplay = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.Comment,
			display: ArticleDisplay.Immersive,
		},
	},
	name: 'Comment Design, Immersive Display',
} satisfies Story;

export const EditorialDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.Editorial,
		},
	},
} satisfies Story;

export const MatchReportDesignSportTheme = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.MatchReport,
			theme: Pillar.Sport,
		},
	},
	name: 'MatchReport Design, Sport Theme',
} satisfies Story;

export const LiveBlogDesign = {
	args: {
		...StandardDesign.args,
		format: {
			...StandardDesign.args.format,
			design: ArticleDesign.LiveBlog,
		},
	},
	decorators: [
		(Story) => (
			<div
				css={css`
					background-color: ${palette('--headline-blog-background')};
				`}
			>
				<Story />
			</div>
		),
	],
} satisfies Story;

export const DeadBlogDesign = {
	...LiveBlogDesign,
	args: {
		...LiveBlogDesign.args,
		format: {
			...LiveBlogDesign.args.format,
			design: ArticleDesign.DeadBlog,
		},
	},
} satisfies Story;

export const ReviewDesignCultureThemeWithoutStars = {
	args: {
		...StandardDesign.args,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Review,
			theme: Pillar.Culture,
		},
	},
	decorators: [
		(Story, { args }) => (
			<>
				<Story />
				<Standfirst
					format={args.format}
					standfirst="This is the standfirst text. We include here to demonstrate we have the correct amount of padding below the headline when there are no stars."
				/>
			</>
		),
	],
} satisfies Story;

export const WithAgeWarning = {
	args: {
		...StandardDesign.args,
		tags: [
			{
				id: 'tone/news',
				type: '',
				title: '',
			},
		],
		webPublicationDateDeprecated: '2020-03-28T07:27:19.000Z',
	},
	parameters: {
		formats: [
			ArticleDesign.Comment,
			ArticleDesign.Interview,
			ArticleDesign.MatchReport,
			ArticleDesign.Feature,
			ArticleDesign.Interactive,
			ArticleDesign.Gallery,
			ArticleDesign.Analysis,
			ArticleDesign.Review,
		].map((design) => ({
			display: ArticleDisplay.Standard,
			design,
			theme: Pillar.News,
		})),
	},
} satisfies Story;
