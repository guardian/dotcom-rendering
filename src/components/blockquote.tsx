// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { Format } from '@guardian/types/Format';
import { icons, darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';
import { neutral } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { SvgQuote } from '@guardian/src-icons';
import { getThemeStyles } from 'pillarStyles';


// ----- Component ----- //

interface Props {
    children?: ReactNode;
    format: Format;
}

const styles = (format: Format): SerializedStyles => {
    const { kicker } = getThemeStyles(format.pillar);
    return css`
        font-style: italic;
        position: relative;
        margin: ${remSpace[4]} 0 ${remSpace[9]} 0;
        padding: 0 ${remSpace[6]};
        svg {
                height: 62.4px;
                margin-left: -9.2625px;
                margin-bottom: -12px;
                margin-top: 4.4px;
                fill: ${kicker};
            }

        ${darkModeCss`
            svg {
                fill: ${neutral[86]};
            }
        `}
    `;
}

const Blockquote: FC<Props> = ({ children, format }: Props) =>
    <blockquote css={styles(format)}>
        <SvgQuote/>
        {children}
    </blockquote>


// ----- Exports ----- //

export default Blockquote;
