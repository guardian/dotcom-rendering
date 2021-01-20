import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import {
	culture,
	lifestyle,
	neutral,
	news,
	opinion,
	sport,
} from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, Pillar } from '@guardian/types';
import type { Colour } from 'editorialPalette';

export const tabletContentWidth = 526;
export const wideContentWidth = 545;

export const tabletImageWidth = 720;
export const wideImageWidth = 750;

export const tabletArticleMargin = 24;
export const wideArticleMargin = 144;

export const sidePadding = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};

	${from.tablet} {
		padding-left: 0;
		padding-right: 0;
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
		return neutral[97];
	}

	if (format.design === Design.Review) {
		switch (format.theme) {
			case Pillar.Culture:
				return culture[800];
			default:
				return neutral[100];
		}
	}

	return neutral[100];
};

export const iconBackgroundColour = (format: Format): Colour => {
	switch (format.theme) {
		case Pillar.Opinion:
			return opinion[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case Pillar.News:
			return news[400];
		default:
			return neutral[100];
	}
};

export const iconForegroundColour = (format: Format): Colour => {
	switch (format.theme) {
		case Pillar.Opinion:
			return opinion[800];
		case Pillar.Sport:
			return sport[800];
		case Pillar.Culture:
			return culture[800];
		case Pillar.Lifestyle:
			return lifestyle[800];
		case Pillar.News:
			return news[800];
		default:
			return neutral[100];
	}
};
