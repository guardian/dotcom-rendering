import { isUndefined } from '@guardian/libs';
import type { FECricketInnings, FECricketMatch } from './feCricketMatch';
import type { FEFootballPageConfig } from './feFootballDataPage';
import type { EditionId } from './lib/edition';
import { error, ok, type Result } from './lib/result';
import type { NavType } from './model/extract-nav';
import type { FooterType } from './types/footer';

export type BowlerData = {
	name: string;
	overs: number;
	maidens: number;
	runs: number;
	wickets: number;
	balls: number;
};

export type BatterData = {
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

export type FallOfWicketData = {
	order: number;
	name: string;
	runs: number;
};

export type CricketTeam = {
	name: string;
	lineup: string[];
};

export type InningsData = {
	description: string;
	bowlers: BowlerData[];
	batters: BatterData[];
	extras: Extras;
	inningsTotals: InningsTotals;
	fallOfWickets: FallOfWicketData[];
};

type CricketMatch = {
	homeTeam: CricketTeam;
	awayTeam: CricketTeam;
	officials: string[];
	innings: InningsData[];
};

const feInningsToDCRInnings = (feInnings: FECricketInnings): InningsData => {
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

	const innings = feCricketMatch.innings.map(feInningsToDCRInnings).reverse();

	return ok({
		homeTeam,
		awayTeam,
		officials: feCricketMatch.officials,
		innings,
	});
};

export type DCRCricketMatchPage = {
	match: CricketMatch;
	nav: NavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FEFootballPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
