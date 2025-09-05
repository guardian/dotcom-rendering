import { object, optional, string } from 'valibot';

export const DCRSnapTypeSchema = object({
	embedHtml: optional(string()),
	embedCss: optional(string()),
	embedJs: optional(string()),
});
