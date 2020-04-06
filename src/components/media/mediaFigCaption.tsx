// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
    text: ReactNode;
}

const captionStyles = css`
    text {
        ${body.small()}
        vertical-align: top;
        color: ${neutral[86]};
    }
    
    ${darkModeCss`
        body {
            color: ${neutral[86]};
        }
    `}
`;

const MediaFigcaption: FC<Props> = ({ text }: Props) =>
    <figcaption css={captionStyles}>
        {text}
    </figcaption>;


// ----- Exports ----- //

export default MediaFigcaption;
