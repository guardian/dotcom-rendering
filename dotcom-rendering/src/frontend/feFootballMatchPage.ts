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
	footballMatch: FEFootballMatchStats;
	matchInfo: FEFootballMatch;
	group?: FEGroupSummary;
};
