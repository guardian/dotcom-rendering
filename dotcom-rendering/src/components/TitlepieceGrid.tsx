import type { SerializedStyles } from '@emotion/react';
import { css, jsx } from '@emotion/react';
import { from, palette, until } from '@guardian/source-foundations';
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

	a {
		color: ${palette.neutral[100]};
		text-decoration: none;
	}

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
	style,
}: PropsWithChildren<{
	type: keyof JSX.IntrinsicElements;
	style?: CSSProperties;
}>) => jsx(type, { css: grid, style }, children);

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

export const Lines = ({
	colour = palette.neutral[86],
	right = true,
	left = true,
	top = false,
	bottom = false,
	gridRowStart = 1,
}: {
	colour?: string;
	right?: boolean;
	left?: boolean;
	top?: boolean;
	bottom?: boolean;
	gridRowStart?: number;
}) => (
	<div
		style={{
			gridColumn: 'content',
			gridRowStart,
			gridRowEnd: -1,
			borderColor: colour,
			borderRightStyle: right ? 'solid' : undefined,
			borderLeftStyle: left ? 'solid' : undefined,
			borderTopStyle: top ? 'solid' : undefined,
			borderBottomStyle: bottom ? 'solid' : undefined,
		}}
		css={css`
			border-width: 1px;

			margin: 0 -10px;

			${from.mobileLandscape} {
				margin: 0 -20px;
			}

			${until.tablet} {
				border-left-style: none;
			}
		`}
	/>
);
