import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source-foundations';
import React from 'react';
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

const combinePercentages = (
	perc1: CardPercentageType,
	perc2: CardPercentageType,
): CardPercentageType => {
	return 'combined';
};

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
) =>
	offsetBottomPaddingOnDivider
		? verticalDividerWithBottomOffset(paddingSize)
		: verticalDivider;

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
	parentPercentage?: CardPercentageType;
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
	parentPercentage,
}: Props) => {
	// Decide sizing
	const sizeStyles = decideSize(percentage, stretch);

	const getPercentage = () => {
		if (parentPercentage && percentage)
			return combinePercentages(parentPercentage, percentage);

		if (parentPercentage && !percentage) return parentPercentage;

		return percentage;
	};

	const childrenWithProps = React.Children.map(children, (child) => {
		// Checking isValidElement is the safe way and avoids a
		// typescript error too.
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				parentPercentage: getPercentage(),
			} as Partial<unknown>);
		}
		return child;
	});

	return (
		<li
			css={[
				liStyles,
				sizeStyles,
				showDivider &&
					decideDivider(offsetBottomPaddingOnDivider, GAP_SIZE),
				padSides && sidePaddingStyles(padSidesOnMobile),
				snapAlignStart && snapAlignStartStyles,
			]}
		>
			{childrenWithProps}
		</li>
	);
};
