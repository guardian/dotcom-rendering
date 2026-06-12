import { object, optional, type Output, string } from 'valibot';
import { feCricketMatchSchema } from './feCricketMatchPage';

export const feCricketMatchHeaderSchema = object({
	cricketMatch: feCricketMatchSchema,
	competitionName: string(),
	liveURL: optional(string()),
	reportURL: optional(string()),
	infoURL: string(),
});

export type FECricketMatchHeader = Output<typeof feCricketMatchHeaderSchema>;
