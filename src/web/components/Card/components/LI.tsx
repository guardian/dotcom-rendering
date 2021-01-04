import React from 'react';
import { css, cx } from 'emotion';

import { from, until } from '@guardian/src-foundations/mq';

import { verticalDivider } from '@root/src/web/lib/verticalDivider';

const liStyles = css`
	/* This position relative is needed to contain the veritcal divider */
	position: relative;

	display: flex;
`;

const sidePaddingStyles = css`
	/* Set spacing on the li element */
	${from.tablet} {
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const marginBottomStyles = css`
	margin-bottom: 10px;
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
	children: JSXElements;
	percentage?: CardPercentageType; // Used to give a particular LI more or less weight / space
	stretch?: boolean; // When true, the card stretches based on content
	showDivider?: boolean; // If this LI wraps a card in a row this should be true
	padSides?: boolean; // If this LI directly wraps a card this should be true
	bottomMargin?: boolean; // True when wrapping a card in a column and not the last item
	showTopMarginWhenStacked?: boolean;
};

export const LI = ({
	children,
	percentage,
	stretch,
	showDivider,
	padSides = false,
	bottomMargin,
	showTopMarginWhenStacked,
}: Props) => {
	// Decide sizing
	const sizeStyles = decideSize(percentage, stretch);

	return (
		<li
			className={cx(
				liStyles,
				sizeStyles,
				showDivider && verticalDivider,
				padSides && sidePaddingStyles,
				bottomMargin && marginBottomStyles,
				showTopMarginWhenStacked && marginTopStyles,
			)}
		>
			{children}
		</li>
	);
};
