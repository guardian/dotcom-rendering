// ------------------------------
// 3rd party type declarations //
// ------------------------------

declare module 'chromatic/isChromatic';

declare module 'dynamic-import-polyfill' {
	export const initialize: ({
		modulePath,
		importFunctionName,
	}: {
		modulePath?: string;
		importFunctionName?: string;
	}) => void;
}

declare module '@guardian/react-crossword' {
	import type { FC } from 'react';

	export type Cell = {
		number: number;
		value: string;
	};

	export type Clue = {
		id: string;
		number: number;
		humanNumber: string;
		direction: 'across' | 'down';
		position: { x: number; y: number };
		separatorLocations: {
			','?: number[];
			'-'?: number[];
		};
		length: number;
		clue: string;
		group: string[];
		solution?: string;
		format?: string;
	};

	export type CrosswordProps = {
		id: string;
		data: {
			id?: string;
			number: number;
			name: string;
			date: string;
			dimensions: { cols: number; rows: number };
			entries: Clue[];
			solutionAvailable: boolean;
			hasNumbers: boolean;
			randomCluesOrdering: boolean;
			instructions?: string;
			creator?: { name: string; webUrl: string };
			pdf?: string;
			annotatedSolution?: string;
			dateSolutionAvailable: string;
		};
		onCorrect?: (cell: Cell) => void;
		onLoaded?: () => void;
	};

	const Crossword: FC<CrosswordProps>;

	// eslint-disable-next-line import/no-default-export -- react-crossword uses default exports
	export default Crossword;
}

// SVG handling
declare module '*.svg' {
	const content: any;
	// eslint-disable-next-line import/no-default-export -- This is how we import SVGs
	export default content;
}

// Extend PerformanceEntry from lib.dom.ts with current 'In Draft' properties (to allow access as use in browsers that support)
// lib.dom.ts: https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.performanceentry.html
// Draft: https://wicg.github.io/element-timing/#sec-performance-element-timing
interface PerformanceEntry {
	loadTime: number;
	renderTime: number;
}

declare namespace JSX {
	interface IntrinsicElements {
		// ------------------------------------- //
		// AMP types                             //
		// ------------------------------------- //
		'amp-accordion': any;
		'amp-ad': any;
		'amp-analytics': any;
		'amp-audio': any;
		'amp-consent': any;
		'amp-embed': any;
		'amp-experiment': any;
		'amp-facebook': any;
		'amp-form': any;
		'amp-geo': any;
		'amp-iframe': any;
		'amp-img': any;
		'amp-instagram': any;
		'amp-list': any;
		'amp-live-list': any;
		'amp-pixel': any;
		'amp-script': any;
		'amp-sidebar': any;
		'amp-soundcloud': any;
		'amp-state': any;
		'amp-sticky-ad': any;
		'amp-twitter': any;
		'amp-video': any;
		'amp-vimeo': any;
		'amp-youtube': any;

		/** Island {@link ./src/components/Island.tsx} */
		'gu-island': import('./src/components/Island.tsx').GuIsland;
	}

	interface IntrinsicAttributes {
		/**
		 * **Rendered Components – Ophan**
		 *
		 * The Ophan client automatically tracks components on the page
		 * that have the `data-component` attribute.
		 * To avoid race conditions, it is best to add this attribute only
		 * to server-rendered HTML.
		 *
		 * Add `data-component="component-name"` to the element you want
		 * to track.
		 *
		 * The page views table will then contain `component-name` when the
		 * element is present on the page.
		 */
		'data-component'?: string;
		/**
		 * **Component Clicks – Ophan**
		 *
		 * The Ophan client automatically tracks click interactions
		 * on components that have the `data-link-name` attribute.
		 * To avoid race conditions, it is best to add this attribute only
		 * to server-rendered HTML.
		 *
		 * Some elements are not trackable, e.g. `div`, `span`.
		 * Refer to the Ophan documentation for more information.
		 * https://github.com/guardian/ophan/blob/0f365862682cd97cc50cf381299e0f4875e2996c/tracker-js/src/click-path-capture.js
		 *
		 * Add `data-component="component-name"` to the element you want
		 * to track. Then `add data-link-name="link-name"` to the anchor for which
		 * clicks will be tracked.
		 *
		 * The page views table will then contain `link-name` when the
		 * link is clicked.
		 */
		'data-link-name'?: string;
		/**
		 * Ignore a DOM element in Chromatic builds with `data-chromatic="ignore"`.
		 *
		 * https://www.chromatic.com/docs/ignoring-elements/#ignore-dom-elements
		 *
		 * Note that if the dimensions of the ignored element
		 * change, Chromatic will still capture the incoming changes.
		 */
		'data-chromatic'?: 'ignore';

		/**
		 * **Spacefinder Role**
		 *
		 * [Spacefinder](https://github.com/guardian/commercial/blob/main/src/insert/spacefinder/article.ts)
		 * is a part of the commercial bundle that is used to find positions
		 * for ad slots within articles.
		 *
		 * Spacefinder has rules specified for elements with this data attribute
		 * that it will use to find positions for ads.
		 */
		'data-spacefinder-role'?:
			| 'nested'
			| 'immersive'
			| 'inline'
			| 'richLink'
			| 'thumbnail';

		/**
		 * **Spacefinder Type**
		 *
		 * [Spacefinder](https://github.com/guardian/commercial/blob/main/src/insert/spacefinder/article.ts)
		 * is a part of the commercial bundle that is used to find positions
		 * for ad slots within articles.
		 *
		 * Spacefinder has rules specified for elements with this data attribute
		 * that it will use to find positions for ads.
		 */
		'data-spacefinder-type'?: import('./src/types/content').FEElement['_type'];
	}
}

declare namespace React {
	interface CSSProperties {
		// Allow custom properties to be passed to the style prop
		[key: `--${string}`]: string | undefined;
	}
}
