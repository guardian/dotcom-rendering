import { type InferOutput, object, optional, string } from 'valibot';
import { feCricketMatchSchema } from './feCricketMatchData';

export const feCricketMatchHeaderSchema = object({
	cricketMatch: feCricketMatchSchema,
	liveURL: optional(string()),
	reportURL: optional(string()),
});

export type FECricketMatchHeader = InferOutput<
	typeof feCricketMatchHeaderSchema
>;
