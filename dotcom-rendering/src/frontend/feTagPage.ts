import type { EditionId } from '../lib/edition';
import type { CommercialProperties } from '../types/commercial';
import type { FooterType } from '../types/footer';
import type { FEFrontCard, FEFrontConfigType } from '../types/front';
import type { FENavType } from '../types/frontend';
import type { FEPagination, FETagType } from '../types/tag';

export type FETagPage = {
	contents: FEFrontCard[];
	pagination?: FEPagination;
	nav: FENavType;
	tags: {
		tags: FETagType[];
	};
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
	forceDay: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
