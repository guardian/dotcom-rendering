import React from 'react';
import { css } from 'emotion';

import { Lines } from '@guardian/src-ed-lines';
import { remSpace } from '@guardian/src-foundations';

const linesCssOverwrite = (palette: Palette) => css`
	> div {
		background-image: repeating-linear-gradient(
			to bottom,
			${palette.border.lines},
			${palette.border.lines} 1px,
			transparent 1px,
			transparent ${remSpace[1]}
		);
	}
`;

export const GuardianLines = ({
	palette,
	count,
	effect,
}: {
	palette: Palette;
	count: 4 | 8 | undefined;
	effect?: 'straight' | 'squiggly' | 'dotted';
}) => (
	<div className={linesCssOverwrite(palette)}>
		<Lines count={count} effect={effect} />
	</div>
);
