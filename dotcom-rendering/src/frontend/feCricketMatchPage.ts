import type { EditionId } from '../lib/edition';
import type { FooterType } from '../types/footer';
import type { FENavType } from '../types/frontend';
import type { FESportPageConfig } from './feFootballDataPage';

type FECricketTeam = {
	name: string;
	id: string;
	home: boolean;
	lineup: string[];
};

type FECricketBatter = {
	name: string;
	order: number;
	ballsFaced: number;
	runs: number;
	fours: number;
	sixes: number;
	out: boolean;
	howOut: string;
	onStrike: boolean;
	nonStrike: boolean;
};

type FECricketBowler = {
	name: string;
	order: number;
	overs: number;
	maidens: number;
	runs: number;
	wickets: number;
	balls: number;
};

type FEFallOfWicket = {
	order: number;
	name: string;
	runs: number;
};

export type FECricketInnings = {
	order: number;
	battingTeam: string;
	runsScored: number;
	overs: string;
	declared: boolean;
	forfeited: boolean;
	description: string;
	batters: FECricketBatter[];
	bowlers: FECricketBowler[];
	fallOfWicket: FEFallOfWicket[];
	byes: number;
	legByes: number;
	noBalls: number;
	penalties: number;
	wides: number;
	extras: number;
};

export type FECricketMatch = {
	teams: FECricketTeam[];
	innings: FECricketInnings[];
	competitionName: string;
	venueName: string;
	result: string;
	gameDate: string;
	officials: string[];
	matchId: string;
};

export type FECricketMatchPage = {
	cricketMatch: FECricketMatch;
	nav: FENavType;
	editionId: EditionId;
	guardianBaseURL: string;
	// ToDo: rename to generic sport config
	config: FESportPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
