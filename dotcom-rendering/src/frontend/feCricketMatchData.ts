import type { InferOutput } from 'valibot';
import { array, boolean, number, object, optional, string } from 'valibot';

const feCricketTeamSchema = object({
	name: string(),
	id: string(),
	home: boolean(),
	lineup: array(string()),
	teamTagId: optional(string()),
});

export type FECricketTeam = InferOutput<typeof feCricketTeamSchema>;

const feCricketBatterSchema = object({
	name: string(),
	order: number(),
	ballsFaced: number(),
	runs: number(),
	fours: number(),
	sixes: number(),
	out: boolean(),
	howOut: string(),
	onStrike: boolean(),
	nonStrike: boolean(),
});

const feCricketBowlerSchema = object({
	name: string(),
	order: number(),
	overs: number(),
	maidens: number(),
	runs: number(),
	wickets: number(),
	balls: number(),
});

const feFallOfWicketSchema = object({
	order: number(),
	name: string(),
	runs: number(),
});

const feCricketInningsSchema = object({
	order: number(),
	battingTeam: string(),
	runsScored: number(),
	wickets: number(),
	overs: string(),
	declared: boolean(),
	forfeited: boolean(),
	description: string(),
	batters: array(feCricketBatterSchema),
	bowlers: array(feCricketBowlerSchema),
	fallOfWicket: array(feFallOfWicketSchema),
	byes: number(),
	legByes: number(),
	noBalls: number(),
	penalties: number(),
	wides: number(),
	extras: number(),
});

export type FECricketInnings = InferOutput<typeof feCricketInningsSchema>;

const matchWinnerStatusSchema = object({
	winType: string(),
	margin: optional(string()),
	team: string(),
});

export type FECricketMatchResultWinnerStatus = InferOutput<
	typeof matchWinnerStatusSchema
>;

const matchResultSchema = object({
	resultType: string(),
	description: optional(string()),
	winner: optional(matchWinnerStatusSchema),
});

export type FECricketMatchResult = InferOutput<typeof matchResultSchema>;

export const feCricketMatchSchema = object({
	teams: array(feCricketTeamSchema),
	innings: array(feCricketInningsSchema),
	stage: string(),
	competitionName: string(),
	venueName: string(),
	result: string(),
	currentDay: number(),
	totalDays: number(),
	gameDate: string(),
	officials: array(string()),
	matchId: string(),
	fullResult: optional(matchResultSchema),
});

export type FECricketMatch = InferOutput<typeof feCricketMatchSchema>;

export const feCricketMatchStatsSummarySchema = object({
	status: string(),
	currentBattingTeam: optional(string()),
	notOutBatters: optional(array(feCricketBatterSchema)),
});

export type FECricketMatchStatsSummary = InferOutput<
	typeof feCricketMatchStatsSummarySchema
>;
