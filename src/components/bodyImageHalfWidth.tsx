// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import Img from 'components/img';
import { BodyImageProps as Props } from 'image';
import { remSpace, breakpoints } from '@guardian/src-foundations';

// ----- Setup ----- //

const figureWidth = `calc(50% - ${remSpace[1]})`;
const size = `(min-width: ${breakpoints.phablet}px) 310px, 50vw`;

// ----- Component ----- //

const styles = css`
    margin: ${remSpace[1]} 0 0 0;
    display: inline-block;
    width: ${figureWidth};

    + .halfWidth, + .halfWidth + .halfWidth + .halfWidth {
        margin-left: ${remSpace[2]};
    }

    + .halfWidth + .halfWidth  {
        margin-left: 0;
    }
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
    height: calc(${figureWidth} * ${height / width});
    width: 100%;
`;

const BodyImageHalfWidth: FC<Props> = ({ image }: Props) =>
    <figure css={styles} className="halfWidth">
        <Img
            image={image}
            sizes={size}
            className={imgStyles(image.width, image.height)}
        />
    </figure>;


// ----- Exports ----- //

export default BodyImageHalfWidth;
