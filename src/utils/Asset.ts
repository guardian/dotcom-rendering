// ----- Imports ----- //

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

const resizerParams = (width: number, height: number, quality: number ): URLSearchParams =>
    new URLSearchParams({
        w: width.toString(),
        h: height.toString(),
        q: quality.toString(),
        fit: 'bounds',
        'sig-ignores-params': 'true',
    })

function transformUrl(input: Url, width: number, height: number): Url {

    const url = new URL(input);
    const service = getSubdomain(url.hostname);
    const params = resizerParams(width, height, defaultQuality);

    return `${imageResizer}/${service}${url.pathname}?${params.toString()}`;

}

function toResizerUrl(asset: Asset, baseUrl: Option<Url> = new None()): Url {

    const { typeData: { width, height }, file } = asset;
    const url = baseUrl.withDefault(file);

    return transformUrl(url, width, height);

}

const srcString = (url: Url) => (asset: Asset): string => {
    const { typeData: { width } } = asset;
    return `${toResizerUrl(asset, new Some(url))} ${width}w`;
}

const srcset = (assets: Asset[]) => (url: Url): string =>
    assets
        .filter(asset => !asset.typeData.isMaster)
        .map(srcString(url))
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
 * @param assets A list of image assets, typically supplied by CAPI.
 * @returns An option of an image srcset.
 */
const toSrcset = (assets: Asset[]): Option<string> =>
    getMasterUrl(assets).map(srcset(assets))

/**
 * Transforms an image asset from a CAPI response, which contains URLs in
 * Grid-style format (e.g. `https://media.guim.co.uk/...`), to a Fastly image
 * resizer URL (e.g. `https://i.guim.co.uk/img/media/...`).
 * 
 * @param asset An image asset, typically supplied by CAPI.
 * @returns A URL to retrieve a given image from the image resizer.
 */
const toUrl: (asset: Asset) => Url =
    toResizerUrl


// ----- Exports ----- //

export {
    Asset,
    toSrcset,
    toUrl,
};
