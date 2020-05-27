// ----- Imports ----- //

import { createElement as h, FC } from 'react';
import { css, jsx as styledH, SerializedStyles } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';

import { Dpr, Image } from 'image';
import { darkModeCss } from 'styles';


// ----- Component ----- //

interface Props {
    image: Image;
    sizes: string;
    className?: SerializedStyles;
}

interface SourceProps {
    sizes: string,
    srcSet: string,
    dpr: Dpr,
}

const styles = css`
    background-color: ${neutral[97]};
    ${darkModeCss`
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    `}
`;

const mediaQuery = (dpr: Dpr): string => {
    switch (dpr) {
        case Dpr.Two:
            return '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)';
        case Dpr.One:
        default:
            return '';
    }
};

const Source: FC<SourceProps> = ({ sizes, srcSet, dpr }) =>
    h('source', {
        sizes,
        srcSet,
        media: mediaQuery(dpr),
    });

const Img: FC<Props> = ({ image, sizes, className }) =>
    h('picture', null, [
        h(Source, {
            sizes,
            srcSet: image.dpr2Srcset,
            dpr: Dpr.Two,
        }),
        h(Source, {
            sizes,
            srcSet: image.srcset,
            dpr: Dpr.One,
        }),
        styledH('img', {
            src: image.src,
            alt: image.alt.withDefault(''),
            className: 'js-launch-slideshow',
            css: [styles, className],
            'data-caption': image.nativeCaption.withDefault(''),
            'data-credit': image.credit.withDefault(''),
        }),
    ] );


// ----- Exports ----- //

export default Img;
