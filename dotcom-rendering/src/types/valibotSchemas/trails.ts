import { boolean, number, object, optional, record, string } from 'valibot';
import { BrandingSchema } from './branding';
import { StarRatingSchema } from './content';
import { FEFormatSchema } from './feFormat';
import { DCRSnapTypeSchema } from './front';
import { MainMediaSchema } from './mainMedia';

export const DiscussionSchema = object({
	isCommentable: boolean(),
	isClosedForComments: boolean(),
	discussionId: optional(string()),
});

export const BaseTrailTypeSchema = object({
	url: string(),
	headline: string(),
	webPublicationDate: optional(string()),
	avatarUrl: optional(string()),
	mediaDuration: optional(number()),
	ageWarning: optional(string()),
	byline: optional(string()),
	showByline: optional(boolean()),
	kickerText: optional(string()),
	shortUrl: optional(string()),
	commentCount: optional(number()),
	starRating: optional(StarRatingSchema),
	linkText: optional(string()),
	branding: optional(BrandingSchema),
	isSnap: optional(boolean()),
	isCrossword: optional(boolean()),
	snapData: optional(DCRSnapTypeSchema),
	showQuotedHeadline: optional(boolean()),
	discussion: optional(DiscussionSchema),
	mainMedia: optional(MainMediaSchema),
	trailText: optional(string()),
	galleryCount: optional(number()),
});

export const FETrailTypeSchema = object({
	...BaseTrailTypeSchema.entries,
	format: FEFormatSchema,
	designType: optional(string()),
	pillar: optional(string()),
	carouselImages: optional(record(string(), string())),
	isLiveBlog: optional(boolean()),
	masterImage: optional(string()),
	image: optional(string()),
});
