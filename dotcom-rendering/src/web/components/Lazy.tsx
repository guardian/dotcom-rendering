import { css } from '@emotion/react';

import { useHasBeenSeen } from '@root/src/web/lib/useHasBeenSeen';

type Props = {
	children: JSX.Element;
	margin: number;
	disableFlexStyles?: boolean;
};

// Ensure the ref wrapper expands. This is used for componenents like
// MostViewedRightWrapper that needs to check it's parent's height
const flexGrowStyles = css`
	display: flex;
	flex-grow: 1;
`;

export const Lazy = ({ children, margin, disableFlexStyles }: Props) => {
	const [hasBeenSeen, setRef] = useHasBeenSeen({
		rootMargin: `${margin}px`,
	});

	// Without this check below typescript complains because it thinks
	// setRef could be false.
	if (typeof setRef !== 'function') {
		return null;
	}

	// Why do we check to see if we're disabled here? Because we
	// use this as a flag to know when a component is
	// being loaded as part of a Chromatic story or not so that
	// we can prevent lazy loading our storybook snapshots that we
	// use for visual regression
	const renderChildren = hasBeenSeen || Lazy.disabled;
	return (
		<div ref={setRef} css={!disableFlexStyles && flexGrowStyles}>
			{renderChildren && <>{children}</>}
		</div>
	);
};

Lazy.disabled = false;
