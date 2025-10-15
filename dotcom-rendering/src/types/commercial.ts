import {
	array,
	type InferOutput,
	object,
	optional,
	string,
	union,
} from 'valibot';
import { type EditionId, EditionIdSchema } from '../lib/edition';
import { BrandingSchema } from './branding';

const AdTargetParamSchema = object({
	name: string(),
	value: union([string(), array(string())]),
});

const EditionCommercialPropertiesSchema = object({
	adTargeting: array(AdTargetParamSchema),
	branding: optional(BrandingSchema),
});

export type EditionCommercialProperties = InferOutput<
	typeof EditionCommercialPropertiesSchema
>;

export const CommercialPropertiesSchema = object(
	Object.fromEntries(
		EditionIdSchema.options.map((editionId) => [
			editionId,
			EditionCommercialPropertiesSchema,
		]),
	) as Record<EditionId, typeof EditionCommercialPropertiesSchema>,
);

export type CommercialProperties = InferOutput<
	typeof CommercialPropertiesSchema
>;

/**
 * key: a front, e.g. "uk" or "uk/sport"
 * value: an array of collection names
 */
export type FrontsBannerAdCollections = {
	[key: string]: string[];
};

type CustomParams = {
	sens: 't' | 'f';
	urlkw: string[];
	[key: string]: string | string[] | number | number[] | boolean | boolean[];
};

export type AdTargeting =
	| {
			adUnit: string;
			customParams: CustomParams;
			disableAds?: false;
	  }
	| {
			disableAds: true;
	  };

const ReaderRevenueCategoriesSchema = object({
	contribute: string(),
	subscribe: string(),
	support: string(),
	supporter: string(),
	gifting: optional(string()),
});

export type ReaderRevenueCategories = InferOutput<
	typeof ReaderRevenueCategoriesSchema
>;

export const ReaderRevenuePositionsSchema = object({
	header: ReaderRevenueCategoriesSchema,
	footer: ReaderRevenueCategoriesSchema,
	sideMenu: ReaderRevenueCategoriesSchema,
	ampHeader: ReaderRevenueCategoriesSchema,
	ampFooter: ReaderRevenueCategoriesSchema,
});

export type ReaderRevenuePositions = InferOutput<
	typeof ReaderRevenuePositionsSchema
>;

export type ReaderRevenuePosition = keyof ReaderRevenuePositions;
