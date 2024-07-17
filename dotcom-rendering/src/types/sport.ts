/**
 * Football
 */
export type TeamType = {
	id: string;
	name: string;
	codename: string;
	players: PlayerType[];
	possession: number;
	shotsOn: number;
	shotsOff: number;
	corners: number;
	fouls: number;
	colours: string;
	score: number;
	crest: string;
	scorers: string[];
};

export type PlayerType = {
	id: string;
	name: string;
	position: string;
	lastName: string;
	substitute: boolean;
	timeOnPitch: string;
	shirtNumber: string;
	events: EventType[];
};

export type EventType = {
	eventTime: string; // minutes
	eventType: 'substitution' | 'dismissal' | 'booking';
};

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

export type CricketInnings = {
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
	venueName: string;
	teams: CricketTeam[];
	innings: CricketInnings[];
	gameDate: string;
};

/**
 * General
 */
export type MatchType = 'CricketMatchType' | 'FootballMatchType';
