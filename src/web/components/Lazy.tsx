import React from 'react';
import { css } from 'emotion';

import { useHasBeenSeen } from '@root/src/web/lib/useHasBeenSeen';

type Props = {
    children: JSX.Element;
    margin: number;
};

// Ensure the ref wrapper expands. This is used for componenents like
// MostViewedRightWrapper that needs to check it's parent's height
const flexGrowStyles = css`
    display: flex;
    flex-grow: 1;
`;

export const Lazy = ({ children, margin }: Props) => {
    const [hasBeenSeen, setRef] = useHasBeenSeen({
        rootMargin: `${margin}px`,
    });

    if (typeof setRef !== 'function') {
        return null;
    }

    return (
        <div ref={setRef} className={flexGrowStyles}>
            {hasBeenSeen && <>{children}</>}
        </div>
    );
};
