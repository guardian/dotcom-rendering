import type { EditionId } from '../lib/edition';
import type { GroupedTrails } from '../model/groupTrailsByDates';
import type { FooterType } from './footer';
import type { FEFrontCard, FEFrontConfigType } from './front';
import type { FETagType } from './tag';

export interface FETagFrontType {
	contents: FEFrontCard[];
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
	commercialProperties: Record<string, unknown>;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	forceDay: boolean;
}

export interface DCRTagFrontType {
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
	header: {
		title: string;
		description?: string;
		image?: string;
	};
}

export interface DCRFrontPagination {
	sectionName: string;
	currentPage: number;
	lastPage: number;
	totalContent: number;
}
