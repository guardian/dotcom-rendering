// ----- Imports ----- //

import { createHash } from 'crypto';

import { Option, fromNullable } from 'types/Option';


// ----- Types ----- //

interface AssetTypeData {
    altText: string;
    caption: string;
    credit: string;
    width: number;
    height: number;
    isMaster?: boolean;
}

interface Asset {
    file: string;
    typeData: AssetTypeData;
}

type Url = string;


// ----- Setup ----- //

const imageResizer = 'https://i.guim.co.uk/img';

const widths = [
    140,
    500,
    1000,
    1500,
    2000,
];

// Percentage.
const defaultQuality = 85;


// ----- Functions ----- //

const getSubdomain = (domain: string): string =>
    domain.split('.')[0];

const sign = (salt: string, path: string): string =>
    createHash('md5').update(salt + path).digest('hex')    

function transformUrl(salt: string, input: Url, width: number): Url {

    const url = new URL(input);
    const service = getSubdomain(url.hostname);

    const params = new URLSearchParams({
        width: width.toString(),
        quality: defaultQuality.toString(),
        fit: 'bounds',
        'sig-ignores-params': 'true',
        s: sign(salt, url.pathname),
    });

    return `${imageResizer}/${service}${url.pathname}?${params.toString()}`;

}

const srcset = (salt: string) => (url: Url): string =>
    widths
        .map(width => `${transformUrl(salt, url, width)} ${width}w`)
        .join(', ')

/**
 * Produces a srcset as a string, with the asset URLs transformed into image
 * resizer URLs. The resulting srcset can be used with the `<img>` and
 * `<source>` tags. Will return `None` if required assets are missing.
 * 
 * @param salt Salt used to sign (hash) the image.
 * @param assets A list of image assets, typically supplied by CAPI.
 * @returns An option of an image srcset.
 */
const toSrcset = (salt: string, assets: Asset[]): Option<string> =>
    fromNullable(assets.find(asset => asset.typeData.isMaster))
        .map(asset => asset.file)
        .map(srcset(salt))

/**
 * Transforms an image asset from a CAPI response, which contains URLs in
 * Grid-style format (e.g. `https://media.guim.co.uk/...`), to a Fastly image
 * resizer URL (e.g. `https://i.guim.co.uk/img/media/...`).
 * 
 * @param salt Salt used to sign (hash) the image.
 * @param asset An image asset, typically supplied by CAPI.
 * @returns A URL to retrieve a given image from the image resizer.
 */
const toUrl = (salt: string, asset: Asset): Url =>
    transformUrl(salt, asset.file, asset.typeData.width)


// ----- Exports ----- //

export {
    Asset,
    toSrcset,
    toUrl,
};
