// ----- Imports ----- //

import { FC } from 'react';
import { jsx as styledH, SerializedStyles, css } from '@emotion/core';
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
    styledH('img', {
        sizes,
        srcSet: image.srcset,
        src: image.src,
        alt: image.alt.withDefault(''),
        className: 'js-launch-slideshow',
        css: [styles, className],
        'data-caption': image.nativeCaption.withDefault(''),
        'data-credit': image.credit.withDefault(''),
    });


// ----- Exports ----- //

export default Img;
