import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	error,
	fontWeights,
	headline,
	neutral,
	remSpace,
	textSans,
	until,
} from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

const containerPadding = remSpace[2];

// Callout block styles
export const calloutContainer = (
	format: ArticleFormat,
): SerializedStyles => css`
	padding: ${containerPadding};
	padding-bottom: ${remSpace[12]};
	background: ${neutral[97]};
	color: ${neutral[7]};
	a {
		color: ${text.calloutPrimary(format)};
	}

	${darkModeCss`
		background: ${neutral[20]};
		color: ${neutral[86]};
		a {
			color: ${neutral[86]};
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

export const calloutSubmitButton = (
	format: ArticleFormat,
): SerializedStyles => css`
	background: ${text.calloutPrimary(format)};
	color: ${neutral[100]};
	margin-top: ${remSpace[2]};
	${darkModeCss`
		background: ${neutral[86]};
		color: ${neutral[7]};
	`}

	${until.tablet} {
		width: 100%;
		justify-content: center;
	}
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
	border:  ${hasError
		? `4px solid ${error[400]}`
		: `2px solid${neutral[46]}`};

	background-color: ${neutral[100]};
	color: ${neutral[7]};
	${darkModeCss`
		background-color: ${neutral[7]};
		color: ${neutral[97]};
		border:  ${hasError ? `4px solid ${error[500]}` : `2px solid${neutral[46]}`};
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

export const tabContainer = css`
	border-bottom: 1px solid ${neutral[60]};
	margin: ${remSpace[2]} -${containerPadding};
	box-sizing: border-box;
	display: 'flex';
	justify-content: 'space-between';
	align-items: 'center';
`;

export const tab = css`
	${textSans.medium()};
	font-weight: ${fontWeights.bold};
	width: 12rem;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin-left: ${remSpace[2]};
	margin-bottom: -1px; // account for border of parent
	min-height: ${remSpace[12]};
	border: 1px solid ${neutral[60]};
	border-bottom: 1px solid ${neutral[97]};
	border-radius: ${remSpace[2]} ${remSpace[2]} 0px 0px;
`;
