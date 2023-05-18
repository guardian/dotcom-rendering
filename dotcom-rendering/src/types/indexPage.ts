import type { GroupedTrails } from '../model/groupTrailsByDates';
import type { EditionId } from '../web/lib/edition';
import type { FooterType } from './footer';
import type { FEFrontCard, FEFrontConfigType } from './front';
import type { FETagType } from './tag';

export interface FEIndexPageType {
	contents: FEFrontCard[];
	nav: FENavType;
	tags: {
		// TODO: Why does Frontend do this?
		tags: FETagType[];
	};
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
	forceDay: boolean;
}

export interface DCRIndexPageType {
	groupedTrails: GroupedTrails[];
	nav: FENavType;
	tags: FETagType[];
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
	speed: 'slow' | 'fast';
	pagination?: DCRFrontPagination;
}

export interface DCRFrontPagination {
	sectionName: string;
	currentPage: number;
	lastPage: number;
	totalContent: number;
}
