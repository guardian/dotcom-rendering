// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { background, neutral, text } from '@guardian/src-foundations/palette';

import { Item, Design, Display } from 'item';
import { textPadding, darkModeCss as darkMode, spaceToRem } from 'styles';
import { getPillarStyles, PillarStyles } from 'pillar';
import StarRating from './starRating';


// ----- Component ----- //

interface Props {
    item: Item;
}

const darkStyles = darkMode`
    background: ${background.inverse};
    color: ${neutral[86]};
`;

const styles = css`
    ${headline.medium()}
    ${textPadding}
    padding-bottom: ${spaceToRem(9)};
    color: ${text.primary};
    margin: 0;

    ${darkStyles}
`;

const immersiveStyles = css`
    ${headline.medium({ fontWeight: 'bold' })}
    background-color: ${neutral[7]};
    color: ${neutral[100]};
    font-weight: 700;
    padding: ${spaceToRem(1)} ${spaceToRem(2)} ${spaceToRem(6)} ${spaceToRem(2)};
    margin: 0;

    ${darkStyles}
`;

const analysisStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    ${styles}
    ${headline.medium({ lineHeight: 'regular', fontWeight: 'light' })}

    span {
        box-shadow: inset 0 -0.1rem ${kicker};
        padding-bottom: 0.2rem;
    }
`;

const featureStyles = ({ featureHeadline }: PillarStyles): SerializedStyles => css`
    ${styles}
    ${headline.medium({ fontWeight: 'bold' })}
    color: ${featureHeadline};
`;

const commentStyles = css`
    ${styles}
    ${headline.medium({ fontWeight: 'light' })}
    padding-bottom: ${spaceToRem(1)};
`;

const getStyles = (item: Item): SerializedStyles => {
    const pillarStyles = getPillarStyles(item.pillar);

    if (item.display === Display.Immersive) {
        return immersiveStyles;
    }

    switch (item.design) {
        case Design.Analysis:
            return analysisStyles(pillarStyles);
        case Design.Feature:
            return featureStyles(pillarStyles);
        case Design.Comment:
            return commentStyles;
        default:
            return styles;
    }
}

const Headline = ({ item }: Props): ReactElement =>
    <h1 css={getStyles(item)}>
        <span>{ item.headline }</span>
        <StarRating item={item} />
    </h1>;


// ----- Exports ----- //

export default Headline;
