import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import type { Option, Theme } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import type { Series } from 'capi';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { getThemeStyles } from 'themeStyles';
import type { ThemeStyles } from 'themeStyles';

const ArticleSeriesStyles = ({
	inverted,
}: ThemeStyles): SerializedStyles => css`
	a {
		${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
		color: ${inverted};
		text-decoration: none;
	}
`;

interface ArticleSeriesProps {
	series: Option<Series>;
	theme: Theme;
}

const ArticleSeries: FC<ArticleSeriesProps> = (props) =>
	pipe(
		props.series,
		map((series) => (
			<nav css={ArticleSeriesStyles(getThemeStyles(props.theme))}>
				<a href={series.webUrl}>{series.webTitle}</a>
			</nav>
		)),
		withDefault<ReactElement | null>(null),
	);

export default ArticleSeries;
