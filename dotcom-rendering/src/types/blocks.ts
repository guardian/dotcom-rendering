import {
	array,
	boolean,
	type InferOutput,
	number,
	object,
	optional,
	string,
} from 'valibot';
import { FEElementSchema } from './content';

const MembershipPlaceholderSchema = object({
	campaignCode: optional(string()),
});

const AttributesSchema = object({
	pinned: boolean(),
	summary: boolean(),
	keyEvent: boolean(),
	membershipPlaceholder: optional(MembershipPlaceholderSchema),
});

const BlockContributorSchema = object({
	name: string(),
	imageUrl: optional(string()),
	largeImageUrl: optional(string()),
});

export const BlockSchema = object({
	id: string(),
	elements: array(FEElementSchema),
	attributes: AttributesSchema,
	blockCreatedOn: optional(number()),
	blockCreatedOnDisplay: optional(string()),
	blockLastUpdated: optional(number()),
	blockLastUpdatedDisplay: optional(string()),
	title: optional(string()),
	blockFirstPublished: optional(number()),
	blockFirstPublishedDisplay: optional(string()),
	blockFirstPublishedDisplayNoTimezone: optional(string()),
	primaryDateLine: string(),
	secondaryDateLine: string(),
	createdOn: optional(number()),
	createdOnDisplay: optional(string()),
	lastUpdated: optional(number()),
	lastUpdatedDisplay: optional(string()),
	firstPublished: optional(number()),
	firstPublishedDisplay: optional(string()),
	contributors: optional(array(BlockContributorSchema)),
});

export type Block = InferOutput<typeof BlockSchema>;
