import { css } from '@emotion/react';

import { headline, textSans, until } from '@guardian/source-foundations';
import { ArticleSpecial } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	text: string;
	format: ArticleFormat;
	palette?: Palette;
	size: SmallHeadlineSize;
	isCard?: boolean;
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

const colourStyles = (palette: Palette, isCard: Props['isCard']) => {
	return css`
		color: ${isCard ? palette.text.cardByline : palette.text.byline};
	`;
};

export const Byline = ({ text, format, palette, size, isCard }: Props) => {
	const cardPalette = palette || decidePalette(format);
	return (
		<span
			css={[
				bylineStyles(size, format),
				colourStyles(cardPalette, isCard),
			]}
		>
			{text}
		</span>
	);
};
