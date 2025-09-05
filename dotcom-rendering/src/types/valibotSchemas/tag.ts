import { object, optional, string } from 'valibot';

export const PodcastSeriesImageSchema = object({
	type: optional(string()),
	altText: optional(string()),
});
