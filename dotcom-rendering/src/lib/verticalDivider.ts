import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

export const verticalDivider = (
	verticalDividerColour: string,
): SerializedStyles => {
	return css`
		:before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 1px;
			height: 100%;
			border-left: 1px solid ${verticalDividerColour};
		}
	`;
};
