type ArticleTheme = import('@guardian/libs').ArticleTheme;
type ArticleFormat = import('@guardian/libs').ArticleFormat;

type SharePlatform =
	| 'facebook'
	| 'twitter'
	| 'email'
	| 'whatsApp'
	| 'linkedIn'
	| 'messenger';

// shared type declarations

interface AdTargetParam {
	name: string;
	value: string | string[];
}

type CustomParams = {
	sens: 't' | 'f';
	urlkw: string[];
	[key: string]: string | string[] | number | number[] | boolean | boolean[];
};

type AdTargeting =
	| {
			adUnit: string;
			customParams: CustomParams;
			disableAds?: false;
	  }
	| {
			disableAds: true;
	  };

interface SectionNielsenAPI {
	name: string;
	apiID: string;
}

interface ReaderRevenueCategories {
	contribute: string;
	subscribe: string;
	support: string;
	supporter: string;
	gifting?: string;
}

interface ReaderRevenuePositions {
	header: ReaderRevenueCategories;
	footer: ReaderRevenueCategories;
	sideMenu: ReaderRevenueCategories;
	ampHeader: ReaderRevenueCategories;
	ampFooter: ReaderRevenueCategories;
}

type ReaderRevenuePosition = keyof ReaderRevenuePositions;

interface MembershipPlaceholder {
	campaignCode?: string;
}

interface Attributes {
	pinned: boolean;
	summary: boolean;
	keyEvent: boolean;
	membershipPlaceholder?: MembershipPlaceholder;
}

interface BlockContributor {
	name: string;
	imageUrl?: string;
	largeImageUrl?: string;
}

interface Block {
	id: string;
	elements: import('./src/types/content').FEElement[];
	attributes: Attributes;
	blockCreatedOn?: number;
	blockCreatedOnDisplay?: string;
	blockLastUpdated?: number;
	blockLastUpdatedDisplay?: string;
	title?: string;
	blockFirstPublished?: number;
	blockFirstPublishedDisplay?: string;
	blockFirstPublishedDisplayNoTimezone?: string;
	primaryDateLine: string;
	secondaryDateLine: string;
	createdOn?: number;
	createdOnDisplay?: string;
	lastUpdated?: number;
	lastUpdatedDisplay?: string;
	firstPublished?: number;
	firstPublishedDisplay?: string;
	contributors?: BlockContributor[];
}

interface Pagination {
	currentPage: number;
	totalPages: number;
	newest?: string;
	newer?: string;
	oldest?: string;
	older?: string;
}

type ContentType =
	| 'article'
	| 'network'
	| 'section'
	| 'imageContent'
	| 'interactive'
	| 'gallery'
	| 'video'
	| 'audio'
	| 'liveBlog'
	| 'tag'
	| 'index'
	| 'crossword'
	| 'survey'
	| 'signup'
	| 'userid';

type CricketTeam = {
	name: string;
	home: boolean;
};

type FallOfWicket = {
	order: number;
};

type CricketInnings = {
	order: number;
	battingTeam: string;
	runsScored: string;
	declared: boolean;
	forfeited: boolean;
	fallOfWicket: FallOfWicket[];
	overs: string;
};

type CricketMatch = {
	matchId: string;
	competitionName: string;
	venueName: string;
	teams: CricketTeam[];
	innings: CricketInnings[];
	gameDate: string;
};

type StageType = 'DEV' | 'CODE' | 'PROD';

type CardImageType = 'picture' | 'avatar' | 'crossword' | 'slideshow' | 'video';

type SmallHeadlineSize =
	| 'tiny'
	| 'small'
	| 'medium'
	| 'large'
	| 'huge'
	| 'ginormous';

type MediaType = 'Video' | 'Audio' | 'Gallery';

type LeftColSize = 'compact' | 'wide';

type UserBadge = {
	name: string;
};

/**
 * Football
 */
type TeamType = {
	id: string;
	name: string;
	codename: string;
	players: PlayerType[];
	possession: number;
	shotsOn: number;
	shotsOff: number;
	corners: number;
	fouls: number;
	colours: string;
	score: number;
	crest: string;
	scorers: string[];
};

type PlayerType = {
	id: string;
	name: string;
	position: string;
	lastName: string;
	substitute: boolean;
	timeOnPitch: string;
	shirtNumber: string;
	events: EventType[];
};

type EventType = {
	eventTime: string; // minutes
	eventType: 'substitution' | 'dismissal' | 'booking';
};

interface Topic {
	type: TopicType;
	value: string;
	count?: number;
}

type TopicType = 'ORG' | 'PRODUCT' | 'PERSON' | 'GPE' | 'WORK_OF_ART' | 'LOC';

// ------------
// Liveblogs //
// ------------
type LiveUpdateType = {
	numNewBlocks: number;
	html: string;
	mostRecentBlockId: string;
};

// ------------
// RichLinks //
// ------------
type RichLinkCardType =
	| 'special-report'
	| 'live'
	| 'dead'
	| 'feature'
	| 'editorial'
	| 'comment'
	| 'podcast'
	| 'media'
	| 'analysis'
	| 'review'
	| 'letters'
	| 'external'
	| 'news';

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
