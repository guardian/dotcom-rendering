import type { CAPITrailType } from './trails';

/**
 * Onwards
 */
export type CAPIOnwardsType = {
	heading: string;
	trails: CAPITrailType[];
	description?: string;
	url?: string;
	onwardsType: OnwardsType;
	format: CAPIFormat;
	isCuratedContent?: boolean;
};

export type OnwardsType =
	| 'series'
	| 'more-on-this-story'
	| 'related-stories'
	| 'related-content'
	| 'more-media-in-section'
	| 'more-galleries'
	| 'curated-content'
	| 'default-onwards'; // We should never see this in the analytics data!
