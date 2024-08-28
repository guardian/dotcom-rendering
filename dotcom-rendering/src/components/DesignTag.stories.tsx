import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { DesignTag } from './DesignTag';

const meta = {
	title: 'Components/DesignTag',
	component: DesignTag,
} satisfies Meta<typeof DesignTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDesignAnalysis = {
	args: {
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
} satisfies Story;

export const WithDesignInterview = {
	args: {
		format: {
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const WithDesignExplainer = {
	args: {
		format: {
			design: ArticleDesign.Explainer,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const WithDesignLetter = {
	args: {
		format: {
			design: ArticleDesign.Letter,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const WithDesignAnalysisAndThemeSpecialReport = {
	args: {
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	},
} satisfies Story;

export const WithDesignTimeline = {
	args: {
		format: {
			design: ArticleDesign.Timeline,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const WithDesignProfile = {
	args: {
		format: {
			design: ArticleDesign.Profile,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;
