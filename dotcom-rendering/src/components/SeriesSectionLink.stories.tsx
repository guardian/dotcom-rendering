import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { Decorator } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { SeriesSectionLink } from './SeriesSectionLink';

const seriesTag = {
	id: 'us-news/series/glenn-greenwald-on-security-and-liberty',
	title: 'Glenn Greenwald on security and liberty',
	type: 'Series' as const,
};

const shortSeriesTag = {
	...seriesTag,
	title: 'Series title',
};

const baseArgs = {
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
	layoutType: 'standard' as const,
	tags: [seriesTag],
	sectionLabel: 'US news',
	sectionUrl: 'us-news',
	guardianBaseURL: 'https://www.theguardian.com',
};

const immersiveLandscapeDecorator: Decorator = (Story) => (
	<div
		css={css`
			padding-left: 20px;
		`}
	>
		<Story />
	</div>
);

const twoLineDecorator: Decorator = (Story) => (
	<div
		css={css`
			width: 280px;
		`}
	>
		<Story />
	</div>
);

const twoLineImmersiveLandscapeDecorator: Decorator = (Story) => (
	<div
		css={css`
			box-sizing: border-box;
			width: 300px;
			padding-left: 20px;
		`}
	>
		<Story />
	</div>
);

const immersivePortraitDecorator: Decorator = (Story) => (
	<div
		css={css`
			${from.desktop} {
				padding-left: 10px;
			}
		`}
	>
		<Story />
	</div>
);

const twoLineImmersivePortraitDecorator: Decorator = (Story) => (
	<div
		css={css`
			box-sizing: border-box;
			width: 280px;
			${from.desktop} {
				width: 290px;
				padding-left: 10px;
			}
		`}
	>
		<Story />
	</div>
);

const meta = preview.meta({
	component: SeriesSectionLink,
	title: 'Components/Series Section Link',
	args: baseArgs,
	parameters: {
		chromatic: {
			modes: {
				'light mobile': allModes['light mobile'],
				'light desktop': allModes['light desktop'],
				'light leftCol': allModes['light leftCol'],
				'light wide': allModes['light wide'],
			},
		},
	},
});

export const Standard = meta.story({
	args: {
		...baseArgs,
		tags: [shortSeriesTag],
	},
});

export const StandardTwoLines = meta.story({
	args: baseArgs,
	decorators: [twoLineDecorator],
});

export const StandardOpinionTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
	},
	decorators: [twoLineDecorator],
});

export const StandardOpinion = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
		tags: [shortSeriesTag],
	},
});

export const Gallery = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
			theme: Pillar.News,
		},
		tags: [shortSeriesTag],
	},
});

export const GalleryTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
			theme: Pillar.News,
		},
	},
	decorators: [twoLineDecorator],
});

export const GalleryCultureTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
			theme: Pillar.Culture,
		},
	},
	decorators: [twoLineDecorator],
});

export const GalleryCulture = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
			theme: Pillar.Culture,
		},
		tags: [shortSeriesTag],
	},
});

export const ImmersiveLandscape = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		layoutType: 'immersiveLandscape',
		tags: [shortSeriesTag],
	},
	decorators: [immersiveLandscapeDecorator],
});

export const ImmersiveLandscapeTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		layoutType: 'immersiveLandscape',
	},
	decorators: [twoLineImmersiveLandscapeDecorator],
});

export const ImmersiveLandscapeSportTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
		},
		layoutType: 'immersiveLandscape',
	},
	decorators: [twoLineImmersiveLandscapeDecorator],
});

export const ImmersiveLandscapeSport = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
		},
		layoutType: 'immersiveLandscape',
		tags: [shortSeriesTag],
	},
	decorators: [immersiveLandscapeDecorator],
});

export const LegacyImmersiveLabs = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.Labs,
		},
		layoutType: undefined,
		tags: [shortSeriesTag],
	},
});

export const LegacyImmersiveLabsTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.Labs,
		},
		layoutType: undefined,
	},
	decorators: [twoLineDecorator],
});

export const ImmersivePortrait = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		layoutType: 'immersivePortrait',
		tags: [shortSeriesTag],
	},
	decorators: [immersivePortraitDecorator],
});

export const ImmersivePortraitTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		layoutType: 'immersivePortrait',
	},
	decorators: [twoLineImmersivePortraitDecorator],
});

export const ImmersivePortraitLifestyleTwoLines = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.Lifestyle,
		},
		layoutType: 'immersivePortrait',
	},
	decorators: [twoLineImmersivePortraitDecorator],
});

export const ImmersivePortraitLifestyle = meta.story({
	args: {
		...baseArgs,
		format: {
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
			theme: Pillar.Lifestyle,
		},
		layoutType: 'immersivePortrait',
		tags: [shortSeriesTag],
	},
	decorators: [immersivePortraitDecorator],
});
