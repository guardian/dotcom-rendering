// ----- Imports ----- //

import { FC } from 'react';
import { jsx as styledH, SerializedStyles, css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';

import { ImageMappings } from 'components/shared/page';
import { Image, srcset, src } from 'image';
import { darkModeCss } from 'styles';


// ----- Component ----- //

interface Props {
    image: Image;
    imageMappings: ImageMappings;
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

const Img: FC<Props> = ({ image, sizes, imageMappings, className }) =>
    styledH('img', {
        sizes,
        srcSet: srcset(image.src, imageMappings),
        src: src(imageMappings, image.src, 500),
        alt: image.alt.withDefault(''),
        className: 'js-launch-slideshow',
        css: [styles, className],
        'data-caption': image.nativeCaption.withDefault(''),
        'data-credit': image.credit.withDefault(''),
    });


// ----- Exports ----- //

export default Img;
