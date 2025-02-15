import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { verticalDivider } from '../../../lib/verticalDivider';
import { palette } from '../../../palette';

type Direction = 'row' | 'column' | 'row-reverse';

const getSpacingPx = (hasLargeSpacing: boolean) =>
	hasLargeSpacing ? space[6] : space[3];

const ulStyles = (direction: Direction, spacingPx: number) => css`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: ${direction};
	${until.tablet} {
		flex-direction: column;
		width: 100%;
	}

	& > li {
		margin-bottom: ${spacingPx}px;
	}

	@supports (row-gap: 1em) {
		& > li {
			margin-bottom: 0;
		}
		/* Supported in flex layout is lacking: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap#browser_compatibility */
		row-gap: ${spacingPx}px;
	}
`;

const wrapStyles = css`
	${from.tablet} {
		flex-wrap: wrap;
	}
`;

const marginBottom = (spacingPx: number) => css`
	margin-bottom: ${spacingPx}px;
`;

const topBarStyles = (splitTopBar: boolean) => css`
	${from.tablet} {
		padding-top: 8px;
		::before {
			content: '';
			display: block;
			position: absolute;
			top: 0px;
			left: 10px;
			width: calc(100% - 20px);
			height: 1px;
			${splitTopBar
				? `background-image: linear-gradient(
				to right,
				${palette('--card-border-top')},
				${palette('--card-border-top')} calc(50% - 10px),
				rgba(0, 0, 0, 0) calc(50% - 10px),
				rgba(0, 0, 0, 0) calc(50% + 10px),
				${palette('--card-border-top')} calc(50% + 10px),
				${palette('--card-border-top')}
			)`
				: `background-color: ${palette('--card-border-top')};`}
		}
	}
`;

type Props = {
	children: React.ReactNode;
	/** Passed to flex-direction */
	direction?: Direction;
	/** If this UL is a column and not the left most column */
	showDivider?: boolean;
	/** If this UL is a row, add spacing below */
	padBottom?: boolean;
	/** Used to keep cards aligned in adjacent columns */
	wrapCards?: boolean;
	/** Used to display a full width bar along the top of the container */
	showTopBar?: boolean;
	/** Used to add a gap in the center of the top bar */
	splitTopBar?: boolean;
	/** Used to give beta containers additional space */
	hasLargeSpacing?: boolean;
	/** Overrides the vertical divider colour */
	verticalDividerColour?: string;
};

export const UL = ({
	children,
	direction = 'column',
	showDivider = false,
	padBottom = false,
	wrapCards = false,
	showTopBar = false,
	hasLargeSpacing = false,
	splitTopBar = false,
	verticalDividerColour = palette('--section-border'),
}: Props) => {
	const spacingPx = getSpacingPx(hasLargeSpacing);
	return (
		<ul
			css={[
				ulStyles(direction, spacingPx),
				showDivider && verticalDivider(verticalDividerColour),
				padBottom && marginBottom(spacingPx),
				wrapCards && wrapStyles,
				showTopBar && topBarStyles(splitTopBar),
			]}
		>
			{children}
		</ul>
	);
};
