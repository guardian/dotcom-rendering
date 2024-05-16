// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source/foundations';
import { fill } from 'palette';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	children?: ReactNode;
	format: ArticleFormat;
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	font-style: italic;
	position: relative;
	margin: ${remSpace[4]} 0 ${remSpace[4]} 0;

	> svg {
		width: 18px;
		height: 12px;
		fill: ${fill.blockquoteIcon(format)};
		margin-right: ${remSpace[1]};

		${darkModeCss`
			fill: ${fill.blockquoteIconDark(format)};
		`}
	}

	> p {
		&:first-of-type {
			display: inline;
		}

		&:nth-of-type(2) {
			margin-top: ${remSpace[3]};
		}
	}
`;

const Blockquote: FC<Props> = ({ children, format }: Props) => (
	<blockquote css={styles(format)}>
		<svg
			width="18"
			height="12"
			viewBox="0 0 18 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.50463 0H8.57575C8.08572 3.89906 7.65222 7.72239 7.46374 12H0C0.678522 7.83597 2.09211 3.89906 4.50463 0ZM13.9854 0H18C17.5665 3.89906 17.0765 7.72239 16.888 12H9.44311C10.2158 7.83597 11.5729 3.89906 13.9854 0Z"
			/>
		</svg>
		{children}
	</blockquote>
);

// ----- Exports ----- //

export default Blockquote;
