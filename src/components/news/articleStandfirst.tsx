import React from 'react';
import { sidePadding, bulletStyles, headlineFont, darkModeCss, linkStyle } from 'styles';
import { transform } from '../../contentTransformations';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { PillarStyles } from 'pillar';
import { componentFromHtml } from 'renderBlocks';

const StandfirstFeatureStyles = `
    color: ${palette.neutral[46]};
    ${headlineFont}
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.4rem;
`;

const StandfirstStyles = (feature: boolean, { kicker }: PillarStyles): SerializedStyles => css`
    padding-bottom: 6px;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2rem;

    p, ul {
        margin: 0;
    }

    ${linkStyle(kicker)}
    ${bulletStyles(kicker)}
    ${sidePadding}
    ${feature ? StandfirstFeatureStyles : null}
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
    feature: boolean;
    pillarStyles: PillarStyles;
    className: SerializedStyles;
}

const ArticleStandfirst = ({
    standfirst,
    pillarStyles,
    feature,
    className
}: ArticleStandfirstProps): JSX.Element =>
    <div
        css={[
            className,
            StandfirstStyles(feature, pillarStyles),
            StandfirstDarkStyles(pillarStyles)
        ]}
    >
        {componentFromHtml(standfirst)}
    </div>

export default ArticleStandfirst;
