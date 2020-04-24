// ----- Imports ----- //

import React, { ReactNode } from 'react';
import { css } from '@emotion/core';

// ----- Styles ----- //

const Styles = css`

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

    .meta__extras {
        display: none;
    }
`;

// ----- Component ----- //

interface Props {
    children: ReactNode[];
}

const Interactive = ({ children }: Props): JSX.Element =>
    <main css={Styles}>
        <article>
            {children}
        </article>
    </main>


// ----- Exports ----- //

export default Interactive;
