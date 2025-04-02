import type { FEFormat } from '../frontend/feArticle';
import type { SharedAdTargeting } from '../lib/ad-targeting';
import type { Block } from './blocks';
import type { ReaderRevenuePositions } from './commercial';
import type { ServerSideTests } from './config';

/**
 * BlocksRequest is the expected body format for POST requests made to /Blocks
 */
export interface FEBlocksRequest {
	blocks: Block[];
	format: FEFormat;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	edition: string;
	section: string;
	sharedAdTargeting: SharedAdTargeting;
	adUnit: string;
	videoDuration?: number;
	switches: { [key: string]: boolean };
	abTests?: ServerSideTests;
	keywordIds: string;
}

/**
 * Data types for the API request bodies from clients that require transformation before internal use.
 * Where data types are coming from Frontend we try to use the 'FE' prefix.
 * Prior to this we used 'CAPI' as a prefix which wasn't entirely accurate, and some data structures never received the prefix, meaning some are still missing it.
 */
export interface FELinkType {
	url: string;
	title: string;
	longTitle?: string;
	iconName?: string;
	children?: FELinkType[];
	pillar?: LegacyPillar;
	more?: boolean;
	classList?: string[];
}
export interface FENavType {
	currentUrl: string;
	pillars: FELinkType[];
	otherLinks: FELinkType[];
	brandExtensions: FELinkType[];
	currentNavLink?: FELinkType;
	currentNavLinkTitle?: string;
	currentPillarTitle?: string;
	subNavSections?: {
		parent?: FELinkType;
		links: FELinkType[];
	};
	readerRevenueLinks: ReaderRevenuePositions;
}

// Pillars are used for styling

/** `RealPillars` have pillar palette colours */
type RealPillars = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';
/** `FakePillars` allow us to make modifications to style based on rules outside of the pillar of an article */
type FakePillars = 'labs';
export type LegacyPillar = RealPillars | FakePillars;
