import { css, type SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { grid, type Line } from '../../grid';

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

type LayoutRows = Partial<
	Record<
		Area,
		{ mobile?: number; tablet?: number; desktop?: number; leftCol?: number }
	>
>;

type BreakpointRows = Area[][];

type LayoutDefinition = {
	mobile?: BreakpointRows;
	tablet?: BreakpointRows;
	desktop?: BreakpointRows;
	leftCol?: BreakpointRows;
};

const furnitureRowLayouts: Record<LayoutType, LayoutDefinition> = {
	standard: {
		tablet: [
			['title'],
			['headline'],
			['standfirst'],
			['main-media'],
			['meta'],
		],

		leftCol: [
			['title', 'headline'],
			['standfirst'],
			['meta', 'main-media'],
		],
	},
	matchReport: {
		tablet: [
			['match-summary'],
			['title'],
			['headline'],
			['standfirst'],
			['main-media'],
			['meta'],
		],
		leftCol: [
			['title', 'match-summary'],
			['headline'],
			['meta', 'main-media'],
		],
	},
	media: {
		mobile: [
			['title'],
			['headline'],
			['main-media'],
			['standfirst'],
			['meta'],
		],
		tablet: [
			['title'],
			['headline'],
			['main-media'],
			['standfirst'],
			['meta'],
		],
		leftCol: [
			['title', 'headline'],
			['meta', 'main-media'],
			['standfirst'],
		],
	},
};

type BreakpointColumns = Partial<
	Record<
		'mobile' | 'tablet' | 'desktop' | 'leftCol',
		Column | [Line | number, Line | number]
	>
>;

type ColumnLayoutMap = Partial<Record<Area, BreakpointColumns>>;

const furnitureColumnLayouts: Record<LayoutType, ColumnLayoutMap> = {
	standard: {},
	media: {
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
	matchReport: {},
};

const buildRowMap = (layout: LayoutDefinition): LayoutRows => {
	const map: LayoutRows = {} as LayoutRows;

	const apply = (
		rows: Area[][] | undefined,
		breakpoint: 'mobile' | 'tablet' | 'desktop' | 'leftCol',
	) => {
		if (!rows) return;

		for (const [index, areas] of rows.entries()) {
			const row = index + 1;

			for (const area of areas) {
				map[area] ??= {};
				map[area][breakpoint] = row;
			}
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
) as Record<LayoutType, LayoutRows>;

const breakpointQueries = {
	mobile: until.tablet,
	tablet: from.tablet,
	leftCol: from.leftCol,
	desktop: from.desktop,
} as const;

type Column = 'left' | 'centre' | 'right';

type ColumnConfig = Partial<Record<'tablet' | 'desktop' | 'leftCol', Column>>;

export const gridCss = (
	area: Area,
	layoutType: LayoutType,
	columnsOverride?: ColumnConfig,
): SerializedStyles => {
	const rows = rowMaps[layoutType][area] ?? {};
	const columns = furnitureColumnLayouts[layoutType][area] ?? {};

	return css([
		grid.column.centre, // default
		Object.entries(rows).map(
			([bp, row]) => css`
				${breakpointQueries[bp as keyof typeof breakpointQueries]} {
					grid-row: ${row};
				}
			`,
		),
		Object.entries(columns).map(([bp, colOrSpan]) => {
			const colStyle = Array.isArray(colOrSpan)
				? grid.between(colOrSpan[0], colOrSpan[1])
				: grid.column[colOrSpan as keyof typeof grid.column];

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
						${grid.column[col as keyof typeof grid.column]};
					}
				`,
			),
	]);
};
