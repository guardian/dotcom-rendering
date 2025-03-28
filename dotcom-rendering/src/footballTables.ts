export type TeamResultScore = {
	name: string;
	score: number;
};

export type TeamResult = {
	id: string;
	self: TeamResultScore;
	foe: TeamResultScore;
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
