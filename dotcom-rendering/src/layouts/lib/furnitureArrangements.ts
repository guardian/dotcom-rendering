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
type RowPlacement = {
	start: number;
	span?: number;
};

type CompiledArrangement = Partial<
	Record<Area, Partial<Record<Breakpoint, RowPlacement>>>
>;

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

// Guardian Grid CSS generation
const buildRowMap = (
	arrangement: ArrangementDefinition,
): CompiledArrangement => {
	const map: CompiledArrangement = {};

	const collectRowsForBreakpoint = (
		rows: Rows | undefined,
		breakpoint: Breakpoint,
	) => {
		if (!rows) return;

		const areaRows: Record<string, number[]> = {};

		for (const [index, areas] of rows.entries()) {
			const cssGridOffset = 1; // CSS grid is 1-indexed
			const row = index + cssGridOffset;

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

	collectRowsForBreakpoint(arrangement.mobile, 'mobile');
	collectRowsForBreakpoint(arrangement.tablet, 'tablet');
	collectRowsForBreakpoint(arrangement.desktop, 'desktop');
	collectRowsForBreakpoint(arrangement.leftCol, 'leftCol');

	return map;
};

const rowMaps = Object.fromEntries(
	Object.entries(furnitureRowArrangements).map(([name, arrangement]) => [
		name,
		buildRowMap(arrangement),
	]),
) as Record<LayoutType, CompiledArrangement>;

const breakpointQueries = {
	mobile: until.tablet,
	tablet: from.tablet,
	leftCol: from.leftCol,
	desktop: from.desktop,
} as const;

export const gridItemCss = (
	area: Area,
	layoutType: LayoutType,
): SerializedStyles => {
	const rows = rowMaps[layoutType][area] ?? {};
	const columns = furnitureColumnArrangements[layoutType][area] ?? {};

	const defaultColumnCss = grid.column.centre;
	const rowPlacementCss = Object.entries(rows).map(([bp, placement]) => {
		const rowValue =
			placement.span != null
				? `${placement.start} / span ${placement.span}`
				: placement.start;

		return css`
			${breakpointQueries[bp as Breakpoint]} {
				grid-row: ${rowValue};
			}
		`;
	});
	const columnPlacementCss = Object.entries(columns).map(
		([bp, colOrSpan]) => {
			const colStyle = Array.isArray(colOrSpan)
				? grid.between(colOrSpan[0], colOrSpan[1])
				: grid.column[colOrSpan];

			return css`
				${from[bp as keyof typeof from]} {
					${colStyle};
				}
			`;
		},
	);

	return css([defaultColumnCss, rowPlacementCss, columnPlacementCss]);
};
