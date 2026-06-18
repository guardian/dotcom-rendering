import { object, optional, type Output, string } from 'valibot';
import { feCricketMatchSchema } from './feCricketMatchPage';

export const feCricketMatchHeaderSchema = object({
	cricketMatch: feCricketMatchSchema,
	liveURL: optional(string()),
	reportURL: optional(string()),
});

export type FECricketMatchHeader = Output<typeof feCricketMatchHeaderSchema>;
