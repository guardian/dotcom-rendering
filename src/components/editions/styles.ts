import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { culture, neutral } from '@guardian/src-foundations/palette';
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
