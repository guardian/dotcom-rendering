import React from 'react';
import { css, SerializedStyles } from '@emotion/core'

import HeaderImageCaption, { captionId } from './headerImageCaption';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { wideContentWidth, basePx } from 'styles';
import { Option } from 'types/option';
import { Image } from 'item';
import { ImageElement } from 'renderer';
import { Pillar } from 'pillar';

const Styles = (width: number, height: number): SerializedStyles => css`
    figure {
        position: relative;

        ${from.wide} {
            width: ${wideContentWidth}px;
        }
    }

    img {
        display: block;
        width: 100%;
        height: calc(100vw * ${height / width});

        ${from.wide} {
            width: ${wideContentWidth}px;
            height: ${wideContentWidth * height / width}px;
        }
    }

    margin-bottom: ${basePx(1)};
`;

interface HeaderImageProps {
    image: Option<Image>;
    imageSalt: string;
    className?: SerializedStyles | null;
    pillar: Pillar;
}

const HeaderImage = (props: HeaderImageProps): JSX.Element | null => {
    const { className, image, imageSalt, pillar } = props;
    const headerImage: Option<JSX.Element | null> = image.fmap(imageData =>
        <div css={[className, Styles(imageData.width, imageData.height)]}>
            <figure aria-labelledby={captionId}>
                <ImageElement
                    alt={imageData.alt}
                    url={imageData.file}
                    height={imageData.height}
                    width={imageData.width}
                    sizes={`(min-width: ${breakpoints.wide}px) 620px, 100vw`}
                    salt={imageSalt}
                    caption={imageData.caption}
                    captionString={imageData.captionString}
                    credit={imageData.credit}
                    pillar={pillar}
                />
                <HeaderImageCaption caption={imageData.captionString} credit={imageData.credit}/>
            </figure>
        </div>
    );

    // Needed to provide TypeScript with enough type information.
    return headerImage.withDefault(null);

}

export default HeaderImage;
