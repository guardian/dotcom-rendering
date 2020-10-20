import React, { ReactNode, FC } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { adStyles, darkModeCss } from 'styles';
import { background, neutral } from '@guardian/src-foundations/palette';
import { getPillarStyles, PillarStyles } from 'pillarStyles';
import { Theme } from '@guardian/types/Format';
import { remSpace } from "@guardian/src-foundations";
import { Format } from '@guardian/types/Format';

const ArticleBodyStyles = (format: Format): SerializedStyles => css`
    position: relative;
    clear: both;
    background: ${background.inverse};
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
    theme: Theme;
    className: SerializedStyles[];
    children: ReactNode[];
    format: Format;
}

const ArticleBodyMedia: FC<ArticleBodyProps> = ({
    theme,
    className,
    children,
    format
}) =>
    <div css={[ArticleBodyStyles(format),
        ArticleBodyDarkStyles(getPillarStyles(theme)),
        ...className]}>
        {children}
    </div>

export default ArticleBodyMedia;
