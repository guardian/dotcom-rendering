// ----- Imports ----- //

import { ImageMappings } from 'components/shared/page';

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

function src(imageMappings: ImageMappings, input: string, width: number): string {
    const url = new URL(input);
    const service = getSubdomain(url.hostname);

    const params = new URLSearchParams({
        width: width.toString(),
        quality: defaultQuality.toString(),
        fit: 'bounds',
        'sig-ignores-params': 'true',
        s: imageMappings[url.pathname],
    });

    return `${imageResizer}/${service}${url.pathname}?${params.toString()}`;
}

const srcset = (url: string, imageMappings: ImageMappings): string =>
    widths
        .map(width => `${src(imageMappings, url, width)} ${width}w`)
        .join(', ');


// ----- Exports ----- //

export {
    src,
    srcset,
};
