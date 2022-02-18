// ----- Definitions ----- //

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

const spanTablet = span(Grid.Tablet);
const spanDesktop = span(Grid.Desktop);
const spanLeftCol = span(Grid.LeftCol);
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
