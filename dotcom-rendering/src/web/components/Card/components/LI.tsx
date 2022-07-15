import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';
import { verticalDivider } from '../../../lib/verticalDivider';
import { verticalDividerWithBottomOffset } from '../../../lib/verticalDividerWithBottomOffset';

const liStyles = css`
	/* This position relative is needed to contain the vertical divider */
	position: relative;

	display: flex;
`;

const sidePaddingStyles = (
	padSidesOnMobile: boolean,
	paddingSize: string,
) => css`
	/* Set spacing on the li element */
	${padSidesOnMobile && until.tablet} {
		padding-left: ${paddingSize};
		padding-right: ${paddingSize};
	}

	${from.tablet} {
		padding-left: ${paddingSize};
		padding-right: ${paddingSize};
	}
`;

const snapAlignStartStyles = css`
	/* Snap start of card */
	scroll-snap-align: start;
`;

const paddingBottomStyles = (paddingSize: string) => css`
	padding-bottom: ${paddingSize};
`;

const mobilePaddingBottomStyles = (paddingSize: string) => css`
	${until.tablet} {
		padding-bottom: ${paddingSize};
	}
`;

const marginTopStyles = css`
	${until.tablet} {
		margin-top: 12px;
	}
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

function decideDivider(
	offsetBottomPaddingOnDivider: boolean,
	paddingSize: string,
) {
	return offsetBottomPaddingOnDivider
		? verticalDividerWithBottomOffset(paddingSize)
		: verticalDivider;
}

type Props = {
	children: React.ReactNode;
	percentage?: CardPercentageType; // Used to give a particular LI more or less weight / space
	stretch?: boolean; // When true, the card stretches based on content
	showDivider?: boolean; // If this LI wraps a card in a row this should be true
	padSides?: boolean; // If this LI directly wraps a card this should be true
	padSidesOnMobile?: boolean; // Should be true if spacing between cards is desired on mobile devices
	padBottom?: boolean;
	padBottomOnMobile?: boolean; // Should be true if spacing below is desired on mobile devices
	showTopMarginWhenStacked?: boolean;
	snapAlignStart?: boolean; // True when snapping card when scrolling e.g. in carousel
	// Prevent the divider from spanning the LI's bottom padding. To be used when you know that the
	// LI will have bottom padding, but won't have another card in the same container directly below it.
	offsetBottomPaddingOnDivider?: boolean;
};

export const LI = ({
	children,
	percentage,
	stretch,
	showDivider,
	padSides = false,
	padSidesOnMobile = false,
	padBottom,
	padBottomOnMobile,
	showTopMarginWhenStacked,
	snapAlignStart = false,
	offsetBottomPaddingOnDivider = false,
}: Props) => {
	// Decide sizing
	const sizeStyles = decideSize(percentage, stretch);
	// paddingSize is set here because the offset value used for the
	// verticalDividerWithBottomOffset needs to match the value used for
	// paddingBottom
	const paddingSize = '10px';

	return (
		<li
			css={[
				liStyles,
				sizeStyles,
				showDivider &&
					decideDivider(offsetBottomPaddingOnDivider, paddingSize),
				padSides && sidePaddingStyles(padSidesOnMobile, paddingSize),
				padBottom && paddingBottomStyles(paddingSize),
				padBottomOnMobile && mobilePaddingBottomStyles(paddingSize),
				showTopMarginWhenStacked && marginTopStyles,
				snapAlignStart && snapAlignStartStyles,
			]}
		>
			{children}
		</li>
	);
};
