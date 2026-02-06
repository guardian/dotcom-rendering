import {
	boolean,
	literal,
	object,
	optional,
	string,
	number,
	union,
	type Output,
} from 'valibot';
import type {
	FECompetitionSummary,
	FEFootballCompetition,
	FEFootballDataPage,
} from './feFootballDataPage';

export type FEMatchDayTeam = {
	id: string;
	name: string;
	score?: number;
	htScore?: number;
	aggregateScore?: number;
	scorers?: string;
};

const stageSchema = object({
	stageNumber: string(),
});

const roundSchema = object({
	roundNumber: string(),
	name: optional(string()),
});

const venueSchema = object({
	id: string(),
	name: string(),
});

const matchCompetitionSchema = object({
	id: string(),
	name: string(),
});

const matchDayTeamSchema = object({
	id: string(),
	name: string(),
	score: optional(number()),
	htScore: optional(number()),
	aggregateScore: optional(number()),
	scorers: optional(string()),
});

const officialSchema = object({
	id: string(),
	name: string(),
});

const footballMatchDataSchema = object({
	id: string(),
	date: string(),
	stage: stageSchema,
	round: roundSchema,
	leg: string(),
	homeTeam: matchDayTeamSchema,
	awayTeam: matchDayTeamSchema,
	venue: optional(venueSchema),
	comments: optional(string()),
});

const liveSchema = object({
	...footballMatchDataSchema.entries,
	type: literal('LiveMatch'),
	status: string(),
	attendance: optional(string()),
	referee: optional(officialSchema),
});

const fixtureSchema = object({
	...footballMatchDataSchema.entries,
	type: literal('Fixture'),
	competition: optional(matchCompetitionSchema),
});

const matchDaySchema = object({
	...footballMatchDataSchema.entries,
	type: literal('MatchDay'),
	liveMatch: boolean(),
	result: boolean(),
	previewAvailable: boolean(),
	reportAvailable: boolean(),
	lineupsAvailable: boolean(),
	matchStatus: string(),
	attendance: optional(string()),
	referee: optional(officialSchema),
	competition: optional(matchCompetitionSchema),
});

const resultSchema = object({
	...footballMatchDataSchema.entries,
	type: literal('Result'),
	reportAvailable: boolean(),
	attendance: optional(string()),
	referee: optional(officialSchema),
});

export const footballMatchSchema = union([
	fixtureSchema,
	matchDaySchema,
	resultSchema,
	liveSchema,
]);

export type FELive = Output<typeof liveSchema>;
export type FEFixture = Output<typeof fixtureSchema>;
export type FEMatchDay = Output<typeof matchDaySchema>;
export type FEResult = Output<typeof resultSchema>;
export type FEFootballMatch = Output<typeof footballMatchSchema>;

export type FECompetitionMatch = {
	competitionSummary: FECompetitionSummary;
	matches: FEFootballMatch[];
};

export type FEMatchByDateAndCompetition = {
	date: string;
	competitionMatches: FECompetitionMatch[];
};

export type FEFootballMatchListPage = FEFootballDataPage & {
	filters: Record<string, FEFootballCompetition[]>;
	matchesList: FEMatchByDateAndCompetition[];
	nextPage?: string;
	nextPageNoJs?: string;
	previousPage?: string;
};
