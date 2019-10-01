// ----- Imports ----- //

import React from 'react';
import * as Asset from 'utils/Asset';


// ----- Setup ----- //

const h = React.createElement;

interface Image {
    caption: string;
    displayCredit: boolean;
    credit: string;
    alt: string;
}


// ----- Functions ----- //

const imageElement = (image: Image, assets: Asset.Asset[]): React.ReactNode =>
    h('img', {
        sizes: '100%',
        srcSet: Asset.toSrcset(assets).withDefault(''),
        alt: image.alt,
        src: Asset.toUrl(assets[0]),
    });

function imageBlock(image: Image, assets: Asset.Asset[]): React.ReactNode {

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
