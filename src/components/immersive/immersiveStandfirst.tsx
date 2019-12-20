import React from 'react';
import { bulletStyles, headlineFont, darkModeCss, basePx } from 'styles';
import { transform } from 'contentTransformations';
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

    a {
        color: ${kicker};
    }

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
    byline: string;
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
        <div>{componentFromHtml(transform(standfirst))}</div>
        <address>
            <span>By </span>
            {componentFromHtml(byline)}
        </address>
    </div>

export default ImmersiveStandfirst;
