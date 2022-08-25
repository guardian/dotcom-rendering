// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	background,
	border,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, remSpace } from '@guardian/source-foundations';
import { grid } from 'grid/grid';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import DefaultFooter, { defaultStyles } from './Footer.defaults';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${background.footer(format)};

	${darkModeCss`
		background-color: ${background.footerDark(format)};
	`}
`;

const spacerStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	padding: ${remSpace[3]};
	margin: 0;

	${from.leftCol} {
		${grid.column.left}
		position: relative;
		grid-row: 1;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			border-left: 1px solid ${neutral[86]};
			right: -10px;
		}

		${darkModeCss`
			&::before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				border-left: 1px solid ${border.galleryImage(format)};
				left: -10px;
			}

			&::after {
				border-color: ${border.galleryImage(format)}
			}
		`}
	}
`;

const footerStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	padding-left: 0;
	padding-right: 0;
	grid-row: 1;

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};
		color: ${text.galleryDark(format)};
	`}
`;

interface Props {
	format: ArticleFormat;
	isCcpa: boolean;
}

const GalleryFooter: FC<Props> = ({ format, isCcpa }) => (
	<div css={styles(format)}>
		<div css={spacerStyles(format)} />
		<DefaultFooter
			css={css(defaultStyles(format), footerStyles(format))}
			isCcpa={isCcpa}
		/>
	</div>
);

// ----- Exports ----- //

export default GalleryFooter;
