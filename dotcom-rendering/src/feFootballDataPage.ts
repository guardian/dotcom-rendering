import type { FEFrontConfig } from './frontend/feFront';
import type { EditionId } from './lib/edition';
import type { FooterType } from './types/footer';
import type { FENavType } from './types/frontend';

type FECompetitionSummary = {
	id: string;
	url: string;
	fullName: string;
	nation: string;
};

type FEStage = {
	stageNumber: string;
};

type FERound = {
	roundNumber: string;
	name?: string;
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

export type FEFootballPageConfig = Omit<
	FEFrontConfig,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

export type FEFootballCompetition = {
	name: string;
	url: string;
};

export type FEFootballDataPage = {
	matchesList: FEMatchByDateAndCompetition[];
	nextPage?: string;
	previousPage?: string;
	filters: Record<string, FEFootballCompetition[]>;
	nav: FENavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FEFootballPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
