/**
 * Cricket
 */
type CricketTeam = {
	name: string;
	home: boolean;
};

type FallOfWicket = {
	order: number;
};

type CricketInnings = {
	order: number;
	battingTeam: string;
	runsScored: string;
	declared: boolean;
	forfeited: boolean;
	fallOfWicket: FallOfWicket[];
	overs: string;
};

export type CricketMatch = {
	matchId: string;
	competitionName: string;
	stage: string;
	venueName: string;
	teams: CricketTeam[];
	innings: CricketInnings[];
	gameDate: string;
};

/**
 * General
 */
export type MatchType = 'CricketMatchType' | 'FootballMatchType';
