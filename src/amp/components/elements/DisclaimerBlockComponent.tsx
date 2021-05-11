import React from 'react';
import { css } from 'emotion';
import { pillarPalette_DO_NOT_USE } from '@root/src/lib/pillars';
import { textSans } from '@guardian/src-foundations/typography';

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
		className={style(pillar)}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
