// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { Format } from '@guardian/types/Format';
import { icons, darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';
import { neutral } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';


// ----- Component ----- //

interface Props {
    children?: ReactNode;
    format: Format;
}

const styles = (format: Format): SerializedStyles => css`
    font-style: italic;
    position: relative;
    margin: ${remSpace[4]} 0 ${remSpace[9]} 0;
    padding: 0 ${remSpace[6]};

    &::before {
        ${icons}
        font-style: normal;
        font-size: 2.5rem;
        content: '\\e11c';
        color: ${getThemeStyles(format.theme).kicker};
    }

    ${darkModeCss`
        &::before {
            color: ${neutral[86]};
        }
    `}
`;



const Blockquote: FC<Props> = ({ children, format }: Props) =>
    <blockquote css={styles(format)}>
        {children}
    </blockquote>


// ----- Exports ----- //

export default Blockquote;
