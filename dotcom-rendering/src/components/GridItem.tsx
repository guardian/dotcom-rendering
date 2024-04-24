import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { getZIndex } from '../lib/getZIndex';
import { palette as themePalette } from '../palette';

type Props = {
	children: React.ReactNode;
	area: string;
	layout?: string;
	hideBorder?: boolean;
	/**
	 * The element type to use.
	 */
	element?: 'div' | 'article' | 'main' | 'aside' | 'section';
};

export const gridLeftBorder = css`
	${from.leftCol} {
		position: relative;
		::before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			left: -10px;
			width: 1px;
			height: 100%;
			border-left: 1px solid ${themePalette('--article-border')};
		}
	}
`;

const gridAreaStyles = (area: string, layout: string, hideBorder: boolean) => {
	if (area === 'right-column') {
		return css`
			/* IE Fallback */
			position: absolute;
			top: 0;
			right: 0;
			/* Pop me below the body */
			${getZIndex('rightColumnArea')}

			@supports (display: grid) {
				position: relative;
				grid-area: ${area};
			}
		`;
	}

	if (area === 'body') {
		return css`
			grid-area: ${area};
			/* Pop me above the right column */
			${getZIndex('bodyArea')}
		`;
	}

	if (hideBorder) {
		return css`
			grid-area: ${area};
		`;
	}

	if (
		area === 'matchNav' ||
		area === 'matchtabs' ||
		area === 'byline' ||
		area === 'headline' ||
		area === 'standfirst' ||
		area === 'media' ||
		area === 'submeta' ||
		(layout === 'interactive' && area === 'lines') ||
		(layout === 'interactive' && area === 'meta')
	) {
		return css`
			grid-area: ${area};
			${gridLeftBorder}
		`;
	}

	return css`
		grid-area: ${area};
	`;
};

export const GridItem = ({
	children,
	area,
	layout = '',
	hideBorder = false,
	element: Element = 'div',
}: Props) => (
	<Element css={gridAreaStyles(area, layout, hideBorder)} data-gu-name={area}>
		{children}
	</Element>
);
