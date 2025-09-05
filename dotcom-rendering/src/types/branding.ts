import {
	literal,
	number,
	object,
	optional,
	type Output,
	string,
	union,
} from 'valibot';
import type { EditionId } from '../lib/edition';

export type BrandingLogo = Output<typeof BrandingLogoSchema>;

export const BrandingLogoSchema = object({
	src: string(),
	link: string(),
	label: string(),
	dimensions: object({
		width: number(),
		height: number(),
	}),
});

/**
 * @see https://github.com/guardian/commercial-shared/blob/35cdf4e1/src/main/scala/com/gu/commercial/branding/BrandingType.scala
 */
export type BrandingType = Output<typeof BrandingTypeSchema>;

export const BrandingTypeSchema = union([
	object({ name: literal('paid-content') }),
	object({ name: literal('foundation') }),
	object({ name: literal('sponsored') }),
]);

export type Branding = Output<typeof BrandingSchema>;

export const BrandingSchema = object({
	brandingType: optional(BrandingTypeSchema),
	sponsorName: string(),
	logo: BrandingLogoSchema,
	aboutThisLink: string(),
	logoForDarkBackground: optional(BrandingLogoSchema),
});

export interface EditionBranding {
	edition: {
		id: EditionId;
	};
	branding?: Branding;
}

type BaseCollectionBranding<Kind extends BrandingType['name']> = {
	/**
	 * A collection has branding that is funded by a third party
	 */
	kind: Kind;
	branding: Branding;
	/**
	 * In certain circumstances a collection might display the branding on behalf of an entire front
	 * In that case this property is true
	 */
	isFrontBranding: boolean;
	/**
	 * In certain circumstances a collection might display the branding only on its own container.
	 * Is eligible to display a brand logo.
	 */
	isContainerBranding: boolean;
	/**
	 * In certain circumstances a collection may display multiple brands within one container.
	 */
	hasMultipleBranding: boolean;
};

/**
 * Branding that can be applied to an entire collection on a front
 */
export type CollectionBranding =
	| BaseCollectionBranding<'foundation'>
	| BaseCollectionBranding<'paid-content'>
	| BaseCollectionBranding<'sponsored'>;
