import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

type Props = {
    children: React.ReactNode;
}
const containerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    aside:not(:empty) + aside:not(:empty) {
        /* This css to show a vertical divider  will only be applied to the second
           non empty aside element. (We only want the border to show when both share
           and comment counts are displayed) */
        border-left: 1px solid ${border.secondary};
        margin-left: 4px;
        padding-left: 4px;
    }
`;

export const Counts = ({children}: Props) => (
    <div className={containerStyles}>
        {children}
    </div>
)
