import { css } from '@emotion/react';
import type { Decorator } from '@storybook/react';
import { grid } from './grid';
import { from } from '@guardian/source/foundations';

/**
 * If "Side-by-side Horizontal" is set in the toolbar, the grid decorator is not
 * applied.
 *
 * This is because the grid layout no longer works when the viewport is split in
 * half by the `splitTheme` decorator, as it relies on the full viewport width
 * being available.
 */
const whenNotHorizontalSplit: (decorator: Decorator) => Decorator =
	(decorator) => (Story, context) =>
		context.globals.globalColourScheme === 'horizontal' ? (
			<Story />
		) : (
			decorator(Story, context)
		);

/**
 * Wrap the story in a Guardian grid container. This allows styles either
 *
 * 1. Within the component
 * 2. In the story
 * 3. In other decorators
 *
 * to position elements on the grid.
 */
export const gridContainerDecorator: Decorator = whenNotHorizontalSplit(
	(Story) => (
		<div css={css(grid.container)}>
			<Story />
		</div>
	),
);

/**
 * Place the story in the centre column of a Guardian grid across all
 * breakpoints.
 */
export const centreColumnDecorator: Decorator = whenNotHorizontalSplit(
	(Story) => (
		<div css={css(grid.container)}>
			<div
				css={css`
					${grid.column.centre}
				`}
			>
				<Story />
			</div>
		</div>
	),
);

/**
 * Place the story in the left column of a Guardian grid, when available.
 * On narrower breakpoints, where the left column isn't available, it will
 * instead be placed in the centre column (this is a common layout pattern).
 */
export const leftColumnDecorator: Decorator = whenNotHorizontalSplit(
	(Story) => (
		<div css={css(grid.container)}>
			<div
				css={css`
					${grid.column.centre}

					${from.leftCol} {
						${grid.column.left}
					}
				`}
			>
				<Story />
			</div>
		</div>
	),
);

/**
 * Place the story in the right column of a Guardian grid, when available.
 * On narrower breakpoints, where the right column isn't available, it will
 * instead be placed in the centre column (this is a common layout pattern).
 */
export const rightColumnDecorator: Decorator = whenNotHorizontalSplit(
	(Story) => (
		<div css={css(grid.container)}>
			<div
				css={css`
					${grid.column.centre}

					${from.desktop} {
						${grid.column.right}
					}
				`}
			>
				<Story />
			</div>
		</div>
	),
);
