import { object, optional, type Output, string } from 'valibot';
import { feCricketMatchSchema } from './feCricketMatchData';

export const feCricketMatchHeaderSchema = object({
	cricketMatch: feCricketMatchSchema,
	liveURL: optional(string()),
	reportURL: optional(string()),
});

export type FECricketMatchHeader = Output<typeof feCricketMatchHeaderSchema>;
