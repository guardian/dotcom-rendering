// ----- Imports ----- //

import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { from } from '@guardian/src-foundations/mq';

import { wideContentWidth } from 'styles';
import { Option } from 'types/option';
import { Image } from 'item';
import { ImageElement } from 'renderer';
import { Pillar } from 'pillar';
import { ImageMappings } from 'components/shared/page';


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
    imageMappings: ImageMappings;
    className?: SerializedStyles | null;
    pillar: Pillar;
}

const HeaderImage = ({ className, image, imageMappings, pillar }: Props): JSX.Element | null =>
    image.fmap<JSX.Element | null>(imageData =>
        <div css={[className, Styles]}>
            <figure>
                <ImageElement
                    alt={imageData.alt}
                    url={imageData.file}
                    height={imageData.height}
                    width={imageData.width}
                    sizes={`calc(80vh * ${imageData.width/imageData.height})`}
                    imageMappings={imageMappings}
                    caption={imageData.caption}
                    captionString={imageData.captionString}
                    credit={imageData.credit}
                    pillar={pillar}
                />
            </figure>
        </div>
    ).withDefault(null);


// ----- Exports ----- //

export default HeaderImage;
