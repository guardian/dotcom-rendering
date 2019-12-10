import React from 'react';
import { css } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

type Props = {
    children: JSXElements;
};

const containerStyles = css`
    display: flex;
    flex-direction: row-reverse;

    ${until.tablet} {
        display: none;
    }

    margin-right: 10px;
    margin-top: 50px;
`;

const sizingStyles = css`
    height: 132px;
    width: 132px;
`;

export const AvatarContainer = ({ children }: Props) => {
    return (
        <div className={containerStyles}>
            <div className={sizingStyles}>{children}</div>
        </div>
    );
};
