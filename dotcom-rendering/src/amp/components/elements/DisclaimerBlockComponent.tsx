import React from 'react';
import { css } from '@emotion/react';
import { textSans } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';

const style = (pillar: Theme) => css`
	${textSans.small()};

	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	}
`;

export const DisclaimerBlockComponent: React.FC<{
	html: string;
	pillar: Theme;
}> = ({ html, pillar }) => (
	<span
		css={style(pillar)}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
