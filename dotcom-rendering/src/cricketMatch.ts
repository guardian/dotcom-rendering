import { isUndefined } from '@guardian/libs';
import type {
	FECricketInnings,
	FECricketMatch,
} from './frontend/feCricketMatchPage';
import { error, ok, type Result } from './lib/result';


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
	lineup: string[];
};

export type Innings = {
	description: string;
	bowlers: Bowler[];
	batters: Batter[];
	extras: Extras;
	inningsTotals: InningsTotals;
	fallOfWickets: FallOfWicket[];
};

export type CricketMatch = {
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
	officials: string[];
	innings: Innings[];
};

const feInningsToDCARInnings = (feInnings: FECricketInnings): Innings => {
	const inningsTotals = {
		runs: feInnings.runsScored,
		overs: feInnings.overs,
		wickets: feInnings.fallOfWicket.length,
		extras: feInnings.extras,
	};

	const extras = {
		byes: feInnings.byes,
		legByes: feInnings.legByes,
		noBalls: feInnings.noBalls,
		penalties: feInnings.penalties,
		wides: feInnings.wides,
	};

	return {
		description: feInnings.description,
		inningsTotals,
		extras,
		fallOfWickets: feInnings.fallOfWicket,
		batters: feInnings.batters,
		bowlers: feInnings.bowlers,
	};
};

export const parse = (
	feCricketMatch: FECricketMatch,
): Result<string, CricketMatch> => {
	const homeTeam = feCricketMatch.teams.find((team) => team.home);
	const awayTeam = feCricketMatch.teams.find((team) => !team.home);

	if (isUndefined(homeTeam) || isUndefined(awayTeam)) {
		return error('Could not determine home and away cricket teams');
	}

	const innings = feCricketMatch.innings
		.map(feInningsToDCARInnings)
		.reverse();

	return ok({
		homeTeam,
		awayTeam,
		officials: feCricketMatch.officials,
		innings,
	});
};


