// ----- Imports ----- //

import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';
import { between, from } from '@guardian/src-foundations/mq';
import { Format, Display, Design } from '@guardian/types/Format';

import { Item } from 'item';
import { wideContentWidth, articleWidthStyles } from 'styles';
import StarRating from 'components/starRating';
import { border } from 'editorialPalette';
import { headlineTextColour, headlineBackgroundColour } from 'editorialStyles';


// ----- Component ----- //

interface Props {
    item: Item;
}

const styles = (format: Format): SerializedStyles => css`
    ${headline.medium()}
    ${headlineTextColour(format)}
    ${headlineBackgroundColour(format)}
    padding-bottom: ${remSpace[9]};
    margin: 0;

    ${articleWidthStyles}
`;

const immersiveStyles = css`
    ${headline.medium({ fontWeight: 'bold' })}
    font-weight: 700;
    padding: ${remSpace[1]} ${remSpace[2]} ${remSpace[6]} ${remSpace[2]};
    margin: calc(100vh - 5rem) 0 0;
    position: relative;
    display: inline-block;

    ${between.phablet.and.wide} {
        width: ${wideContentWidth}px;
    }

    ${from.desktop} {
        ${headline.xlarge({ fontWeight: 'bold' })}
        margin-top: calc(100vh - 7rem);
    }

    ${from.wide} {
        width: 100%;
        margin-left: calc(((100% - ${wideContentWidth}px) / 2) - ${remSpace[2]});

        span {
            display: block;
            width: ${wideContentWidth}px;
        }
    }
`;

const analysisStyles = (format: Format): SerializedStyles => css`
    ${headline.medium({ lineHeight: 'regular', fontWeight: 'light' })}

    span {
        box-shadow: inset 0 -0.1rem ${border.primary(format)};
        padding-bottom: 0.2rem;
    }
`;

const mediaStyles = css`
    ${headline.medium({ fontWeight: 'medium' })}
`

const featureStyles = css`
    ${headline.medium({ fontWeight: 'bold' })}
`;

const commentStyles = css`
    ${headline.medium({ fontWeight: 'light' })}
    padding-bottom: ${remSpace[1]};
`;

const advertisementFeatureStyles = css`
    ${textSans.xxxlarge({ lineHeight: 'regular' })}}
`;

const getStyles = (format: Format): SerializedStyles => {
    if (format.display === Display.Immersive) {
        return css(styles(format), immersiveStyles);
    }

    switch (format.design) {
        case Design.Analysis:
            return css(styles(format), analysisStyles(format));
        case Design.Feature:
            return css(styles(format), featureStyles);
        case Design.Comment:
            return css(styles(format), commentStyles);
        case Design.Media:
            return css(styles(format), mediaStyles);
        case Design.AdvertisementFeature:
            return css(styles(format), advertisementFeatureStyles);
        default:
            return styles(format);
    }
}

const Headline = ({ item }: Props): ReactElement =>
    <h1 css={getStyles(item)}>
        <span>{ item.headline }</span>
        <StarRating item={item} />
    </h1>;


// ----- Exports ----- //

export default Headline;
