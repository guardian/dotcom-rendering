// ----- Imports ----- //

import React, { FC, ReactNode, Children } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { remSpace, breakpoints } from '@guardian/src-foundations';

import Image, { Props as ImageProps } from 'components/image';
import { Pillar, PillarStyles, getPillarStyles } from 'pillar';


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

const BodyImage: FC<Props> = ({ image }: Props) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} />
        {children}
    </figure>


// ----- Exports ----- //

export default BodyImage;
