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
};

export type FEFootballTablesPage = FEFootballDataPage & {
	tables: FEFootballTable[];
};
