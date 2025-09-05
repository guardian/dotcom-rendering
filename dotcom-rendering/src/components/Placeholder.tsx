import { css, keyframes } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	type Breakpoint,
	from,
	palette,
	space,
} from '@guardian/source/foundations';

const BACKGROUND_COLOUR = palette.neutral[93];

type Props = {
	heights: Map<Breakpoint, number>;
	rootId?: string;
	width?: number;
	spaceBelow?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
	spaceLeft?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
	shouldShimmer?: boolean;
	backgroundColor?: string;
};

const shimmer = keyframes`
  0% {
    background-position: -1500px 0;
  }
  100% {
    background-position: 1500px 0;
  }
`;

const shimmerStyles = (backgroundColor: string) => css`
	animation: ${shimmer} 2s infinite linear;
	background: linear-gradient(
		to right,
		${backgroundColor} 4%,
		white 25%,
		${backgroundColor} 36%
	);
	background-size: 1500px 100%;
`;

const heightsMediaQueries = (heights: Map<Breakpoint, number>) =>
	css(
		Array.from(heights.entries()).map(
			([breakpoint, height]: [Breakpoint, number]) => css`
				${from[breakpoint]} {
					min-height: ${height}px;
				}
			`,
		),
	);

export const Placeholder = ({
	heights,
	rootId,
	width,
	spaceBelow,
	spaceLeft,
	shouldShimmer = true,
	backgroundColor = BACKGROUND_COLOUR,
}: Props) => (
	<div
		id={rootId}
		css={css`
			flex-grow: 1;
		`}
		data-name="placeholder"
	>
		<div
			css={[
				heightsMediaQueries(heights),
				css`
					width: ${!isUndefined(width) ? `${width}px` : '100%'};
					margin-bottom: ${spaceBelow && space[spaceBelow]}px;
					margin-left: ${spaceLeft && space[spaceLeft]}px;
					background-color: ${backgroundColor};

					${shouldShimmer && shimmerStyles(backgroundColor)}
				`,
			]}
		/>
	</div>
);
