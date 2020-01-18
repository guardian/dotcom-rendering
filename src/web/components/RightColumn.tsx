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
    }
`;

const hideForIE = css`
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        display: none;
    }
`;

const padding = css`
    padding-top: 6px;
`;

type Props = {
    children: JSXElements;
};

export const RightColumn = ({ children }: Props) => {
    return (
        <section className={cx(hideBelowDesktop, hideForIE, padding)}>
            {children}
        </section>
    );
};
