import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import {
    sidePadding,
    adStyles,
    darkModeCss
} from 'styles';
import {background, neutral} from '@guardian/src-foundations/palette';
import {getPillarStyles, Pillar, PillarStyles} from 'pillar';

const ArticleBodyStyles = css`
    position: relative;
    clear: both;
    background: ${background.inverse}
    
    color: ${neutral[86]};

    ${adStyles}
    ${sidePadding}
`;

const ArticleBodyDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};
    a {
        color: ${inverted};
    }
    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }
`;

interface ArticleBodyProps {
    pillar: Pillar;
    className: SerializedStyles[];
    children: ReactNode[];
}

const ArticleBodyMedia = ({
    pillar,
    className,
    children,
}: ArticleBodyProps): JSX.Element =>
    <div css={[ArticleBodyStyles, ArticleBodyDarkStyles(getPillarStyles(pillar)), ...className]}>
        {children}
    </div>

export default ArticleBodyMedia;
