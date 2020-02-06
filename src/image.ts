// ----- Imports ----- //

import { createHash } from 'crypto';


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

function transformUrl(salt: string, input: string, width: number): string {
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

/**
 * Produces a srcset as a string, with the asset URL transformed into image
 * resizer URLs. The resulting srcset can be used with the `<img>` and
 * `<source>` tags.
 * 
 * @param url The asset URL (supplied by CAPI) that will be used to generate
 * image resizer URLs
 * @param salt Salt used to sign (hash) the image
 * @returns An image srcset using widths ('w')
 * @example <caption>Create an image with a 'srcset':</caption>
 * const srcSet = srcset('https://media.guim.co.uk/path/of/image.jpg', salt);
 * const image = React.createElement('img', { srcSet });
 * 
 */
const srcset = (url: string, salt: string): string =>
    widths
        .map(width => `${transformUrl(salt, url, width)} ${width}w`)
        .join(', ');


// ----- Exports ----- //

export {
    srcset,
    transformUrl
};
