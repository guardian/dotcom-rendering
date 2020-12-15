import React from 'react';
import { css, cx } from 'emotion';
import { from, until } from '@guardian/src-foundations/mq';

const hideBelowDesktop = css`
    ${until.desktop} {
        /* below 980 */
        display: none;
    }

    ${from.desktop} {
        /* above 980 */
        height: 100%;
        display: block;
        flex-basis: 300px;
        flex-grow: 0;
        flex-shrink: 0;
        margin-left: 20px;
        margin-right: -20px;
    }

    ${from.leftCol} {
        /* above 1140 */
        margin-left: 0px;
        margin-right: 0px;
    }
`;

type Props = {
    children: JSXElements;
    padding?: boolean;
};

export const RightColumn = ({ children }: Props) => {
    return <section className={cx(hideBelowDesktop)}>{children}</section>;
};
