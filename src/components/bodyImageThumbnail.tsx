// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import Img from 'components/img';
import { BodyImageProps as Props } from 'image';

// ----- Setup ----- //

const size = '8.75rem';


// ----- Component ----- //

const styles = css`
    display: block;
    float: left;
    clear: left;
    width: ${size};
    margin: 0 ${remSpace[3]} 0 0;

    ${from.wide} {
        margin-left: calc(-${size} - ${remSpace[3]} - ${remSpace[2]});
        margin-right: 0;
        padding: 0;
    }
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
    height: calc(${size} * ${height / width});
`;

const BodyImageThumbnail: FC<Props> = ({ image, children }: Props) =>
    <figure css={styles}>
        <Img
            image={image}
            sizes={size}
            className={imgStyles(image.width, image.height)}
        />
        {children}
    </figure>;


// ----- Exports ----- //

export default BodyImageThumbnail;
