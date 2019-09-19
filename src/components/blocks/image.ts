// ----- Imports ----- //

import React from 'react';


// ----- Setup ----- //

const h = React.createElement;

interface Image {
    caption: string,
    displayCredit: boolean,
    credit: string,
    alt: string,
}

interface Asset {
    type: string,
    file: string,
    typeData: {
        width: number,
        isMaster?: boolean,
    }
}


// ----- Functions ----- //

const srcSet = (assets: Asset[]): string =>
    assets
        .filter(a => !a.typeData.isMaster)
        .map(a => `${a.file} ${a.typeData.width}w`)
        .join(', ');

const imageElement = (image: Image, assets: Asset[]): React.ReactNode =>
    h('img', {
        sizes: '100%',
        srcset: srcSet(assets),
        alt: image.alt,
        src: assets[0].file,
    });

function imageBlock(image: Image, assets: Asset[]): React.ReactNode {

    const caption = image.displayCredit ? `${image.caption} ${image.credit}` : image.caption;

    return h('figure', null, [
        imageElement(image, assets),
        h('figcaption', null, caption),
    ]);
}


// ----- Exports ----- //

export {
    imageBlock,
};
