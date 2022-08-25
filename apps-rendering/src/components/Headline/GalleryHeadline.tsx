// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	headline,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import { grid } from 'grid/grid';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (format: ArticleFormat) => css`
	${headline.medium({ fontWeight: 'bold' })}
	background-color: ${background.headline(format)};
	color: ${text.gallery(format)};
	padding: 0 ${remSpace[5]} ${remSpace[9]} 0;
	${grid.column.centre}
	grid-row: 3 / 5;

	${from.tablet} {
		${grid.span('centre-column-start', 12)}
	}

	${from.desktop} {
		${headline.xlarge({ fontWeight: 'bold' })}
		${grid.span('centre-column-start', 8)}
	}

	${darkModeCss`
		background-color: ${background.headlineDark(format)};
		color: ${text.galleryDark(format)};
	`}
`;

const backgroundStyles = (format: ArticleFormat) => css`
	background-color: ${background.headline(format)};
	${grid.between('viewport-start', 'centre-column-end')}
	grid-row: 3 / 5;

	${from.mobileLandscape} {
		${grid.column.all}
	}

	${from.tablet} {
		${grid.between('centre-column-start', 'viewport-end')}
		margin-left: calc(${grid.columnGap} * -1/2);
	}

	${darkModeCss`
		background-color: ${background.headlineDark(format)};
	`}
`;

interface Props {
	headline: string;
	format: ArticleFormat;
}

const GalleryHeadline: React.FC<Props> = ({ headline, format }) => (
	<>
		<div css={backgroundStyles(format)} />
		<h1 css={styles(format)}>{headline}</h1>
	</>
);

// ----- Exports ----- //

export default GalleryHeadline;
