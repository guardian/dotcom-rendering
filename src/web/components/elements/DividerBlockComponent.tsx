import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

export const DividerBlockComponent = () => (
	<hr
		className={css`
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
