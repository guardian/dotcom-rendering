import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import * as Palette from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, Pillar } from '@guardian/types';
import type { Colour } from 'editorialPalette';

export const tabletContentWidth = 526;
export const wideContentWidth = 545;

export const tabletImageWidth = 720;
export const wideImageWidth = 750;

export const tabletArticleMargin = 24;
export const wideArticleMargin = 144;

const wideBorderWidth = wideContentWidth + 12;
const tabletBorderWidth = tabletContentWidth + 12;

export const sidePadding = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};

	${from.tablet} {
		padding-left: 0;
		padding-right: 0;
	}
`;

export const borderWidthStyles: SerializedStyles = css`
	${from.tablet} {
		width: ${tabletBorderWidth}px;
	}

	${from.wide} {
		width: ${wideBorderWidth}px;
	}
`;

export const articleWidthStyles: SerializedStyles = css`
	${from.tablet} {
		width: ${tabletContentWidth}px;
	}

	${from.wide} {
		width: ${wideContentWidth}px;
	}
`;

export const articleMarginStyles: SerializedStyles = css`
	${from.tablet} {
		margin-left: ${tabletArticleMargin}px;
	}

	${from.wide} {
		margin-left: ${wideArticleMargin}px;
	}
`;

export const headerBackgroundColour = (format: Format): Colour => {
	if (format.design === Design.Analysis) {
		return Palette.neutral[97];
	}

	if (format.design === Design.Media) {
		return Palette.neutral[0];
	}

	if (format.design === Design.Comment) {
		switch (format.theme) {
			case Pillar.Culture:
				return Palette.culture[800];
			case Pillar.Sport:
				return Palette.sport[800];
			case Pillar.News:
				return Palette.news[800];
			case Pillar.Lifestyle:
				return Palette.lifestyle[800];
			case Pillar.Opinion:
				return Palette.opinion[800];
			default:
				return Palette.neutral[100];
		}
	}

	if (format.design === Design.Review) {
		switch (format.theme) {
			case Pillar.Culture:
				return Palette.culture[800];
			default:
				return Palette.neutral[100];
		}
	}

	return Palette.neutral[100];
};

export const interviewBackgroundColour = (format: Format): Colour => {
	switch (format.theme) {
		case Pillar.Sport:
			return Palette.brandAlt[400];
		case Pillar.Culture:
			return Palette.culture[600];
		case Pillar.Lifestyle:
			return Palette.lifestyle[800];
		default:
			return Palette.neutral[100];
	}
};
