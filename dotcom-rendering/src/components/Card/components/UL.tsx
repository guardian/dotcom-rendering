import { css } from '@emotion/react';
import { from, neutral, space, until } from '@guardian/source-foundations';
import { decideContainerOverrides } from '../../../lib/decideContainerOverrides';
import { verticalDivider } from '../../../lib/verticalDivider';
import type { DCRContainerPalette } from '../../../types/front';

type Direction = 'row' | 'column' | 'row-reverse';

const ulStyles = (direction: Direction) => css`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: ${direction};
	row-gap: 12px;
	${until.tablet} {
		flex-direction: column;
		width: 100%;
	}

	@supports not (row-gap: 12px) {
		& > li {
			margin-bottom: 12px;
		}
	}
`;

const wrapStyles = css`
	${from.tablet} {
		flex-wrap: wrap;
	}
`;

const marginBottomStyles = css`
	margin-bottom: ${space[3]}px;
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
	containerPalette?: DCRContainerPalette;
};

export const UL = ({
	children,
	direction = 'column',
	showDivider = false,
	padBottom = false,
	wrapCards = false,
	containerPalette,
}: Props) => {
	const borderColour =
		(containerPalette &&
			decideContainerOverrides(containerPalette).border.container) ??
		neutral[86];

	return (
		<ul
			css={[
				ulStyles(direction),
				showDivider && verticalDivider(borderColour),
				padBottom && marginBottomStyles,
				wrapCards && wrapStyles,
			]}
		>
			{children}
		</ul>
	);
};
