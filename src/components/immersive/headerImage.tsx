// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { from } from '@guardian/src-foundations/mq';

import { wideContentWidth } from 'styles';
import { Option } from 'types/option';
import { Image } from 'article';
import { ImageElement } from 'renderer';


// ----- Styles ----- //

const Styles = css`
    figure {
        position: relative;

        ${from.wide} {
            width: ${wideContentWidth}px;
        }
    }

    img {
        display: block;
        height: 80vh;
        object-fit: cover;
        width: 100vw;

        ${from.wide} {
            width: ${wideContentWidth}px;
        }
    }
`;


// ----- Component ----- //

interface Props {
    image: Option<Image>;
    imageSalt: string;
    className?: SerializedStyles | null;
}

const HeaderImage = ({ className, image, imageSalt }: Props): JSX.Element | null =>
    image.fmap<JSX.Element | null>(imageData =>
        <div css={[className, Styles]}>
            <figure>
                <ImageElement
                    alt={imageData.alt}
                    url={imageData.file}
                    height={imageData.height}
                    width={imageData.width}
                    sizes={`calc(80vh * ${imageData.width/imageData.height})`}
                    salt={imageSalt}
                />
            </figure>
        </div>
    ).withDefault(null);


// ----- Exports ----- //

export default HeaderImage;
