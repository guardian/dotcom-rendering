import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, space } from '@guardian/source/foundations';
import type { CardMediaType } from '../../../types/layout';
import type { MediaPositionType } from './MediaWrapper';

export type GapSize = 'none' | 'tiny' | 'small' | 'medium' | 'large';

export type GapSizes = { row: GapSize; column: GapSize };

type Props = {
	children: React.ReactNode;
	cardBackgroundColour: string;
	mediaType: CardMediaType | undefined;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
	minWidthInPixels?: number;
	gapSizes: GapSizes;
	isBetaContainer: boolean;
};

const containerStyles = css`
	display: flex;
	position: relative;
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
 * A boosted card in a `dynamic/slow` container is an exception to this as it is
 * rendered horizontally on desktop by overriding `mediaPositionOnDesktop`
 *
 * `scrollable/medium` is another exception as the medium cards require a
 * vertical layout at all breakpoints so we explicitly check that the media
 * position for desktop and mobile are both set to `bottom` to avoid affecting
 * existing layouts where the default position values are relied upon.
 */
export const decideAvatarPosition = (
	mediaPositionOnMobile: MediaPositionType,
	mediaPositionOnDesktop: MediaPositionType,
	isBetaContainer: boolean,
): { mobile: MediaPositionType; desktop: MediaPositionType } => {
	if (
		mediaPositionOnMobile === 'bottom' &&
		mediaPositionOnDesktop === 'bottom'
	) {
		return {
			mobile: 'bottom',
			desktop: 'bottom',
		};
	}

	if (
		mediaPositionOnDesktop === 'left' ||
		mediaPositionOnDesktop === 'right'
	) {
		if (isBetaContainer && mediaPositionOnMobile === 'bottom') {
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

const mediaPositionMap = {
	top: 'column',
	bottom: 'column-reverse',
	left: 'row',
	right: 'row-reverse',
	none: 'column',
};

const decideFlexDirection = (
	mediaPositionOnMobile: MediaPositionType,
	mediaPositionOnDesktop: MediaPositionType,
	isBetaContainer: boolean,
	hasAvatar?: boolean,
) => {
	if (!hasAvatar) {
		return {
			mobile: mediaPositionMap[mediaPositionOnMobile],
			desktop: mediaPositionMap[mediaPositionOnDesktop],
		};
	}

	const { mobile, desktop } = decideAvatarPosition(
		mediaPositionOnMobile,
		mediaPositionOnDesktop,
		isBetaContainer,
	);

	return {
		mobile: mediaPositionMap[mobile],
		desktop: mediaPositionMap[desktop],
	};
};

const decidePosition = (
	mediaPositionOnMobile: MediaPositionType,
	mediaPositionOnDesktop: MediaPositionType,
	isBetaContainer: boolean,
	hasAvatar?: boolean,
) => {
	const { mobile, desktop } = decideFlexDirection(
		mediaPositionOnMobile,
		mediaPositionOnDesktop,
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
	mediaPositionOnDesktop,
	mediaPositionOnMobile,
	minWidthInPixels,
	mediaType,
	gapSizes,
	isBetaContainer,
}: Props) => {
	return (
		<div
			css={[
				containerStyles,
				minWidth(minWidthInPixels),
				decidePosition(
					mediaPositionOnMobile,
					mediaPositionOnDesktop,
					isBetaContainer,
					mediaType === 'avatar',
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
