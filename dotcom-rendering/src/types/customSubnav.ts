/**
 * A custom subnav that can appear on assigned pages (e.g. fronts, articles). It arrives inside the `nav` object of the request payload.
 */

/** The kind of page a custom subnav is rendered on, used to vary its styling. */
export type RenderingPage = 'front' | 'article';

export interface CustomSubnavLink {
	linkText: string;
	dotcomPath: string;
}

export interface CustomSubnavHeader {
	headerText: string;
	dotcomPath?: string;
	copy: string;
}
export type CustomSubnavImageBreakpoint =
	| 'mobile'
	| 'mobileMedium'
	| 'mobileLandscape'
	| 'phablet'
	| 'tablet'
	| 'desktop'
	| 'leftCol'
	| 'wide';

export type CustomSubnavImagePlatform = 'ios' | 'web' | 'android';

export interface CustomSubnavImage {
	imageSrc: string;
	breakpoint: CustomSubnavImageBreakpoint;
	platforms: CustomSubnavImagePlatform[];
}

export interface CustomSubnavTargetedPage {
	type: 'front' | 'article' | 'hasTag';
	path: string;
}

export interface CustomSubnav {
	id: string;
	header: CustomSubnavHeader;
	format: 'large' | 'compact';
	links: CustomSubnavLink[];
	pages: CustomSubnavTargetedPage[];
	images?: CustomSubnavImage[];
}

/** A custom subnav bundled with the type of page it's rendered on */
export interface CustomSubnavForPage {
	data: CustomSubnav;
	renderingPage: RenderingPage;
}
