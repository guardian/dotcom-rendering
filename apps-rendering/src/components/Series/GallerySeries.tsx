// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	remSpace,
	headlineBold17,
	headlineBold20,
} from '@guardian/source-foundations';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import type { Optional } from 'optional';
import { background, text } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = css`
	grid-row: 3/4;
	${grid.span('viewport-start', 4)}

	${from.tablet} {
		${grid.span('centre-column-start', 4)}
		margin-left: calc(${grid.columnGap} * -1/2);
	}
`;

const linkStyles = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.seriesTitle(format)};
	background-color: ${background.series(format)};
	${headlineBold17};
	line-height: 2;
	text-decoration: none;
	display: inline-block;
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};

	${darkModeCss`
        background-color: ${background.seriesDark(format)};
    `}

	${from.mobileLandscape} {
		padding-left: ${grid.columnGap};
	}

	${from.tablet} {
		padding-left: ${remSpace[3]};
	}

	${from.wide} {
		${headlineBold20};
		line-height: 1.75;
	}
`;

type Props = {
	series: Optional<Tag>;
	format: ArticleFormat;
};

const GallerySeries: FC<Props> = (props) =>
	maybeRender(props.series.toOption(), (series) => (
		<nav css={styles}>
			<a href={series.webUrl} css={linkStyles(props.format)}>
				{series.webTitle}
			</a>
		</nav>
	));

// ----- Exports ----- //

export default GallerySeries;
