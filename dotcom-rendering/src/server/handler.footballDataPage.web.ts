import type { RequestHandler } from 'express';
import type {
	FEFootballCompetition,
	FEFootballDataPage,
	FEFootballTablesPage,
} from '../feFootballDataPage';
import type {
	DCRFootballDataPage,
	FootballMatchKind,
	Region,
} from '../footballMatches';
import { getParserErrorMessage, parse } from '../footballMatches';
import { Pillar } from '../lib/articleFormat';
import { extractNAV } from '../model/extract-nav';
import {
	validateAsFootballDataPageType,
	validateAsFootballTableDataPageType,
} from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderFootballDataPage } from './render.footballDataPage.web';
import { FootballTables } from 'src/footballTables';

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

const parseFEFootballData = (data: FEFootballDataPage): DCRFootballDataPage => {
	const parsedMatchesList = parse(data.matchesList);

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

export const handleFootballDataPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('footballDataPage', 'web');
	const footballDataValidated: FEFootballDataPage =
		validateAsFootballDataPageType(body);

	const parsedFootballData = parseFEFootballData(footballDataValidated);
	const { html, prefetchScripts } =
		renderFootballDataPage(parsedFootballData);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

const parseFEFootballTables = (data: FEFootballTablesPage): FootballTables => {
	return [];
};

export const handleFootballTablesPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('FootballTablesPage', 'web');
	const footballDataValidated: FEFootballTablesPage =
		validateAsFootballTableDataPageType(body);

	// TODO: Implement this function
	parseFEFootballTables(footballDataValidated);
	const { html, prefetchScripts } = { html: '', prefetchScripts: [] };
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
