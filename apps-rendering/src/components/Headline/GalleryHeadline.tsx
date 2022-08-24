// ----- Imports ----- //

import { css } from '@emotion/react';
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

const styles = css`
	${headline.medium({ fontWeight: 'bold' })}
	background-color: ${neutral[7]};
	color: ${neutral[100]};
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
		background-color: ${neutral[10]};
		color: ${neutral[86]};
	`}
`;

const backgroundStyles = css`
	background-color: ${neutral[7]};
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
		background-color: ${neutral[10]};
	`}
`;

interface Props {
	headline: string;
	format: ArticleFormat;
}

const GalleryHeadline: React.FC<Props> = ({ headline }) => (
	<>
		<div css={backgroundStyles} />
		<h1 css={styles}>{headline}</h1>
	</>
);

// ----- Exports ----- //

export default GalleryHeadline;
