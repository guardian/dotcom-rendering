import type { TeamScore } from './footballMatches';

export type TeamResult = {
	self: TeamScore;
	foe: TeamScore;
};

export type FootballTableData = {
	competition: {
		url: string;
		tableUrl: string;
		name: string;
	};
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
