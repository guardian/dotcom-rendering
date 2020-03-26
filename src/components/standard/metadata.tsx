// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';

import { Item } from 'item';
import Avatar from 'components/avatar';
import Byline from 'components/byline';
import Dateline from 'components/dateline';
import Follow from 'components/follow';
import CommentCount from 'components/commentCount';
import { ImageMappings } from 'components/shared/page';


// ----- Component ----- //

interface Props {
    item: Item;
    imageMappings: ImageMappings;
}

const styles = css`
    display: flex;
    align-items: flex-start;
    margin-bottom: ${remSpace[5]};
`;

const textStyles = css`
    flex-grow: 1;
    padding-top: ${remSpace[1]};
`;

const Metadata: FC<Props> = ({ item, imageMappings }: Props) =>
    <div css={styles}>
        <Avatar imageMappings={imageMappings} {...item} />
        <div css={textStyles}>
            <Byline {...item} />
            <Dateline date={item.publishDate} />
            <Follow {...item} />
        </div>
        <CommentCount count={0} {...item} />
    </div>


// ----- Exports ----- //

export default Metadata;
