// ----- Imports ----- //

import React from 'react';
import { css } from '@emotion/core';
import { neutral, background } from '@guardian/src-foundations/palette';

import { basePx, darkModeCss } from 'styles';
import { headline } from '@guardian/src-foundations/typography';


// ----- Styles ----- //

const Styles = css`
    padding: ${basePx(.5, 1, 3, 1)};
    background: ${neutral[7]};
    position: relative;
    margin-top: -78px;

    h1 {
        ${headline.medium({ fontWeight: 'bold' })}
        margin: 0;
        color: ${neutral[100]};
    }
`;

const DarkStyles = darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};
`;


// ----- Component ----- //

interface Props {
    headline: string;
}

const Headline = ({ headline }: Props): JSX.Element =>
    <div css={[Styles, DarkStyles]}>
        <h1>{headline}</h1>
    </div>


// ----- Exports ----- //

export default Headline;
