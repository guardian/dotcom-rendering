// ----- Imports ----- //

import {
	breakpoints,
	from as fromBreakpoint,
} from '@guardian/source/foundations';

// ----- Columns & Lines ----- //

/**
 * Named CSS grid lines, based on the three columns commonly used for Guardian
 * layouts.
 */
type Line =
	| 'grid-start'
	| 'left-column-start'
	| 'left-column-end'
	| 'centre-column-start'
	| 'centre-column-end'
	| 'right-column-start'
	| 'right-column-end'
	| 'grid-end';

const mobileColumns =
	'[grid-start] 0px [centre-column-start] repeat(4, 1fr) [centre-column-end] 0px [grid-end]';
const tabletColumns =
	'[grid-start] 1fr [centre-column-start] repeat(12, 40px) [centre-column-end] 1fr [grid-end]';
const desktopColumns =
	'[grid-start] 1fr [centre-column-start] repeat(8, 60px) [centre-column-end right-column-start] repeat(4, 60px) [right-column-end] 1fr [grid-end]';
const leftColColumns =
	'[grid-start] 1fr [left-column-start] repeat(2, 60px) [left-column-end centre-column-start] repeat(8, 60px) [centre-column-end right-column-start] repeat(4, 60px) [right-column-end] 1fr [grid-end]';
const wideColumns =
	'[grid-start] 1fr [left-column-start] repeat(3, 60px) [left-column-end centre-column-start] repeat(8, 60px) [centre-column-end] 60px [right-column-start] repeat(4, 60px) [right-column-end] 1fr [grid-end]';
const mobileColumnGap = '10px';
const columnGap = '20px';

// ----- Grid Styles ----- //

const container = `
    display: grid;
    grid-template-columns: ${mobileColumns};
    column-gap: ${mobileColumnGap};

    ${fromBreakpoint.mobileLandscape} {
        column-gap: ${columnGap};
    }

    ${fromBreakpoint.tablet} {
        grid-template-columns: ${tabletColumns};
    }

    ${fromBreakpoint.desktop} {
        grid-template-columns: ${desktopColumns};
    }

    ${fromBreakpoint.leftCol} {
        grid-template-columns: ${leftColColumns};
    }

    ${fromBreakpoint.wide} {
        grid-template-columns: ${wideColumns};
    }
`;

const paddedContainer = `
	${container}

	${fromBreakpoint.tablet} {
		width: ${breakpoints.tablet}px;
		margin: 0 auto;
	}

	${fromBreakpoint.desktop} {
		width: ${breakpoints.desktop}px;
    }

    ${fromBreakpoint.leftCol} {
		width: ${breakpoints.leftCol}px;
    }

    ${fromBreakpoint.wide} {
		width: ${breakpoints.wide}px;
    }
`;

// ----- API ----- //

/**
 * Ask the element to span all grid columns between two grid lines. The lines
 * can be specified either by `Line` name or by number.
 * @param from The grid line to start from, either a `Line` name or a number.
 * @param to The grid line to end at, either a `Line` name or a number.
 * @returns {string} CSS to place the element on the grid.
 *
 * @example <caption>Will place the element in the centre column.</caption>
 * const styles = css`
 *   ${grid.between('centre-column-start', 'centre-column-end')}
 * `;
 *
 * @example <caption>Will place the element between lines 3 and 5.</caption>
 * const styles = css`
 *   ${grid.between(3, 5)}
 * `;
 */
const between = (from: Line | number, to: Line | number): string => `
    grid-column: ${from} / ${to};
`;

/**
 * Ask the element to span a number of grid columns, starting at a specific
 * grid line. The line can be specified either by `Line` name or by number.
 * @param start The grid line to start from, either a `Line` name or a number.
 * @param columns The number of columns to span.
 * @returns {string} CSS to place the element on the grid.
 *
 * @example <caption>The element will span 3 columns from the line.</caption>
 * const styles = css`
 *   ${grid.span('centre-column-start', 3)}
 * `;
 */
const span = (start: Line | number, columns: number): string => `
    grid-column: ${start} / span ${columns};
`;

/**
 * An API implementing the Guardian Grid using CSS grid. For more information
 * on the Guardian Grid see https://theguardian.design/2a1e5182b/p/41be19-grids
 */
const grid = {
	/**
	 * CSS to set up the grid container. It applies `display: grid;` etc.
	 *
	 * @example
	 * const Component = () =>
	 *   <div css={css`${grid.container}`}>
	 *     <h1 css={css`grid-row: 1;`}>Headline</h1>
	 *     <p css={css`grid-row: 2;`}>Standfirst</p>
	 *   </div>
	 */
	container,
	paddedContainer,
	/**
	 * Place the element into one of the common Guardian layout columns. The
	 * breakpoints at which they're available are as follows:
	 *
	 * - **Centre** exists for all breakpoints
	 * - **Left** exists from the `leftCol` breakpoint up
	 * - **Right** exists from the `desktop` breakpoint up
	 * - **All** means take up the entire width of the viewport, "all" columns,
	 * and exists for every breakpoint
	 */
	column: {
		/**
		 * Place the element into the centre column. Available for all
		 * breakpoints.
		 */
		centre: between('centre-column-start', 'centre-column-end'),
		/**
		 * Place the element into the left column. Available for `leftCol`
		 * and above breakpoints.
		 */
		left: between('left-column-start', 'left-column-end'),
		/**
		 * Place the element into the right column. Available for `desktop`
		 * and above breakpoints.
		 */
		right: between('right-column-start', 'right-column-end'),
		/**
		 * Ask the element to take up the entire width of the grid.
		 * Available for all breakpoints.
		 */
		all: between('grid-start', 'grid-end'),
	},
	between,
	span,
	/**
	 * The gap between grid columns from the `mobileLandscape` breakpoint up.
	 */
	columnGap,
	/**
	 * The gap between grid columns when below the `mobileLandscape`
	 * breakpoint.
	 */
	mobileColumnGap,
} as const;

// ----- Exports ----- //

export { grid };
