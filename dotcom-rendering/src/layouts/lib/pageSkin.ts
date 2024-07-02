import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';

const pageSkinContainer = css`
	${from.desktop} {
		max-width: ${breakpoints.desktop}px;
		margin: auto;
	}
`;

export { pageSkinContainer };
