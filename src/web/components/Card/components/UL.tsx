import { css } from '@emotion/react';

import { until } from '@guardian/src-foundations/mq';

import { verticalDivider } from '@root/src/web/lib/verticalDivider';

const ulStyles = (direction?: 'row' | 'column') => css`
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

type Props = {
	children: React.ReactNode;
	direction?: 'row' | 'column'; // Passed to flex-direction
	showDivider?: boolean; // If this UL is a column and not the left most column
	bottomMargin?: boolean; // If this UL is a row, add spacing below
};

export const UL = ({
	children,
	direction = 'column',
	showDivider = false,
	bottomMargin = false,
}: Props) => {
	return (
		<ul
			css={[
				ulStyles(direction),
				showDivider && verticalDivider,
				bottomMargin && marginBottomStyles,
			]}
		>
			{children}
		</ul>
	);
};
