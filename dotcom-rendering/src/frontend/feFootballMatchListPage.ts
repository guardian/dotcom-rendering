import type {
	FECompetitionSummary,
	FEFootballDataPage,
	FERound,
} from './feFootballDataPage';

type FEStage = {
	stageNumber: string;
};

type FEVenue = {
	id: string;
	name: string;
};

type FEMatchCompetition = {
	id: string;
	name: string;
};

export type FEMatchDayTeam = {
	id: string;
	name: string;
	score?: number;
	htScore?: number;
	aggregateScore?: number;
	scorers?: string;
};

type Official = {
	id: string;
	name: string;
};

type FEFootballMatchData = {
	id: string;
	date: string;
	stage: FEStage;
	round: FERound;
	leg: string;
	homeTeam: FEMatchDayTeam;
	awayTeam: FEMatchDayTeam;
	venue?: FEVenue;
	comments?: string;
};

export type FELive = FEFootballMatchData & {
	type: 'LiveMatch';
	status: string;
	attendance?: string;
	referee?: Official;
};

export type FEFixture = FEFootballMatchData & {
	type: 'Fixture';
	competition?: FEMatchCompetition;
};

export type FEMatchDay = FEFootballMatchData & {
	type: 'MatchDay';
	liveMatch: boolean;
	result: boolean;
	previewAvailable: boolean;
	reportAvailable: boolean;
	lineupsAvailable: boolean;
	matchStatus: string;
	attendance?: string;
	referee?: Official;
	competition?: FEMatchCompetition;
};

export type FEResult = FEFootballMatchData & {
	type: 'Result';
	reportAvailable: boolean;
	attendance?: string;
	referee?: Official;
};

export type FEFootballMatch = FEFixture | FEMatchDay | FEResult | FELive;

export type FECompetitionMatch = {
	competitionSummary: FECompetitionSummary;
	matches: FEFootballMatch[];
};

export type FEMatchByDateAndCompetition = {
	date: string;
	competitionMatches: FECompetitionMatch[];
};

export type FEFootballMatchListPage = FEFootballDataPage & {
	matchesList: FEMatchByDateAndCompetition[];
	nextPage?: string;
	previousPage?: string;
};
