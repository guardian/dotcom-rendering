type BrandingLogo = {
	src: string;
	link: string;
	label: string;
	dimensions: { width: number; height: number };
};

export interface Branding {
	brandingType?: { name: string };
	sponsorName: string;
	logo: BrandingLogo;
	aboutThisLink: string;
	logoForDarkBackground?: BrandingLogo;
}

export interface EditionBranding {
	edition: {
		id: string;
	};
	branding?: Branding;
}
