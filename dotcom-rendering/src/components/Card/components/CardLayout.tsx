import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import type { DCRContainerType } from '../../../types/front';
import type { CardImageType } from '../../../types/layout';
import type { ImagePositionType } from './ImageWrapper';

const padding = 20;

export type GapSize = 'none' | 'tiny' | 'small' | 'medium' | 'large';

export type GapSizes = { row: GapSize; column: GapSize };

type Props = {
	children: React.ReactNode;
	cardBackgroundColour: string;
	imageType: CardImageType | undefined;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
	containerType?: DCRContainerType;
	gapSizes?: GapSizes;
	isBetaContainer: boolean;
};

const containerStyles = css`
	display: flex;
	flex-basis: 100%;
`;

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

/**
 * Cards with an avatar are a special case as these are rendered horizontally
 * on mobile and vertically on desktop by default, with the avatar on the right
 * or bottom of the card respectively.
 *
 * A boosted card in a `dynamic/slow` container is an exception to this as it is
 * rendered horizontally on desktop by overriding `imagePositionOnDesktop`
 *
 * `scrollable/medium` is another exception as the medium cards require a
 * vertical layout at all breakpoints so we explicitly check that the image
 * position for desktop and mobile are both set to `bottom` to avoid affecting
 * existing layouts where the default position values are relied upon.
 */
const decideDirection = (
	imagePositionOnMobile: ImagePositionType,
	imagePositionOnDesktop: ImagePositionType,
	isBetaContainer: boolean,
	hasAvatar?: boolean,
) => {
	const imagePosition = {
		top: 'column',
		bottom: 'column-reverse',
		left: 'row',
		right: 'row-reverse',
		none: 'column',
	};
	if (hasAvatar) {
		if (
			imagePositionOnMobile === 'bottom' &&
			imagePositionOnDesktop === 'bottom'
		) {
			return {
				mobile: imagePosition['bottom'],
				desktop: imagePosition['bottom'],
			};
		}

		if (
			imagePositionOnDesktop === 'left' ||
			imagePositionOnDesktop === 'right'
		) {
			if (isBetaContainer && imagePositionOnMobile === 'bottom') {
				return {
					mobile: imagePosition['bottom'],
					desktop: imagePosition['right'],
				};
			}
			return {
				mobile: imagePosition['right'],
				desktop: imagePosition['right'],
			};
		}

		// Default case for avatar: Mobile right, Desktop bottom
		return {
			mobile: imagePosition['right'],
			desktop: imagePosition['bottom'],
		};
	}

	// Handle cases without an avatar
	return {
		mobile: imagePosition[imagePositionOnMobile],
		desktop: imagePosition[imagePositionOnDesktop],
	};
};

const decidePosition = (
	imagePositionOnMobile: ImagePositionType,
	imagePositionOnDesktop: ImagePositionType,
	isFairgroundContainer: boolean,
	hasAvatar?: boolean,
) => {
	const { mobile, desktop } = decideDirection(
		imagePositionOnMobile,
		imagePositionOnDesktop,
		isFairgroundContainer,
		hasAvatar,
	);

	return css`
		flex-direction: ${mobile};
		${from.tablet} {
			flex-direction: ${desktop};
		}
	`;
};

/** Detemines the gap size between components in card layout */
const decideGap = (gapSize: GapSize) => {
	switch (gapSize) {
		case 'none':
			return `0`;
		case 'tiny':
			return `${space[1]}px`;
		case 'small':
			return `${space[2]}px`;
		case 'medium':
			return '10px';
		case 'large':
			return `${space[5]}px`;
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
	gapSizes = { row: 'small', column: 'small' },
	isBetaContainer,
}: Props) => {
	return (
		<div
			css={[
				containerStyles,
				containerType === 'fixed/video'
					? videoWidth
					: minWidth(minWidthInPixels),
				decidePosition(
					imagePositionOnMobile,
					imagePositionOnDesktop,
					isBetaContainer,
					imageType === 'avatar',
				),
			]}
			style={{
				backgroundColor: cardBackgroundColour,
				rowGap: decideGap(gapSizes.row),
				columnGap: decideGap(gapSizes.column),
			}}
		>
			{children}
		</div>
	);
};
