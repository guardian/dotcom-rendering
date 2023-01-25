import type { FooterType } from './footer';
import type { FEArticleType } from './frontend';

export interface DCRArticleType {
	/* We can use this for accessing the legacy frontend transformed data */
	frontendData: FEArticleType;
	/* Frontend provided data */
	// Nav, footer, etc
	contributionsServiceUrl: string;
	pageFooter: FooterType;
	linkedData: { [key: string]: any }[];
	/* Parsed from CAPI data */
	// Weburl, headline, etc
	webUrl: string;
}
