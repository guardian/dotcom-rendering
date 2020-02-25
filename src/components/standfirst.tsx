// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { background, neutral, text } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

import { Item, Design } from 'item';
import { renderText } from 'renderer';
import { spaceToRem, textPadding, darkModeCss as darkMode } from 'styles';
import { PillarStyles, getPillarStyles } from 'pillar';


// ----- Component ----- //

interface Props {
    item: Item;
}

const darkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkMode`
    background: ${background.inverse};
    color: ${neutral[86]};

    a {
        color: ${inverted};
    }
`;

const styles = (pillarStyles: PillarStyles): SerializedStyles => css`
    margin-bottom: ${spaceToRem(2)};
    ${textPadding}
    color: ${text.primary};

    p, ul {
        margin: 0;
    }

    ${darkStyles(pillarStyles)}
`;

const normalHeadline = css`
    ${headline.xxxsmall({ fontWeight: 'bold' })}
`;

const thinHeadline = css`
    ${headline.xxxsmall({ fontWeight: 'light' })}

    ${from.tablet} {
        ${headline.xxsmall({ fontWeight: 'light' })}
    }
`;

const getStyles = (item: Item): SerializedStyles => {
    switch (item.design) {
        case Design.Review:
        case Design.Feature:
        case Design.Comment:
            return css(styles(getPillarStyles(item.pillar)), thinHeadline);

        default:
            return css(styles(getPillarStyles(item.pillar)), normalHeadline);
    }
}

const Standfirst: FC<Props> = ({ item }) =>
    item.standfirst.fmap<ReactElement | null>(standfirst =>
        <div css={getStyles(item)}>{renderText(standfirst, item.pillar)}</div>,
    ).withDefault(null);


// ----- Exports ----- //

export default Standfirst;
