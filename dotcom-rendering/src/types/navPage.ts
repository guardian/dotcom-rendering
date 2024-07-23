import type { EditionId } from '../lib/edition';
import type { CommercialProperties } from './commercial';
import type { FooterType } from './footer';
import type { FEFrontConfigType } from './front';
import type { FENavType } from './frontend';

export interface FENavPage {
	nav: FENavType;
	editionId: EditionId;
	editionLongForm: string;
	guardianBaseURL: string;
	pageId: string;
	webTitle: string;
	webURL: string;
	config: FEFrontConfigType;
	commercialProperties: CommercialProperties;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
}

export interface DCRNavPage {
	nav: FENavType;
	editionId: EditionId;
	guardianBaseURL: string;
	pageId: string;
	webTitle: string;
	webURL: string;
	config: FEFrontConfigType;
	commercialProperties: CommercialProperties;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
}
