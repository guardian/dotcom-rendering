// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { remSpace, breakpoints } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { map, Option, withDefault } from '@guardian/types/option';
import Img from 'components/img';
import { BodyImageProps, Role } from 'image';
import { darkModeCss } from 'styles';
import { pipe2 } from 'lib';

// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;


// ----- Component ----- //

const styles = (role: Option<Role>) => {
    const margin = pipe2(
        role,
        map(role => role === Role.Card ? '0' : remSpace[4]),
        withDefault(remSpace[4])
    )

    return css`
        margin: ${margin} 0;
    `;
}

const imgStyles = (width: number, height: number): SerializedStyles => css`
    height: calc(100vw * ${height / width});
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

const BodyImage: FC<BodyImageProps> = ({ image, children, format }: BodyImageProps) =>
    <figure css={styles(image.role)}>
        <Img
            image={image}
            sizes={sizes}
            className={imgStyles(image.width, image.height)}
            format={format}
        />
        {children}
    </figure>


// ----- Exports ----- //

export default BodyImage;
