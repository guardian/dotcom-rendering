type TeamScore = {
	name: string;
	score: number;
};

type MatchData = {
	paId: string;
	dateTime: Date;
};

export type MatchResult = MatchData & {
	kind: 'Result';
	homeTeam: TeamScore;
	awayTeam: TeamScore;
	comment?: string;
};

export type MatchFixture = MatchData & {
	kind: 'Fixture';
	homeTeam: string;
	awayTeam: string;
};

export type LiveMatch = MatchData & {
	kind: 'Live';
	homeTeam: TeamScore;
	awayTeam: TeamScore;
	status: string;
	comment?: string;
};

export type FootballMatch = MatchResult | MatchFixture | LiveMatch;
export type FootballMatchKind = FootballMatch['kind'];

type Competition = {
	competitionId: string;
	tag: string;
	name: string;
	nation: string;
	matches: FootballMatch[];
};

export type FootballMatches = Array<{
	date: Date;
	competitions: Competition[];
}>;
