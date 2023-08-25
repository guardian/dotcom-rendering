// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	headline,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { text } from 'palette';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	children?: ReactNode;
	format: ArticleFormat;
	showDropCap: boolean;
	isEditions: boolean;
}

const dropCapWeight = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return css`
				font-weight: 200;
			`;
		default:
			return css`
				font-weight: 700;
			`;
	}
};

const styles = (
	format: ArticleFormat,
	showDropCap: boolean,
	isEditions: boolean,
): SerializedStyles => {
	const labs =
		format.theme === ArticleSpecial.Labs ? textSans.medium() : null;

	const dropCap = showDropCap
		? css`
				&:first-of-type:first-letter,
				hr + &:first-letter {
					${headline.large({ fontWeight: 'bold' })}
					${dropCapWeight(format)}
					color: ${text.dropCap(format)};
					float: left;
					font-size: 7.375rem;
					line-height: 6.188rem;
					vertical-align: text-top;
					pointer-events: none;
					margin-right: ${remSpace[1]};
					font-style: normal;
				}

				// This fixes drop cap misalignment in Firefox
				@supports (-moz-appearance: none) {
					&:first-of-type:first-letter,
					hr + &:first-letter {
						margin-top: ${remSpace[3]};
					}
				}

				${darkModeCss`
				&:first-of-type:first-letter,
				hr + &:first-letter {
					color: ${text.dropCapDark(format)};
				}`}
		  `
		: null;

	return css`
		${body.medium()}
		overflow-wrap: break-word;
		margin: 0 0 0.875rem;
		color: ${text.paragraph(format)};

		${isEditions
			? null
			: darkModeCss`
			color: ${text.paragraphDark(format)};
		`}
		${dropCap}
		${labs}
	`;
};

const Paragraph: FC<Props> = ({
	children,
	format,
	showDropCap,
	isEditions,
}: Props) => <p css={styles(format, showDropCap, isEditions)}>{children}</p>;

// ----- Exports ----- //

export default Paragraph;
