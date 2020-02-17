// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';

import { sidePadding, headlineFont, darkModeCss } from 'styles';
import { getPillarStyles } from 'pillar';
import { renderText } from 'renderer';
import { Design, Item } from 'item';


// ----- Styles ----- //

const FeatureStyles = `
    color: ${neutral[46]};
    ${headlineFont}
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.4rem;
`;

function Styles({ design }: Item): SerializedStyles {
    const includeFeatureStyles = design === Design.Feature
        || design === Design.Review
        || design === Design.Comment;

    return css`
        padding-bottom: 6px;
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 2rem;

        p, ul {
            margin: 0;
        }

        ${sidePadding}
        ${includeFeatureStyles ? FeatureStyles : null}
    `;
}

const DarkStyles = ({ pillar }: Item): SerializedStyles => darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    a {
        color: ${getPillarStyles(pillar).inverted};
    }
`;


// ----- Component ----- //

interface Props {
    item: Item;
    className: SerializedStyles;
}

const Standfirst = ({ item, className }: Props): JSX.Element | null =>
    item.standfirst.fmap<JSX.Element | null>(standfirst =>
        <div css={[className, Styles(item), DarkStyles(item)]}>
            {renderText(standfirst, item.pillar)}
        </div>
    ).withDefault(null);

// ----- Exports ----- //

export default Standfirst;
