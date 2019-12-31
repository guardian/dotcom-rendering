import React from 'react';
import { bulletStyles, headlineFont, darkModeCss, basePx, linkStyle } from 'styles';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { PillarStyles } from 'pillar';
import { componentFromHtml } from 'renderBlocks';

const StandfirstStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    ${headlineFont}
    color: ${palette.neutral[46]};
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.4rem;

    ${linkStyle(kicker)}

    p, ul {
        margin: 0;
    }

    address {
        font-style: normal;
    }

    padding: ${basePx(1)};
    ${bulletStyles(kicker)}
`;

const StandfirstDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    a {
        color: ${inverted};
    }
`;

interface ArticleStandfirstProps {
    standfirst: string;
    pillarStyles: PillarStyles;
    className: SerializedStyles;
    byline?: string;
}

const ImmersiveStandfirst = ({
    standfirst,
    pillarStyles,
    className,
    byline
}: ArticleStandfirstProps): JSX.Element =>
    <div css={[
        className,
        StandfirstStyles(pillarStyles),
        StandfirstDarkStyles(pillarStyles)
    ]}>
        <div>{componentFromHtml(standfirst)}</div>
        { byline ?
            <address>
                <span>By </span>
                {componentFromHtml(byline)}
            </address>
        : null }
    </div>

export default ImmersiveStandfirst;
