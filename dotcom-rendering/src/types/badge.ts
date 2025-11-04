import { object, optional, string, type z } from 'zod/mini';

const DCRBadgeTypeSchema = object({
	imageSrc: string(),
	/** Link to an external sponsor page */
	href: string(),
});

export type DCRBadgeType = z.infer<typeof DCRBadgeTypeSchema>;

export const FEArticleBadgeTypeSchema = object({
	seriesTag: string(),
	imageUrl: string(),
	enhanced: optional(DCRBadgeTypeSchema),
});
