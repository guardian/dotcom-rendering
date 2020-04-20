// ----- Imports ----- //

import { FC } from 'react';
import { jsx as styledH, SerializedStyles, css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';

import { ImageMappings } from 'components/shared/page';
import { srcset, src } from 'image';


// ----- Component ----- //

interface Props {
    url: string;
    alt: string;
    width: number;
    height: number;
    imageMappings: ImageMappings;
    sizes: string;
    caption: string;
    credit: string;
    className?: SerializedStyles;
}

const styles = css`
    background-color: ${neutral[97]};
`;

const Img: FC<Props> = ({
    sizes, url, imageMappings, alt, className, caption, credit,
}) =>
    styledH('img', {
        sizes,
        srcSet: srcset(url, imageMappings),
        src: src(imageMappings, url, 500),
        alt,
        className: 'js-launch-slideshow',
        css: [styles, className],
        'data-caption': caption,
        'data-credit': credit,
    });


// ----- Exports ----- //

export default Img;
