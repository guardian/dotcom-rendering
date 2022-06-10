// ----- Imports ----- //

import { css, SerializedStyles } from '@emotion/react';
import type { FC } from 'react';
import type { Option } from '@guardian/types';
import { Tag } from '@guardian/content-api-models/v1/tag';
import { maybeRender } from 'lib';
import { grid } from 'grid/grid';
import { from, headline, remSpace } from '@guardian/source-foundations';
import { background, text } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleFormat } from '@guardian/libs';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = css`
    grid-row: 2;
    ${grid.span('viewport-start', 4)}

    ${from.tablet} {
        ${grid.span('centre-column-start', 4)}
        margin-left: calc(${grid.columnGap} * -1/2);
    }
`;

const linkStyles = (format: ArticleFormat): SerializedStyles => css`
    color: ${text.seriesTitle(format)};
    background-color: ${background.series(format)};
    ${headline.xxxsmall({ fontWeight: 'bold' })}
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
        ${headline.xxsmall({ fontWeight: 'bold' })}
        line-height: 1.75;
    }
`;

type Props = {
    series: Option<Tag>;
    format: ArticleFormat;
}

const ImmersiveSeries: FC<Props> = (props) =>
    maybeRender(props.series, (series) => (
        <nav css={styles}>
            <a href={series.webUrl} css={linkStyles(props.format)}>
                {series.webTitle}
            </a>
        </nav>
    ));

// ----- Exports ----- //

export default ImmersiveSeries;
