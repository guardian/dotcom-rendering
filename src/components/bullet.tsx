// ----- Imports ----- //

import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { Format } from '@guardian/types/Format';
import { body } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';

import { darkModeCss } from 'styles';
import { getPillarStyles } from 'pillarStyles';


// ----- Component ----- //

interface Props {
    format: Format;
    text: string;
}

const styles = css`
    ${body.medium({ lineHeight: 'loose' })}
    display: inline;
    overflow-wrap: break-word;
    margin: 0 0 ${remSpace[ 3 ]};
`;

const bulletStyles = (format: Format): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);

    return css`
        color: transparent;
        display: inline-block;

        &::before {
            content: '';
            background-color: ${kicker};
            width: 1rem;
            height: 1rem;
            border-radius: .5rem;
            display: inline-block;
            vertical-align: middle;
            ${darkModeCss`
                background-color: ${inverted};
            `}
        }
    `;
};

const Bullet: FC<Props> = ({ format, text }) =>
    <p css={styles}>
        <span css={bulletStyles(format)}>•</span>
        {text.replace(/•/g, '')}
    </p>


// ----- Exports ----- //

export default Bullet;
