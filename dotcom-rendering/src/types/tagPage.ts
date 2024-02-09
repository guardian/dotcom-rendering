import type { EditionId } from '../lib/edition';
import type { Tuple } from '../lib/tuple';
import type { FooterType } from './footer';
import type { DCRFrontCard, FEFrontCard, FEFrontConfigType } from './front';
import type { FETagType } from './tag';

export interface FETagPageType {
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

/**
 * Represents a set of trails grouped by their year, month & optionally day of publication.
 */
export interface GroupedTrailsBase {
	year: number;
	month: number;
	day: number | undefined;
}

export interface GroupedTrails extends GroupedTrailsBase {
	trails: DCRFrontCard[];
}

export interface GroupedTrailsFastMpu extends GroupedTrailsBase {
	injected: true;
	speed: 'fast';
	// Trails must either be length of 2, 4, 6, 9
	trails: Tuple<DCRFrontCard, 2 | 4 | 6 | 9>;
}
export interface GroupedTrailsSlowMpu extends GroupedTrailsBase {
	injected: true;
	speed: 'slow';
	// Trails must either be length of 2, 4, 5, 7
	trails: Tuple<DCRFrontCard, 2 | 4 | 5 | 7>;
}

export interface DCRTagPageType {
	groupedTrails: Array<
		GroupedTrails | GroupedTrailsFastMpu | GroupedTrailsSlowMpu
	>;
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
	pageId: string;
	sectionName: string;
	currentPage: number;
	lastPage: number;
	totalContent: number;
}
