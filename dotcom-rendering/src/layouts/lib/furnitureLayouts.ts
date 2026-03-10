import { css, type SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';

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
		{ mobile?: number; tablet?: number; leftCol?: number; desktop?: number }
	>
>;

type BreakpointRows = Area[][];

type LayoutDefinition = {
	mobile?: BreakpointRows;
	tablet?: BreakpointRows;
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

const buildRowMap = (layout: LayoutDefinition): LayoutRows => {
	const map: LayoutRows = {} as LayoutRows;

	const apply = (
		rows: Area[][] | undefined,
		breakpoint: 'mobile' | 'tablet' | 'leftCol',
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

export const rowCss = (
	area: Area,
	layoutType: LayoutType,
): SerializedStyles => {
	const rows = rowMaps[layoutType][area] ?? {};

	return css(
		Object.entries(rows).map(
			([bp, row]) => css`
				${breakpointQueries[bp as keyof typeof breakpointQueries]} {
					grid-row: ${row};
				}
			`,
		),
	);
};
