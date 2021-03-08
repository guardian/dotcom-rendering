import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';
import { ArticleRenderer } from '@root/src/web/lib/ArticleRenderer';
import { Display } from '@guardian/types';
import type { Format } from '@guardian/types';

type Props = {
	format: Format;
	palette: Palette;
	blocks: Block[];
	adTargeting: AdTargeting;
	host?: string;
	abTests: CAPIType['config']['abTests'];
};

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

const linkColour = (palette: Palette) => css`
	a:not([data-ignore='global-link-styling']) {
		text-decoration: none;
		border-bottom: 1px solid ${palette.border.articleLink};
		color: ${palette.text.articleLink};

		:hover {
			color: ${palette.text.articleLinkHover};
			border-bottom: 1px solid ${palette.border.articleLinkHover};
		}
	}
`;

export const ArticleBody = ({
	format,
	palette,
	blocks,
	adTargeting,
	host,
	abTests,
}: Props) => {
	return (
		<div className={cx(bodyStyle(format.display), linkColour(palette))}>
			<ArticleRenderer
				format={format}
				palette={palette}
				elements={blocks[0] ? blocks[0].elements : []}
				adTargeting={adTargeting}
				host={host}
				abTests={abTests}
			/>
		</div>
	);
};
