import { array, type InferOutput, object, optional, string } from 'valibot';

const FooterLinkSchema = object({
	text: string(),
	url: string(),
	dataLinkName: string(),
	extraClasses: optional(string()),
});

export const FooterTypeSchema = object({
	footerLinks: array(array(FooterLinkSchema)),
});

export type FooterType = InferOutput<typeof FooterTypeSchema>;
