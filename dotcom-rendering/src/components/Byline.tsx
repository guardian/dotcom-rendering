import { css } from '@emotion/react';
import {
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	textSans17,
	textSans20,
	textSans24,
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
					${textSans24};
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
					${textSans24};
					${until.desktop} {
						${textSans20};
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
					${textSans20};
					${until.desktop} {
						${textSans17};
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
					${textSans17};
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
