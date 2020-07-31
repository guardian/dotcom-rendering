// ----- Imports ----- //

import { ReactNode } from 'react';
import { createHash } from 'crypto';

import { Option, some, none, fromNullable, andThen, map } from '@guardian/types/option';
import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { Context } from 'types/parserContext';
import { Format } from '@guardian/types/Format';
import { pipe2 } from 'lib';


// ----- Setup ----- //

const imageResizer = 'https://i.guim.co.uk/img';

const defaultWidths = [
    140,
    500,
    1000,
    1500,
    2000,
];

// Percentage.
const defaultQuality = 85;
const lowerQuality = 45;


// ----- Types ----- //

enum Role {
    Thumbnail,
    HalfWidth
}

const enum Dpr {
    One,
    Two
}

interface Srcsets {
    srcset: string;
    dpr2Srcset: string;
}

interface Image {
    src: string;
    srcset: string;
    dpr2Srcset: string;
    alt: Option<string>;
    width: number;
    height: number;
    caption: Option<DocumentFragment>;
    credit: Option<string>;
    nativeCaption: Option<string>;
    role: Option<Role>;
}

interface BodyImageProps {
    image: Image;
    children?: ReactNode;
    format: Format;
}

// ----- Functions ----- //

const getSubdomain = (domain: string): string =>
    domain.split('.')[0];

const sign = (salt: string, path: string): string =>
    createHash('md5').update(salt + path).digest('hex');

function src(salt: string, input: string, width: number, dpr: Dpr): string {
    const url = new URL(input);
    const service = getSubdomain(url.hostname);

    const params = new URLSearchParams({
        width: width.toString(),
        quality: dpr === Dpr.Two ? lowerQuality.toString() : defaultQuality.toString(),
        fit: 'bounds',
    });

    const path = `${url.pathname}?${params.toString()}`;
    const sig = sign(salt, path);

    return `${imageResizer}/${service}${path}&s=${sig}`;
}

const srcsetWithWidths = (widths: number[]) => (url: string, salt: string, dpr: Dpr): string =>
    widths
        .map(width => `${src(salt, url, width, dpr)} ${width}w`)
        .join(', ');

const srcset: (url: string, salt: string, dpr: Dpr) => string =
    srcsetWithWidths(defaultWidths);

const srcsets = (url: string, salt: string): Srcsets => ({
    srcset: srcset(url, salt, Dpr.One),
    dpr2Srcset: srcset(url, salt, Dpr.Two),
});

const parseCredit = (
    displayCredit: boolean | undefined,
    credit: string | undefined,
): Option<string> =>
    pipe2(
        displayCredit,
        fromNullable,
        andThen(display => display ? fromNullable(credit) : none),
    );

const parseRole = (role: string | undefined): Option<Role> =>
    pipe2(
        role,
        fromNullable,
        andThen(someRole => {
            switch(someRole) {
                case 'thumbnail':
                    return some(Role.Thumbnail);
                case 'halfWidth':
                    return some(Role.HalfWidth);
                default:
                    return none;
            }
        }),
    );

const parseImage = ({ docParser, salt }: Context) =>
    (element: BlockElement): Option<Image> => {
    const masterAsset = element.assets.find(asset => asset?.typeData?.isMaster);
    const data = element.imageTypeData;

    return pipe2(
        masterAsset,
        fromNullable,
        andThen(asset => {
            if (
                asset?.file === undefined ||
                asset.file === '' ||
                asset?.typeData?.width === undefined ||
                asset?.typeData?.height === undefined
            ) {
                return none;
            }

            return some({
                src: src(salt, asset.file, 500, Dpr.One),
                ...srcsets(asset.file, salt),
                alt: fromNullable(data?.alt),
                width: asset.typeData.width,
                height: asset.typeData.height,
                caption: pipe2(data?.caption, fromNullable, map(docParser)),
                credit: parseCredit(data?.displayCredit, data?.credit),
                nativeCaption: fromNullable(data?.caption),
                role: parseRole(data?.role),
            });
        })
    );
};


// ----- Exports ----- //

export {
    Image,
    Role,
    Dpr,
    src,
    srcset,
    srcsetWithWidths,
    sign,
    parseImage,
    BodyImageProps
};
