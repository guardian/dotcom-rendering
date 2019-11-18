import React from 'react';
import { css, cx } from 'emotion';
import { until } from '@guardian/src-foundations/mq';

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
    children: ChildrenType;
    order: number;
};

export const HeaderItem = ({ children, order }: Props) => (
    <div className={cx(maxWidth, setOrder(order))}>{children}</div>
);
