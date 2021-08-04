import { css, keyframes } from '@emotion/react';

import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';

const BACKGROUND_COLOUR = neutral[93];

type Props = {
	height: number;
	rootId?: string;
	width?: number;
	spaceBelow?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
	spaceLeft?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
	shouldShimmer?: boolean;
};

const shimmer = keyframes`
  0% {
    background-position: -1500px 0;
  }
  100% {
    background-position: 1500px 0;
  }
`;

const shimmerStyles = css`
	animation: ${shimmer} 2s infinite linear;
	background: linear-gradient(
		to right,
		${BACKGROUND_COLOUR} 4%,
		${neutral[86]} 25%,
		${BACKGROUND_COLOUR} 36%
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
}: Props) => (
	<div
		id={rootId}
		css={css`
			flex-grow: 1;
		`}
	>
		<div
			data-name="placeholder"
			css={css`
				height: ${height}px;
				width: ${width ? `${width}px` : '100%'};
				margin-bottom: ${spaceBelow && space[spaceBelow]}px;
				margin-left: ${spaceLeft && space[spaceLeft]}px;
				background-color: ${BACKGROUND_COLOUR};

				${shouldShimmer && shimmerStyles}
			`}
		/>
	</div>
);
