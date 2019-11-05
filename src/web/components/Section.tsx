import React from 'react';
import { css, cx } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-utilities';

const center = css`
    position: relative;
    margin: auto;

    ${from.tablet} {
        max-width: 740px;
    }

    ${from.desktop} {
        max-width: 980px;
    }

    ${from.leftCol} {
        max-width: 1140px;
    }

    ${from.wide} {
        max-width: 1300px;
    }
`;

const padding = css`
    padding: 0 10px;

    ${from.mobileLandscape} {
        padding: 0 20px;
    }
`;

const sideBorders = (colour: string) => css`
    ${from.tablet} {
        border-left: 1px solid ${colour};
        border-right: 1px solid ${colour};
    }
`;

const topBorder = (colour: string) => css`
    border-top: 1px solid ${colour};
`;

const setBackgroundColour = (colour: string) => css`
    background-color: ${colour};
`;

type Props = {
    showSideBorders?: boolean;
    showTopBorder?: boolean;
    padded?: boolean;
    backgroundColour?: string;
    borderColour?: string;
    shouldCenter?: boolean;
    children: React.ReactNode;
};

export const Section = ({
    showSideBorders = true,
    showTopBorder = true,
    padded = true,
    borderColour = palette.neutral[86],
    backgroundColour,
    shouldCenter = true,
    children,
}: Props) => (
    <section
        className={cx(
            backgroundColour && setBackgroundColour(backgroundColour),
        )}
    >
        <div
            className={cx(
                shouldCenter && center,
                showSideBorders && sideBorders(borderColour),
                showTopBorder && topBorder(borderColour),
                padded && padding,
            )}
        >
            {children}
        </div>
    </section>
);
