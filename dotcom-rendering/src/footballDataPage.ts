import { FEFootballPageConfig } from './feFootballDataPage';
import { FootballMatches, FootballMatchKind } from './footballMatches';
import { FootballTables } from './footballTables';
import { EditionId } from './lib/edition';
import { NavType } from './model/extract-nav';
import { FooterType } from './types/footer';

export type Region = {
	name: string;
	competitions: Array<{ url: string; name: string }>;
};

type FootballData = {
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
	kind: FootballMatchKind;
};

export type FootballTablesPage = FootballData & {
	tables: FootballTables;
	kind: 'Tables';
};

export type FootballDataPage = FootballMatchListPage | FootballTablesPage;
