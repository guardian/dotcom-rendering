import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSX.Element | JSX.Element[];
    topBarColour: string;
};

export const CardWrapper = ({ children, topBarColour }: Props) => (
    <div
        className={css`
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 8px;

            /* Styling for top bar */
            :before {
                background-color: ${topBarColour};
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                z-index: 2;
            }
        `}
    >
        {children}
    </div>
);
