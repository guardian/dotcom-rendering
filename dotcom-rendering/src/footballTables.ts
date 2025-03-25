import type { TeamScore } from './footballMatches';

export type TeamResult = {
	id: string;
	self: TeamScore;
	foe: TeamScore;
};

export type FootballTableCompetition = {
	url: string;
	name: string;
	hasGroups: boolean;
	tables: FootballTableData[];
};

export type FootballTableData = {
	groupName: string;
	dividers: number[];
	entries: {
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
	}[];
	linkToFullTable: boolean;
};
