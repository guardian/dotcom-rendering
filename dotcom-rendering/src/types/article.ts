import type { EditionId } from '../web/lib/edition';
import type { CommercialProperties } from './commercial';
import type { ConfigType } from './config';
import type { FooterType } from './footer';
import type { FEArticleType } from './frontend';

export interface DCRArticleType {
	/* We can use this for accessing the legacy frontend transformed data */
	frontendData: FEArticleType;
	/* Frontend provided data */
	// Nav, footer, etc
	contributionsServiceUrl: string;
	pageFooter: FooterType;
	nav: FENavType;
	linkedData: { [key: string]: any }[];
	config: ConfigType;
	isAdFreeUser: boolean;
	slotMachineFlags?: string;
	commercialProperties: CommercialProperties;
	editionId: EditionId;
	/* Parsed from CAPI data */
	// Weburl, headline, etc
	webUrl: string;
}
