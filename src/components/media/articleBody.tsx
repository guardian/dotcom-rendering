import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { adStyles, darkModeCss } from 'styles';
import { background, neutral } from '@guardian/src-foundations/palette';
import { getPillarStyles, PillarStyles } from 'pillarStyles';
import { Pillar } from '@guardian/types/Format';
import { remSpace } from "@guardian/src-foundations";
import { Format } from '@guardian/types/Format';

const ArticleBodyStyles = (format: Format): SerializedStyles => css`
    position: relative;
    clear: both;
    background: ${background.inverse}    
    color: ${neutral[86]};

    ${adStyles(format)}
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
    format: Format;
}

const ArticleBodyMedia = ({
    pillar,
    className,
    children,
    format
}: ArticleBodyProps): JSX.Element =>
    <div css={[ArticleBodyStyles(format),
        ArticleBodyDarkStyles(getPillarStyles(pillar)),
        ...className]}>
        {children}
    </div>

export default ArticleBodyMedia;
