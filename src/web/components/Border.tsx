import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';

export const Border = ({ palette }: { palette: Palette }) => (
	<div
		className={css`
			${from.leftCol} {
				border-left: 1px solid ${palette.border.article};
				height: 100%;
			}
		`}
	/>
);
