import type { FEFrontConfig } from '../frontend/feFront';
import type { EditionId } from '../lib/edition';
import type { Tuple } from '../lib/tuple';
import type { CollectionBranding } from './branding';
import type { CommercialProperties } from './commercial';
import type { FooterType } from './footer';
import type { DCRFrontCard } from './front';
import type { FENavType } from './frontend';
import type { FETagType } from './tag';

/**
 * Represents a set of trails grouped by their year, month & optionally day of publication.
 */
export interface GroupedTrailsBase {
	year: string;
	month: string;
	day: string | undefined;
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

export interface TagPage {
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
	config: FEFrontConfig;
	commercialProperties: CommercialProperties;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	trendingTopics?: FETagType[];
	speed: 'slow' | 'fast';
	pagination?: TagPagePagination;
	header: {
		title: string;
		description?: string;
		image?: string;
	};
	branding: CollectionBranding | undefined;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
}

export interface TagPagePagination {
	pageId: string;
	sectionName: string;
	currentPage: number;
	lastPage: number;
	totalContent: number;
}
