/**
 * This type comes from `frontend`, hence the FE prefix.
 *
 * @see https://github.com/guardian/frontend/blob/5b987289/common/app/model/Tag.scala#L156-L179
 */

import { object, optional, string, type InferOutput } from "valibot";

type Reference = {
	id: string;
	type: string;
};

export type FETagType = {
	properties: {
		id: string;
		tagType: string;
		webTitle: string;
		/* bio is html */
		bio?: string;
		description?: string;
		bylineImageUrl?: string;
		bylineLargeImageUrl?: string;
		contributorLargeImagePath?: string;
		paidContentType?: string;
		sectionId?: string;
		sectionName?: string;
		twitterHandle?: string;
		url?: string;
		webUrl?: string;
		references?: Reference[];
		podcast?: Podcast;
	};
	pagination?: FEPagination;
};

export type FEPagination = {
	currentPage: number;
	lastPage: number;
	totalContent: number;
};

const PodcastSchema = object({
	subscriptionUrl: optional(string()),
	spotifyUrl: optional(string()),
	image: optional(string()),
});

type Podcast = InferOutput<typeof PodcastSchema>;

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
