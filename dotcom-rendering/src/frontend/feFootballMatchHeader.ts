import { type InferOutput, object, optional, string } from 'valibot';
import { feFootballMatchSchema } from './feFootballMatchListPage';

export const feFootballMatchHeaderSchema = object({
	footballMatch: feFootballMatchSchema,
	competitionName: string(),
	liveURL: optional(string()),
	reportURL: optional(string()),
	infoURL: string(),
});

export type FEFootballMatchHeader = InferOutput<
	typeof feFootballMatchHeaderSchema
>;
