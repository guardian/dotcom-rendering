import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	body,
	brand,
	brandAlt,
	error,
	headline,
	neutral,
	remSpace,
	sport,
	textSans,
} from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

const containerPadding = remSpace[2];

// Callout block styles
export const calloutContainer = css`
	padding-bottom: ${remSpace[12]};
	background: ${neutral[97]};
	color: ${neutral[7]};

	${darkModeCss`
		background: ${neutral[20]};
		color: ${neutral[86]};
	`}
`;

export const calloutLinkContainer = css`
	a {
		color: ${brand[500]};
	}

	${darkModeCss`
		a {
			color: ${neutral[86]};
		}
	`}
`;

export const calloutInfo = css`
	padding: ${containerPadding};
`;

export const highlight = css`
	${textSans.xsmall()}
	color: ${neutral[7]};
	padding: 0 ${remSpace[1]};
	background: ${brandAlt[400]};
	${darkModeCss`
		background: ${brandAlt[200]};
	`}
`;

export const calloutTitle = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${brand[500]};

	${darkModeCss`
		color: ${sport[600]};
	`}
`;

export const calloutHeadingText = css`
	${headline.xxsmall()}
`;

export const calloutDescription = css`
	${body.medium()}
	padding: ${remSpace[3]} 0;
`;

export const calloutPrimaryButton = css`
	margin-top: ${remSpace[4]};
	width: 100%;
	justify-content: center;

	${darkModeCss`
		background: ${neutral[86]};
		color: ${neutral[7]};
	`}
`;

// Callout success Styles
export const success = css`
	${textSans.small()};
	svg {
		fill: ${brand[400]};

		${darkModeCss`
		fill: ${sport[400]};
		`}
	}
`;
export const bold = css`
	${textSans.small({ fontWeight: 'bold' })}
`;

// Callout Share Link Styles
export const calloutShare = css`
	display: inline-flex;
	align-items: center;
	padding-right: ${remSpace[2]};
	padding-bottom: ${remSpace[2]};
	color: ${neutral[7]};
	${textSans.xsmall()}

	${darkModeCss`
		color: ${neutral[86]};
	`}
`;

export const calloutSharelink = css`
	margin: 0 ${remSpace[2]};
	font-weight: normal;
	color: ${brand[500]};
	${darkModeCss`
		color: ${neutral[86]};
	`}
`;

export const sharePopup = css`
	${textSans.xxsmall()};
	position: absolute;
	transform: translate(0, 100%);
	display: flex;
	align-items: center;
	background-color: ${neutral[100]};
	color: ${neutral[7]};
	font-weight: normal;
	border-radius: 4px;
	z-index: 100;
	padding: ${remSpace[2]};
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);

	${darkModeCss`
		background-color: ${neutral[0]};
		color: ${neutral[97]};
	`}

	> svg {
		fill: ${brand[400]};
		${darkModeCss`
			color: ${brand[500]};
	`}
	}
`;

// Form fields
export const fieldInput = css`
	margin-bottom: ${remSpace[4]};
`;

export const textarea = (hasError: boolean): SerializedStyles => css`
	// Source textarea doesn't have theming
	${fieldInput}
	border: ${hasError
		? `4px solid ${error[400]}`
		: `2px solid ${neutral[46]}`};

	background-color: ${neutral[100]};
	color: ${neutral[7]};
	${darkModeCss`
		background-color: ${neutral[7]};
		color: ${neutral[97]};
		border: ${hasError ? `4px solid ${error[500]}` : `2px solid ${neutral[46]}`};
	`}
`;

// Other callout components
export const info = css`
	${textSans.xsmall()};
`;

export const termsConditions = css`
	${textSans.medium()};
	margin-bottom: ${remSpace[4]};
`;
