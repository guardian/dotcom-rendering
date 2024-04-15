import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import {
	headlineMediumItalic17,
	headlineMediumItalic20,
	headlineMediumItalic24,
	headlineMediumItalic28,
	textSansItalic17,
	textSansItalic20,
	textSansItalic24,
	until,
} from '@guardian/source-foundations';
import { palette } from '../palette';

type Props = {
	text: string;
	format: ArticleFormat;
	size: SmallHeadlineSize;
};

const baseStyles = css`
	display: block;
	font-style: italic;
	color: ${palette('--byline')};
`;

const bylineStyles = (size: SmallHeadlineSize, format: ArticleFormat) => {
	switch (size) {
		case 'ginormous':
		case 'huge':
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSansItalic24};
					font-size: 24px;
					line-height: 24px;
					${until.desktop} {
						${textSansItalic24};
						line-height: 20px;
					}
				`;
			}
			return css`
				${headlineMediumItalic28};
				${until.desktop} {
					${headlineMediumItalic24};
				}
			`;
		case 'large': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSansItalic20};
					font-size: 24px;
					line-height: 24px;
					${until.desktop} {
						${textSansItalic20};
						line-height: 20px;
					}
				`;
			}
			return css`
				${headlineMediumItalic24};
				${until.desktop} {
					${headlineMediumItalic20};
				}
			`;
		}
		case 'medium': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSansItalic20};
					line-height: 20px;
					${until.desktop} {
						${textSansItalic17};
						line-height: 18px;
					}
				`;
			}
			return css`
				${headlineMediumItalic20};
				${until.desktop} {
					${headlineMediumItalic17};
				}
			`;
		}
		case 'small': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSansItalic17};
					line-height: 18px;
				`;
			}
			return css`
				${headlineMediumItalic17};
			`;
		}
		case 'tiny':
			return undefined;
	}
};

export const Byline = ({ text, format, size }: Props) => {
	return <span css={[baseStyles, bylineStyles(size, format)]}>{text}</span>;
};
