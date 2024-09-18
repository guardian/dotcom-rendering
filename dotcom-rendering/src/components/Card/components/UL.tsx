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

const flexContainerMarginBottomStyles = css`
	padding-bottom: ${space[5]}px;
`;

const topBarStyles = css`
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
			background-color: ${palette('--card-border-top')};
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
	/** During container migration, we need to check what the container is. The will be able to removed once the migration is finished */
	isFlexibleContainer?: boolean;
	/** Used to display a full width bar along the top of the container */
	showTopBar?: boolean;
};

export const UL = ({
	children,
	direction = 'column',
	showDivider = false,
	padBottom = false,
	wrapCards = false,
	isFlexibleContainer = false,
	showTopBar = false,
}: Props) => {
	return (
		<ul
			css={[
				ulStyles(direction),
				showDivider && verticalDivider(palette('--section-border')),
				padBottom &&
					(isFlexibleContainer
						? flexContainerMarginBottomStyles
						: marginBottomStyles),
				wrapCards && wrapStyles,
				showTopBar && topBarStyles,
			]}
		>
			{children}
		</ul>
	);
};
