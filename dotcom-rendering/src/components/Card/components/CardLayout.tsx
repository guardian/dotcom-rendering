import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import type { DCRContainerType } from '../../../types/front';
import type { ImagePositionType } from './ImageWrapper';

const padding = 20;

export type GapSize = 'none' | 'small' | 'medium' | 'large';

type Props = {
	children: React.ReactNode;
	cardBackgroundColour: string;
	imageType: CardImageType | undefined;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
	containerType?: DCRContainerType;
	gapSize?: GapSize;
};

const containerStyles = css`
	display: flex;
	flex-basis: 100%;
`;

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

// Until mobile landscape, show 1 card on small screens
// Above mobile landscape, show 1 full card and min 20vw of second card
const videoWidth = css`
	min-width: 300px;
	max-width: 600px;
	width: calc(80vw - ${padding}px);
	overflow: hidden;

	${until.mobileLandscape} {
		width: calc(100vw - ${padding}px);
	}
`;

const minWidth = (minWidthInPixels?: number) => {
	if (!isUndefined(minWidthInPixels) && minWidthInPixels > 0) {
		return css`
			min-width: ${minWidthInPixels}px;
		`;
	}
	return css`
		width: 100%;
	`;
};

const decidePosition = (
	imagePositionOnDesktop: ImagePositionType,
	imagePositionOnMobile: ImagePositionType,
	imageType?: CardImageType,
) => {
	if (imageType === 'avatar') {
		switch (imagePositionOnDesktop) {
			case 'left':
			case 'right': {
				return css`
					flex-direction: row-reverse;
					${from.tablet} {
						flex-direction: row-reverse;
					}
				`;
			}
			default: {
				return css`
					flex-direction: row-reverse;
					${from.tablet} {
						flex-direction: column-reverse;
					}
				`;
			}
		}
	}
	return css`
		flex-direction: ${decideDirection(imagePositionOnMobile)};
		${from.tablet} {
			flex-direction: ${decideDirection(imagePositionOnDesktop)};
		}
	`;
};

/** Detemines the gap size between components in card layout */
const decideGap = (gapSize: GapSize) => {
	switch (gapSize) {
		case 'none':
			return `0`;
		case 'small':
			return `${space[1]}px`;
		case 'medium':
			return ` ${space[2]}px;`;
		case 'large':
			return `${space[5]}px;`;
	}
};

export const CardLayout = ({
	children,
	cardBackgroundColour,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	minWidthInPixels,
	imageType,
	containerType,
	gapSize = 'medium',
}: Props) => (
	<div
		css={[
			containerStyles,
			containerType === 'fixed/video'
				? videoWidth
				: minWidth(minWidthInPixels),
			decidePosition(
				imagePositionOnDesktop,
				imagePositionOnMobile,
				imageType,
			),
		]}
		style={{
			backgroundColor: cardBackgroundColour,
			gap: decideGap(gapSize),
		}}
	>
		{children}
	</div>
);
