import React from 'react';
import { sidePadding, PillarStyles, bulletStyles, headlineFont, darkModeCss } from '../../styles';
import { transform } from '../../utils/contentTransformations';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';

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

    a {
        color: ${kicker};
    }

    p, ul {
        margin: 0;
    }

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
}

const ArticleStandfirst = ({
    standfirst,
    pillarStyles,
    feature,
}: ArticleStandfirstProps): JSX.Element =>
    <div
        css={[StandfirstStyles(feature, pillarStyles), StandfirstDarkStyles(pillarStyles)]}
        dangerouslySetInnerHTML={{__html: transform(standfirst)}}
    />

export default ArticleStandfirst;
