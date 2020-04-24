// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { SerializedStyles, css } from '@emotion/core';
import { Format } from '@guardian/types/Format';
import { neutral } from '@guardian/src-foundations/palette';

import { darkModeCss } from 'styles';
import { getPillarStyles } from 'pillarStyles';


// ----- Component ----- //

interface Props {
    href: string;
    children?: ReactNode;
    format: Format;
    className?: SerializedStyles;
}

const styles = (colour: string): SerializedStyles => css`
    color: ${colour};
    text-decoration: none;
    border-bottom: 0.0625rem solid ${neutral[86]};

    ${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const Anchor: FC<Props> = ({ format, children, href, className }: Props) =>
    <a css={[styles(getPillarStyles(format.pillar).kicker), className]} href={href}>
        {children}
    </a>


// ----- Exports ----- //

export default Anchor;
