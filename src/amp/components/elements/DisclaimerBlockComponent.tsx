import React from 'react';
import { css } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import { textSans } from '@guardian/src-foundations/typography';

const style = (pillar: CAPIPillar) => css`
	${textSans.small()};

	a {
		color: ${pillarPalette[pillar].dark};
	}
`;

export const DisclaimerBlockComponent: React.FC<{
	html: string;
	pillar: CAPIPillar;
}> = ({ html, pillar }) => (
	<span
		className={style(pillar)}
		dangerouslySetInnerHTML={{
			__html: html,
		}}
	/>
);
