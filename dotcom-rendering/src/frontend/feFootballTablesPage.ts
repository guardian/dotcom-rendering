import type { FEFootballDataPage, FERound } from './feFootballDataPage';
import type { FECompetitionSummary } from './feFootballMatchListPage';

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
	name: string;
	score?: number;
};

type FETeamResult = {
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
};

export type FEGroup = {
	round: FERound;
	entries: FELeagueTableEntry[];
};

export type FEFootballTable = {
	competition: FECompetitionSummary;
	groups: FEGroup[];
	hasGroups: boolean;
	recentResultsPerTeam: FERecentResultsPerTeam[];
};

export type FEFootballTablesPage = FEFootballDataPage & {
	tables: FEFootballTable[];
};
