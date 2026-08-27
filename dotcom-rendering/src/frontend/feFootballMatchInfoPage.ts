import {
	array,
	boolean,
	type InferOutput,
	number,
	object,
	optional,
	string,
} from 'valibot';
import type { FEFootballDataPage } from './feFootballDataPage';
import { type FEFootballMatch } from './feFootballMatchListPage';
import { type FEGroupSummary } from './feFootballTablesPage';

const feFootballPlayerEventSchema = object({
	eventTime: string(),
	eventType: string(),
});

const feFootballPlayerEventEnhancedSchema = object({
	eventId: string(),
	eventType: string(),
	normalTime: string(),
	addedTime: string(),
});

export type FEFootballPlayerEvent = InferOutput<
	typeof feFootballPlayerEventSchema
>;

export type FEFootballPlayerEventEnhanced = InferOutput<
	typeof feFootballPlayerEventEnhancedSchema
>;

const feFootballPlayerSchema = object({
	id: string(),
	name: string(),
	position: string(),
	lastName: string(),
	substitute: boolean(),
	timeOnPitch: string(),
	shirtNumber: string(),
	events: array(feFootballPlayerEventSchema),
	enhancedEvents: array(feFootballPlayerEventEnhancedSchema),
});

export type FEFootballPlayer = InferOutput<typeof feFootballPlayerSchema>;

const feFootballTeamSchema = object({
	id: string(),
	name: string(),
	codename: string(),
	players: array(feFootballPlayerSchema),
	score: optional(number()),
	scorers: array(string()),
	possession: number(),
	shotsOn: number(),
	shotsOff: number(),
	corners: number(),
	fouls: number(),
	colours: string(),
	crest: string(),
});

export type FEFootballTeam = InferOutput<typeof feFootballTeamSchema>;

export const feFootballMatchStatsSchema = object({
	id: string(),
	homeTeam: feFootballTeamSchema,
	awayTeam: feFootballTeamSchema,
	status: string(),
	comments: optional(string()),
});

export type FEFootballMatchStats = InferOutput<
	typeof feFootballMatchStatsSchema
>;

export type FEFootballMatchInfoPage = FEFootballDataPage & {
	matchStats: FEFootballMatchStats;
	matchInfo: FEFootballMatch;
	group?: FEGroupSummary;
	competitionName: string;
	matchHeaderUrl: string;
};

export const feFootballTeamSummarySchema = object({
	id: string(),
	name: string(),
	possession: number(),
	shotsOn: number(),
	shotsOff: number(),
	colours: string(),
});

export type FEFootballTeamSummary = InferOutput<
	typeof feFootballTeamSummarySchema
>;

export const feFootballMatchStatsSummarySchema = object({
	id: string(),
	homeTeam: feFootballTeamSummarySchema,
	awayTeam: feFootballTeamSummarySchema,
	status: string(),
	infoURL: string(),
});

export type FEFootballMatchStatsSummary = InferOutput<
	typeof feFootballMatchStatsSummarySchema
>;
