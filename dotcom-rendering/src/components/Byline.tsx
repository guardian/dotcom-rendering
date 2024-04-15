import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import {
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	textSans17,
	textSans20,
	textSans24,
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
					${textSans24};
					font-size: 24px;
					line-height: 24px;
					${until.desktop} {
						${textSans24};
						line-height: 20px;
					}
				`;
			}
			return css`
				${headlineMedium28};
				${until.desktop} {
					${headlineMedium24};
				}
			`;
		case 'large': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSans20};
					font-size: 24px;
					line-height: 24px;
					${until.desktop} {
						${textSans20};
						line-height: 20px;
					}
				`;
			}
			return css`
				${headlineMedium24};
				${until.desktop} {
					${headlineMedium20};
				}
			`;
		}
		case 'medium': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSans20};
					line-height: 20px;
					${until.desktop} {
						${textSans17};
						line-height: 18px;
					}
				`;
			}
			return css`
				${headlineMedium20};
				${until.desktop} {
					${headlineMedium17};
				}
			`;
		}
		case 'small': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSans17};
					line-height: 18px;
				`;
			}
			return css`
				${headlineMedium17};
			`;
		}
		case 'tiny':
			return undefined;
	}
};

export const Byline = ({ text, format, size }: Props) => {
	return <span css={[baseStyles, bylineStyles(size, format)]}>{text}</span>;
};
