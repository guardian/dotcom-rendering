import type { RequestHandler } from 'express';
import type {
	FootballMatchListPage,
	FootballTablesPage,
	Region,
} from '../footballDataPage';
import type { FootballMatchKind } from '../footballMatches';
import {
	getParserErrorMessage,
	parse as parseFootballMatches,
} from '../footballMatches';
import { parse as parseFootballTables } from '../footballTables';
import type { FEFootballCompetition } from '../frontend/feFootballDataPage';
import type { FEFootballMatchListPage } from '../frontend/feFootballMatchListPage';
import type { FEFootballTablesPage } from '../frontend/feFootballTablesPage';
import { Pillar } from '../lib/articleFormat';
import { extractNAV } from '../model/extract-nav';
import {
	validateAsFootballMatchListPage,
	validateAsFootballTablesPage,
} from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderFootballMatchesPage } from './render.footballDataPage.web';

const decidePageKind = (pageId: string): FootballMatchKind => {
	if (pageId.includes('live')) {
		return 'Live';
	}

	if (pageId.includes('results')) {
		return 'Result';
	}

	if (pageId.includes('fixtures')) {
		return 'Fixture';
	}

	throw new Error('Could not determine football page kind');
};

const regionsPriority = [
	'Internationals',
	'English',
	'European',
	'Scottish',
	'Rest of world',
];

export const sortRegionsFunction = (a: Region, b: Region): number => {
	return regionsPriority.indexOf(a.name) - regionsPriority.indexOf(b.name);
};

const parseFEFootballCompetitionRegions = (
	competitionRegions: Record<string, FEFootballCompetition[]>,
): Region[] => {
	return Object.entries(competitionRegions)
		.map(([key, competition]) => {
			return {
				name: key,
				competitions: competition.map((comp) => ({
					url: comp.url,
					name: comp.name,
				})),
			};
		})
		.sort(sortRegionsFunction);
};

const parseFEFootballMatchList = (
	data: FEFootballMatchListPage,
): FootballMatchListPage => {
	const parsedMatchesList = parseFootballMatches(data.matchesList);

	if (parsedMatchesList.kind === 'error') {
		throw new Error(
			`Failed to parse matches: ${getParserErrorMessage(
				parsedMatchesList.error,
			)}`,
		);
	}

	return {
		matchesList: parsedMatchesList.value,
		now: new Date().toISOString(),
		kind: decidePageKind(data.config.pageId),
		nextPage: data.nextPage,
		previousPage: data.previousPage,
		regions: parseFEFootballCompetitionRegions(data.filters),
		nav: {
			...extractNAV(data.nav),
			selectedPillar: Pillar.Sport,
		},
		editionId: data.editionId,
		guardianBaseURL: data.guardianBaseURL,
		config: data.config,
		pageFooter: data.pageFooter,
		isAdFreeUser: data.isAdFreeUser,
		canonicalUrl: data.canonicalUrl,
		contributionsServiceUrl: data.contributionsServiceUrl,
	};
};

export const handleFootballMatchListPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('footballMatchListPage', 'web');
	const footballDataValidated: FEFootballMatchListPage =
		validateAsFootballMatchListPage(body);

	const parsedFootballData = parseFEFootballMatchList(footballDataValidated);
	const { html, prefetchScripts } =
		renderFootballMatchesPage(parsedFootballData);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

const parseFEFootballTables = (
	data: FEFootballTablesPage,
): FootballTablesPage => {
	const parsedFootballTables = parseFootballTables(data.tables);

	if (parsedFootballTables.kind === 'error') {
		throw new Error(
			`Failed to parse tables:  ${getParserErrorMessage(
				parsedFootballTables.error,
			)}`,
		);
	}

	return {
		tables: parsedFootballTables.value,
		kind: 'Tables',
		nextPage: data.nextPage,
		previousPage: data.previousPage,
		regions: parseFEFootballCompetitionRegions(data.filters),
		nav: {
			...extractNAV(data.nav),
			selectedPillar: Pillar.Sport,
		},
		editionId: data.editionId,
		guardianBaseURL: data.guardianBaseURL,
		config: data.config,
		pageFooter: data.pageFooter,
		isAdFreeUser: data.isAdFreeUser,
		canonicalUrl: data.canonicalUrl,
		contributionsServiceUrl: data.contributionsServiceUrl,
	};
};

export const handleFootballTablesPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('FootballTablesPage', 'web');
	const footballTablesPageValidated: FEFootballTablesPage =
		validateAsFootballTablesPage(body);

	parseFEFootballTables(footballTablesPageValidated);
	const { html, prefetchScripts } = { html: '', prefetchScripts: [] };
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
