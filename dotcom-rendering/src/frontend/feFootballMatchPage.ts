import type { FEFootballDataPage } from './feFootballDataPage';

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
	score: number;
	scorers: string[];
	possession: number;
	shotsOn: number;
	shotsOff: number;
	corners: number;
	fouls: number;
	colours: string;
	crest: string;
};

export type FEFootballMatch = {
	id: string;
	homeTeam: FEFootballTeam;
	awayTeam: FEFootballTeam;
	comment: string;
};

export type FEFootballMatchPage = FEFootballDataPage & {
	match: FEFootballMatch[];
};
