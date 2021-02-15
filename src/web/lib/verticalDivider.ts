import { css } from '@emotion/react';

import { from } from '@guardian/src-foundations/mq';
import { border } from '@guardian/src-foundations/palette';

export const verticalDivider = css`
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
			border-left: 1px solid ${border.secondary};
		}
	}
`;
