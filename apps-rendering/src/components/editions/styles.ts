import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import {
	brandAlt,
	culture,
	from,
	lifestyle,
	neutral,
	news,
	opinion,
	remSpace,
	sport,
} from '@guardian/source-foundations';
import type { Colour } from 'palette';

export const tabletContentWidth = 526;
export const wideContentWidth = 545;

export const tabletImageWidth = 720;
export const wideImageWidth = 750;

export const tabletArticleMargin = 24;
export const desktopArticleMargin = 144;
export const wideArticleMargin = 312;

const wideBorderWidth = wideContentWidth + 13;
const tabletBorderWidth = tabletContentWidth + 13;

export const tabletImmersiveWidth = tabletBorderWidth;
export const wideImmersiveWidth = wideBorderWidth;

export const sidePadding = css`
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};

	${from.tablet} {
		padding-left: 0;
		padding-right: 0;
	}
`;

export const borderWidthStyles: SerializedStyles = css`
	${from.tablet} {
		width: ${tabletBorderWidth}px;
	}

	${from.desktop} {
		width: ${wideBorderWidth}px;
	}
`;

export const articleWidthStyles: SerializedStyles = css`
	box-sizing: content-box;

	${from.tablet} {
		width: ${tabletContentWidth}px;
	}

	${from.desktop} {
		width: ${wideContentWidth}px;
	}
`;

export const articleMarginStyles: SerializedStyles = css`
	${from.tablet} {
		margin-left: ${tabletArticleMargin}px;
	}

	${from.desktop} {
		margin-left: ${desktopArticleMargin}px;
	}

	${from.wide} {
		margin-left: ${wideArticleMargin}px;
	}
`;

export const articlePaddingStyles: SerializedStyles = css`
	${from.tablet} {
		padding-left: ${tabletArticleMargin}px;
	}

	${from.desktop} {
		padding-left: ${desktopArticleMargin}px;
	}

	${from.wide} {
		padding-left: ${wideArticleMargin}px;
	}
`;

export const headerBackgroundColour = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		return neutral[7];
	}

	if (format.design === ArticleDesign.Analysis) {
		return neutral[97];
	}

	if (
		format.design === ArticleDesign.Gallery ||
		format.design === ArticleDesign.Audio ||
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Picture
	) {
		return neutral[7];
	}

	if (format.design === ArticleDesign.Comment) {
		switch (format.theme) {
			case ArticlePillar.Culture:
				return culture[800];
			case ArticlePillar.Sport:
				return sport[800];
			case ArticlePillar.News:
				return news[800];
			case ArticlePillar.Lifestyle:
				return lifestyle[800];
			case ArticlePillar.Opinion:
				return opinion[800];
			default:
				return neutral[100];
		}
	}

	if (format.design === ArticleDesign.Review) {
		switch (format.theme) {
			case ArticlePillar.Culture:
				return culture[800];
			default:
				return neutral[100];
		}
	}

	return neutral[100];
};

export const interviewBackgroundColour = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Sport:
			return brandAlt[400];
		case ArticlePillar.Culture:
			return culture[600];
		case ArticlePillar.Lifestyle:
			return lifestyle[800];
		default:
			return neutral[100];
	}
};
