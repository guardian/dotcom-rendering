import { css, jsx } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { CSSProperties, PropsWithChildren } from 'react';

const grid = css`
	display: grid;
	grid-auto-rows: auto;

	grid-template-columns:
		[viewport-start]
		0
		[content-start main-column-start]
		repeat(4, minmax(0, 1fr))
		[content-end main-column-end]
		0
		[viewport-end];

	column-gap: 10px;

	${from.mobileLandscape} {
		column-gap: 20px;
	}

	${from.tablet} {
		grid-template-columns:
			[viewport-start]
			minmax(0, 1fr)
			[content-start main-column-start]
			repeat(12, 40px)
			[content-end main-column-end]
			minmax(0, 1fr)
			[viewport-end];
	}

	${from.desktop} {
		grid-template-columns:
			[viewport-start]
			minmax(0, 1fr)
			[content-start main-column-start]
			repeat(12, 60px)
			[content-end main-column-end]
			minmax(0, 1fr)
			[viewport-end];
	}
`;

const gridBeyondDesktop = css`
	${from.leftCol} {
		grid-template-columns:
			[viewport-start]
			minmax(0, 1fr)
			[content-start left-column-start]
			repeat(2, 60px)
			[left-column-end main-column-start]
			repeat(12, 60px)
			[content-end main-column-end]
			minmax(0, 1fr)
			[viewport-end];
	}

	${from.wide} {
		grid-template-columns:
			[viewport-start]
			minmax(0, 1fr)
			[content-start left-column-start]
			repeat(3, 60px)
			[left-column-end main-column-start]
			repeat(12, 60px)
			[main-column-end]
			repeat(1, 60px)
			[content-end]
			minmax(0, 1fr)
			[viewport-end];
	}
`;

/**
 * Create a CSS grid container.
 * Use jointly with Content, LeftCol & RightCol.
 *
 * @see https://theguardian.design/2a1e5182b/p/41be19-grids
 */
export const Grid = ({
	type = 'div',
	style,
	hasPageSkin,
	children,
}: PropsWithChildren<{
	type: keyof JSX.IntrinsicElements;
	hasPageSkin?: boolean;
	style?: CSSProperties;
}>) =>
	jsx(
		type,
		{ css: [grid, !hasPageSkin && gridBeyondDesktop], style },
		children,
	);
