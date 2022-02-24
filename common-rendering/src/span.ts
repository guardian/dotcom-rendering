// ----- Definitions ----- //

/**
 * The Guardian Grid sizes, used for structuring page designs. For more
 * information see https://theguardian.design/2a1e5182b/p/41be19-grids or
 * the documentation for the `span` function in this module.
 */
enum Grid {
    Tablet,
    Desktop,
    LeftCol,
    Wide,
}

const tabletColumnSize = 40;
const desktopColumnSize = 60;
const gutterSize = 20;

// ----- Functions ----- //

const calcSpan = (columnSize: number) => (numColumns: number): number =>
    (numColumns * columnSize) + ((numColumns - 1) * gutterSize);

/**
 * Takes a grid size and a number of columns, and returns the width
 * corresponding to that number of columns at that grid size.
 * 
 * The grid sizes are as follows:
 * - Tablet: 12 columns of 40px, 20px gutters between
 * - Desktop: 12 columns of 60px, 20px gutters between
 * - LeftCol: 14 columns of 60px, 20px gutters between
 * - Wide: 16 columns of 60px, 20px gutters between
 * 
 * See https://theguardian.design/2a1e5182b/p/41be19-grids for documentation
 * on our grids.
 * 
 * The function is curried - you can set it up with the grid size you're
 * working with and provide the number of columns later. This module also
 * provides convenience functions that already do this for each grid size:
 * `spanTablet`, `spanDesktop`, `spanLeftCol` and `spanWide`.
 * 
 * @param grid One of the breakpoint-based Guardian grid sizes: Tablet, Desktop,
 * LeftCol or Wide
 * @param numColumns The number of columns
 * @returns {number} The width in pixels
 * @example
 * const tabletWidth = span(Grid.Tablet)(5) // 280
 * const desktopWidth = span(Grid.Desktop)(5) // 380
 * const leftColWidth = span(Grid.LeftCol)(6) // 460
 * const wideWidth = span(Grid.Wide)(7) // 540
 * 
 * const styles = css`
 *   width: 100%;
 * 
 *   ${from.tablet} {
 *     width: ${tabletWidth}px;
 *   }
 * 
 *   ${from.desktop} {
 *     width: ${desktopWidth}px;
 *   }
 * 
 *   ${from.leftCol} {
 *     width: ${leftColWidth}px;
 *   }
 * 
 *   ${from.wide} {
 *     width: ${wideWidth}px;
 *   }
 * `;
 */
function span(grid: Grid.Tablet): (numColumns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12) => number;
function span(grid: Grid.Desktop): (numColumns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12) => number;
function span(grid: Grid.LeftCol): (numColumns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14) => number;
function span(grid: Grid.Wide): (numColumns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16) => number;
function span(grid: Grid): (numColumns: number) => number {
    switch (grid) {
        case Grid.Tablet:
            return calcSpan(tabletColumnSize);
        case Grid.Desktop:
        case Grid.LeftCol:
        case Grid.Wide:
            return calcSpan(desktopColumnSize);
    }
}

/**
 * Takes a number of columns and returns the width corresponding to that number
 * of columns for the Guardian Tablet grid size.
 * 
 * See the documentation for the `span` function in this module for more
 * information about Guardian grid sizes.
 * 
 * @param numColumns The number of columns, from 1-12
 * @returns {number} The width in pixels
 */
const spanTablet = span(Grid.Tablet);

/**
 * Takes a number of columns and returns the width corresponding to that number
 * of columns for the Guardian Desktop grid size.
 * 
 * See the documentation for the `span` function in this module for more
 * information about Guardian grid sizes.
 * 
 * @param numColumns The number of columns, from 1-12
 * @returns {number} The width in pixels
 */
const spanDesktop = span(Grid.Desktop);

/**
 * Takes a number of columns and returns the width corresponding to that number
 * of columns for the Guardian LeftCol grid size.
 * 
 * See the documentation for the `span` function in this module for more
 * information about Guardian grid sizes.
 * 
 * @param numColumns The number of columns, from 1-14
 * @returns {number} The width in pixels
 */
const spanLeftCol = span(Grid.LeftCol);

/**
 * Takes a number of columns and returns the width corresponding to that number
 * of columns for the Guardian Wide grid size.
 * 
 * See the documentation for the `span` function in this module for more
 * information about Guardian grid sizes.
 * 
 * @param numColumns The number of columns, from 1-16
 * @returns {number} The width in pixels
 */
const spanWide = span(Grid.Wide);

// ----- Exports ----- //

export {
    Grid,
    span,
    spanTablet,
    spanDesktop,
    spanLeftCol,
    spanWide,
}
