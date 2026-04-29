import { css, type SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { type ColumnPreset, grid, type Line } from '../../grid';

export type LayoutType = 'standard' | 'media';

export type Area =
	| 'title'
	| 'headline'
	| 'standfirst'
	| 'main-media'
	| 'meta'
	| 'body'
	| 'right-column';

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'leftCol';

// Rows config
const tabletStandardRows: Rows = [
	['title'],
	['headline'],
	['standfirst'],
	['main-media'],
	['meta'],
	['body'],
];

const desktopStandardRows: Rows = [
	['title', 'right-column'],
	['headline', 'right-column'],
	['standfirst', 'right-column'],
	['main-media', 'right-column'],
	['meta', 'right-column'],
	['body', 'right-column'],
];

const mediaRowsUntilDesktop: Rows = [
	['title'],
	['headline'],
	['main-media'],
	['standfirst'],
	['meta'],
	['body'],
];

// Breakpoints not listed here inherit browser default flow (no grid-row applied)
const furnitureRowArrangements: Record<LayoutType, ArrangementDefinition> = {
	standard: {
		tablet: tabletStandardRows,
		desktop: desktopStandardRows,
		leftCol: [
			['title', 'headline', 'right-column'],
			['standfirst', 'right-column'],
			['meta', 'main-media', 'right-column'],
			['meta', 'body', 'right-column'],
		],
	},
	media: {
		mobile: mediaRowsUntilDesktop,
		tablet: mediaRowsUntilDesktop,
		desktop: [
			['title'],
			['headline'],
			['main-media', 'right-column'],
			['standfirst', 'right-column'],
			['meta', 'right-column'],
			['body', 'right-column'],
		],
		leftCol: [
			['title', 'headline'],
			['meta', 'main-media', 'right-column'],
			['meta', 'standfirst', 'right-column'],
			['meta', 'body', 'right-column'],
		],
	},
};

// Columns config
const furnitureColumnDefaults: ColumnArrangementMap = {
	title: { leftCol: 'left' },
	meta: { leftCol: 'left' },
	['right-column']: { desktop: 'right' },
};

// Array form means [gridLineStart, gridLineEnd] — used for custom-width spans
const furnitureColumnArrangements: Record<LayoutType, ColumnArrangementMap> = {
	standard: furnitureColumnDefaults,
	media: {
		...furnitureColumnDefaults,
		'main-media': {
			desktop: ['centre-column-start', 'right-column-start'],
		},
		standfirst: {
			desktop: ['centre-column-start', 'right-column-start'],
		},
		body: {
			desktop: ['centre-column-start', 'right-column-start'],
		},
	},
};

// Types
type Rows = Area[][];

type ArrangementDefinition = {
	mobile?: Rows;
	tablet?: Rows;
	desktop?: Rows;
	leftCol?: Rows;
};

type BreakpointColumns = Partial<
	Record<Breakpoint, ColumnPreset | [Line | number, Line | number]>
>;

type ColumnArrangementMap = Partial<Record<Area, BreakpointColumns>>;

const breakpointQueries: Record<Breakpoint, string> = {
	mobile: until.tablet,
	tablet: from.tablet,
	desktop: from.desktop,
	leftCol: from.leftCol,
};

/**
 * Returns the Emotion CSS needed to position a single grid item — its
 * default column, its row at each breakpoint, and any column overrides.
 * The grid item _must_ be inside a {@link grid} module container.
 *
 * The output is built from three layers, applied in order (later wins):
 * 1. **Default column** — all items start in the centre column.
 * 2. **Row placement** — `grid-row` values per breakpoint, read directly
 *    from {@link furnitureRowArrangements}.
 * 3. **Column placement** — column overrides per breakpoint from
 *    {@link furnitureColumnArrangements} (e.g. `meta` shifts left on wide screens).
 *
 * @param area - The named piece of article furniture to position (e.g. `'headline'`, `'body'`).
 * @param layoutType - See {@link LayoutType}. Determines which CSS map to use for lookups.
 *
 * @example
 * // In a React component:
 * <div css={gridItemCss('headline', 'standard')} />
 */
export const gridItemCss = (
	area: Area,
	layoutType: LayoutType,
): SerializedStyles => {
	const layoutRowConfig = furnitureRowArrangements[layoutType];
	const areaColumnsConfig =
		furnitureColumnArrangements[layoutType][area] ?? {};

	const rowPlacementCss = (
		Object.entries(layoutRowConfig) as [Breakpoint, Rows][]
	).flatMap(([breakpoint, rows]) => {
		// Find which row indices the area appears in (1-indexed for CSS grid)
		const rowIndicesOfArea = rows
			.map((areas, i) => (areas.includes(area) ? i + 1 : null))
			.filter((i): i is number => i !== null);

		if (rowIndicesOfArea.length === 0) return [];

		const startingRow = rowIndicesOfArea[0];
		const rowValue =
			rowIndicesOfArea.length > 1
				? `${startingRow} / span ${rowIndicesOfArea.length}`
				: startingRow;

		return css`
			${breakpointQueries[breakpoint]} {
				grid-row: ${rowValue};
			}
		`;
	});

	const columnPlacementCss = Object.entries(areaColumnsConfig).map(
		([breakpoint, colOrSpan]) => {
			const colStyle = Array.isArray(colOrSpan)
				? grid.between(colOrSpan[0], colOrSpan[1])
				: grid.column[colOrSpan];

			return css`
				${from[breakpoint as keyof typeof from]} {
					${colStyle};
				}
			`;
		},
	);

	return css([grid.column.centre, rowPlacementCss, columnPlacementCss]);
};
