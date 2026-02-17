import {
	array,
	boolean,
	number,
	object,
	optional,
	type Output,
	string,
} from 'valibot';
import type { FEFootballDataPage } from './feFootballDataPage';
import { type FEFootballMatch } from './feFootballMatchListPage';
import { type FEGroupSummary } from './feFootballTablesPage';

const feFootballPlayerEventSchema = object({
	eventTime: string(),
	eventType: string(),
});

export type FEFootballPlayerEvent = Output<typeof feFootballPlayerEventSchema>;

const feFootballPlayerSchema = object({
	id: string(),
	name: string(),
	position: string(),
	lastName: string(),
	substitute: boolean(),
	timeOnPitch: string(),
	shirtNumber: string(),
	events: array(feFootballPlayerEventSchema),
});

export type FEFootballPlayer = Output<typeof feFootballPlayerSchema>;

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

export type FEFootballTeam = Output<typeof feFootballTeamSchema>;

export const feFootballMatchStatsSchema = object({
	id: string(),
	homeTeam: feFootballTeamSchema,
	awayTeam: feFootballTeamSchema,
	status: string(),
	comments: optional(string()),
});

export type FEFootballMatchStats = Output<typeof feFootballMatchStatsSchema>;

export type FEFootballMatchInfoPage = FEFootballDataPage & {
	// This field name will need to get changed to matchStats in the future PRs.
	// Since this change needs to happen in both frontend and DCAR, and it also
	// needs to be backward compatible for a temporary duration, we will handle
	// that in a separate PR.
	footballMatch: FEFootballMatchStats;
	matchInfo: FEFootballMatch;
	group?: FEGroupSummary;
	competitionName: string;
	matchUrl: string;
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

export type FEFootballTeamSummarySchema = Output<
	typeof feFootballTeamSummarySchema
>;

export const feFootballMatchStatsSummarySchema = object({
	id: string(),
	homeTeam: feFootballTeamSummarySchema,
	awayTeam: feFootballTeamSummarySchema,
	status: string(),
	infoUrl: string(),
});

export type FEFootballMatchStatsSummary = Output<
	typeof feFootballMatchStatsSummarySchema
>;
