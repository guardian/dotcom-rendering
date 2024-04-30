import { css } from '@emotion/react';
import {
	brandAlt,
	neutral,
	remSpace,
	textSans14,
} from '@guardian/source-foundations';
import { darkModeCss } from 'styles';

export const highlight = css`
	${textSans14};
	color: ${neutral[7]};
	display: flex;
	align-items: center;
	padding: 0 ${remSpace[1]};
	background: ${brandAlt[400]};
	${darkModeCss`
		background: ${brandAlt[200]};
	`}
`;
