import { array, boolean, literal, object, optional, string, union } from 'valibot';
import { FEFormatSchema } from '../frontend/feArticle';
import { FETrailTypeSchema } from './trails';

const OnwardsSourceSchema = union([
	literal('series'),
	literal('more-on-this-story'),
	literal('related-stories'),
	literal('related-content'),
	literal('more-media-in-section'),
	literal('more-galleries'),
	literal('curated-content'),
	literal('newsletters-page'),
	literal('unknown-source'), // We should never see this in the analytics data!
]);

/**
 * Onwards
 */
export const FEOnwardsSchema = object({
	heading: string(),
	trails: array(FETrailTypeSchema),
	description: optional(string()),
	url: optional(string()),
	onwardsSource: OnwardsSourceSchema,
	format: FEFormatSchema,
	isCuratedContent: optional(boolean()),
});

export type OnwardContainerType = 'more-galleries';
