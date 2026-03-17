import { css, type SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { type ColumnPreset, grid, type Line } from '../../grid';

export type LayoutType = 'standard' | 'matchReport' | 'media';

export type Area =
	// Common areas
	| 'title'
	| 'headline'
	| 'standfirst'
	| 'main-media'
	| 'meta'
	| 'body'
	| 'right-column'
	// Match report specific area
	| 'match-summary';

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'leftCol';

// Rows config
const tabletVanillaRows: Rows = [
	['title'],
	['headline'],
	['standfirst'],
	['main-media'],
	['meta'],
	['body'],
];

const desktopVanillaRows: Rows = [
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

const furnitureRowLayouts: Record<LayoutType, LayoutDefinition> = {
	standard: {
		tablet: tabletVanillaRows,
		desktop: desktopVanillaRows,
		leftCol: [
			['title', 'headline', 'right-column'],
			['standfirst', 'right-column'],
			['meta', 'main-media', 'right-column'],
			['meta', 'body', 'right-column'],
		],
	},

	matchReport: {
		tablet: [['match-summary'], ...tabletVanillaRows],
		desktop: [['match-summary', 'right-column'], ...desktopVanillaRows],
		leftCol: [
			['title', 'match-summary', 'right-column'],
			['headline', 'right-column'],
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
const furnitureColumnDefaults: ColumnLayoutMap = {
	title: { leftCol: 'left' },
	meta: { leftCol: 'left' },
	['right-column']: { desktop: 'right' },
};

const furnitureColumnLayouts: Record<LayoutType, ColumnLayoutMap> = {
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
	matchReport: furnitureColumnDefaults,
};

// Types
type RowPlacement = {
	start: number;
	span?: number;
};

type CompiledLayout = Partial<
	Record<Area, Partial<Record<Breakpoint, RowPlacement>>>
>;

type Rows = Area[][];

type LayoutDefinition = {
	mobile?: Rows;
	tablet?: Rows;
	desktop?: Rows;
	leftCol?: Rows;
};

type BreakpointColumns = Partial<
	Record<Breakpoint, ColumnPreset | [Line | number, Line | number]>
>;

type ColumnLayoutMap = Partial<Record<Area, BreakpointColumns>>;

// Guardian Grid CSS generation
const buildRowMap = (layout: LayoutDefinition): CompiledLayout => {
	const map: CompiledLayout = {};

	const apply = (rows: Rows | undefined, breakpoint: Breakpoint) => {
		if (!rows) return;

		const areaRows: Record<string, number[]> = {};

		for (const [index, areas] of rows.entries()) {
			const row = index + 1;

			for (const area of areas) {
				areaRows[area] ??= [];
				areaRows[area].push(row);
			}
		}

		for (const [area, rowList] of Object.entries(areaRows) as [
			Area,
			number[],
		][]) {
			const start = rowList[0];
			const span = rowList.length > 1 ? rowList.length : undefined;

			if (start == null) continue;

			map[area] ??= {};
			map[area][breakpoint] = { start, span };
		}
	};

	apply(layout.mobile, 'mobile');
	apply(layout.tablet, 'tablet');
	apply(layout.desktop, 'desktop');
	apply(layout.leftCol, 'leftCol');

	return map;
};

const rowMaps = Object.fromEntries(
	Object.entries(furnitureRowLayouts).map(([name, layout]) => [
		name,
		buildRowMap(layout),
	]),
) as Record<LayoutType, CompiledLayout>;

const breakpointQueries = {
	mobile: until.tablet,
	tablet: from.tablet,
	leftCol: from.leftCol,
	desktop: from.desktop,
} as const;

type ColumnConfig = Partial<Record<Breakpoint, ColumnPreset>>;

export const gridCss = (
	area: Area,
	layoutType: LayoutType,
	columnsOverride?: ColumnConfig,
): SerializedStyles => {
	const defaultColumn = grid.column.centre;

	const rows = rowMaps[layoutType][area] ?? {};
	const columns = furnitureColumnLayouts[layoutType][area] ?? {};

	return css([
		defaultColumn,
		Object.entries(rows).map(([bp, placement]) => {
			const rowValue =
				placement.span != null
					? `${placement.start} / span ${placement.span}`
					: placement.start;

			return css`
				${breakpointQueries[bp as Breakpoint]} {
					grid-row: ${rowValue};
				}
			`;
		}),
		Object.entries(columns).map(([bp, colOrSpan]) => {
			const colStyle = Array.isArray(colOrSpan)
				? grid.between(colOrSpan[0], colOrSpan[1])
				: grid.column[colOrSpan];

			return css`
				${from[bp as keyof typeof from]} {
					${colStyle};
				}
			`;
		}),
		columnsOverride &&
			Object.entries(columnsOverride).map(
				([bp, col]) => css`
					${from[bp as keyof typeof from]} {
						${grid.column[col]};
					}
				`,
			),
	]);
};
