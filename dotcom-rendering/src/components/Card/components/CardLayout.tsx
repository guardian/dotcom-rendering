import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, space } from '@guardian/source/foundations';
import type { CardImageType } from '../../../types/layout';
import type { ImagePositionType } from './ImageWrapper';

export type GapSize = 'none' | 'tiny' | 'small' | 'medium' | 'large';

export type GapSizes = { row: GapSize; column: GapSize };

type Props = {
	children: React.ReactNode;
	cardBackgroundColour: string;
	imageType: CardImageType | undefined;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	minWidthInPixels?: number;
	gapSizes: GapSizes;
	isBetaContainer: boolean;
};

const containerStyles = css`
	display: flex;
	flex-basis: 100%;
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
 * `scrollable/medium` is another exception as the medium cards require a
 * vertical layout at all breakpoints so we explicitly check that the image
 * position for desktop and mobile are both set to `bottom` to avoid affecting
 * existing layouts where the default position values are relied upon.
 */
export const decideAvatarPosition = (
	imagePositionOnMobile: ImagePositionType,
	imagePositionOnDesktop: ImagePositionType,
	isBetaContainer: boolean,
): { mobile: ImagePositionType; desktop: ImagePositionType } => {
	if (
		imagePositionOnMobile === 'bottom' &&
		imagePositionOnDesktop === 'bottom'
	) {
		return {
			mobile: 'bottom',
			desktop: 'bottom',
		};
	}

	if (
		imagePositionOnDesktop === 'left' ||
		imagePositionOnDesktop === 'right'
	) {
		if (isBetaContainer && imagePositionOnMobile === 'bottom') {
			return {
				mobile: 'bottom',
				desktop: 'right',
			};
		}
		return {
			mobile: 'right',
			desktop: 'right',
		};
	}

	return {
		mobile: 'right',
		desktop: 'bottom',
	};
};

const imagePositionMap = {
	top: 'column',
	bottom: 'column-reverse',
	left: 'row',
	right: 'row-reverse',
	none: 'column',
};

const decideFlexDirection = (
	imagePositionOnMobile: ImagePositionType,
	imagePositionOnDesktop: ImagePositionType,
	isBetaContainer: boolean,
	hasAvatar?: boolean,
) => {
	if (!hasAvatar) {
		return {
			mobile: imagePositionMap[imagePositionOnMobile],
			desktop: imagePositionMap[imagePositionOnDesktop],
		};
	}

	const { mobile, desktop } = decideAvatarPosition(
		imagePositionOnMobile,
		imagePositionOnDesktop,
		isBetaContainer,
	);

	return {
		mobile: imagePositionMap[mobile],
		desktop: imagePositionMap[desktop],
	};
};

const decidePosition = (
	imagePositionOnMobile: ImagePositionType,
	imagePositionOnDesktop: ImagePositionType,
	isBetaContainer: boolean,
	hasAvatar?: boolean,
) => {
	const { mobile, desktop } = decideFlexDirection(
		imagePositionOnMobile,
		imagePositionOnDesktop,
		isBetaContainer,
		hasAvatar,
	);

	return css`
		flex-direction: ${mobile};
		${from.tablet} {
			flex-direction: ${desktop};
		}
	`;
};

/** Determines the gap size between components in card layout */
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

const decideColumnGap = (gapSize: GapSize) => css`
	column-gap: ${gapSize === 'large' ? '10px' : decideGap(gapSize)};

	${from.tablet} {
		column-gap: ${decideGap(gapSize)};
	}
`;

export const CardLayout = ({
	children,
	cardBackgroundColour,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	minWidthInPixels,
	imageType,
	gapSizes,
	isBetaContainer,
}: Props) => {
	return (
		<div
			css={[
				containerStyles,
				minWidth(minWidthInPixels),
				decidePosition(
					imagePositionOnMobile,
					imagePositionOnDesktop,
					isBetaContainer,
					imageType === 'avatar',
				),
				decideColumnGap(gapSizes.column),
			]}
			style={{
				backgroundColor: cardBackgroundColour,
				rowGap: decideGap(gapSizes.row),
			}}
		>
			{children}
		</div>
	);
};
