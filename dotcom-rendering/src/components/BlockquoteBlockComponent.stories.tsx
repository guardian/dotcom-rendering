import type { Meta, StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	getAllDesigns,
	getAllThemes,
	Pillar,
} from '../lib/format';
import { BlockquoteBlockComponent } from './BlockquoteBlockComponent';

const meta = {
	component: BlockquoteBlockComponent,
	title: 'Components/Blockquote Block Component',
	parameters: {
		viewport: {
			defaultViewport: 'mobileMedium',
		},
		chromatic: {
			modes: {
				horizontal: allModes['horizontal tablet'],
			},
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Meta<typeof BlockquoteBlockComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UnquotedLong = {
	args: {
		html: '<blockquote class="quoted"> \n <p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p> \n<p>A second paragraph</p> \n</blockquote>',
	},
} satisfies Story;

export const UnquotedShort = {
	args: {
		html: '<blockquote class="quoted"> \n <p>We’ve now got evidence</p> \n<p>A second paragraph</p> \n</blockquote>',
	},
} satisfies Story;

export const QuotedStandardDesignAllThemes = {
	args: {
		...UnquotedLong.args,
		quoted: true,
	},
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}),
	},
} satisfies Story;

export const QuotedLiveBlogDesignAllThemes = {
	args: QuotedStandardDesignAllThemes.args,
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.LiveBlog,
			display: ArticleDisplay.Standard,
		}),
	},
} satisfies Story;

export const QuotedDeadBlogDesignAllThemes = {
	args: QuotedStandardDesignAllThemes.args,
	parameters: {
		formats: getAllThemes({
			design: ArticleDesign.DeadBlog,
			display: ArticleDisplay.Standard,
		}),
	},
} satisfies Story;

export const QuotedAllDesignsNewsTheme = {
	args: QuotedStandardDesignAllThemes.args,
	parameters: {
		formats: getAllDesigns({
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}),
	},
} satisfies Story;

export const QuotedAllDesignsCultureTheme = {
	args: QuotedStandardDesignAllThemes.args,
	parameters: {
		formats: getAllDesigns({
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
		}),
	},
} satisfies Story;

export const QuotedAllDesignsSportTheme = {
	args: QuotedStandardDesignAllThemes.args,
	parameters: {
		formats: getAllDesigns({
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		}),
	},
} satisfies Story;

export const QuotedCommentDesignSpecialReportAltTheme = {
	args: QuotedStandardDesignAllThemes.args,
	parameters: {
		formats: [
			{
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Standard,
				theme: ArticleSpecial.SpecialReportAlt,
			},
		],
	},
} satisfies Story;
