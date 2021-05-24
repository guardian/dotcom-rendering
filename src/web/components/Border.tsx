import { css } from '@emotion/react';

import { from } from '@guardian/src-foundations/mq';

export const Border = ({ palette }: { palette: Palette }) => (
	<div
		css={css`
			${from.leftCol} {
				border-left: 1px solid ${palette.border.article};
				height: 100%;
			}
		`}
	/>
);
