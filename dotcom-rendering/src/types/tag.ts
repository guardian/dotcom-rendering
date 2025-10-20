/**
 * This type comes from `frontend`, hence the FE prefix.
 *
 * @see https://github.com/guardian/frontend/blob/5b987289/common/app/model/Tag.scala#L156-L179
 */

import {
	array,
	type InferOutput,
	number,
	object,
	optional,
	string,
} from 'valibot';

const ReferenceSchema = object({
	id: string(),
	type: string(),
});

const PodcastSchema = object({
	subscriptionUrl: optional(string()),
	spotifyUrl: optional(string()),
	image: optional(string()),
});

export type Podcast = InferOutput<typeof PodcastSchema>;

const FEPaginationSchema = object({
	currentPage: number(),
	lastPage: number(),
	totalContent: number(),
});

export type FEPagination = InferOutput<typeof FEPaginationSchema>;

export const FETagTypeSchema = object({
	properties: object({
		id: string(),
		tagType: string(),
		webTitle: string(),
		/* bio is html */
		bio: optional(string()),
		description: optional(string()),
		bylineImageUrl: optional(string()),
		bylineLargeImageUrl: optional(string()),
		contributorLargeImagePath: optional(string()),
		paidContentType: optional(string()),
		sectionId: optional(string()),
		sectionName: optional(string()),
		twitterHandle: optional(string()),
		url: optional(string()),
		webUrl: optional(string()),
		references: optional(array(ReferenceSchema)),
		podcast: optional(PodcastSchema),
	}),
	pagination: optional(FEPaginationSchema),
});

export type FETagType = InferOutput<typeof FETagTypeSchema>;

export const PodcastSeriesImageSchema = object({
	src: optional(string()),
	altText: optional(string()),
});

export type PodcastSeriesImage = InferOutput<typeof PodcastSeriesImageSchema>;

export const TagTypeSchema = object({
	id: string(),
	type: string(),
	title: string(),
	twitterHandle: optional(string()),
	paidContentType: optional(string()),
	bylineImageUrl: optional(string()),
	bylineLargeImageUrl: optional(string()),
	podcast: optional(PodcastSchema),
});

export type TagType = InferOutput<typeof TagTypeSchema>;
