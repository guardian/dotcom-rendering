import type { FootballMatches, FootballMatchKind } from './footballMatches';
import { FootballTableCompetitions } from './footballTables';
import type { FEFootballPageConfig } from './frontend/feFootballDataPage';
import type { EditionId } from './lib/edition';
import type { NavType } from './model/extract-nav';
import type { FooterType } from './types/footer';

export type Region = {
	name: string;
	competitions: Array<{ url: string; name: string }>;
};

export type FootballData = {
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

export type FootballMatchListPage = FootballData & {
	matchesList: FootballMatches;
	now: string;
	kind: FootballMatchKind;
};

export type FootballTablesPage = FootballData & {
	tables: FootballTableCompetitions;
	kind: 'Tables';
};

export type FootballDataPage = FootballMatchListPage | FootballTablesPage;
