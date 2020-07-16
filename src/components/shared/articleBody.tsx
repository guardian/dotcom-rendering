import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { darkModeCss, adStyles } from 'styles';
import { neutral, background } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { Format } from '@guardian/types/Format';

interface ArticleBodyProps {
    className: SerializedStyles[];
    children: ReactNode[];
    format: Format;
}

const ArticleBodyStyles = (format: Format): SerializedStyles => css`
    position: relative;
    clear: both;

    iframe {
        width: 100%;
        border: none;
    }

    ${adStyles(format)}

    twitter-widget,
    figure[data-atom-type="explainer"] {
        margin: ${remSpace[4]} 0;
        clear: both;
        display: inline-block;
    }
`;

const ArticleBodyDarkStyles: SerializedStyles = darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    figcaption {
        color: ${neutral[60]};
    }

    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }
`;

const ArticleBody = ({
    className,
    children,
    format
}: ArticleBodyProps): JSX.Element =>
    <div css={[ArticleBodyStyles(format), ArticleBodyDarkStyles, ...className]}>
        {children}
    </div>

export default ArticleBody;
