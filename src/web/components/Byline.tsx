import React from 'react';
import { css, cx } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { Design, Special } from '@guardian/types';

type Props = {
	text: string;
	palette: Palette;
	format: Format;
	size: SmallHeadlineSize;
};

const bylineStyles = (size: SmallHeadlineSize, format: Format) => {
	const baseStyles = css`
		display: block;
		font-style: italic;
	`;

	if (format.theme === Special.Labs && format.design === Design.PhotoEssay) {
		textSans.large();
	}

	switch (size) {
		case 'large': {
			if (format.theme === Special.Labs) {
				return css`
					${baseStyles};
					${textSans.large()};
					line-height: 22px;
					${until.desktop} {
						${textSans.large()};
						line-height: 22px;
					}
				`;
			}
			return css`
				${baseStyles};
				${headline.xsmall()};
				${until.desktop} {
					${headline.xxsmall()};
				}
			`;
		}
		case 'medium': {
			if (format.theme === Special.Labs) {
				return css`
					${baseStyles};
					${textSans.large()};
					line-height: 22px;
					${until.desktop} {
						${textSans.large()};
						line-height: 18px;
					}
				`;
			}
			return css`
				${baseStyles};
				${headline.xxsmall()};
				${until.desktop} {
					${headline.xxxsmall()};
				}
			`;
		}
		case 'small': {
			if (format.theme === Special.Labs) {
				return css`
					${baseStyles};
					${textSans.large()};
					line-height: 18px;
				`;
			}
			return css`
				${baseStyles};
				${headline.xxxsmall()};
			`;
		}
	}
};

const colourStyles = (palette: Palette) => {
	return css`
		color: ${palette.text.byline};
	`;
};

export const Byline = ({ text, palette, format, size }: Props) => (
	<span className={cx(bylineStyles(size, format), colourStyles(palette))}>
		{text}
	</span>
);
