import React from 'react';
import { css, cx } from 'emotion';

import { border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { ArticleRenderer } from '@root/src/web/lib/ArticleRenderer';
import { Display, Pillar } from '@guardian/types';
import type { Format } from '@guardian/types';

type Props = {
	format: Format;
	palette: Palette;
	blocks: Block[];
	adTargeting: AdTargeting;
	host?: string;
};

const pillarColours = pillarMap(
	(pillar) =>
		css`
			color: ${pillar === Pillar.Opinion || pillar === Pillar.Culture
				? pillarPalette[pillar].dark
				: pillarPalette[pillar].main};
		`,
);

const bodyStyle = (display: Display) => css`
	${between.tablet.and.desktop} {
		padding-right: 80px;
	}

	h2 {
		${display === Display.Immersive
			? headline.medium({ fontWeight: 'light' })
			: headline.xxsmall({ fontWeight: 'bold' })};
	}

	strong {
		font-weight: bold;
	}

	img {
		width: 100%;
		height: auto;
	}
`;

const linkColour = pillarMap(
	(pillar) => css`
		a {
			text-decoration: none;
			border-bottom: 1px solid ${border.secondary};
			${pillarColours[pillar]};

			:hover {
				border-bottom: 1px solid ${pillarPalette[pillar].main};
			}
		}
	`,
);

export const ArticleBody = ({
	format,
	palette,
	blocks,
	adTargeting,
	host,
}: Props) => {
	return (
		<div
			className={cx(bodyStyle(format.display), linkColour[format.theme])}
		>
			<ArticleRenderer
				format={format}
				palette={palette}
				elements={blocks[0] ? blocks[0].elements : []}
				adTargeting={adTargeting}
				host={host}
			/>
		</div>
	);
};
