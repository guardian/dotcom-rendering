// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Format, Display } from '@guardian/types/Format';

import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { darkModeCss, wideContentWidth, articleWidthStyles } from 'styles';
import { Item } from 'item';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';


// ----- Component ----- //

interface Props {
    item: Item;
}

const immersiveStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    padding: ${remSpace[1]} ${remSpace[2]};
    background-color: ${kicker};
    position: absolute;
    left: 0;
    transform: translateY(-100%);
    margin-top: calc(80vh - 5rem);
    display: inline-block;

    ${from.desktop} {
        margin-top: calc(80vh - 7rem);
    }

    ${from.wide} {
        margin-left: calc(((100% - ${wideContentWidth}px) / 2) - ${remSpace[2]});
    }
`;

const linkStyles = ({ kicker, inverted }: PillarStyles): SerializedStyles => css`
    ${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
    color: ${kicker};
    text-decoration: none;

    ${darkModeCss`
        color: ${inverted};
    `}
`;

const immersiveLinkStyles = css`
    color: ${neutral[100]};
    text-decoration: none;
    white-space: nowrap;
    ${headline.xxxsmall({ lineHeight: 'loose', fontWeight: 'bold' })}
`;

const getLinkStyles = ({ display, pillar }: Format): SerializedStyles => {
    if (display === Display.Immersive) {
        return immersiveLinkStyles;
    }

    return linkStyles(getPillarStyles(pillar));
}

const getStyles = ({ display, pillar }: Format): SerializedStyles => {
    if (display === Display.Immersive) {
        return immersiveStyles(getPillarStyles(pillar));
    }

    return articleWidthStyles;
}

const Series: FC<Props> = ({ item }: Props) =>
    pipe2(
        item.series,
        map(series =>
            <nav css={getStyles(item)}>
                <a css={getLinkStyles(item)} href={series.webUrl}>
                    {series.webTitle}
                </a>
            </nav>
        ),
        withDefault<ReactElement | null>(null),
    );


// ----- Exports ----- //

export default Series;
