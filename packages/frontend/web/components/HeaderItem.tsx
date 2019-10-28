import React from 'react';
import { css, cx } from 'emotion';
import { until } from '@guardian/src-utilities';

const maxWidth = css`
    max-width: 630px;
    ${until.phablet} {
        padding: 0 10px;
    }
`;

const setOrder = (order: number) => css`
    order: ${order};
`;

type Props = {
    children: JSX.Element | JSX.Element[];
    order: number;
};

export const HeaderItem = ({ children, order }: Props) => (
    <div className={cx(maxWidth, setOrder(order))}>{children}</div>
);
