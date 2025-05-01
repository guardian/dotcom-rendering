import type {
	FECompetitionSummary,
	FEFootballCompetition,
	FEFootballDataPage,
	FERound,
} from './feFootballDataPage';

type FELeagueStats = {
	played: number;
	won: number;
	drawn: number;
	lost: number;
	goalsFor: number;
	goalsAgainst: number;
};

type FELeagueTeam = {
	id: string;
	name: string;
	rank: number;
	total: FELeagueStats;
	home: FELeagueStats;
	away: FELeagueStats;
	goalDifference: number;
	points: number;
};

type FETeamScore = {
	id: string;
	name: string;
	score?: number;
};

export type FETeamResult = {
	matchId: string;
	self: FETeamScore;
	foe: FETeamScore;
};

export type FERecentResultsPerTeam = {
	teamId: string;
	results: FETeamResult[];
};

export type FELeagueTableEntry = {
	stageNumber: string;
	round: FERound;
	team: FELeagueTeam;
	teamUrl?: string;
	results: FETeamResult[];
};

export type FEGroup = {
	round: FERound;
	entries: FELeagueTableEntry[];
};

export type FEFootballTable = {
	competition: FECompetitionSummary;
	groups: FEGroup[];
	hasGroups: boolean;
};

export type FEFootballTablesPage = FEFootballDataPage & {
	filters: Record<string, FEFootballCompetition[]>;
	tables: FEFootballTable[];
};
