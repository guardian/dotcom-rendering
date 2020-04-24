// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { textSans, body } from '@guardian/src-foundations/typography';
import { text, neutral } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { Format, Design } from '@guardian/types/Format';

import { PillarStyles, getPillarStyles } from 'pillarStyles';
import { Option } from 'types/option';
import { darkModeCss } from 'styles';


// ----- Subcomponents ----- //

interface TriangleProps {
    format: Format;
}

const triangleStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    fill: ${kicker};
    height: 0.8em;
    padding-right: ${remSpace[1]};
`;

const Triangle: FC<TriangleProps> = ({ format }: TriangleProps) => {
    switch (format.design) {
        case Design.Media:
            return null;
        default:
            return (
                <svg
                    css={triangleStyles(getPillarStyles(format.pillar))}
                    viewBox="0 0 10 9"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points="0,9 5,0 10,9 0,9" />
                </svg>
            );
    }
}


// ----- Component ----- //

interface Props {
    format: Format;
    text: ReactNode;
    credit: Option<string>;
}

const styles = css`
    ${textSans.xsmall()}
    padding-top: ${remSpace[2]};
    color: ${text.supporting};
`;

const mediaStyles = css`
    ${body.small()}
    vertical-align: top;
    color: ${neutral[86]};
    
    ${darkModeCss`
        color: ${neutral[86]};
    `}
`;

const getStyles = (format: Format): SerializedStyles => {
    switch (format.design) {
        case Design.Media:
            return mediaStyles;
        default:
            return styles;
    }
}

const FigCaption: FC<Props> = ({ format, text, credit }: Props) =>
    <figcaption css={getStyles(format)}>
        <Triangle format={format} />
        {text} {credit.withDefault('')}
    </figcaption>;


// ----- Exports ----- //

export default FigCaption;
