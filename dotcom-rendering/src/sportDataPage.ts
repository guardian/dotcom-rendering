import type { CricketMatch } from './cricketMatch';
import type { FootballMatches, FootballMatchKind } from './footballMatches';
import type { FootballTableCompetitions } from './footballTables';
import type { FESportPageConfig } from './frontend/feFootballDataPage';
import type { EditionId } from './lib/edition';
import type { NavType } from './model/extract-nav';
import type { FooterType } from './types/footer';

export type Region = {
	name: string;
	competitions: Array<{ url: string; name: string }>;
};

export type FootballData = SportPageConfig & {
	regions: Region[];
};

export type SportPageConfig = {
	nav: NavType;
	editionId: EditionId;
	guardianBaseURL: string;
	config: FESportPageConfig;
	pageFooter: FooterType;
	isAdFreeUser: boolean;
	canonicalUrl?: string;
	contributionsServiceUrl: string;
};

export type FootballMatchListPage = FootballData & {
	nextPage?: string;
	previousPage?: string;
	matchesList: FootballMatches;
	now: string;
	kind: FootballMatchKind;
};

export type FootballTablesPage = FootballData & {
	tables: FootballTableCompetitions;
	kind: 'FootballTables';
};

export type CricketMatchPage = SportPageConfig & {
	match: CricketMatch;
	kind: 'CricketMatch';
};

export type FootballPageKind = FootballTablesPage['kind'] | FootballMatchKind;

export type SportPageKind = FootballPageKind | CricketMatchPage['kind'];

export type SportDataPage =
	| CricketMatchPage
	| FootballMatchListPage
	| FootballTablesPage;

const foo;
