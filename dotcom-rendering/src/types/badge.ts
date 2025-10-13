import { type InferOutput, object, optional, string } from "valibot";

const DCRBadgeTypeSchema = object( {
	imageSrc: string(),
	/** Link to an external sponsor page */
	href: string(),
});

export type DCRBadgeType = InferOutput<typeof DCRBadgeTypeSchema>;

export const FEArticleBadgeTypeSchema = object({
	seriesTag: string(),
	imageUrl: string(),
	enhanced: optional(DCRBadgeTypeSchema)
});
