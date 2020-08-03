// ----- Imports ----- //

import React, { ReactNode, ReactElement } from 'react';
import { css } from '@emotion/core';
import { brandAltBackground, text } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';

import { Item } from 'item';
import { icons, darkModeCss } from 'styles';
import { Design } from '@guardian/types/Format';


// ----- Subcomponents ----- //

const starStyles = css`
    ${icons}
    background-color: ${brandAltBackground.primary};
    font-size: ${remSpace[5]};
    line-height: 1;
    display: inline-block;
    padding: 0 0.2rem ${remSpace[1]};
    color: ${text.primary};

    &:nth-of-type(1) {
        padding-left: ${remSpace[1]};
    }

    &:nth-of-type(5) {
        padding-right: ${remSpace[1]};
    }

    ${darkModeCss`
        background-color: ${brandAltBackground.ctaSecondary};
    `}
`;

const empty = <span css={starStyles}>☆</span>;

const full = <span css={starStyles}>★</span>;

const stars = (rating: number): ReactNode =>
    [empty, empty, empty, empty, empty]
        .fill(full, 0, rating);


// ----- Component ----- //

interface Props {
    item: Item;
}

const StarRating = ({ item }: Props): ReactElement =>
    item.design === Design.Review ? <div>{stars(item.starRating)}</div> : <></>;


// ----- Exports ----- //

export default StarRating;
