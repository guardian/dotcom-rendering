import { css, keyframes } from '@emotion/react';
import { neutral, space } from '@guardian/source-foundations';

const BACKGROUND_COLOUR = neutral[93];

type Props = {
	height: number;
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

export const Placeholder = ({
	height,
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
			css={css`
				min-height: ${height}px;
				width: ${width !== undefined ? `${width}px` : '100%'};
				margin-bottom: ${spaceBelow && space[spaceBelow]}px;
				margin-left: ${spaceLeft && space[spaceLeft]}px;
				background-color: ${backgroundColor};

				${shouldShimmer && shimmerStyles(backgroundColor)}
			`}
		/>
	</div>
);
