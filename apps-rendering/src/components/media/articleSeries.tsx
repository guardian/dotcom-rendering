import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headlineBold17 } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { map, withDefault } from '../../../vendor/@guardian/types/index';
import type { Series } from 'capi';
import { pipe } from 'lib';
import { text } from 'palette';
import type { FC, ReactElement } from 'react';

const articleSeriesStyles = (format: ArticleFormat): SerializedStyles => css`
	a {
		${headlineBold17};
		/**
		 * Typography preset styles should not be overridden.
		 * This has been done because the styles do not directly map to the new presets.
		 * Please speak to your team's designer and update this to use a more appropriate preset.
		*/
		line-height: 1.4;
		color: ${text.mediaArticleSeries(format)};
		text-decoration: none;
	}
`;

interface ArticleSeriesProps {
	series: Option<Series>;
	format: ArticleFormat;
}

const ArticleSeries: FC<ArticleSeriesProps> = ({ series, format }) =>
	pipe(
		series,
		map((series) => (
			<nav css={articleSeriesStyles(format)}>
				<a href={series.webUrl}>{series.webTitle}</a>
			</nav>
		)),
		withDefault<ReactElement | null>(null),
	);

export default ArticleSeries;
