import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?:
        | 'space-between'
        | 'flex-end'
        | 'flex-start'
        | 'space-around'
        | 'center';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    basis?: string;
};

export const Flex = ({
    children,
    direction = 'row',
    justify = 'space-between',
    wrap = 'nowrap',
    basis = 'auto',
}: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: ${direction};
            justify-content: ${justify};
            flex-wrap: ${wrap};
            flex-basis: ${basis};
        `}
    >
        {children}
    </div>
);
