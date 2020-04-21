// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { remSpace, breakpoints } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';

import { Image } from 'image';
import Img from 'components/img';
import { ImageMappings } from 'components/shared/page';


// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;


// ----- Component ----- //

interface Props {
    image: Image;
    imageMappings: ImageMappings;
    children?: ReactNode;
}

const styles = css`
    margin: 1rem 0 ${remSpace[3]};

    ${from.wide} {
        margin-bottom: 1rem;
    }
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
    height: calc(100vw * ${height / width});
    background: ${neutral[97]};
    display: block;
    width: 100%;
 
    ${from.phablet} {
        height: calc(620px * ${height / width});
    }
`;

const BodyImage: FC<Props> = ({ image, imageMappings, children }: Props) =>
    <figure css={styles}>
        <Img
            image={image}
            imageMappings={imageMappings}
            sizes={sizes}
            className={imgStyles(image.width, image.height)}
        />
        {children}
    </figure>


// ----- Exports ----- //

export default BodyImage;
