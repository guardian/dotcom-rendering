import React from 'react';
import { css } from 'emotion';

type Props = {
    children: ChildrenType;
    percentage?: CardPercentageType;
};

export const LI = ({ children, percentage }: Props) => {
    return (
        <li
            className={css`
                display: flex;
                ${percentage
                    ? `flex-basis: ${percentage && percentage};`
                    : `flex: 1;`}
            `}
        >
            {children}
        </li>
    );
};
