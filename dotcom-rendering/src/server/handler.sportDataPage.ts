import type { RequestHandler } from 'express';
import { parse as parseCricketMatch } from '../cricketMatch';
import { parse as parseFootballMatch } from '../footballMatch';
import {
	getParserErrorMessage,
	parse as parseFootballMatches,
} from '../footballMatches';
import { parseMatchStats } from '../footballMatchStats';
import { parseFootballMatchV2 } from '../footballMatchV2';
import {
	parse as parseFootballTables,
	parseTableSummary,
} from '../footballTables';
import type { FECricketMatchPage } from '../frontend/feCricketMatchPage';
import type { FEFootballCompetition } from '../frontend/feFootballDataPage';
import type { FEFootballMatchInfoPage } from '../frontend/feFootballMatchInfoPage';
import type { FEFootballMatchListPage } from '../frontend/feFootballMatchListPage';
import type { FEFootballTablesPage } from '../frontend/feFootballTablesPage';
import { Pillar } from '../lib/articleFormat';
import { safeParseURL } from '../lib/parse';
import type { NavType } from '../model/extract-nav';
import { extractNAV } from '../model/extract-nav';
import {
	validateAsCricketMatchPageType,
	validateAsFootballMatchListPage,
	validateAsFootballMatchPageType,
	validateAsFootballTablesPage,
} from '../model/validate';
import type {
	CricketMatchPage,
	FootballMatchInfoPage,
	FootballMatchListPage,
	FootballMatchListPageKind,
	FootballTablesPage,
	Region,
} from '../sportDataPage';
import type { FENavType } from '../types/frontend';
import { makePrefetchHeader } from './lib/header';
import { renderAppsSportPage } from './render.sportDataPage.app';
import { renderSportPage } from './render.sportDataPage.web';

