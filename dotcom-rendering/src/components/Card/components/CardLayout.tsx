import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';
import { DCRContainerType } from '../../../types/front';
import type { ImagePositionType } from './ImageWrapper';

type Props = {
	children: React.ReactNode;
	imageType: CardImageType | undefined;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
	containerType?: DCRContainerType;
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
	containerType?: DCRContainerType,
) => {
	const padding = 20;
	switch (containerType) {
		case 'fixed/video':
			return css`
				min-width: 300px;
				max-width: 600px;
				width: calc(
					80vw - ${padding}px
				); // Show 1 full card and min 20vw of second card
				overflow: hidden;

				${until.mobileLandscape} {
					width: calc(
						100vw - ${padding}px
					); // Show 1 card on small screens
				}
			`;

		default:
			if (minWidthInPixels !== undefined && minWidthInPixels > 0) {
				return css`
					min-width: ${minWidthInPixels}px;
				`;
			}
			return css`
				width: 100%;
			`;
	}
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
	containerType,
}: Props) => (
	<div
		css={[
			css`
				display: flex;
				flex-basis: 100%;
			`,
			decideWidth(minWidthInPixels, containerType),
			decidePosition(imagePosition, imagePositionOnMobile, imageType),
		]}
	>
		{children}
	</div>
);
