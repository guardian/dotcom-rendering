import type { EditionId } from '../web/lib/edition';
import type { FooterType } from './footer';
import type { FEFrontCard, FEFrontConfigType } from './front';
import type { FETagType } from './tag';

export interface FEIndexPageType {
	contents: FEFrontCard[];
	nav: FENavType;
	editionId: EditionId;
	editionLongForm: string;
	guardianBaseURL: string;
	pageId: string;
	webTitle: string;
	webURL: string;
	config: FEFrontConfigType;
	commercialProperties: Record<string, unknown>;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
}

export interface DCRIndexPageType {
	contents: FEFrontCard[];
	nav: FENavType;
	editionId: EditionId;
	editionLongForm: string;
	guardianBaseURL: string;
	pageId: string;
	webTitle: string;
	webURL: string;
	config: FEFrontConfigType;
	commercialProperties: Record<string, unknown>;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	trendingTopics?: FETagType[];
}
