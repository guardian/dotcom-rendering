import { css, type SerializedStyles } from '@emotion/react';
import { from, until } from '@guardian/source/foundations';

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

const breakpointQueries: Record<Breakpoint, string> = {
	mobile: until.tablet,
	tablet: from.tablet,
	desktop: from.desktop,
	leftCol: from.leftCol,
};

// Raw CSS overrides per area per breakpoint. Entries are only needed when an area
// deviates from the default: centre column, single-column mobile layout with areas
// in DOM order (main-media → title → headline → standfirst → meta → body → right-column).

type AreaCss = Partial<Record<Breakpoint, string>>;
type LayoutCssMap = Partial<Record<Area, AreaCss>>;

const standardCss: LayoutCssMap = {
	title: {
		tablet: 'grid-row: 1;',
		leftCol:
			'grid-row: 1; grid-column: left-column-start / left-column-end;',
	},
	headline: {
		tablet: 'grid-row: 2;',
		leftCol: 'grid-row: 1;',
	},
	standfirst: {
		tablet: 'grid-row: 3;',
		leftCol: 'grid-row: 2;',
	},
	'main-media': {
		tablet: 'grid-row: 4;',
		leftCol: 'grid-row: 3;',
	},
	meta: {
		tablet: 'grid-row: 5;',
		leftCol:
			'grid-row: 3 / span 2; grid-column: left-column-start / left-column-end;',
	},
	body: {
		tablet: 'grid-row: 6;',
		leftCol: 'grid-row: 4;',
	},
	'right-column': {
		desktop:
			'grid-row: 1 / span 6; grid-column: right-column-start / right-column-end;',
		leftCol:
			'grid-row: 1 / span 4; grid-column: right-column-start / right-column-end;',
	},
};

const mediaCss: LayoutCssMap = {
	title: {
		mobile: 'grid-row: 1;',
		leftCol:
			'grid-row: 1; grid-column: left-column-start / left-column-end;',
	},
	headline: {
		mobile: 'grid-row: 2;',
		leftCol: 'grid-row: 1;',
	},
	'main-media': {
		mobile: 'grid-row: 3;',
		desktop:
			'grid-row: 3; grid-column: centre-column-start / right-column-start;',
		leftCol:
			'grid-row: 2; grid-column: centre-column-start / right-column-start;',
	},
	standfirst: {
		mobile: 'grid-row: 4;',
		desktop:
			'grid-row: 4; grid-column: centre-column-start / right-column-start;',
		leftCol:
			'grid-row: 3; grid-column: centre-column-start / right-column-start;',
	},
	meta: {
		mobile: 'grid-row: 5;',
		leftCol:
			'grid-row: 2 / span 3; grid-column: left-column-start / left-column-end;',
	},
	body: {
		desktop:
			'grid-row: 6; grid-column: centre-column-start / right-column-start;',
		leftCol:
			'grid-row: 4; grid-column: centre-column-start / right-column-start;',
	},
	'right-column': {
		desktop:
			'grid-row: 3 / span 4; grid-column: right-column-start / right-column-end;',
		leftCol:
			'grid-row: 2 / span 3; grid-column: right-column-start / right-column-end;',
	},
};

const layoutCssMaps: Record<LayoutType, LayoutCssMap> = {
	standard: standardCss,
	media: mediaCss,
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
