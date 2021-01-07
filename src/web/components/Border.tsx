import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

export const Border = () => (
	<div
		className={css`
			${from.leftCol} {
				border-left: 1px solid ${border.secondary};
				height: 100%;
			}
		`}
	/>
);
