// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import Img from 'components/img';
import { BodyImageProps as Props } from 'image';
import { remSpace } from '@guardian/src-foundations';

// ----- Setup ----- //

const size = `calc(50% - ${remSpace[1]})`;

// ----- Component ----- //

const styles = css`
    margin: ${remSpace[1]} 0 0 0;
    display: inline-block;
    width: ${size};

    figcaption {
        display: none;
    }

    + .halfWidth, + .halfWidth + .halfWidth + .halfWidth {
        margin-left: ${remSpace[2]};
    }

    + .halfWidth + .halfWidth  {
        margin-left: 0;
    }
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
    height: calc(${size} * ${height / width});
    width: 100%;
`;

const BodyImageHalfWidth: FC<Props> = ({ image, imageMappings, children }: Props) =>
    <figure css={styles} className="halfWidth">
        <Img
            image={image}
            imageMappings={imageMappings}
            sizes={size}
            className={imgStyles(image.width, image.height)}
        />
        {children}
    </figure>;


// ----- Exports ----- //

export default BodyImageHalfWidth;
