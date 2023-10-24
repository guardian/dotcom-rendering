import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import { headline, textSans, until } from '@guardian/source-foundations';
import { palette } from '../palette';

type Props = {
	text: string;
	format: ArticleFormat;
	size: SmallHeadlineSize;
	isCard?: boolean;
};

const bylineStyles = (size: SmallHeadlineSize, format: ArticleFormat) => {
	const baseStyles = css`
		display: block;
		font-style: italic;
	`;

	switch (size) {
		case 'ginormous':
		case 'huge':
			if (format.theme === ArticleSpecial.Labs) {
				return css`
					${baseStyles};
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
				${baseStyles};
				${headline.small()};
				${until.desktop} {
					${headline.xsmall()};
				}
			`;
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

const colourStyles = (isCard: Props['isCard']) => {
	return css`
		color: ${isCard
			? palette('--byline-card-colour')
			: palette('--byline-colour')};
	`;
};

export const Byline = ({ text, format, size, isCard }: Props) => {
	return (
		<span css={[bylineStyles(size, format), colourStyles(isCard)]}>
			{text}
		</span>
	);
};
