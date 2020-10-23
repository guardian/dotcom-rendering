// ----- Imports ----- //

import { createElement as h, FC } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { Role } from '@guardian/image-rendering/src/image';

import { Image } from 'image';
import { darkModeCss } from 'styles';
import { Format, Design } from '@guardian/types/Format';
import { withDefault } from '@guardian/types/option';


// ----- Component ----- //

interface Props {
    image: Image;
    sizes: string;
    className?: SerializedStyles;
    format: Format;
}

const styles = (role: Role, format: Format): SerializedStyles => {
    const backgroundColour = (format: Format): string => {
        switch (format.design) {
            case Design.Media:
                return neutral[20];
            case Design.Comment:
                return neutral[86];
            default:
                return neutral[97]
        }
    };
    return role === Role.Thumbnail ? css`color: ${neutral[60]};`
        : css`
            background-color: ${backgroundColour(format)};
            ${darkModeCss`background-color: ${neutral[20]};`}
            color: ${neutral[60]};
        `;
}

const Img: FC<Props> = ({ image, sizes, className, format }) =>
    h('picture', null, [
        h('source', {
            sizes,
            srcSet: image.dpr2Srcset,
            media: '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)',
        }),
        h('source', {
            sizes,
            srcSet: image.srcset,
        }),
        styledH('img', {
            src: image.src,
            alt: withDefault('')(image.alt),
            className: image.width > 620 ? 'js-launch-slideshow' : '',
            css: [styles(image.role, format), className],
            'data-ratio': image.height / image.width,
            'data-caption': withDefault('')(image.nativeCaption),
            'data-credit': withDefault('')(image.credit),
        }),
    ] );


// ----- Exports ----- //

export default Img;
