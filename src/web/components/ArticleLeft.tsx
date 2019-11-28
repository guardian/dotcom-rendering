import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { from, between, until } from '@guardian/src-foundations/mq';

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

const positionRelative = css`
    position: relative;
`;

const partialRightBorder = (colour: string) => css`
    :before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        height: 30px;
        width: 1px;
        background: ${colour};
    }
`;

const rightBorder = (colour: string) => css`
    border-right: 1px solid ${colour};
`;

type Props = {
    children: JSXElements;
    showRightBorder?: boolean;
    borderColour?: string;
    showPartialRightBorder?: boolean;
};

export const ArticleLeft = ({
    children,
    showRightBorder = true,
    borderColour = palette.neutral[86],
    showPartialRightBorder = false,
}: Props) => (
    <section
        className={cx(
            positionRelative,
            leftWidth,
            showRightBorder && rightBorder(borderColour),
        )}
    >
        <div
            className={cx(
                showPartialRightBorder && partialRightBorder(borderColour),
            )}
        >
            {children}
        </div>
    </section>
);
