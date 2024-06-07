import type { SerializedStyles } from '@emotion/react';
import { css, jsx } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { CSSProperties, PropsWithChildren } from 'react';
import { palette as themePalette } from '../palette';

const colours = css`
	background-color: ${themePalette('--masthead-nav-background')};
	color: ${themePalette('--masthead-nav-link-text')};
`;

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
export const TitlepieceGrid = ({
	type = 'div',
	children,
}: PropsWithChildren<{
	type: keyof JSX.IntrinsicElements;
	style?: CSSProperties;
}>) => jsx(type, { css: [colours, grid] }, children);

/** Spans the entire width of the grid */
export const Content = ({
	children,
	styles,
}: PropsWithChildren<{ styles?: SerializedStyles }>) => (
	<section style={{ gridColumn: 'content' }} css={styles}>
		{children}
	</section>
);

export const MainColumn = ({
	children,
	styles,
}: PropsWithChildren<{ styles?: SerializedStyles }>) => (
	<section
		style={{ gridColumn: 'main-column', gridRowStart: 1 }}
		css={styles}
	>
		{children}
	</section>
);

const hideUntilLeftCol = css`
	display: none;
	${from.leftCol} {
		display: block;
	}
`;
/** Only visible from leftCol / 1140px */
export const LeftColumn = ({ children }: PropsWithChildren) => (
	<section
		style={{ gridColumn: 'left-column', gridRowStart: 1 }}
		css={hideUntilLeftCol}
	>
		{children}
	</section>
);

const hideUntilDesktop = css`
	display: none;
	${from.leftCol} {
		display: block;
	}
`;
/** Only visible from desktop / 980px */
export const RightColumn = ({ children }: PropsWithChildren) => (
	<section style={{ gridColumn: 'right-column' }} css={hideUntilDesktop}>
		{children}
	</section>
);
