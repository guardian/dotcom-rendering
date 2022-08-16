import { z } from 'zod';

const brandingLogoSchema = z.object({
	src: z.string(),
	link: z.string(),
	label: z.string(),
	dimensions: z.object({
		width: z.number(),
		height: z.number(),
	}),
});

export const brandingSchema = z.object({
	brandingType: z
		.object({
			name: z.string(),
		})
		.optional(),
	sponsorName: z.string(),
	logo: brandingLogoSchema,
	aboutThisLink: z.string(),
	logoForDarkBackground: brandingLogoSchema.optional(),
});
