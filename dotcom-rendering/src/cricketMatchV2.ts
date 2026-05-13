export type Bowler = {
	name: string;
	overs: number;
	maidens: number;
	runs: number;
	wickets: number;
	balls: number;
};

export type Batter = {
	name: string;
	ballsFaced: number;
	runs: number;
	fours: number;
	sixes: number;
	howOut: string;
	out: boolean;
	onStrike: boolean;
	nonStrike: boolean;
};

export type Extras = {
	byes: number;
	legByes: number;
	noBalls: number;
	penalties: number;
	wides: number;
};

export type InningsTotals = {
	runs: number;
	overs: string;
	wickets: number;
	extras: number;
};

export type FallOfWicket = {
	order: number;
	name: string;
	runs: number;
};

export type CricketTeam = {
	name: string;
	paID: string;
};

export type Innings = {
	description: string;
	battingTeam: string;
	bowlers: Bowler[];
	batters: Batter[];
	extras: Extras;
	declared?: boolean;
	forfeited?: boolean;
	inningsTotals: InningsTotals;
	fallOfWickets: FallOfWicket[];
};

export type InningsOverview = {
	battingTeam: string;
	runs: number;
	overs: string;
	declared: boolean;
	forfeited: boolean;
	fallOfWickets: number;
};

type WinnerResult = {
	type: 'home-win' | 'away-win';
	description?: string;
	winner: {
		type: 'runs' | 'wickets' | 'innings' | 'forfeit' | 'run-rate';
		team: string;
		margin?: number;
	};
};

type OtherResult = {
	type:
		| 'no-result'
		| 'draw'
		| 'abandoned'
		| 'tied'
		| 'level-scores-draw'
		| 'none';
	description?: string;
};

export type Result = WinnerResult | OtherResult;

export type CricketMatch = {
	kind: 'Fixture' | 'Live' | 'Result';
	series: string;
	competition: string;
	venue: string;
	day?: number;
	matchDate: Date;
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
	innings: InningsOverview[];
	officials: string[];
	result?: Result;
};