const decideMatchListPageKind = (pageId: string): FootballMatchListPageKind => {
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

const getNextPageNoJsUrl = (isProd: boolean, nextPageNoJs?: string) => {
	if (!nextPageNoJs) {
		return undefined;
	}
	if (isProd) return `https://www.theguardian.com${nextPageNoJs}`;
	return `https://code.dev-theguardian.com${nextPageNoJs}`;
};

const parseNav = (nav: FENavType): NavType => {
	return {
		...extractNAV(nav),
		selectedPillar: Pillar.Sport,
	};
};

const parseFEFootballMatchList = (
	data: FEFootballMatchListPage,
): FootballMatchListPage => {
	const parsedMatchesList = parseFootballMatches(data.matchesList);

	if (!parsedMatchesList.ok) {
		throw new Error(
			`Failed to parse matches: ${getParserErrorMessage(
				parsedMatchesList.error,
			)}`,
		);
	}

	return {
		matchesList: parsedMatchesList.value,
		now: new Date().toISOString(),
		kind: decideMatchListPageKind(data.config.pageId),
		nextPage: data.nextPage,
		nextPageNoJsUrl: getNextPageNoJsUrl(
			data.config.isProd,
			data.nextPageNoJs,
		),
		previousPage: data.previousPage,
		regions: parseFEFootballCompetitionRegions(data.filters),
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
	const footballDataValidated: FEFootballMatchListPage =
		validateAsFootballMatchListPage(body);

	const parsedFootballData = parseFEFootballMatchList(footballDataValidated);
	const { html, prefetchScripts } = renderSportPage({
		sportData: parsedFootballData,
		nav: parseNav(footballDataValidated.nav),
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

const parseFEFootballTables = (
	data: FEFootballTablesPage,
): FootballTablesPage => {
	const parsedFootballTables = parseFootballTables(data.tables);

	if (!parsedFootballTables.ok) {
		throw new Error(
			`Failed to parse tables: ${parsedFootballTables.error.kind}: ${parsedFootballTables.error.message}`,
		);
	}

	return {
		tables: parsedFootballTables.value,
		kind: 'FootballTables',
		regions: parseFEFootballCompetitionRegions(data.filters),
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
	const footballTablesPageValidated: FEFootballTablesPage =
		validateAsFootballTablesPage(body);

	const parsedFootballTableData = parseFEFootballTables(
		footballTablesPageValidated,
	);
	const { html, prefetchScripts } = renderSportPage({
		sportData: parsedFootballTableData,
		nav: parseNav(footballTablesPageValidated.nav),
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

const parseFECricketMatch = (data: FECricketMatchPage): CricketMatchPage => {
	const parsedCricketMatch = parseCricketMatch(data.cricketMatch);

	if (!parsedCricketMatch.ok) {
		throw new Error(
			`Failed to parse cricket match: ${parsedCricketMatch.error.kind} ${parsedCricketMatch.error.message}`,
		);
	}

	return {
		match: parsedCricketMatch.value,
		kind: 'CricketMatch',

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
	const cricketMatchPageValidated: FECricketMatchPage =
		validateAsCricketMatchPageType(body);

	const parsedCricketMatchData = parseFECricketMatch(
		cricketMatchPageValidated,
	);
	const { html, prefetchScripts } = renderSportPage({
		sportData: parsedCricketMatchData,
		nav: parseNav(cricketMatchPageValidated.nav),
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

const parseFEFootballMatch = (
	data: FEFootballMatchInfoPage,
): FootballMatchInfoPage => {
	const parsedFootballMatch = parseFootballMatch(data.footballMatch);

	if (!parsedFootballMatch.ok) {
		throw new Error(
			`Failed to parse football match: ${parsedFootballMatch.error.kind} ${parsedFootballMatch.error.message}`,
		);
	}

	const parsedFootballMatchStats = parseMatchStats(data.footballMatch);
	const matchInfo = parseFootballMatchV2(data.matchInfo);

	if (!parsedFootballMatchStats.ok) {
		throw new Error(
			`Failed to parse football match stats: ${parsedFootballMatchStats.error.kind} ${parsedFootballMatchStats.error.message}`,
		);
	}

	if (!matchInfo.ok) {
		const aggeregatedErrors = getParserErrorMessage(matchInfo.error);
		throw new Error(
			`Failed to parse football match info: ${matchInfo.error.kind} ${aggeregatedErrors}`,
		);
	}

	const group = data.group && parseTableSummary(data.group);

	if (group && !group.ok) {
		throw new Error(
			`Failed to parse football league table group: ${group.error.kind} ${group.error.message}`,
		);
	}

	const headerUrl = safeParseURL(data.matchHeaderUrl);
	if (!headerUrl.ok) {
		throw new Error(
			`Failed to parse match header URL: ${data.matchHeaderUrl}`,
		);
	}

	return {
		match: parsedFootballMatch.value,
		matchStats: parsedFootballMatchStats.value,
		matchInfo: matchInfo.value,
		competitionName: data.competitionName,
		group: group?.value,
		matchUrl: data.matchUrl,
		matchHeaderUrl: headerUrl.value,
		kind: 'FootballMatchSummary',
		editionId: data.editionId,
		guardianBaseURL: data.guardianBaseURL,
		config: data.config,
		pageFooter: data.pageFooter,
		isAdFreeUser: data.isAdFreeUser,
		canonicalUrl: data.canonicalUrl,
		contributionsServiceUrl: data.contributionsServiceUrl,
	};
};

export const handleFootballMatchPage: RequestHandler = ({ body }, res) => {
	const footballMatchPageValidated: FEFootballMatchInfoPage =
		validateAsFootballMatchPageType(body);
	const parsedFootballMatchData = parseFEFootballMatch(
		footballMatchPageValidated,
	);

	const { html, prefetchScripts } = renderSportPage({
		sportData: parsedFootballMatchData,
		nav: parseNav(footballMatchPageValidated.nav),
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleAppsFootballMatchPage: RequestHandler = ({ body }, res) => {
	const footballMatchPageValidated: FEFootballMatchInfoPage =
		validateAsFootballMatchPageType(body);
	const parsedFootballMatchData = parseFEFootballMatch(
		footballMatchPageValidated,
	);

	const { html, prefetchScripts } = renderAppsSportPage(
		parsedFootballMatchData,
	);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
