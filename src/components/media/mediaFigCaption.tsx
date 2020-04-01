// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/core';
import { textSans, titlepiece, headline, body } from '@guardian/src-foundations/typography';
import { text } from '@guardian/src-foundations/palette';
import { Pillar } from 'pillar';
import { remSpace } from '@guardian/src-foundations';

// ----- Component ----- //

interface Props {
    pillar: Pillar;
    text: ReactNode;
}

const captionStyles = css`
    padding-top: ${remSpace[2]};

    strong {
        ${body.medium()}
        font-weight: 400;
    }

    em {
        ${textSans.xsmall()}
        vertical-align: top;
    }
    
    em br {
        display: none;
    }
`;

const MediaFigCaption: FC<Props> = ({ text }) =>
    <figcaption css={captionStyles}>
        {text}
    </figcaption>


// ----- Exports ----- //

export default MediaFigCaption;