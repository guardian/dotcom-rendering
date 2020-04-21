// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations';

import { darkModeCss } from 'styles';
import { Option } from 'types/option';


// ----- Component ----- //

interface Props {
    text: ReactNode;
    credit: Option<string>;
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

const MediaFigcaption: FC<Props> = ({ text, credit }: Props) =>
    <figcaption css={captionStyles}>
        {text} {credit.withDefault('')}
    </figcaption>;


// ----- Exports ----- //

export default MediaFigcaption;
