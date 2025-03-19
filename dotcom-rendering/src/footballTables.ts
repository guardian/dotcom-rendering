import { TeamScore } from './footballMatches';

type Competition = {
	url: string;
	tableUrl: string;
	name: string;
	dividers: number[];
};

type TeamResult = {
	self: TeamScore;
	foe: TeamScore;
};

type Entry = {
	position: number;
	team: { name: string; id: string; url: string };
	gamesPlayed: number;
	won: number;
	drawn: number;
	lost: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
	points: number;
	results: TeamResult[];
};

type FootballTable = {
	competition: Competition;
	entries: Entry[];
	linkToFullTable: boolean;
};

export type FootballTables = FootballTable[];
