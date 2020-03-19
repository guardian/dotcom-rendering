// ----- Imports ----- //

import React, { FC, ReactElement, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';
import { Pillar, PillarStyles, getPillarStyles } from 'pillar';
import { remSpace } from '@guardian/src-foundations';
import { textPadding } from 'styles';

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
    ${textPadding}
    padding-top: ${remSpace[2]};
    color: ${text.supporting};
`;

const MediaFigCaption: FC<Props> = ({ pillar, text }) =>
    <figcaption css={captionStyles}>

        {text}
    </figcaption>


// ----- Exports ----- //

export default MediaFigCaption;