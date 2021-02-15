import { css } from '@emotion/react';

import { border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

export const Border = () => (
	<div
		css={css`
			${from.leftCol} {
				border-left: 1px solid ${border.secondary};
				height: 100%;
			}
		`}
	/>
);
