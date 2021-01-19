import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

export const tabletContentWidth = 526;
export const wideContentWidth = 545;

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
