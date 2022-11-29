import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	focusHalo,
	neutral,
	remHeight,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

export const fieldSupportingStyles = css`
	${textSans.small()};
	color: ${neutral[60]};
`;

export const fieldLabelStyles = css`
	${textSans.small()};
	color: ${neutral[7]};
	${darkModeCss`
		color: ${neutral[86]};
		`}
`;

export const customUpload = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease-in-out 0s;
	text-decoration: none;
	white-space: nowrap;
	height: ${remHeight.ctaXsmall}rem;
	min-height: ${remHeight.ctaXsmall}rem;
	padding: ${remSpace[3]};
	margin: ${remSpace[3]} ${remSpace[1]};
	border-radius: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'medium' })};
	color: ${text.calloutPrimary(format)};
	border: 1px solid ${text.calloutPrimary(format)};

	&:focus-within,
	&:focus {
		${focusHalo};
	}

	${darkModeCss`
		color: ${neutral[86]};
		border: 1px solid ${neutral[86]};
	`}
`;
