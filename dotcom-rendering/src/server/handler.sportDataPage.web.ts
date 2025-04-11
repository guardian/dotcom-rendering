import type { RequestHandler } from 'express';
import { parse as parseCricketMatch } from '../cricketMatch';
import {
	getParserErrorMessage,
	parse as parseFootballMatches,
} from '../footballMatches';
import { parse as parseFootballTables } from '../footballTables';
import type { FECricketMatchPage } from '../frontend/feCricketMatchPage';
import type { FEFootballCompetition } from '../frontend/feFootballDataPage';
import type { FEFootballMatchListPage } from '../frontend/feFootballMatchListPage';
import type { FEFootballTablesPage } from '../frontend/feFootballTablesPage';
import { Pillar } from '../lib/articleFormat';
import { extractNAV } from '../model/extract-nav';
import {
	validateAsCricketMatchPageType,
	validateAsFootballMatchListPage,
	validateAsFootballTablesPage,
} from '../model/validate';
import type {
	CricketMatchPage,
	FootballMatchListPage,
	FootballMatchListPageKind,
	FootballTablesPage,
	Region,
} from '../sportDataPage';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderSportPage } from './render.sportDataPage.web';

const decidePageKind = (pageId: string): FootballMatchListPageKind => {
	if (pageId.includes('live')) {
		return 'FootballLiveScores';
	}

	if (pageId.includes('results')) {
		return 'FootballResults';
	}

	if (pageId.includes('fixtures')) {
		return 'FootballFixtures';
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
	const { html, prefetchScripts } = renderSportPage(parsedFootballData);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

const parseFEFootballTables = (
	data: FEFootballTablesPage,
): FootballTablesPage => {
	const parsedFootballTables = parseFootballTables(data.tables);

	if (parsedFootballTables.kind === 'error') {
		throw new Error(
			`Failed to parse tables: ${parsedFootballTables.error.kind}: ${parsedFootballTables.error.message}`,
		);
	}

	return {
		tables: parsedFootballTables.value,
		kind: 'FootballTables',
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

	const parsedFootballTableData = parseFEFootballTables(
		footballTablesPageValidated,
	);
	const { html, prefetchScripts } = renderSportPage(parsedFootballTableData);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

const parseFECricketMatch = (data: FECricketMatchPage): CricketMatchPage => {
	const parsedCricketMatch = parseCricketMatch(data.cricketMatch);

	if (parsedCricketMatch.kind === 'error') {
		throw new Error(
			`Failed to parse cricket match: ${parsedCricketMatch.error.kind} ${parsedCricketMatch.error.message}`,
		);
	}

	return {
		match: parsedCricketMatch.value,
		kind: 'CricketMatch',
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

export const handleCricketMatchPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('CricketMatchPage', 'web');

	const cricketMatchPageValidated: FECricketMatchPage =
		validateAsCricketMatchPageType(body);

	const parsedCricketMatchData = parseFECricketMatch(
		cricketMatchPageValidated,
	);

	const { html, prefetchScripts } = renderSportPage(parsedCricketMatchData);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
