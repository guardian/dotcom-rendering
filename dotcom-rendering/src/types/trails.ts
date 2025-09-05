import {
	boolean,
	number,
	object,
	optional,
	type Output,
	record,
	string,
} from 'valibot';
import { FEFormatSchema } from '../frontend/feArticle';
import type { ArticleFormat } from '../lib/articleFormat';
import { BrandingSchema } from './branding';
import { type BoostLevel, StarRatingSchema } from './content';
import {
	type DCRFrontImage,
	DCRSnapTypeSchema,
	type DCRSupportingContent,
} from './front';
import { MainMediaSchema } from './mainMedia';

export const DiscussionSchema = object({
	isCommentable: boolean(),
	isClosedForComments: boolean(),
	discussionId: optional(string()),
});

export type BaseTrailType = Output<typeof BaseTrailTypeSchema>;

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

export interface TrailType extends BaseTrailType {
	palette?: never;
	format: ArticleFormat;
	supportingContent?: DCRSupportingContent[];
	trailText?: string;
	/** @see JSX.IntrinsicAttributes["data-link-name"] */
	dataLinkName: string;
	discussionId?: string;
	isBoosted?: boolean;
	boostLevel?: BoostLevel;
	image?: DCRFrontImage;
}

export type FETrailType = Output<typeof FETrailTypeSchema>;

export const FETrailTypeSchema = object({
	...BaseTrailTypeSchema.entries,
	format: FEFormatSchema,
	/**
	 * @deprecated This type must exist as it's passed by frontend, but we shouldn't use it.
	 * We should remove this property upstream in the future
	 */
	designType: optional(string()),
	/**
	 * @deprecated This type must exist as it's passed by frontend, but we shouldn't use it.
	 * We should remove this property upstream in the future
	 */
	pillar: optional(string()),
	carouselImages: optional(record(string(), string())),
	isLiveBlog: optional(boolean()),
	masterImage: optional(string()),
	image: optional(string()),
});

// export type FETrailType = Output<typeof FETrailTypeSchema>; // TODO

export interface TrailTabType {
	heading: string;
	trails: TrailType[];
}

export interface FETrailTabType {
	heading: string;
	trails: FETrailType[];
}
