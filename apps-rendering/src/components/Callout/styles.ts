import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	brandAlt,
	error,
	headline,
	neutral,
	remSpace,
	success,
	until,
} from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

// Highlight Component Styles
export const highlightStyles = css`
	color: ${neutral[7]};
	display: flex;
	align-items: center;
	padding: 0 ${remSpace[1]};
	font-family: GuardianTextSans;
	background: ${brandAlt[400]};

	${darkModeCss`
		background: ${brandAlt[200]};
	`}
`;

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
export const calloutDetailsStyles = css`
	padding-bottom: ${remSpace[6]};

	/* IE does not support summary HTML elements, so we need to hide children ourself */
	:not([open]) > *:not(summary) {
		display: none;
	}
`;

export const calloutSummaryStyles = css`
	/* Remove default styles from summery tag */
	::-webkit-details-marker {
		display: none;
	}
	outline: none;

	/* We don't want the summary to open when we click anything but the button, so we pointer-event: none the summary */
	pointer-events: none;

	/*  why hide visibility?
        We want to prevent the user for tabbing to the summery HTML element
        without using tabIndex={-1} which would disable focus on all child DOM elements

        NOTE: requires "visibility: visible;" on child elements to display and enable focus */
	visibility: hidden;

	a {
		/* but we do want to allow click on links */
		pointer-events: all;
	}
`;

export const calloutSummaryContentWrapper = css`
	padding-left: ${remSpace[2]};
	visibility: visible;
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

	.js-callout__success-message,
	.js-callout__error-message {
		display: none;
	}

	.js-callout--failure {
		.js-callout__error-message {
			display: inline-flex;
			margin-bottom: ${remSpace[3]};
			color: ${error[400]};
			${darkModeCss`
				color: ${error[500]};
			`}
		}
	}

	.js-callout--success {
		.js-callout__success-message {
			display: inline-flex;
			color: ${neutral[7]};
			${darkModeCss`
				color: ${neutral[86]};
			`}

			svg {
				color: ${success[400]};
				${darkModeCss`
				color: ${success[500]};
			`}
			}
		}
		.js-callout__inputs {
			display: none !important;
		}
	}
`;

export const calloutSubmitButton = (
	format: ArticleFormat,
): SerializedStyles => css`
	background: ${text.calloutPrimary(format)};
	color: ${neutral[100]};
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

export const textareaStyles = css`
	// Source textarea doesn't have theming
	${fieldInput}

	background-color: ${neutral[100]};
	color: ${neutral[7]};
	${darkModeCss`
		background-color: ${neutral[7]};
		color: ${neutral[97]};
	`}
`;

export const fieldLabel = css`
	.field__feedback {
		display: none;
	}
	&.callout-field--failure {
		select,
		textarea,
		input {
			border: 2px solid ${error[400]};
			${darkModeCss`
				border: 2px solid ${error[500]};
		`}
		}
		.field__feedback {
			display: flex;
		}
	}
`;
