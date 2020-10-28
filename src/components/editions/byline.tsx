// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { news } from '@guardian/src-foundations/palette';

import { Item } from 'item';
import { maybeRender } from 'lib';


// ----- Component ----- //

const styles = css`
    ${body.medium({ fontStyle: 'normal', fontWeight: 'bold' })}
    color: ${news[400]};
`;

interface Props {
    item: Item;
}

const Byline: FC<Props> = ({ item }) =>
    maybeRender(item.bylineHtml, byline =>
        <address css={styles}>
            {byline.textContent}
        </address>
    )


// ----- Exports ----- //

export default Byline;
