import React from 'react';
import { css } from 'emotion';

import { body } from '@guardian/src-foundations/typography';

type Props = {
    children: ChildrenType;
};

export const StandfirstWrapper = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            ${body.small({
                fontWeight: 'light',
            })};
            line-height: 20px;

            padding-right: 5px;
            padding-bottom: 6px;
        `}
    >
        {children}
    </div>
);
