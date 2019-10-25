import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { from, between, until } from '@guardian/src-utilities';

const leftWidth = css`
    padding-right: 10px;
    ${until.leftCol} {
        /* below 1140 */
        display: none;
    }

    ${between.leftCol.and.wide} {
        /* above 1140, below 1300 */
        flex-basis: 151px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    ${from.wide} {
        /* above 1300 */
        flex-basis: 230px;
        flex-grow: 0;
        flex-shrink: 0;
    }
`;

const rightBorder = (colour: string) => css`
    border-right: 1px solid ${colour};
`;

type Props = {
    children: JSX.Element | JSX.Element[];
    showRightBorder?: boolean;
    borderColour?: string;
};

export const ArticleLeft = ({
    children,
    showRightBorder = true,
    borderColour = palette.neutral[86],
}: Props) => (
    <section
        className={cx(leftWidth, showRightBorder && rightBorder(borderColour))}
    >
        {children}
    </section>
);
