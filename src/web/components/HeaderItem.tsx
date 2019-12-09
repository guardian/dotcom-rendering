import React from 'react';
import { css, cx } from 'emotion';
import { from, until } from '@guardian/src-foundations/mq';

const maxWidth = css`
    ${from.desktop} {
        max-width: 620px;
    }
    ${until.phablet} {
        padding: 0 10px;
    }
`;

const setOrder = (order: number) => css`
    order: ${order};
`;

type Props = {
    children: JSXElements;
    order: number;
};

export const HeaderItem = ({ children, order }: Props) => (
    <div className={cx(maxWidth, setOrder(order))}>{children}</div>
);
