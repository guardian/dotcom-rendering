import type { CAPITrailType } from './trails';

/**
 * Onwards
 */
export type CAPIOnwards = {
	heading: string;
	trails: CAPITrailType[];
	description?: string;
	url?: string;
	onwardsSource: OnwardsSource;
	format: CAPIFormat;
	isCuratedContent?: boolean;
};

export type OnwardsSource =
	| 'series'
	| 'more-on-this-story'
	| 'related-stories'
	| 'related-content'
	| 'more-media-in-section'
	| 'more-galleries'
	| 'curated-content'
	| 'unknown-source'; // We should never see this in the analytics data!
