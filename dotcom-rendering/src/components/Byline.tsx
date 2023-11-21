import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import { headline, textSans, until } from '@guardian/source-foundations';
import { palette } from '../palette';

type Props = {
	text: string;
	format: ArticleFormat;
	size: SmallHeadlineSize;
};

const baseStyles = css`
	display: block;
	font-style: italic;
	color: ${palette('--card-byline-text')};
`;

const bylineStyles = (size: SmallHeadlineSize, format: ArticleFormat) => {
	switch (size) {
		case 'ginormous':
		case 'huge':
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSans.xlarge()};
					font-size: 24px;
					line-height: 24px;
					${until.desktop} {
						${textSans.xlarge()};
						line-height: 20px;
					}
				`;
			}
			return css`
				${headline.small()};
				${until.desktop} {
					${headline.xsmall()};
				}
			`;
		case 'large': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
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
				${headline.xsmall()};
				${until.desktop} {
					${headline.xxsmall()};
				}
			`;
		}
		case 'medium': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSans.large()};
					line-height: 20px;
					${until.desktop} {
						${textSans.medium()};
						line-height: 18px;
					}
				`;
			}
			return css`
				${headline.xxsmall()};
				${until.desktop} {
					${headline.xxxsmall()};
				}
			`;
		}
		case 'small': {
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${textSans.medium()};
					line-height: 18px;
				`;
			}
			return css`
				${headline.xxxsmall()};
			`;
		}
		case 'tiny':
			return undefined;
	}
};

export const Byline = ({ text, format, size }: Props) => {
	return <span css={[baseStyles, bylineStyles(size, format)]}>{text}</span>;
	return <span css={[baseStyles, bylineStyles(size, format)]}>{text}</span>;
};
