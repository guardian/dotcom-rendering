// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';

import { Item } from 'item';
import Img from 'components/img';
import { MainMediaKind } from 'headerMedia';
import { maybeRender } from 'lib';


// ----- Component ----- //

const styles = css`
    margin: 0;
`;

const imgStyles = css`
    display: block;
    width: 100%;
`;

interface Props {
    item: Item;
}

const HeaderImage: FC<Props> = ({ item }) =>
    maybeRender(item.mainMedia, media => {
        if (media.kind === MainMediaKind.Image) {
            return (
                <figure css={styles}>
                    <Img
                        image={media.image}
                        sizes={`calc(100vw - (${remSpace[4]} * 2)`}
                        format={item}
                        className={imgStyles}
                    />
                </figure>
            );
        }

        return null;
    })


// ----- Exports ----- //

export default HeaderImage;
