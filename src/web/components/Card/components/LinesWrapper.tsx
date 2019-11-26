import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
};

export const LinesWrapper = ({ children }: Props) => (
    <div
        className={css`
            /* Fill the container */
            flex-grow: 1;
            /* Push the lines down to align with the bottom of the card */
            margin-top: 5px;
        `}
    >
        {children}
    </div>
);
