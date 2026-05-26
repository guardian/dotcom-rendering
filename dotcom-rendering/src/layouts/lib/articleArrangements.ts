import { css, type SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';
import { grid } from '../../grid';

export type LayoutType =
	| 'standard'
	| 'showcase'
	| 'media'
	| 'immersiveLandscape'
	| 'immersivePortrait';

export type Area =
	| 'title'
	| 'headline'
	| 'standfirst'
	| 'media'
	| 'meta'
	| 'body'
	| 'right-column';

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'leftCol' | 'wide';

const breakpointQueries: Record<Breakpoint, string> = {
	mobile: until.tablet,
	tablet: from.tablet,
	desktop: from.desktop,
	leftCol: from.leftCol,
	wide: from.wide,
};

// Raw CSS overrides per area per breakpoint. Entries are only needed when an area
// deviates from the default: centre column, single-column mobile layout with areas
// in DOM order (media → title → headline → standfirst → meta → body → right-column).

type AreaCss = Partial<Record<Breakpoint, string>>;
type LayoutCssMap = Partial<Record<Area, AreaCss>>;

const standardCss: LayoutCssMap = {
	title: {
		tablet: 'grid-row: 1;',
		leftCol: `grid-row: 1; ${grid.column.left}`,
	},
	headline: {
		tablet: 'grid-row: 2;',
		leftCol: 'grid-row: 1;',
	},
	standfirst: {
		tablet: 'grid-row: 3;',
		leftCol: 'grid-row: 2;',
	},
	media: {
		tablet: 'grid-row: 4;',
		leftCol: 'grid-row: 3;',
	},
	meta: {
		tablet: 'grid-row: 5;',
		leftCol: `grid-row: 3 / span 2; ${grid.column.left};`,
	},
	body: {
		tablet: 'grid-row: 6;',
		leftCol: 'grid-row: 4;',
	},
	'right-column': {
		desktop: `grid-row: 1 / span 6; ${grid.column.right};`,
		leftCol: `grid-row: 1 / span 4; ${grid.column.right};`,
	},
};

const showcaseCss: LayoutCssMap = {
	title: {
		tablet: 'grid-row: 1;',
		leftCol: `grid-row: 1; ${grid.column.left}`,
	},
	headline: {
		tablet: 'grid-row: 2;',
		leftCol: 'grid-row: 1;',
	},
	standfirst: {
		tablet: 'grid-row: 3;',
	},
	media: {
		tablet: 'grid-row: 4;',
		leftCol: `grid-row: 2; ${grid.between(
			'centre-column-start',
			'right-column-end',
		)}`,
	},
	meta: {
		tablet: 'grid-row: 5;',
		leftCol: `grid-row: 2 / span 2; ${grid.column.left};`,
	},
	body: {
		tablet: 'grid-row: 6;',
		leftCol: 'grid-row: 4;',
	},
	'right-column': {
		desktop: `grid-row: 1 / span 6; ${grid.column.right};`,
		leftCol: `grid-row: 3 / span 2; ${grid.column.right};`,
	},
};

const mediaCss: LayoutCssMap = {
	title: {
		mobile: 'grid-row: 1;',
		tablet: 'grid-row: 1;',
		leftCol: `grid-row: 1; ${grid.column.left};`,
	},
	headline: {
		mobile: 'grid-row: 2;',
		tablet: 'grid-row: 2;',
		leftCol: 'grid-row: 1;',
	},
	media: {
		mobile: 'grid-row: 3;',
		tablet: 'grid-row: 3;',
		desktop: `grid-row: 3; ${grid.between(
			'centre-column-start',
			'right-column-start',
		)};`,
		leftCol: `grid-row: 2; ${grid.between(
			'centre-column-start',
			'right-column-start',
		)};`,
	},
	standfirst: {
		mobile: 'grid-row: 4;',
		tablet: 'grid-row: 4;',
		desktop: `grid-row: 4; ${grid.between(
			'centre-column-start',
			'right-column-start',
		)};`,
		leftCol: `grid-row: 3; ${grid.between(
			'centre-column-start',
			'right-column-start',
		)};`,
	},
	meta: {
		mobile: 'grid-row: 5;',
		tablet: 'grid-row: 5;',
		leftCol: `grid-row: 2 / span 3; ${grid.column.left};`,
	},
	body: {
		desktop: `grid-row: 6; ${grid.between(
			'centre-column-start',
			'right-column-start',
		)};`,
		leftCol: `grid-row: 4; ${grid.between(
			'centre-column-start',
			'right-column-start',
		)};`,
	},
	'right-column': {
		desktop: `grid-row: 3 / span 4; ${grid.column.right};`,
		leftCol: `grid-row: 2 / span 3; ${grid.column.right};`,
	},
};

const immersivePortraitCss: LayoutCssMap = {
	title: {
		mobile: 'grid-row: 1;',
		tablet: 'grid-row: 1;',
		desktop: 'grid-row: 1; grid-column: centre-column-start / 8;',
		leftCol: 'grid-row: 1; grid-column: left-column-start / 9;',
	},
	headline: {
		mobile: 'grid-row: 2;',
		tablet: 'grid-row: 2;',
		desktop: 'grid-row: 2; grid-column: centre-column-start / 8;',
		leftCol: 'grid-row: 2; grid-column: left-column-start / 9;',
		wide: 'grid-row: 2; grid-column: left-column-start / 10;',
	},
	media: {
		mobile: 'grid-row: 3;',
		tablet: 'grid-row: 3;',
		desktop: 'grid-row: 1 / span 4; grid-column: 8 / right-column-end;',
		leftCol: 'grid-row: 1 / span 3; grid-column: 9 / right-column-end;',
		wide: 'grid-row: 1 / span 3; grid-column: 10 / right-column-end;',
	},
	standfirst: {
		mobile: 'grid-row: 4;',
		tablet: 'grid-row: 4;',
		desktop: 'grid-row: 3; grid-column: centre-column-start / 7;',
		leftCol: 'grid-row: 3; grid-column: centre-column-start / 8;',
		wide: 'grid-row: 3; grid-column: centre-column-start / 9;',
	},
	meta: {
		mobile: 'grid-row: 5;',
		tablet: 'grid-row: 5;',
		desktop: 'grid-row: 4; grid-column: centre-column-start / 8;',
		leftCol:
			'grid-row: 3; grid-column: left-column-start / left-column-end;',
	},
	body: {
		mobile: 'grid-row: 6;',
	},
	'right-column': {
		desktop:
			'grid-row: 5; grid-column: right-column-start / right-column-end;',
		leftCol:
			'grid-row: 4; grid-column: right-column-start / right-column-end;',
	},
};

const immersiveLandscapeCss: LayoutCssMap = {
	title: {
		mobile: 'grid-row: 1;',
		tablet: 'grid-row: 1;',
		desktop: 'grid-row: 2;',
	},
	headline: {
		mobile: 'grid-row: 2;',
		tablet: 'grid-row: 2;',
		desktop: 'grid-row: 3 / span 2;',
	},
	media: {
		mobile: 'grid-row: 3;',
		tablet: 'grid-row: 3;',
		desktop:
			'grid-row: 1 / span 3; grid-column: centre-column-start / right-column-end;',
		leftCol:
			'grid-row: 1 / span 3; grid-column: left-column-start / right-column-end;',
	},
	standfirst: {
		mobile: 'grid-row: 4;',
		tablet: 'grid-row: 4;',
		desktop: 'grid-row: 5;',
	},
	meta: {
		mobile: 'grid-row: 5;',
		tablet: 'grid-row: 5;',
		desktop: 'grid-row: 6; grid-column: centre-column-start / 8;',
		leftCol:
			'grid-row: 6 / span 2; grid-column: left-column-start / left-column-end;',
	},
	body: {
		mobile: 'grid-row: 6;',
	},
	'right-column': {
		desktop:
			'grid-row: 5 / span 3; grid-column: right-column-start / right-column-end;',
	},
};

const layoutCssMaps: Record<LayoutType, LayoutCssMap> = {
	standard: standardCss,
	showcase: showcaseCss,
	media: mediaCss,
	immersiveLandscape: immersiveLandscapeCss,
	immersivePortrait: immersivePortraitCss,
};

/**
 * Returns the Emotion CSS needed to position a single grid item — its
 * default column, its row at each breakpoint, and any column overrides.
 * The grid item _must_ be inside a {@link grid} module container.
 *
 * All items default to the centre column. Per-breakpoint overrides for
 * `grid-row` and `grid-column` are applied on top via media queries,
 * looked up from the plain CSS maps defined in this file.
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
	const areaOverrides = layoutCssMaps[layoutType][area] ?? {};

	const breakpointCss = Object.entries(areaOverrides).map(
		([bp, styles]) => css`
			${breakpointQueries[bp as Breakpoint]} {
				${styles}
			}
		`,
	);

	// All items default to the centre column; breakpoint entries above
	// override grid-row and grid-column as needed.
	return css`
		grid-column: centre-column-start / centre-column-end;
		${breakpointCss}
	`;
};
