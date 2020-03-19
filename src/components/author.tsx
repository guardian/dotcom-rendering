// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';

import { Item } from 'item';
import { renderText } from 'renderer';


// ----- Component ----- //

interface Props {
    item: Item;
}

const styles = css`
    ${headline.medium({ fontWeight: 'light' })}
    font-style: italic;
`;

const Author: FC<Props> = ({ item }) =>
    item.bylineHtml.fmap<ReactElement | null>(byline =>
        <address css={styles}>
            {renderText(byline, item.pillar)}
        </address>
    ).withDefault(null);


// ----- Exports ----- //

export default Author;
