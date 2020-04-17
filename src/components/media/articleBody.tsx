import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { adStyles, darkModeCss } from 'styles';
import { background, neutral } from '@guardian/src-foundations/palette';
import { getPillarStyles, PillarStyles } from 'pillarStyles';
import { Pillar } from 'format';
import { remSpace } from "@guardian/src-foundations";

const ArticleBodyStyles = css`
    position: relative;
    clear: both;
    background: ${background.inverse}    
    color: ${neutral[86]};

    ${adStyles}
`;

const ArticleBodyDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    a {
        color: ${inverted};
    }
    p:last-child {
        margin-bottom: 0;
        padding-bottom: ${remSpace[2]};
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
