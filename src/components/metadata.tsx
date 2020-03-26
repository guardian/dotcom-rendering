// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';

import { Item } from 'item';
import Dateline from 'components/dateline';
import Follow from 'components/follow';
import CommentCount from 'components/commentCount';


// ----- Component ----- //

interface Props {
    item: Item;
}

const styles = css`
    display: flex;
    margin-bottom: ${remSpace[5]};
`;

const textStyles = css`
    flex-grow: 1;
`;

const Metadata: FC<Props> = ({ item }) =>
    <div css={styles}>
        <div css={textStyles}>
            <Dateline date={item.publishDate} />
            <Follow {...item} />
        </div>
        <CommentCount count={0} {...item} />
    </div>


// ----- Exports ----- //

export default Metadata;
