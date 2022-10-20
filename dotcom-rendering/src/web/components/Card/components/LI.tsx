import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source-foundations';
import type { DCRContainerPalette } from 'src/types/front';
import type { ContainerOverrides } from 'src/types/palette';
import { decideContainerOverrides } from 'src/web/lib/decideContainerOverrides';
import { verticalDivider } from '../../../lib/verticalDivider';
import { verticalDividerWithBottomOffset } from '../../../lib/verticalDividerWithBottomOffset';

/**
 * This value needs to match the one set
 * in the `verticalDividerWithBottomOffset`
 */
const GAP_SIZE = `${space[3]}px`;

const liStyles = css`
	/* This position relative is needed to contain the vertical divider */
	position: relative;

	display: flex;
	row-gap: ${GAP_SIZE};
`;

const sidePaddingStyles = (padSidesOnMobile: boolean) => css`
	/* Set spacing on the li element */
	${padSidesOnMobile && until.tablet} {
		padding-left: 10px;
		padding-right: 10px;
	}

	${from.tablet} {
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const snapAlignStartStyles = css`
	/* Snap start of card */
	scroll-snap-align: start;
`;

const decideSize = (percentage?: CardPercentageType, stretch?: boolean) => {
	let sizeStyle;
	if (percentage) {
		sizeStyle = css`
			flex-basis: ${percentage};
			${stretch &&
			css`
				flex-grow: 1;
			`}
		`;
	} else if (stretch) {
		sizeStyle = css`
			flex-grow: 1;
		`;
	} else {
		sizeStyle = css`
			flex: 1;
		`;
	}
	return sizeStyle;
};

const decideDivider = (
	offsetBottomPaddingOnDivider: boolean,
	paddingSize: string,
	containerOverrides?: ContainerOverrides,
) =>
	offsetBottomPaddingOnDivider
		? verticalDividerWithBottomOffset(paddingSize, containerOverrides)
		: verticalDivider(containerOverrides);

type Props = {
	children: React.ReactNode;
	/** Used to give a particular LI more or less weight / space */
	percentage?: CardPercentageType;
	/** When true, the card stretches based on content */
	stretch?: boolean;
	/** If this LI wraps a card in a row this should be true */
	showDivider?: boolean;
	/** If this LI directly wraps a card this should be true */
	padSides?: boolean;
	/** Should be true if spacing between cards is desired on mobile devices */
	padSidesOnMobile?: boolean;
	/** True when snapping card when scrolling e.g. in carousel */
	snapAlignStart?: boolean;
	/** Prevent the divider from spanning the LI's bottom padding. To be used when you know that the
	LI will have bottom padding, but won't have another card in the same container directly below it. */
	offsetBottomPaddingOnDivider?: boolean;

	containerPalette?: DCRContainerPalette;
};

export const LI = ({
	children,
	percentage,
	stretch,
	showDivider,
	padSides = false,
	padSidesOnMobile = false,
	snapAlignStart = false,
	offsetBottomPaddingOnDivider = false,
	containerPalette,
}: Props) => {
	// Decide sizing
	const sizeStyles = decideSize(percentage, stretch);
	const containerOverrides =
		containerPalette && decideContainerOverrides(containerPalette);

	return (
		<li
			css={[
				liStyles,
				sizeStyles,
				showDivider &&
					decideDivider(
						offsetBottomPaddingOnDivider,
						GAP_SIZE,
						containerOverrides,
					),
				padSides && sidePaddingStyles(padSidesOnMobile),
				snapAlignStart && snapAlignStartStyles,
			]}
		>
			{children}
		</li>
	);
};
