// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';

import { Item } from 'item';
import { maybeRender } from 'lib';
import { renderStandfirstText } from 'renderer';


// ----- Component ----- //

const styles = css`
    ${body.medium({ lineHeight: 'tight' })}
    margin: ${remSpace[4]} 0 0;
`;

interface Props {
    item: Item;
}

const Standfirst: FC<Props> = ({ item }) =>
    maybeRender(item.standfirst, standfirst =>
        <div css={styles}>{renderStandfirstText(standfirst, item)}</div>
    )


// ----- Exports ----- //

export default Standfirst;
