type TeamScore = {
	name: string;
	score: number;
};

type MatchData = {
	paId: string;
	dateTime: Date;
};

export type MatchResult = MatchData & {
	homeTeam: TeamScore;
	awayTeam: TeamScore;
};

export type MatchFixture = MatchData & {
	homeTeam: string;
	awayTeam: string;
};

export type LiveMatch = MatchData & {
	homeTeam: TeamScore;
	awayTeam: TeamScore;
	status: string;
};

type Competition = {
	competitionId: string;
	name: string;
	nation: string;
	matches: LiveMatch[];
};

export type FootballMatches = Array<{
	date: Date;
	competitions: Competition[];
}>;
