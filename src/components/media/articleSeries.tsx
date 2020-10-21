import React, { ReactElement, FC } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { Series } from 'capi';
import { ThemeStyles, getThemeStyles } from 'themeStyles';
import { Theme } from '@guardian/types/Format';
import { headline } from '@guardian/src-foundations/typography';
import { Option, map, withDefault } from '@guardian/types/option';
import { pipe2 } from 'lib';

const ArticleSeriesStyles = ({ inverted }: ThemeStyles): SerializedStyles => css`
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
    pipe2(
        props.series,
        map(series =>
            <nav css={ArticleSeriesStyles(getThemeStyles(props.theme))}>
                <a href={series.webUrl}>{series.webTitle}</a>
            </nav>
        ),
        withDefault<ReactElement | null>(null),
    );

export default ArticleSeries;
