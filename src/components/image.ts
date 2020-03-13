// ----- Imports ----- //

import { FC } from 'react';
import { jsx as styledH, css, SerializedStyles } from '@emotion/core';
import { createHash } from 'crypto';

import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';


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

function src(salt: string, input: string, width: number): string {
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

const srcset = (url: string, salt: string): string =>
    widths
        .map(width => `${src(salt, url, width)} ${width}w`)
        .join(', ');


// ----- Component ----- //

interface Props {
    url: string;
    alt: string;
    width: number;
    height: number;
    salt: string;
    sizes: string;
    caption: string;
    credit: string;
}

const styles = (width: number, height: number): SerializedStyles => css`
    height: calc(100vw * ${height / width});
    background: ${neutral[97]};

    ${from.phablet} {
        height: calc(620px * ${height / width});
    }
`;

const Image: FC<Props> = ({ url, sizes, salt, alt, width, height, caption, credit }) => {

    if (url === '') {
        return null;
    }

    return styledH('img', {
        sizes,
        srcSet: srcset(url, salt),
        alt,
        className: 'js-launch-slideshow',
        src: src(salt, url, 500),
        css: styles(width, height),
        'data-caption': caption,
        'data-credit': credit,
    });
}


// ----- Exports ----- //

export default Image;

export {
    Props,
}
