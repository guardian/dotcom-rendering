import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { verticalDivider } from '../../../lib/verticalDivider';
import { verticalDividerWithBottomOffset } from '../../../lib/verticalDividerWithBottomOffset';
import { palette } from '../../../palette';

type CardPercentageType =
	| '25%'
	| '33.333%'
	| '50%'
	| '66.666%'
	| '75%'
	| '100%';

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

const sidePaddingStylesMobile = (override?: number) => css`
	/* Set spacing on the li element */
	${until.tablet} {
		padding-left: ${override ?? 10}px;
		padding-right: ${override ?? 10}px;
	}
`;

const sidePaddingStyles = (override?: number) => css`
	${from.tablet} {
		padding-left: ${override ?? 10}px;
		padding-right: ${override ?? 10}px;
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
	verticalDividerColour?: string,
) => {
	const borderColour = verticalDividerColour ?? palette('--section-border');

	return offsetBottomPaddingOnDivider
		? verticalDividerWithBottomOffset(paddingSize, borderColour)
		: verticalDivider(borderColour);
};

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
	/** Overrides the default padding */
	padSidesOverride?: number;
	/** Should be true if spacing between cards is desired on mobile devices */
	padSidesOnMobile?: boolean;
	/** Overrides the default mobile padding */
	padSidesMobileOverride?: number;
	/** True when snapping card when scrolling e.g. in carousel */
	snapAlignStart?: boolean;
	/** Prevent the divider from spanning the LI's bottom padding. To be used when you know that the
	LI will have bottom padding, but won't have another card in the same container directly below it. */
	offsetBottomPaddingOnDivider?: boolean;
	verticalDividerColour?: string;
};

export const LI = ({
	children,
	percentage,
	stretch,
	showDivider,
	padSides = false,
	padSidesOverride,
	padSidesOnMobile = false,
	padSidesMobileOverride,
	snapAlignStart = false,
	offsetBottomPaddingOnDivider = false,
	verticalDividerColour,
}: Props) => {
	// Decide sizing
	const sizeStyles = decideSize(percentage, stretch);

	return (
		<li
			css={[
				liStyles,
				sizeStyles,
				showDivider &&
					decideDivider(
						offsetBottomPaddingOnDivider,
						GAP_SIZE,
						verticalDividerColour,
					),
				padSides && sidePaddingStyles(padSidesOverride),
				padSidesOnMobile &&
					sidePaddingStylesMobile(padSidesMobileOverride),
				snapAlignStart && snapAlignStartStyles,
			]}
		>
			{children}
		</li>
	);
};
