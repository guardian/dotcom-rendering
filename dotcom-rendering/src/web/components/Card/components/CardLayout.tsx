import { css } from '@emotion/react';

import { until } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
};

const decideDirection = (imagePosition?: ImagePositionType) => {
	switch (imagePosition) {
		case 'top':
			return 'column';
		case 'bottom':
			return 'column-reverse';
		case 'left':
			return 'row';
		case 'right':
			return 'row-reverse';
		// If there's no image (so no imagePosition) default to top down
		default:
			return 'column';
	}
};

const decideWidth = (minWidthInPixels?: number) => {
	if (minWidthInPixels) {
		return css`
			min-width: ${minWidthInPixels}px;
		`;
	}
	return css`
		width: 100%;
	`;
};

const decidePosition = (
	imagePosition: ImagePositionType,
	imagePositionOnMobile: ImagePositionType,
) => {
	return css`
		flex-direction: ${decideDirection(imagePosition)};
		${until.tablet} {
			flex-direction: ${decideDirection(imagePositionOnMobile)};
		}
	`;
};

export const CardLayout = ({
	children,
	imagePosition,
	imagePositionOnMobile,
	minWidthInPixels,
}: Props) => (
	<div
		css={[
			css`
				display: flex;
			`,
			decideWidth(minWidthInPixels),
			decidePosition(imagePosition, imagePositionOnMobile),
		]}
	>
		{children}
	</div>
);
