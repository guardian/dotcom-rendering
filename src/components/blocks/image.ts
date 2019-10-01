// ----- Imports ----- //

import React from 'react';
import { assetsToSrcset, assetToUrl } from 'utils/imageResizer';
import { Asset } from 'types/Capi';


// ----- Setup ----- //

const h = React.createElement;

interface Image {
    caption: string;
    displayCredit: boolean;
    credit: string;
    alt: string;
}


// ----- Functions ----- //

const imageElement = (image: Image, assets: Asset[]): React.ReactNode =>
    h('img', {
        sizes: '100%',
        srcSet: assetsToSrcset(assets).withDefault(''),
        alt: image.alt,
        src: assetToUrl(assets[0]),
    });

function imageBlock(image: Image, assets: Asset[]): React.ReactNode {

    const caption = image.displayCredit ? `${image.caption} ${image.credit}` : image.caption;

    return h('figure', { className: 'image' },
        imageElement(image, assets),
        h('figcaption', null, caption),
    );
}


// ----- Exports ----- //

export {
    imageBlock,
};
