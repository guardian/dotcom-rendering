import React from 'react';
import { css, cx } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

type Props = {
	children: React.ReactNode;
	imagePosition?: ImagePositionType;
	alwaysVertical?: boolean;
};

const decideDirection = (imagePosition?: ImagePositionType) => {
	switch (imagePosition) {
		case 'top':
			return 'column';
		case 'left':
			return 'row';
		case 'right':
			return 'row-reverse';
		// If there's no image (so no imagePosition) default to top down
		default:
			return 'column';
	}
};

const layoutStyles = css`
	display: flex;
	width: 100%;
`;

const decidePosition = (
	imagePosition?: ImagePositionType,
	alwaysVertical?: boolean,
) => {
	const direction = decideDirection(imagePosition);
	if (alwaysVertical) {
		return css`
			flex-direction: ${direction};
		`;
	}
	return css`
		flex-direction: ${direction};
		/* Force horizontal view for mobile cards */
		${until.tablet} {
			flex-direction: row;
		}
	`;
};

export const CardLayout = ({
	children,
	imagePosition,
	alwaysVertical,
}: Props) => (
	<div
		className={cx(
			layoutStyles,
			decidePosition(imagePosition, alwaysVertical),
		)}
	>
		{children}
	</div>
);
