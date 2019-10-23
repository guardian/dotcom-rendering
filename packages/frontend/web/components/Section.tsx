import React from 'react';
import { css, cx } from 'emotion';

import {
    tablet,
    desktop,
    leftCol,
    wide,
    palette,
    mobileLandscape,
} from '@guardian/src-foundations';

const center = css`
    position: relative;
    margin: auto;

    ${tablet} {
        max-width: 740px;
    }

    ${desktop} {
        max-width: 980px;
    }

    ${leftCol} {
        max-width: 1140px;
    }

    ${wide} {
        max-width: 1300px;
    }
`;

const padding = css`
    padding: 0 10px;

    ${mobileLandscape} {
        padding: 0 20px;
    }
`;

const sideBorders = (colour: string) => css`
    ${tablet} {
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
    children: React.ReactNode;
};

export const Section = ({
    showSideBorders = true,
    showTopBorder = true,
    padded = true,
    borderColour = palette.neutral[86],
    backgroundColour,
    children,
}: Props) => (
    <section
        className={cx(
            backgroundColour && setBackgroundColour(backgroundColour),
        )}
    >
        <div
            className={cx(
                center,
                showSideBorders && sideBorders(borderColour),
                showTopBorder && topBorder(borderColour),
                padded && padding,
            )}
        >
            {children}
        </div>
    </section>
);
