// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { remSpace, breakpoints } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';

import Img from 'components/img';
import { BodyImageProps } from 'image';
import { darkModeCss } from 'styles';

// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;


// ----- Component ----- //

const styles = css`
    margin: ${remSpace[4]} 0;
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
    height: calc(100vw * ${height / width});
    background: ${neutral[97]};
    display: block;
    width: 100%;
    object-fit: cover;

    ${from.phablet} {
        height: calc(620px * ${height / width});
    }

    ${darkModeCss`
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    `}
`;

const BodyImage: FC<BodyImageProps> = ({ image, children }: BodyImageProps) =>
    <figure css={styles}>
        <Img
            image={image}
            sizes={sizes}
            className={imgStyles(image.width, image.height)}
        />
        {children}
    </figure>


// ----- Exports ----- //

export default BodyImage;
