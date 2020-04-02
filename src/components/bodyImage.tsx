// ----- Imports ----- //

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import { remSpace, breakpoints } from '@guardian/src-foundations';

import Image, { Props as ImageProps } from 'components/image';


// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;


// ----- Component ----- //

interface Props {
    image: Omit<ImageProps, 'sizes'>;
}

const styles = css`
    margin: 1rem 0 ${remSpace[3]};

    ${from.wide} {
        margin-bottom: 1rem;
    }

    img {
        display: block;
        width: 100%;
    }
`;

const BodyImage: FC<Props> = ({ image, children }: Props) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} />
        {children}
    </figure>


// ----- Exports ----- //

export default BodyImage;
