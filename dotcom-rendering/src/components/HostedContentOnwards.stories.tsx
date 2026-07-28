import { css } from '@emotion/react';
import { hostedPaletteDecorator } from '../../.storybook/decorators/themeDecorator';
import preview from '../../.storybook/preview';
import { hostedOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import type { ArticleFormat } from '../lib/articleFormat';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { palette } from '../palette';
import { HostedContentOnwards } from './HostedContentOnwards';

const hostedArticleFormat: ArticleFormat = {
	theme: ArticleSpecial.Labs,
	display: ArticleDisplay.Standard,
	design: ArticleDesign.HostedArticle,
};

const meta = preview.meta({
	component: HostedContentOnwards,
	title: 'Components/HostedContentOnwards',
	args: {
		trails: hostedOnwardsTrails,
		brandName: 'TrendAI',
		isGalleryPage: false,
	},
	parameters: {
		formats: [hostedArticleFormat],
	},
	render: (args) => (
		<div
			css={css`
				background-color: ${palette('--article-background')};
			`}
		>
			<HostedContentOnwards {...args} />
		</div>
	),
});

export const Default = meta.story({});

export const WithAccentColour = meta.story({
	decorators: hostedPaletteDecorator('#d90c1f'),
});

const hostedGalleryFormat: ArticleFormat = {
	...hostedArticleFormat,
	design: ArticleDesign.HostedGallery,
};
export const HostedGallery = meta.story({
	args: {
		isGalleryPage: true,
	},
	parameters: {
		formats: [hostedGalleryFormat],
	},
	decorators: [hostedPaletteDecorator('#d90c1f')],
});
