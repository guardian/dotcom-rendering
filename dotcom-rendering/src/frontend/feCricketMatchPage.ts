import {
	array,
	boolean,
	number,
	object,
	optional,
	Output,
	string,
} from 'valibot';
import type { EditionId } from '../lib/edition';
import type { FooterType } from '../types/footer';
import type { FENavType } from '../types/frontend';
import type { FESportPageConfig } from './feFootballDataPage';

const feCricketTeamSchema = object({
	name: string(),
	id: string(),
	home: boolean(),
	lineup: array(string()),
	teamTagId: optional(string()),
});

export type FECricketTeam = Output<typeof feCricketTeamSchema>;

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

export type FECricketInnings = Output<typeof feCricketInningsSchema>;

const matchWinnerStatusSchema = object({
	winType: string(),
	margin: optional(string()),
	team: string(),
});

export type FECricketMatchResultWinnerStatus = Output<
	typeof matchWinnerStatusSchema
>;

const matchResultSchema = object({
	resultType: string(),
	description: optional(string()),
	winner: optional(matchWinnerStatusSchema),
});

export type FECricketMatchResult = Output<typeof matchResultSchema>;

export const feCricketMatchSchema = object({
	teams: array(feCricketTeamSchema),
	innings: array(feCricketInningsSchema),
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

export type FECricketMatch = Output<typeof feCricketMatchSchema>;

export type FECricketMatchPage = {
	cricketMatch: FECricketMatch;
	nav: FENavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FESportPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
	pageId: string;
};
