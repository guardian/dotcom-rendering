// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { neutral, background } from '@guardian/src-foundations/palette'
import { until } from '@guardian/src-foundations/mq';

import ArticleRating from 'components/shared/articleRating';
import { basePx, sidePadding, headlineFont, darkModeCss, headlineFontStyles } from 'styles';
import { getPillarStyles } from 'pillar';
import { Item, Design } from 'item';


// ----- Styles ----- //

const AnalysisStyles = (kicker: string): SerializedStyles => css`
    font-weight: 200;
    line-height: 3.6rem;
    background-image: repeating-linear-gradient(to bottom, transparent, transparent calc(3.6rem - 1px), ${kicker});
    background-size: 100vw 3.6rem;

    ${until.wide} {
        background-position: ${basePx(1)} 0;
    }
`;

function Styles({ design, pillar }: Item): SerializedStyles {

    const isFeature = design === Design.Feature;
    const isAnalysis = design === Design.Analysis;
    const { featureHeadline, kicker } = getPillarStyles(pillar);

    return css`
        padding: ${basePx(0, 0, 4, 0)};
        h1 {
            ${headlineFontStyles}
            ${headlineFont}
            ${sidePadding}
            font-weight: ${isFeature ? 700 : 500};
            color: ${isFeature ? featureHeadline : neutral[7]};
            ${isAnalysis ? AnalysisStyles(kicker) : null}
        }
    `;

}

const DarkStyles = darkModeCss`
    background: ${background.inverse};

    h1 {
        color: ${neutral[86]};
    }
`;


// ----- Component ----- //

interface Props {
    item: Item;
}

const Headline = ({ item }: Props): JSX.Element =>
    <div css={[Styles(item), DarkStyles]}>
        <h1>{item.headline}</h1>
        { item.design === Design.Review ? <ArticleRating rating={item.starRating} /> : null }
    </div>


// ----- Exports ----- //

export default Headline;
