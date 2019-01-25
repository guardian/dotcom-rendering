import React from 'react';
import { css, cx } from 'emotion';

import { tablet, desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

const container = css`
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

export const Container: React.SFC<{
    className?: string;
    children: React.ReactNode;
}> = ({ className, children, ...props }) => (
    <div className={cx(container, className)} {...props}>
        {children}
    </div>
);
