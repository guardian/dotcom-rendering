import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { border, from } from '@guardian/source-foundations';
import type { DCRContainerPalette } from 'src/types/front';
import { decideContainerOverrides } from './decideContainerOverrides';

export const verticalDivider = (
	containerPalette?: DCRContainerPalette,
): SerializedStyles => {
	const containerOverrides =
		containerPalette && decideContainerOverrides(containerPalette);

	return css`
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
};
