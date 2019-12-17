// ----- Imports ----- //

import { createElement as h, ReactNode } from 'react';
import * as AssetUtils from 'asset';
import { BlockElement } from 'capiThriftModels';

// ----- Setup ----- //

interface Image {
    caption: string;
    displayCredit: boolean;
    credit: string;
    alt: string;
}


// ----- Functions ----- //

const isImage = (elem: BlockElement): boolean =>
  elem.type === 'image';

const element = (sizes: string) => (alt: string, assets: AssetUtils.Asset[], salt: string): ReactNode =>
    h('img', {
        sizes,
        srcSet: AssetUtils.toSrcset(salt, assets).withDefault(''),
        alt,
        src: AssetUtils.toUrl(salt, assets[0]),
    });

const immersiveImageElement = element('calc(80vh * 5/3)');
const imageElement = element('100%');

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
};
