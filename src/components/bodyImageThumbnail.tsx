// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/core';
import { breakpoints } from '@guardian/src-foundations';

import Image, { Props as ImageProps } from 'components/image';
import { Pillar } from 'pillar';


// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;


// ----- Component ----- //

interface Props {
    image: Omit<ImageProps, 'sizes'>;
    figcaption: ReactNode;
    pillar: Pillar;
}

const styles = css`
    display: block;
    margin: 1rem 0 0 0;
`;


const BodyImageThumbnail: FC<Props> = ({ image }: Props) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} thumbnail={true} />
    </figure>


// ----- Exports ----- //

export default BodyImageThumbnail;
