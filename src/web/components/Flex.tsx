import React from 'react';
import { css } from 'emotion';

type Props = {
    children: JSXElements;
    direction?: 'row' | 'column';
    justify?: 'space-between'; // Extend as required
};

export const Flex = ({
    children,
    direction = 'row',
    justify = 'space-between',
}: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: ${direction};
            justify-content: ${justify};

            /* Fixes IE 10/11 bug that collapses this container by default: */
            /* eslint-disable property-no-vendor-prefix */
            -ms-flex-positive: 1;
            /* eslint-enable property-no-vendor-prefix */
        `}
    >
        {children}
    </div>
);
