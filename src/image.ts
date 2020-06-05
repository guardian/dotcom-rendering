// ----- Imports ----- //

import { ReactNode } from 'react';
import { createHash } from 'crypto';

import { Option, Some, None, fromNullable } from 'types/option';
import { IBlockElement as BlockElement } from 'mapiThriftModels';
import { Context } from 'types/parserContext';


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
    launchSlideshow: boolean;
}

interface BodyImageProps {
    image: Image;
    children?: ReactNode;
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
        'sig-ignores-params': 'true',
        s: sign(salt, url.pathname),
    });

    return `${imageResizer}/${service}${url.pathname}?${params.toString()}`;
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
    fromNullable(displayCredit).andThen(display => display ? fromNullable(credit) : new None());

const parseRole = (role: string | undefined): Option<Role> =>
    fromNullable(role).andThen<Role>(
        someRole => {
            switch(someRole) {
                case 'thumbnail':
                    return new Some(Role.Thumbnail);
                case 'halfWidth':
                    return new Some(Role.HalfWidth);
                default:
                    return new None();
            }
        }
    );

const parseImage = ({ docParser, salt }: Context) =>
    (element: BlockElement): Option<Image> => {
    const masterAsset = element.assets.find(asset => asset?.typeData?.isMaster);
    const data = element.imageTypeData;

    return fromNullable(masterAsset).andThen(asset => {
        if (
            asset?.file === undefined ||
            asset.file === '' ||
            asset?.typeData?.width === undefined ||
            asset?.typeData?.height === undefined
        ) {
            return new None();
        }

        return new Some({
            src: src(salt, asset.file, 500, Dpr.One),
            ...srcsets(asset.file, salt),
            alt: fromNullable(data?.alt),
            width: asset.typeData.width,
            height: asset.typeData.height,
            caption: fromNullable(data?.caption).fmap(docParser),
            credit: parseCredit(data?.displayCredit, data?.credit),
            nativeCaption: fromNullable(data?.caption),
            role: parseRole(data?.role),
            launchSlideshow: true
        });
    });
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
