import React, { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import {
    sidePadding,
    adStyles
} from 'styles';
import { background } from '@guardian/src-foundations/palette';
import { Pillar } from 'pillar';

const ArticleBodyStyles = css`
    position: relative;
    clear: both;
    background: ${background.inverse}

    ${adStyles}
    ${sidePadding}
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
    <div css={[ArticleBodyStyles, ...className]}>
        {children}
    </div>

export default ArticleBodyMedia;
