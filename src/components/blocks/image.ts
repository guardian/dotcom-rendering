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

const immersiveImageElement = (alt: string, assets: AssetUtils.Asset[], salt: string): ReactNode =>
  h('img', {
      sizes: 'calc(80vh * 5/3)',
      srcSet: AssetUtils.toSrcset(salt, assets).withDefault(''),
      alt: alt,
      src: AssetUtils.toUrl(salt, assets[0]),
  });

const imageElement = (alt: string, assets: AssetUtils.Asset[], salt: string): ReactNode =>
    h('img', {
        sizes: '100%',
        srcSet: AssetUtils.toSrcset(salt, assets).withDefault(''),
        alt: alt,
        src: AssetUtils.toUrl(salt, assets[0]),
    });

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
