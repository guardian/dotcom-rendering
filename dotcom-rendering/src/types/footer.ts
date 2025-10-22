import { array, object, optional, string, type z } from 'zod';

const FooterLinkSchema = object({
	text: string(),
	url: string(),
	dataLinkName: string(),
	extraClasses: optional(string()),
});

export const FooterTypeSchema = object({
	footerLinks: array(array(FooterLinkSchema)),
});

export type FooterType = z.infer<typeof FooterTypeSchema>;
