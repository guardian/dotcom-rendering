// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';
import { Pillar, PillarStyles, getPillarStyles } from 'pillar';
import { remSpace } from '@guardian/src-foundations';

// ----- Component ----- //

interface Props {
    pillar: Pillar;
    text: ReactNode;
}

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

const FigCaption: FC<Props> = ({ pillar, text }) =>
    <figcaption css={captionStyles}>
        <svg
            css={triangleStyles(getPillarStyles(pillar))}
            viewBox="0 0 10 9"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points="0,9 5,0 10,9 0,9" />
        </svg>
        {text}
    </figcaption>;


// ----- Exports ----- //

export default FigCaption;
