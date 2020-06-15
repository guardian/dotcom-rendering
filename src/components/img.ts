// ----- Imports ----- //

import { createElement as h, FC } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';

import { Image, Role } from 'image';
import { darkModeCss } from 'styles';
import { Format, Design } from '@guardian/types/Format';
import { Option } from 'types/option';


// ----- Component ----- //

interface Props {
    image: Image;
    sizes: string;
    className?: SerializedStyles;
    format?: Format;
}

const styles = (role: Option<Role>, format?: Format): SerializedStyles => {
    const darkModeStyles = darkModeCss`
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    `

    return role.fmap(imageRole => imageRole).withDefault(Role.HalfWidth) === Role.Thumbnail
        ? darkModeStyles
        : css`
            background-color: ${format?.design === Design.Media ? neutral[20] : neutral[97]};
            ${darkModeStyles}
        `
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
            alt: image.alt.withDefault(''),
            className: image.launchSlideshow ? 'js-launch-slideshow' : '',
            css: [styles(image.role, format), className],
            'data-caption': image.nativeCaption.withDefault(''),
            'data-credit': image.credit.withDefault(''),
        }),
    ] );


// ----- Exports ----- //

export default Img;
