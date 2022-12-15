import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	error,
	headline,
	neutral,
	remSpace,
	until,
} from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

// Callout block styles
export const calloutContainerStyles = (
	format: ArticleFormat,
): SerializedStyles => css`
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

// Callout Form Styles
export const calloutForm = css`
	margin: ${remSpace[2]};
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

	${until.mobileLandscape} {
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
	font-family: GuardianTextSans;
	${darkModeCss`
		color: ${neutral[86]};
	`}
`;
export const calloutSharelink = (
	format: ArticleFormat,
): SerializedStyles => css`
	padding: 0 ${remSpace[2]};
	font-weight: normal;
	color: ${text.calloutPrimary(format)};
	${darkModeCss`
		color: ${neutral[86]};
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
