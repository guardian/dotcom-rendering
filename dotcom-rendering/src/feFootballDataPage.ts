import type { EditionId } from './lib/edition';
import type { FooterType } from './types/footer';
import type { FEFrontConfigType } from './types/front';
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

type FEMatchDayTeam = {
	id: string;
	name: string;
	score?: number;
	htScore?: number;
	aggregateScore?: number;
	scorers?: string;
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

type FELive = FEFootballMatchData & {
	type: 'LiveMatch';
	status: string;
	attendance?: string;
	referee?: string;
};

type FEFixture = FEFootballMatchData & {
	type: 'Fixture';
	competition?: FEMatchCompetition;
};

type FEMatchDay = FEFootballMatchData & {
	type: 'MatchDay';
	liveMatch: boolean;
	result: boolean;
	previewAvailable: boolean;
	reportAvailable: boolean;
	lineupsAvailable: boolean;
	matchStatus: string;
	attendance?: string;
	referee?: string;
	competition?: FEMatchCompetition;
};

type FEResult = FEFootballMatchData & {
	type: 'Result';
	reportAvailable: boolean;
	attendance?: string;
	referee?: string;
};

type FEFootballMatch = FEFixture | FEMatchDay | FEResult | FELive;

type FECompetitionMatch = {
	competitionSummary: FECompetitionSummary;
	matches: FEFootballMatch[];
};

type FEMatchByDateAndCompetition = {
	date: string;
	competitionMatches: FECompetitionMatch[];
};

type FEFootballPageConfig = Omit<
	FEFrontConfigType,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

export type FEFootballDataPage = {
	matchesList: FEMatchByDateAndCompetition[];
	nextPage?: string;
	previousPage?: string;
	nav: FENavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FEFootballPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
