// ----- Imports ----- //

import { createElement as h, FC } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';

import { Image } from 'image';
import { darkModeCss } from 'styles';


// ----- Component ----- //

interface Props {
    image: Image;
    sizes: string;
    className?: SerializedStyles;
}

const styles = css`
    background-color: ${neutral[97]};
    ${darkModeCss`
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    `}
`;

const Img: FC<Props> = ({ image, sizes, className }) =>
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
            css: [styles, className],
            'data-caption': image.nativeCaption.withDefault(''),
            'data-credit': image.credit.withDefault(''),
        }),
    ] );


// ----- Exports ----- //

export default Img;
