import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { border, from } from '@guardian/source-foundations';
import type { ContainerOverrides } from 'src/types/palette';

export const verticalDivider = (
	containerOverrides?: ContainerOverrides,
): SerializedStyles => css`
	${from.tablet} {
		:before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 1px;
			height: 100%;
			border-left: 1px solid
				${containerOverrides
					? containerOverrides.divider
					: border.secondary};
		}
	}
`;
