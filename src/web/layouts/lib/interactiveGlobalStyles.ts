import { css } from '@emotion/react';

import { center } from '@root/src/web/lib/center';

// Styles expected by interactives from the Frontend days. These shouldn't be
// used for new interactives though.
export const interactiveGlobalStyles = css`
	.gs-container {
		${center}
	}

	*,
	::before,
	::after {
		box-sizing: content-box;
	}
`;
