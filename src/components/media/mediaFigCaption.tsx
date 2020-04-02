// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral, remSpace } from '@guardian/src-foundations';
import { darkModeCss } from "../../styles";

// ----- Component ----- //

interface Props {
    text: ReactNode;
}

const captionStyles = css`
    padding-top: ${remSpace[2]};

    text {
        ${textSans.xsmall()}
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
