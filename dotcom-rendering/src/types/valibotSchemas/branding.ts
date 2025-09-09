import { literal, number, object, optional, string, union } from 'valibot';

export const BrandingLogoSchema = object({
	src: string(),
	link: string(),
	label: string(),
	dimensions: object({
		width: number(),
		height: number(),
	}),
});

export const BrandingTypeSchema = union([
	object({ name: literal('paid-content') }),
	object({ name: literal('foundation') }),
	object({ name: literal('sponsored') }),
]);

export const BrandingSchema = object({
	brandingType: optional(BrandingTypeSchema),
	sponsorName: string(),
	logo: BrandingLogoSchema,
	aboutThisLink: string(),
	logoForDarkBackground: optional(BrandingLogoSchema),
});
