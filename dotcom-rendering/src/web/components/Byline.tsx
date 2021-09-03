import { css } from '@emotion/react';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';
import { ArticleSpecial } from '@guardian/libs';

type Props = {
	text: string;
	palette: Palette;
	format: ArticleFormat;
	size: SmallHeadlineSize;
};

const bylineStyles = (size: SmallHeadlineSize, format: ArticleFormat) => {
	const baseStyles = css`
		display: block;
		font-style: italic;
	`;

	switch (size) {
		case 'large': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${baseStyles};
					${textSans.large()};
					font-size: 24px;
					line-height: 24px;
					${until.desktop} {
						${textSans.large()};
						line-height: 20px;
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
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${baseStyles};
					${textSans.large()};
					line-height: 20px;
					${until.desktop} {
						${textSans.medium()};
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
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${baseStyles};
					${textSans.medium()};
					line-height: 18px;
				`;
			}
			return css`
				${baseStyles};
				${headline.xxxsmall()};
			`;
		}
		default:
			return css``;
	}
};

const colourStyles = (palette: Palette) => {
	return css`
		color: ${palette.text.byline};
	`;
};

export const Byline = ({ text, palette, format, size }: Props) => (
	<span css={[bylineStyles(size, format), colourStyles(palette)]}>
		{text}
	</span>
);
