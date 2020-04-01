// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import Image, { Props as ImageProps } from 'components/image';
import { Pillar, PillarStyles, getPillarStyles } from 'pillar';
import { remSpace, text } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

// ----- Setup ----- //

const sizes = `(min-width: 140px)`;


// ----- Component ----- //

interface Props {
    image: Omit<ImageProps, 'sizes'>;
    figcaption: ReactNode;
    pillar: Pillar;
}

const styles = css`
    display: block;
    float: left;
    clear: left;
    width: 8.75rem;
    margin: 0 ${remSpace[3]} 0 0;

    ${from.wide} {
        margin-left: calc(-8.75rem - ${remSpace[3]} - ${remSpace[2]});
        margin-right: 0;
        padding: 0;
    }
`;

const triangleStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    fill: ${kicker};
    height: 0.8em;
    padding-right: ${remSpace[1]};
`;

const captionStyles = css`
    ${textSans.xsmall()}
    padding-top: ${remSpace[2]};
    color: ${text.supporting};
`;

const BodyImageThumbnail: FC<Props> = ({ image, figcaption, pillar }: Props) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} thumbnail={true} />
        <figcaption css={captionStyles}>
            <svg
                css={triangleStyles(getPillarStyles(pillar))}
                viewBox="0 0 10 9"
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon points="0,9 5,0 10,9 0,9" />
            </svg>
            {figcaption}
        </figcaption>
    </figure>


// ----- Exports ----- //

export default BodyImageThumbnail;
