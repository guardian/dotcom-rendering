import React from 'react';
import { css } from 'emotion';
import { from, wide, until } from '@guardian/src-foundations';

const leftWidth = css`
    ${until.leftCol} {
        /* below 1140 */
        display: none;
    }

    ${from.leftCol.until.wide} {
        /* above 1140, below 1300 */
        flex-basis: 151px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    ${wide} {
        /* above 1300 */
        flex-basis: 230px;
        flex-grow: 0;
        flex-shrink: 0;
    }
`;

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const ArticleLeft = ({ children }: Props) => (
    <section className={leftWidth}>{children}</section>
);
