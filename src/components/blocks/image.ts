// ----- Imports ----- //

import { createElement as h, ReactNode } from 'react';
import * as AssetUtils from 'asset';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { BlockElement } from 'mapiThriftModels/BlockElement';
import { from } from '@guardian/src-foundations/mq';
import { fromNullable } from 'types/option';

// ----- Setup ----- //

interface Image {
    caption: string;
    displayCredit: boolean;
    credit: string;
    alt: string;
}


// ----- Functions ----- //

const imageRatioStyles = (sizes = "100vw", width: number, height: number): SerializedStyles => css`
        --size: ${sizes};
        height: calc(var(--size) * ${height / width});
        background: ${palette.neutral[97]};

        ${from.wide} {
            height: calc(620px * ${height / width});
        }
    `

const isImage = (elem: BlockElement): boolean =>
  elem.type === 'image';

const element = (sizes: string) => 
    (alt: string, assets: AssetUtils.Asset[], salt: string): ReactNode => {
        const masterAsset = assets.find(asset => asset.typeData.isMaster);
        const aspectRatio: number[] = fromNullable(masterAsset)
            .map(asset => [asset.typeData.height, asset.typeData.width])
            .withDefault([3, 5])
        const [height, width] = aspectRatio;

            return styledH('img', {
                css: imageRatioStyles(sizes, width, height),
                sizes,
                srcSet: AssetUtils.toSrcset(salt, assets).withDefault(''),
                alt,
                src: AssetUtils.toUrl(salt, assets[0]),
            });
    }

const immersiveImageElement = element('calc(80vh * 5/3)');
const imageElement = element('100vw');

function imageBlock(image: Image, assets: AssetUtils.Asset[], salt: string): ReactNode {

    const caption = image.displayCredit ? `${image.caption} ${image.credit}` : image.caption;

    return h('figure', { className: 'image' },
        imageElement(image.alt, assets, salt),
        h('figcaption', null, caption),
    );
}


// ----- Exports ----- //

export {
    isImage,
    imageBlock,
    imageElement,
    immersiveImageElement,
    imageRatioStyles,
};
