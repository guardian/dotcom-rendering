import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

export const tabletContentWidth = 526;
export const wideContentWidth = 545;

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
		margin: 0 auto;
	}

	${from.tablet} {
		width: ${tabletContentWidth}px;
	}

	${from.wide} {
		width: ${wideContentWidth}px;
	}
`;
