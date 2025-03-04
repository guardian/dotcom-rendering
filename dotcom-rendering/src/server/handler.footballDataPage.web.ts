import type { RequestHandler } from 'express';
import type {
	FEFootballCompetition,
	FEFootballDataPage,
} from '../feFootballDataPage';
import type {
	DCRFootballDataPage,
	FootballMatchKind,
	ParserError,
	Regions,
} from '../footballMatches';
import { parse } from '../footballMatches';
import { extractNAV } from '../model/extract-nav';
import { validateAsFootballDataPageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderFootballDataPage } from './render.footballDataPage.web';

const decidePageKind = (
	canonicalUrl: string | undefined,
): FootballMatchKind => {
	if (canonicalUrl?.includes('live')) {
		return 'Live';
	}

	if (canonicalUrl?.includes('results')) {
		return 'Result';
	}

	if (canonicalUrl?.includes('fixtures')) {
		return 'Fixture';
	}

	throw new Error('Could not determine football page kind');
};

const getParserErrorMessage = (error: ParserError): string => {
	switch (error.kind) {
		case 'InvalidMatchDay':
			return error.errors.map((e) => getParserErrorMessage(e)).join(', ');
		default:
			return `${error.kind}: ${error.message}`;
	}
};

const parseFEFootballCompetitionRegions = (
	competitionRegions: Record<string, FEFootballCompetition[]>,
): Regions => {
	return Object.entries(competitionRegions).map(([key, competition]) => {
		return {
			name: key,
			competitions: competition.map((comp) => ({
				url: comp.url,
				name: comp.name,
			})),
		};
	});
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
		kind: decidePageKind(data.canonicalUrl),
		nextPage: data.nextPage,
		previousPage: data.previousPage,
		regions: parseFEFootballCompetitionRegions(data.filters),
		nav: extractNAV(data.nav),
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
