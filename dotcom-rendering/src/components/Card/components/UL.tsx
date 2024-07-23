import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { verticalDivider } from '../../../lib/verticalDivider';
import { palette } from '../../../palette';

type Direction = 'row' | 'column' | 'row-reverse';

const ulStyles = (direction: Direction) => css`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: ${direction};
	${until.tablet} {
		flex-direction: column;
		width: 100%;
	}

	& > li {
		margin-bottom: ${space[3]}px;
	}

	@supports (row-gap: 1em) {
		& > li {
			margin-bottom: 0;
		}
		/* Supported in flex layout is lacking: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap#browser_compatibility */
		row-gap: ${space[3]}px;
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
				showDivider && verticalDivider(palette('--article-border')),
				padBottom && marginBottomStyles,
				wrapCards && wrapStyles,
			]}
		>
			{children}
		</ul>
	);
};
