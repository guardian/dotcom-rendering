import { object, optional, type Output, string } from 'valibot';
import { feFootballMatchSchema } from './feFootballMatchListPage';

export const feFootballMatchHeaderSchema = object({
	footballMatch: feFootballMatchSchema,
	competitionName: string(),
	liveURL: optional(string()),
	reportURL: optional(string()),
	infoURL: string(),
});

export type FEFootballMatchHeader = Output<typeof feFootballMatchHeaderSchema>;
