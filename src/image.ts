// ----- Imports ----- //

import { createHash } from 'crypto';

import { ImageMappings } from 'components/shared/page';
import { Option, Some, None, fromNullable } from 'types/option';
import { IBlockElement as BlockElement } from 'mapiThriftModels';
import { ReactNode } from 'react';


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


// ----- Types ----- //

enum Role {
    Thumbnail,
    HalfWidth
}

interface Image {
    src: string;
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
    imageMappings: ImageMappings;
    children?: ReactNode;
}

// ----- Functions ----- //

const getSubdomain = (domain: string): string =>
    domain.split('.')[0];

const sign = (salt: string, path: string): string =>
    createHash('md5').update(salt + path).digest('hex');

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

const srcsetWithWidths = (widths: number[]) => (url: string, mappings: ImageMappings): string =>
    widths
        .map(width => `${src(mappings, url, width)} ${width}w`)
        .join(', ');

const srcset: (url: string, mappings: ImageMappings) => string =
    srcsetWithWidths(defaultWidths);

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

const parseImage = (docParser: (html: string) => DocumentFragment) =>
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
            src: asset.file,
            alt: fromNullable(data?.alt),
            width: asset.typeData.width,
            height: asset.typeData.height,
            caption: fromNullable(data?.caption).fmap(docParser),
            credit: parseCredit(data?.displayCredit, data?.credit),
            nativeCaption: fromNullable(data?.caption),
            role: parseRole(data?.role),
        });
    });
}


// ----- Exports ----- //

export {
    Image,
    Role,
    src,
    srcset,
    srcsetWithWidths,
    sign,
    parseImage,
    BodyImageProps
};
