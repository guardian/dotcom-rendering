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
    bylineHtml?: string;
}

const ImmersiveStandfirst = ({
    standfirst,
    pillarStyles,
    className,
    byline,
    bylineHtml
}: ArticleStandfirstProps): JSX.Element => {

    let standfirstHtml;

    if (byline && bylineHtml) {
        if (standfirst.includes(byline)) {
            standfirstHtml = <div>{componentFromHtml(standfirst.replace(byline, bylineHtml))}</div>
        } else {
            standfirstHtml = <div>
                <div>{componentFromHtml(standfirst)}</div>
                <address>
                    <span>By </span>
                    {componentFromHtml(bylineHtml)}
                </address>
            </div>
        }
    } else {
        standfirstHtml = <div>{componentFromHtml(standfirst)}</div>
    }

    return <div css={[
        className,
        StandfirstStyles(pillarStyles),
        StandfirstDarkStyles(pillarStyles)
    ]}>
        { standfirstHtml }
    </div>
}

export default ImmersiveStandfirst;
