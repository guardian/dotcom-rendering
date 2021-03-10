import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';

type Props = {
	text: string;
	palette: Palette;
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

const colourStyles = (palette: Palette) => {
	return css`
		color: ${palette.text.byline};
	`;
};

export const Byline = ({ text, palette, size }: Props) => (
	<span className={cx(bylineStyles(size), colourStyles(palette))}>
		{text}
	</span>
);
