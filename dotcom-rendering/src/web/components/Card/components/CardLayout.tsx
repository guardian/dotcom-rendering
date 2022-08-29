import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
	imageType?: CardImageType;
};

const decideDirection = (
	imagePosition?: ImagePositionType,
	imageType?: CardImageType,
) => {
	if (imageType === 'avatar') {
		switch (imagePosition) {
			case 'left':
			case 'right':
				return 'row-reverse';
			case 'top':
			case 'bottom':
			default:
				return 'column-reverse';
		}
	}
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
	imageType?: CardImageType,
) => {
	return css`
		flex-direction: ${decideDirection(imagePosition, imageType)};
		${until.tablet} {
			flex-direction: ${decideDirection(
				imagePositionOnMobile,
				imageType,
			)};
		}
	`;
};

export const CardLayout = ({
	children,
	imagePosition,
	imagePositionOnMobile,
	minWidthInPixels,
	imageType,
}: Props) => (
	<div
		css={[
			css`
				display: flex;
				flex-basis: 100%;
			`,
			decideWidth(minWidthInPixels),
			decidePosition(imagePosition, imagePositionOnMobile, imageType),
		]}
	>
		{children}
	</div>
);
