type Round = {
	roundNumber: string;
	name?: string;
};
type Stage = {
	stageNumber: String;
};

type Venue = {
	id: string;
	name: string;
};

type MatchDayTeam = {
	id: string;
	name: string;
	score?: number;
	htScore?: number;
	aggregateScore?: number;
	scorers?: string;
};

type FootballMatch = {
	id: string;
	date: Date;
	stage: Stage;
	round: Round;
	leg: string;
	homeTeam: MatchDayTeam;
	awayTeam: MatchDayTeam;
	venue?: Venue;
	comments?: string;
};

type Fixture = FootballMatch & {
	type: 'Fixture';
	competition?: Competition;
};

type MatchDay = FootballMatch & {
	type: 'MatchDay';
	liveMatch: boolean;
	result: boolean;
	previewAvailable: boolean;
	reportAvailable: boolean;
	lineupsAvailable: boolean;
	matchStatus: string;
	attendance?: string;
	referee?: string;
};

type Result = FootballMatch & {
	type: 'Result';
	reportAvailable: boolean;
	attendance?: string;
	referee?: string;
};

type LiveMatch = FootballMatch & {
	type: 'LiveMatch';
	status: string;
	attendance?: string;
	referee?: string;
};

type FootballMatchType = Fixture | MatchDay | Result | LiveMatch;

type LeagueStats = {
	played: number;
	won: number;
	drawn: number;
	lost: number;
	goalsFor: number;
	goalsAgainst: number;
};

type LeagueTeam = {
	id: string;
	name: string;
	rank: number;
	total: LeagueStats;
	home: LeagueStats;
	away: LeagueStats;
	goalDifference: number;
	points: number;
};

type LeagueTableEntry = { stageNumber: string; round: Round; team: LeagueTeam };

type Competition = {
	id: string;
	url: string;
	fullName: string;
	shortName: string;
	nation: string;
	startDate?: string;
	matches: FootballMatch[];
	leagueTable: LeagueTableEntry[];
	showInTeamsList: boolean;
	tableDividers: number[];
	finalMatchSVG?: string;
};

type CompetitionMatch = {
	competition: Competition;
	matches: FootballMatchType[];
};

export type DateCompetitionMatch = {
	date: string;
	competitions: CompetitionMatch[];
};

export type FELiveScoresType = {
	pageTitle: string;
	type: string;
	matchesGroupedByDateAndCompetition: DateCompetitionMatch[];
};
