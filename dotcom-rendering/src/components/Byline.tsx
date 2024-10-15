import { css } from '@emotion/react';
import {
	headlineMediumItalic17,
	headlineMediumItalic20,
	headlineMediumItalic24,
	headlineMediumItalic28,
	textSansItalic17,
	textSansItalic20,
	textSansItalic24,
	until,
} from '@guardian/source/foundations';
import { palette } from '../palette';

type Props = {
	text: string;
	isLabs: boolean;
	size: SmallHeadlineSize;
};

const baseStyles = css`
	display: block;
	color: ${palette('--byline')};
`;

const bylineStyles = (size: SmallHeadlineSize, isLabs: boolean) => {
	switch (size) {
		case 'ginormous':
		case 'huge':
			if (isLabs) {
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
			if (isLabs) {
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
			if (isLabs) {
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
			if (isLabs) {
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
			return css`
				${headlineMediumItalic17};
			`;
	}
};

export const Byline = ({ text, isLabs, size }: Props) => {
	return <span css={[baseStyles, bylineStyles(size, isLabs)]}>{text}</span>;
};
