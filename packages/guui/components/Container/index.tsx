import React from 'react';
import { css, cx } from 'react-emotion';

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

const Container = ({
    className,
    children,
    ...props
}: {
    className?: string,
    children: React.ReactNode,
}) => (
    <div className={cx(container, className)} {...props}>
        {children}
    </div>
);

export default Container;
