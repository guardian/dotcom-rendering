import type { FEFootballDataPage } from './feFootballDataPage';
import { type FEFootballMatch } from './feFootballMatchListPage';
import { type FEGroupSummary } from './feFootballTablesPage';

export type FEFootballPlayerEvent = {
	eventTime: string;
	eventType: string;
};

export type FEFootballPlayer = {
	id: string;
	name: string;
	position: string;
	lastName: string;
	substitute: boolean;
	timeOnPitch: string;
	shirtNumber: string;
	events: FEFootballPlayerEvent[];
};

export type FEFootballTeam = {
	id: string;
	name: string;
	codename: string;
	players: FEFootballPlayer[];
	score?: number;
	scorers: string[];
	possession: number;
	shotsOn: number;
	shotsOff: number;
	corners: number;
	fouls: number;
	colours: string;
	crest: string;
};

export type FEFootballMatchStats = {
	id: string;
	homeTeam: FEFootballTeam;
	awayTeam: FEFootballTeam;
	status: string;
	comments?: string;
};

export type FEFootballMatchPage = FEFootballDataPage & {
	// This field name will need to get changed to matchStats in the future PRs.
	// Since this change needs to happen in both frontend and DCAR, and it also
	// needs to be backward compatible for a temprary duration, we will handle
	// that in a separate PR.
	footballMatch: FEFootballMatchStats;
	matchInfo: FEFootballMatch;
	group?: FEGroupSummary;
	competitionName: string;
	matchUrl: string;
};
