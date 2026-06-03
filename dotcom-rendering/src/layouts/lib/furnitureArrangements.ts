import { css, type SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { type ColumnPreset, grid, type Line } from '../../grid';

export type LayoutType = 'standard' | 'media';

export type Area =
	| 'title'
	| 'headline'
	| 'standfirst'
	| 'media'
	| 'meta'
	| 'body'
	| 'right-column';

// Breakpoint must stay in sync with the keys of `from` / `until` from
// @guardian/source/foundations. If those change, this type needs updating too.
type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'leftCol';

// Rows config
const tabletStandardRows: Rows = [
	['title'],
	['headline'],
	['standfirst'],
	['media'],
	['meta'],
	['body'],
];

const desktopStandardRows: Rows = [
	['title', 'right-column'],
	['headline', 'right-column'],
	['standfirst', 'right-column'],
	['media', 'right-column'],
	['meta', 'right-column'],
	['body', 'right-column'],
];

const mediaRowsUntilDesktop: Rows = [
	['title'],
	['headline'],
	['media'],
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
			['meta', 'media', 'right-column'],
			['meta', 'body', 'right-column'],
		],
	},
	media: {
		mobile: mediaRowsUntilDesktop,
		tablet: mediaRowsUntilDesktop,
		desktop: [
			['title'],
			['headline'],
			['media', 'right-column'],
			['standfirst', 'right-column'],
			['meta', 'right-column'],
			['body', 'right-column'],
		],
		leftCol: [
			['title', 'headline'],
			['meta', 'media', 'right-column'],
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
		media: {
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
 * Returns the CSS `grid-row` value for an area at a given breakpoint, or null
 * if the area doesn't appear in that breakpoint's row config.
 *
 * Consecutive row appearances are collapsed into a single span, e.g. rows
 * [2, 3, 4] becomes "2 / span 3".
 */
const getRowValue = (area: Area, rows: Rows): string | number | null => {
	const indices = rows
		.map((areas, i) => (areas.includes(area) ? i + 1 : null))
		.filter((i): i is number => i !== null);

	if (indices.length === 0) return null;

	return indices.length > 1
		? `${indices[0]} / span ${indices.length}`
		: indices[0] ?? null;
};

/**
 * Returns the `grid-column` CSS string for a column config entry — either a
 * named preset (e.g. 'left', 'right') or a custom [start, end] line pair.
 */
const getColumnStyle = (
	colOrSpan: ColumnPreset | [Line | number, Line | number],
): string =>
	Array.isArray(colOrSpan)
		? grid.between(colOrSpan[0], colOrSpan[1])
		: grid.column[colOrSpan];

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
		const rowValue = getRowValue(area, rows);
		if (rowValue === null) return [];

		return css`
			${breakpointQueries[breakpoint]} {
				grid-row: ${rowValue};
			}
		`;
	});

	const columnPlacementCss = Object.entries(areaColumnsConfig).map(
		([breakpoint, colOrSpan]) => css`
			${from[breakpoint as keyof typeof from]} {
				${getColumnStyle(colOrSpan)};
			}
		`,
	);

	return css([grid.column.centre, rowPlacementCss, columnPlacementCss]);
};
