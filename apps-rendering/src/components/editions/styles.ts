import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import * as Palette from '@guardian/src-foundations/palette';
import type { Colour } from 'editorialPalette';

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
		return Palette.neutral[7];
	}

	if (format.design === ArticleDesign.Analysis) {
		return Palette.neutral[97];
	}

	if (format.design === ArticleDesign.Media) {
		return Palette.neutral[7];
	}

	if (format.design === ArticleDesign.Comment) {
		switch (format.theme) {
			case ArticlePillar.Culture:
				return Palette.culture[800];
			case ArticlePillar.Sport:
				return Palette.sport[800];
			case ArticlePillar.News:
				return Palette.news[800];
			case ArticlePillar.Lifestyle:
				return Palette.lifestyle[800];
			case ArticlePillar.Opinion:
				return Palette.opinion[800];
			default:
				return Palette.neutral[100];
		}
	}

	if (format.design === ArticleDesign.Review) {
		switch (format.theme) {
			case ArticlePillar.Culture:
				return Palette.culture[800];
			default:
				return Palette.neutral[100];
		}
	}

	return Palette.neutral[100];
};

export const interviewBackgroundColour = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Sport:
			return Palette.brandAlt[400];
		case ArticlePillar.Culture:
			return Palette.culture[600];
		case ArticlePillar.Lifestyle:
			return Palette.lifestyle[800];
		default:
			return Palette.neutral[100];
	}
};
