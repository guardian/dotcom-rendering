import { css } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';

export const DividerBlockComponent = () => (
	<hr
		css={css`
			width: 150px;
			height: 1px;
			border: 0;
			margin-left: -10px;
			margin-top: 48px;
			margin-bottom: 3px;
			background-color: ${border.secondary};
		`}
	/>
);
