import React from 'react';
import { css, cx } from 'emotion';

import { Design } from '@guardian/types';
import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { pillarPalette } from '@frontend/lib/pillars';

type Props = {
	text: string;
	design: Design;
	pillar: Theme;
	size: SmallHeadlineSize;
};

const bylineStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'large':
			return css`
				display: block;
				font-style: italic;
				${headline.xsmall()};
				${until.desktop} {
					${headline.xxsmall()};
				}
			`;
		case 'medium':
			return css`
				display: block;
				font-style: italic;
				${headline.xxsmall()};
				${until.desktop} {
					${headline.xxxsmall()};
				}
			`;
		case 'small':
			return css`
				display: block;
				font-style: italic;
				${headline.xxxsmall()};
			`;
	}
};

const colourStyles = (design: Design, pillar: Theme) => {
	switch (design) {
		default:
			return css`
				color: ${pillarPalette[pillar].main};
			`;
	}
};

export const Byline = ({ text, design, pillar, size }: Props) => (
	<span className={cx(bylineStyles(size), colourStyles(design, pillar))}>
		{text}
	</span>
);
