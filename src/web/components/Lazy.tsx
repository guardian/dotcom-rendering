import React from 'react';
import { css } from 'emotion';

import isChromatic from 'storybook-chromatic/isChromatic';

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

    // Why do we check to see if we're irunning in Chromatic here?
    // Because we use this as a flag to know when a component is
    // being loaded as part of a Chromatic story or not so that
    // we can prevent lazy loading our storybook snapshots that we
    // use for visual regression
    const renderChildren = hasBeenSeen || isChromatic();

    return (
        <div ref={setRef} className={flexGrowStyles}>
            {renderChildren && <>{children}</>}
        </div>
    );
};
