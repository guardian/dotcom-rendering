import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { darkModeCss, adStyles } from 'styles';
import { neutral, background } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';

const ArticleBodyStyles = css`
    position: relative;
    clear: both;

    iframe {
        width: 100%;
        border: none;
    }

    ${adStyles}

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

interface ArticleBodyProps {
    className: SerializedStyles[];
    children: ReactNode[];
}

const ArticleBody = ({
    className,
    children,
}: ArticleBodyProps): JSX.Element =>
    <div css={[ArticleBodyStyles, ArticleBodyDarkStyles, ...className]}>
        {children}
    </div>

export default ArticleBody;
