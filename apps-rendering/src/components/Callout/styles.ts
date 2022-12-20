import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	brandAlt,
	error,
	fontWeights,
	headline,
	neutral,
	remSpace,
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

export const calloutLinkContainer = (
	format: ArticleFormat,
): SerializedStyles => css`
	a {
		color: ${text.calloutPrimary(format)};
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

export const calloutTitle = (format: ArticleFormat): SerializedStyles => css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${text.calloutPrimary(format)};

	${darkModeCss`
		color: ${text.calloutPrimaryDark(format)};
	`}
`;

export const calloutHeadingText = css`
	${headline.xxsmall()}
`;

export const calloutDescription = css`
	${body.medium()}
	padding: ${remSpace[3]} 0;
`;

export const calloutPrimaryButton = (
	format: ArticleFormat,
): SerializedStyles => css`
	background: ${text.calloutPrimary(format)};
	margin-top: ${remSpace[2]};
	width: 100%;
	justify-content: center;
	${darkModeCss`
		background: ${neutral[86]};
		color: ${neutral[7]};
	`}
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

export const calloutSharelink = (
	format: ArticleFormat,
): SerializedStyles => css`
	margin: 0 ${remSpace[2]};
	font-weight: normal;
	color: ${text.calloutPrimary(format)};
	${darkModeCss`
		color: ${neutral[86]};
	`}
`;

export const supportingText = css`
	${textSans.xsmall()};
	color: ${neutral[46]};

	${darkModeCss`
		color: ${neutral[60]};
	`}
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
	margin-bottom: ${remSpace[4]};
`;

export const termsConditions = css`
	${textSans.medium()};
	margin-bottom: ${remSpace[4]};
`;
