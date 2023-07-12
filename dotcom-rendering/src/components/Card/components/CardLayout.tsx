import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';
import type { ImagePositionType } from './ImageWrapper';

type Props = {
	children: React.ReactNode;
	imageType: CardImageType | undefined;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
	minWidthInPixelsOnMobile?: number;
};

const decideDirection = (imagePosition: ImagePositionType) => {
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
		case 'none':
			return 'column';
	}
};

const decideWidth = (
	minWidthInPixels?: number,
	minWidthInPixelsOnMobile?: number,
) => {
	if (
		minWidthInPixels !== undefined &&
		minWidthInPixels > 0 &&
		minWidthInPixelsOnMobile !== undefined &&
		minWidthInPixelsOnMobile > 0
	) {
		return css`
			min-width: ${minWidthInPixels}px;
			${until.tablet} {
				min-width: ${minWidthInPixelsOnMobile}px;
			}
		`;
	}

	if (minWidthInPixels !== undefined && minWidthInPixels > 0) {
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
	if (imageType === 'avatar') {
		switch (imagePosition) {
			case 'left':
			case 'right': {
				return css`
					flex-direction: row-reverse;
					${until.tablet} {
						flex-direction: row-reverse;
					}
				`;
			}
			default: {
				return css`
					flex-direction: column-reverse;
					${until.tablet} {
						flex-direction: row-reverse;
					}
				`;
			}
		}
	}
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
	imageType,
	minWidthInPixelsOnMobile,
}: Props) => (
	<div
		css={[
			css`
				display: flex;
				flex-basis: 100%;
			`,
			decideWidth(minWidthInPixels, minWidthInPixelsOnMobile),
			decidePosition(imagePosition, imagePositionOnMobile, imageType),
		]}
	>
		{children}
	</div>
);
