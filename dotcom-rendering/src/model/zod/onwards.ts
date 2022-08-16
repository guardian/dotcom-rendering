import { z } from 'zod';
import { capiFormatSchema } from './capi';
import { feTrailTypeSchema } from './trails';

const onwardsTypeSchema = z.enum([
	'series',
	'more-on-this-story',
	'related-stories',
	'related-content',
	'more-media-in-section',
	'more-galleries',
	'curated-content',
	'default-onwards',
]);

export const feOnwardsTypeSchema = z.object({
	heading: z.string(),
	trails: z.array(feTrailTypeSchema),
	description: z.string().optional(),
	url: z.string().optional(),
	onwardsType: onwardsTypeSchema,
	format: capiFormatSchema,
	isCuratedContent: z.boolean().optional(),
});
