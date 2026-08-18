/**
 * Types for the custom subnav that frontend can target at individual fronts.
 *
 * Frontend evaluates the targeting rules (`pages`) and forwards the already
 * selected subnav in the `/Front` payload. It is omitted entirely when no
 * custom subnav targets the front, so DCR must treat it as optional.
 *
 * Serialized from the fapi `CustomSubnav` model. Enum values serialize as
 * lowercase strings.
 */

export type TargetedPageType = 'front' | 'article' | 'hasTag';

export type CustomSubnavFormat = 'large' | 'compact';

export type ImageBreakpoint = 'mobile' | 'tablet' | 'web';

export interface SubnavLink {
	linkText: string;
	dotcomPath: string;
}

export interface TargetedPage {
	type: TargetedPageType;
	path: string;
}

export interface CustomSubnavHeader {
	headerText: string;
	dotcomPath?: string;
	copy: string;
}

export interface SubnavImage {
	imageSrc: string;
	breakpoint: ImageBreakpoint;
}

export interface Palette {
	text?: string;
	header?: string;
	link?: string;
}

export interface Palettes {
	light: Palette;
	dark: Palette;
}

export interface CustomSubnav {
	id: string;
	header: CustomSubnavHeader;
	format: CustomSubnavFormat;
	links: SubnavLink[];
	pages: TargetedPage[];
	images?: SubnavImage[];
	palette?: Palettes;
	lastUpdated: number;
	updatedBy: string;
	updatedEmail: string;
}
