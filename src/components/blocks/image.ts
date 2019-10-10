// ----- Imports ----- //

import React from 'react';
import * as AssetUtils from 'utils/Asset';

// ----- Setup ----- //

const h = React.createElement;

interface Image {
    caption: string;
    displayCredit: boolean;
    credit: string;
    alt: string;
}


// ----- Functions ----- //

const imageElement = (alt: string, assets: AssetUtils.Asset[], salt: string): React.ReactNode =>
    h('img', {
        sizes: '100%',
        srcSet: AssetUtils.toSrcset(salt, assets).withDefault(''),
        alt: alt,
        src: AssetUtils.toUrl(salt, assets[0]),
    });

function imageBlock(image: Image, assets: AssetUtils.Asset[], salt: string): React.ReactNode {

    const caption = image.displayCredit ? `${image.caption} ${image.credit}` : image.caption;

    return h('figure', { className: 'image' },
        imageElement(image.alt, assets, salt),
        h('figcaption', null, caption),
    );
}


// ----- Exports ----- //

export {
    imageBlock,
    imageElement
};
