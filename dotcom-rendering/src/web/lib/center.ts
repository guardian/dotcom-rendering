import { css } from '@emotion/react';

import { from } from '@guardian/source-foundations';

export const center = css`
	position: relative;
	margin: auto;

	${from.tablet} {
		max-width: 740px;
	}

	${from.desktop} {
		max-width: 980px;
	}

	${from.leftCol} {
		max-width: 1140px;
	}

	${from.wide} {
		max-width: 1300px;
	}
`;
