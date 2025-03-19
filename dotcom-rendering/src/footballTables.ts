import type { FEFootballPageConfig } from './feFootballDataPage';
import type { Region, TeamScore } from './footballMatches';
import type { EditionId } from './lib/edition';
import type { NavType } from './model/extract-nav';
import type { FooterType } from './types/footer';

type Competition = {
	url: string;
	tableUrl: string;
	name: string;
	dividers: number[];
};

type TeamResult = {
	self: TeamScore;
	foe: TeamScore;
};

type Entry = {
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
};

type FootballTable = {
	competition: Competition;
	entries: Entry[];
	linkToFullTable: boolean;
};

export type FootballTables = FootballTable[];

export type DCRFootballTablesPage = {
	tables: FootballTables;
	nextPage?: string;
	previousPage?: string;
	regions: Region[];
	nav: NavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FEFootballPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};
