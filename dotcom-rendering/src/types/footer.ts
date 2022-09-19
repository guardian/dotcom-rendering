interface FooterLink {
	text: string;
	url: string;
	dataLinkName: string;
	extraClasses?: string;
}

export interface FooterType {
	footerLinks: FooterLink[][];
}
