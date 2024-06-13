// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	headlineBold17,
	headlineBold20,
	remSpace,
} from '@guardian/source/foundations';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import type { Optional } from 'optional';
import { background, text } from 'palette';

import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = css`
	grid-row: 3/4;
	${grid.between('viewport-start', 'centre-column-end')}

	${from.tablet} {
		${grid.span('centre-column-start', 12)}
		margin-left: calc(${grid.columnGap} * -1/2);
	}

	${from.desktop} {
		${grid.span('centre-column-start', 8)}
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
		color: ${text.seriesTitleDark(format)};
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

const ImmersiveSeries = (props: Props) =>
	maybeRender(props.series.toOption(), (series) => (
		<nav css={styles}>
			<a href={series.webUrl} css={linkStyles(props.format)}>
				{series.webTitle}
			</a>
		</nav>
	));

// ----- Exports ----- //

export default ImmersiveSeries;
