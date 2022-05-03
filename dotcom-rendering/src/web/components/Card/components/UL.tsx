import { css } from '@emotion/react';

import { until, from } from '@guardian/source-foundations';

import { verticalDivider } from '../../../lib/verticalDivider';

type Direction = 'row' | 'column' | 'row-reverse';

const ulStyles = (direction?: Direction) => css`
	position: relative;
	display: flex;
	flex-direction: ${direction};
	${until.tablet} {
		flex-direction: column;
		width: 100%;
	}
`;

const marginBottomStyles = css`
	margin-bottom: 10px;
`;

const wrapStyles = css`
	${from.tablet} {
		flex-wrap: wrap;
	}
`;

type Props = {
	children: React.ReactNode;
	direction?: Direction; // Passed to flex-direction
	showDivider?: boolean; // If this UL is a column and not the left most column
	padBottom?: boolean; // If this UL is a row, add spacing below
	wrapCards?: boolean; // Used to keep cards aligned in adjacent columns
};

export const UL = ({
	children,
	direction = 'column',
	showDivider = false,
	padBottom = false,
	wrapCards = false,
}: Props) => {
	return (
		<ul
			css={[
				ulStyles(direction),
				showDivider && verticalDivider,
				padBottom && marginBottomStyles,
				wrapCards && wrapStyles,
			]}
		>
			{children}
		</ul>
	);
};
