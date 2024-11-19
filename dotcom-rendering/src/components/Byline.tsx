import { css } from '@emotion/react';
import {
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	textSansItalic17,
	textSansItalic20,
	textSansItalic24,
	until,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { SmallHeadlineSize } from '../types/layout';

type Props = {
	text: string;
	isLabs: boolean;
	size: SmallHeadlineSize;
	/** Optional override of the standard text colour */
	colour?: string;
};

const baseStyles = (colour: string) => css`
	display: block;
	color: ${colour};
`;

const bylineStyles = (size: SmallHeadlineSize, isLabs: boolean) => {
	switch (size) {
		case 'ginormous':
		case 'huge':
			if (isLabs) {
				return css`
					${textSansItalic24};
					line-height: 24px;
					${until.desktop} {
						${textSansItalic24};
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
				${headlineMedium24};
				${until.desktop} {
					${headlineMedium20};
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
				${headlineMedium20};
				${until.desktop} {
					${headlineMedium17};
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
				${headlineMedium17};
			`;
		}
		case 'tiny':
			return css`
				${headlineMedium17};
			`;
	}
};

export const Byline = ({
	text,
	isLabs,
	size,
	colour = palette('--byline'),
}: Props) => {
	return (
		<span css={[baseStyles(colour), bylineStyles(size, isLabs)]}>
			{text}
		</span>
	);
};
