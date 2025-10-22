import {
	array,
	boolean,
	literal,
	object,
	optional,
	string,
	union,
	type z,
} from 'zod';
import { type FEFormat } from '../frontend/format';
import type { SharedAdTargeting } from '../lib/ad-targeting';
import type { Block } from './blocks';
import { ReaderRevenuePositionsSchema } from './commercial';
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
	shouldHideAds: boolean;
}

// Pillars are used for styling

/** `RealPillars` have pillar palette colours */
const RealPillarsSchema = union([
	literal('news'),
	literal('opinion'),
	literal('sport'),
	literal('culture'),
	literal('lifestyle'),
]);
/** `FakePillars` allow us to make modifications to style based on rules outside of the pillar of an article */
const FakePillarsSchema = literal('labs');

export const LegacyPillarSchema = union([RealPillarsSchema, FakePillarsSchema]);
export type LegacyPillar = z.infer<typeof LegacyPillarSchema>;

/**
 * Data types for the API request bodies from clients that require transformation before internal use.
 * Where data types are coming from Frontend we try to use the 'FE' prefix.
 * Prior to this we used 'CAPI' as a prefix which wasn't entirely accurate, and some data structures never received the prefix, meaning some are still missing it.
 */

export const FELinkTypeSchema = object({
	url: string(),
	title: string(),
	longTitle: optional(string()),
	iconName: optional(string()),
	get children() {
		return optional(array(FELinkTypeSchema));
	},
	pillar: optional(LegacyPillarSchema),
	more: optional(boolean()),
	classList: optional(array(string())),
});

export type FELinkType = z.infer<typeof FELinkTypeSchema>;

export const FENavTypeSchema = object({
	currentUrl: string(),
	pillars: array(FELinkTypeSchema),
	otherLinks: array(FELinkTypeSchema),
	brandExtensions: array(FELinkTypeSchema),
	currentNavLink: optional(FELinkTypeSchema),
	currentNavLinkTitle: optional(string()),
	currentPillarTitle: optional(string()),
	subNavSections: optional(
		object({
			parent: optional(FELinkTypeSchema),
			links: array(FELinkTypeSchema),
		}),
	),
	readerRevenueLinks: ReaderRevenuePositionsSchema,
});

export type FENavType = z.infer<typeof FENavTypeSchema>;
