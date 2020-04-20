// ----- Imports ----- //

import React, { FC, ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { remSpace } from '@guardian/src-foundations';

import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import { wideContentWidth } from 'styles';
import { Option } from 'types/option';
import { Image } from 'item';
import Img from 'components/img';
import { ImageMappings } from 'components/shared/page';
import { Format, Display, Design } from 'format';


// ----- Subcomponents ----- //

interface CaptionProps {
    format: Format;
    image: Image;
}

const Caption: FC<CaptionProps> = ({ format, image }: CaptionProps) => {
    switch (format.display) {
        case Display.Immersive:
            return null;
        default:
            return (
                <HeaderImageCaption
                    caption={image.captionString}
                    credit={image.credit}
                />
            );
    }
}


// ----- Component ----- //

const styles = css`
    margin: 0 0 ${remSpace[2]} 0;
    position: relative;
    
    ${from.wide} {
        width: ${wideContentWidth}px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const liveStyles = css`
    ${from.wide} {
        margin-left: 0;
        margin-right: 0;
    }
`;
    
const imgStyles = (width: number, height: number): SerializedStyles => css`
    display: block;
    width: 100%;
    height: calc(100% * ${height / width});

    ${from.wide} {
        width: ${wideContentWidth}px;
        height: ${wideContentWidth * height / width}px;
    }
`;

const immersiveImgStyles = css`
    display: block;
    height: 80vh;
    object-fit: cover;
    width: 100vw;

    ${from.wide} {
        width: ${wideContentWidth}px;
    }
`;

const getStyles = ({ design }: Format): SerializedStyles => {
    switch (design) {
        case Design.Live:
            return css(styles, liveStyles);
        default:
            return styles;
    }
}

const getImgStyles = ({ display }: Format, image: Image): SerializedStyles => {
    switch (display) {
        case Display.Immersive:
            return immersiveImgStyles;
        default:
            return imgStyles(image.width, image.height);
    }
}

const getSizes = ({ display }: Format, image: Image): string => {
    switch (display) {
        case Display.Immersive:
            return `calc(80vh * ${image.width/image.height})`;
        default:
            return `(min-width: ${breakpoints.wide}px) 620px, 100vw`;
    }
}

interface Props {
    image: Option<Image>;
    imageMappings: ImageMappings;
    className?: SerializedStyles;
    format: Format;
}

const HeaderImage: FC<Props> = ({ className, image, imageMappings, format }) =>
    image.fmap<ReactElement | null>(imageData =>
        <figure css={[getStyles(format), className]} aria-labelledby={captionId}>
            <Img
                alt={imageData.alt}
                url={imageData.file}
                height={imageData.height}
                width={imageData.width}
                sizes={getSizes(format, imageData)}
                imageMappings={imageMappings}
                caption={imageData.captionString}
                credit={imageData.credit}
                className={getImgStyles(format, imageData)}
            />
            <Caption format={format} image={imageData} />
        </figure>
    ).withDefault(null);


// ----- Exports ----- //

export default HeaderImage;
