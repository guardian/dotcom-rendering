import React from 'react';
import { css } from 'emotion';

import { Lines } from '@guardian/src-ed-lines';
import { remSpace } from '@guardian/src-foundations';

import { neutralBorder } from '@root/src/lib/pillars';

const linesCssOverwrite = (pillar: Theme) => css`
	> div {
		background-image: repeating-linear-gradient(
			to bottom,
			${neutralBorder(pillar)},
			${neutralBorder(pillar)} 1px,
			transparent 1px,
			transparent ${remSpace[1]}
		);
	}
`;

export const GuardianLines = ({
	pillar,
	count,
	effect,
}: {
	pillar: Theme;
	count: 4 | 8 | undefined;
	effect?: 'straight' | 'squiggly' | 'dotted';
}) => (
	<div className={linesCssOverwrite(pillar)}>
		<Lines count={count} effect={effect} />
	</div>
);
