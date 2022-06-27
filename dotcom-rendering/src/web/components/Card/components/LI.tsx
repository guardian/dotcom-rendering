import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';
import { verticalDivider } from '../../../lib/verticalDivider';

const liStyles = css`
	/* This position relative is needed to contain the vertical divider */
	position: relative;

	display: flex;
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

const paddingBottomStyles = css`
	padding-bottom: 10px;
`;

const mobilePaddingBottomStyles = css`
	${until.tablet} {
		padding-bottom: 10px;
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
	customStyles?: SerializedStyles;
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
	customStyles = undefined,
}: Props) => {
	// Decide sizing
	const sizeStyles = decideSize(percentage, stretch);

	return (
		<li
			css={[
				liStyles,
				sizeStyles,
				showDivider && verticalDivider,
				padSides && sidePaddingStyles(padSidesOnMobile),
				padBottom && paddingBottomStyles,
				padBottomOnMobile && mobilePaddingBottomStyles,
				showTopMarginWhenStacked && marginTopStyles,
				snapAlignStart && snapAlignStartStyles,
				customStyles && customStyles,
			]}
		>
			{children}
		</li>
	);
};
