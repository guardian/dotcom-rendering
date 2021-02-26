import React from 'react';
import { css, cx } from 'emotion';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { border } from '@guardian/src-foundations/palette';

import { Standfirst } from '@frontend/web/components/Standfirst';
import { Display, Design, Format } from '@guardian/types';

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
	format: Format;
	standfirst: string; // Can be html
	palette: Palette;
};

export const ArticleStandfirst = ({
	display,
	design,
	pillar,
	standfirst,
	format,
	palette,
}: Props) => (
	<div className={cx(standfirstStyles, standfirstLinks[pillar])}>
		<Standfirst
			display={display}
			design={design}
			standfirst={standfirst}
			format={format}
			palette={palette}
		/>
	</div>
);
