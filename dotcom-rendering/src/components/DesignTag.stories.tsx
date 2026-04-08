import preview from '../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { DesignTag } from './DesignTag';

const meta = preview.meta({
	title: 'Components/DesignTag',
	component: DesignTag,
});

export const WithDesignAnalysis = meta.story({
	args: {
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
});

export const WithDesignInterview = meta.story({
	args: {
		format: {
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
});

export const WithDesignExplainer = meta.story({
	args: {
		format: {
			design: ArticleDesign.Explainer,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
});

export const WithDesignLetter = meta.story({
	args: {
		format: {
			design: ArticleDesign.Letter,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
});

export const WithDesignAnalysisAndThemeSpecialReport = meta.story({
	args: {
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	},
});

export const WithDesignTimeline = meta.story({
	args: {
		format: {
			design: ArticleDesign.Timeline,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
});

export const WithDesignProfile = meta.story({
	args: {
		format: {
			design: ArticleDesign.Profile,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
});
