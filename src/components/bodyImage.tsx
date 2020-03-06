// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { between, from } from '@guardian/src-foundations/mq';
import { remSpace, breakpoints } from '@guardian/src-foundations';

import Image, { Props as ImageProps } from 'components/image';
import { textPadding } from 'styles';
import { Pillar, PillarStyles, getPillarStyles } from 'pillar';


// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;


// ----- Component ----- //

interface Props {
    image: Omit<ImageProps, 'sizes'>;
    figcaption: ReactNode;
    pillar: Pillar;
}

const styles = css`
    margin: 1rem 0 ${remSpace[3]};

    ${from.wide} {
        margin-bottom: 1rem;
    }

    img {
        display: block;
        width: 100%;

        ${between.phablet.and.wide} {
            margin: 0 ${remSpace[2]};
        }
    }
`;

const triangleStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    fill: ${kicker};
    height: 0.8em;
    padding-right: ${remSpace[1]};
`;

const captionStyles = css`
    ${textSans.xsmall()}
    ${textPadding}
    padding-top: ${remSpace[2]};
    color: ${text.supporting};
`;

const BodyImage: FC<Props> = ({ figcaption, image, pillar }) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} />
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

export default BodyImage;
