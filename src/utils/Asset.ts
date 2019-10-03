// ----- Imports ----- //

import { createHash } from 'crypto';

import { Option, None, Some } from 'types/Option';


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

// TODO: move to config
const imageResizer = 'https://i.guim.co.uk/img';

// Percentage.
const defaultQuality = 85;


// ----- Functions ----- //

const getSubdomain = (domain: string): string =>
    domain.split('.')[0];

const sign = (salt: string, path: string): string =>
    createHash('md5').update(salt + path).digest('hex')    

function transformUrl(input: Url, width: number, height: number, salt: string): Url {

    const url = new URL(input);
    const service = getSubdomain(url.hostname);

    const params = new URLSearchParams({
        w: width.toString(),
        h: height.toString(),
        q: defaultQuality.toString(),
        fit: 'bounds',
        'sig-ignores-params': 'true',
        s: sign(salt, url.pathname),
    });

    return `${imageResizer}/${service}${url.pathname}?${params.toString()}`;

}

const toResizerUrl = (salt: string, asset: Asset, baseUrl: Option<Url> = new None()): Url => {

    const { typeData: { width, height }, file } = asset;
    const url = baseUrl.withDefault(file);

    return transformUrl(url, width, height, salt);

}

const srcString = (salt: string, url: Url) => (asset: Asset): string => {
    const { typeData: { width } } = asset;
    return `${toResizerUrl(salt, asset, new Some(url))} ${width}w`;
}

const srcset = (salt: string, assets: Asset[]) => (url: Url): string =>
    assets
        .filter(asset => !asset.typeData.isMaster)
        .map(srcString(salt, url))
        .join(', ')

function getMasterUrl(assets: Asset[]): Option<Url> {
    if (assets.length === 0) {
        return new None();
    }

    if (assets[0].typeData.isMaster) {
        return new Some(assets[0].file);
    }

    return getMasterUrl(assets.slice(1));
}

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
    getMasterUrl(assets).map(srcset(salt, assets))

/**
 * Transforms an image asset from a CAPI response, which contains URLs in
 * Grid-style format (e.g. `https://media.guim.co.uk/...`), to a Fastly image
 * resizer URL (e.g. `https://i.guim.co.uk/img/media/...`).
 * 
 * @param salt Salt used to sign (hash) the image.
 * @param asset An image asset, typically supplied by CAPI.
 * @returns A URL to retrieve a given image from the image resizer.
 */
const toUrl: (salt: string, asset: Asset) => Url =
    toResizerUrl


// ----- Exports ----- //

export {
    Asset,
    toSrcset,
    toUrl,
};
