import React from 'react';
import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';

import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';

const style = (pillar: ArticleTheme) => css`
	${textSans.small()};

	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	}
`;

export const DisclaimerBlockComponent: React.FC<{
	html: string;
	pillar: ArticleTheme;
}> = ({ html, pillar }) => (
	<span
		css={style(pillar)}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
