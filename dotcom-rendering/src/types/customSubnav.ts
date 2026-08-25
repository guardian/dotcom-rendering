/**
 * A custom subnav that can appear on assigned pages (e.g. fronts, articles). It arrives inside the `nav` object of the request payload.
 */

export interface CustomSubnavLink {
	linkText: string;
	dotcomPath: string;
}

export interface CustomSubnavHeader {
	headerText: string;
	dotcomPath?: string;
	copy: string;
}
export interface CustomSubnavImage {
	imageSrc: string;
	breakpoint: 'mobile' | 'tablet' | 'web';
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
