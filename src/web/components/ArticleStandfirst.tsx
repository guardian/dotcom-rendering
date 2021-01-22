import React from 'react';
import { css, cx } from 'emotion';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { border } from '@guardian/src-foundations/palette';

import { Standfirst } from '@frontend/web/components/Standfirst';
import { Display, Design } from '@guardian/types';

const standfirstStyles = css`
	max-width: 540px;
`;

const standfirstLinks = pillarMap(
	(pillar) =>
		css`
			a {
				color: ${pillarPalette[pillar].dark};
				text-decoration: none;
				border-bottom: 1px solid ${border.secondary};
				transition: border-color 0.15s ease-out;
			}
		`,
);

type Props = {
	display: Display;
	design: Design;
	pillar: Theme;
	standfirst: string; // Can be html
};

export const ArticleStandfirst = ({
	display,
	design,
	pillar,
	standfirst,
}: Props) => (
	<div className={cx(standfirstStyles, standfirstLinks[pillar])}>
		<Standfirst display={display} design={design} standfirst={standfirst} />
	</div>
);
