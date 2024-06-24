import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import type { DCRContainerType } from '../../../types/front';
import type { ImagePositionType } from './ImageWrapper';

const padding = 20;

type Props = {
	children: React.ReactNode;
	cardBackgroundColour: string;
	imageType: CardImageType | undefined;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
	containerType?: DCRContainerType;
	isOnwardContent?: boolean;
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
	imagePositionOnDesktop: ImagePositionType,
	imagePositionOnMobile: ImagePositionType,
	imageType?: CardImageType,
) => {
	if (imageType === 'avatar') {
		switch (imagePositionOnDesktop) {
			case 'left':
			case 'right': {
				return css`
					gap: ${space[2]}px;
					flex-direction: row-reverse;
					${from.tablet} {
						flex-direction: row-reverse;
					}
				`;
			}
			default: {
				return css`
					gap: ${space[2]}px;
					flex-direction: row-reverse;
					${from.tablet} {
						flex-direction: column-reverse;
					}
				`;
			}
		}
	}
	return css`
		gap: ${space[2]}px;
		flex-direction: ${decideDirection(imagePositionOnMobile)};
		${from.tablet} {
			flex-direction: ${decideDirection(imagePositionOnDesktop)};
		}
	`;
};

export const CardLayout = ({
	children,
	cardBackgroundColour,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	minWidthInPixels,
	imageType,
	containerType,
	isOnwardContent,
}: Props) => (
	<div
		css={[
			css`
				display: flex;
				flex-basis: 100%;
			`,
			containerType === 'fixed/video'
				? videoWidth
				: minWidth(minWidthInPixels),
			decidePosition(
				imagePositionOnDesktop,
				imagePositionOnMobile,
				imageType,
			),
			isOnwardContent &&
				css`
					gap: 0;
				`,
		]}
		style={{ backgroundColor: cardBackgroundColour }}
	>
		{children}
	</div>
);
