import type { FEFormat } from '../frontend/feArticle';
import type { FETrailType } from './trails';

/**
 * Onwards
 */
export type FEOnwards = {
	heading: string;
	trails: FETrailType[];
	description?: string;
	url?: string;
	onwardsSource: OnwardsSource;
	format: FEFormat;
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
	| 'newsletters-page'
	| 'unknown-source'; // We should never see this in the analytics data!
