import type { Request, RequestHandler, Response } from 'express';
import type {
	FEFootballCompetition,
	FEFootballDataPage,
} from '../feFootballDataPage';
import type {
	DCRFootballDataPage,
	FootballMatchKind,
	Regions,
} from '../footballMatches';
import { getParserErrorMessage, parse } from '../footballMatches';
import { Pillar } from '../lib/articleFormat';
import { extractNAV } from '../model/extract-nav';
import { validateAsFootballDataPageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderFootballDataPage } from './render.footballDataPage.web';

const decidePageKind = (pageId: string): FootballMatchKind => {
	if (pageId?.includes('live')) {
		return 'Live';
	}

	if (pageId?.includes('results')) {
		return 'Result';
	}

	if (pageId?.includes('fixtures')) {
		return 'Fixture';
	}

	throw new Error('Could not determine football page kind');
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

export const handleGetMoreFootballData: RequestHandler = (
	req: Request,
	res: Response,
): void => {
	const nextPagePath = new URLSearchParams(
		req.url.split('/MoreFootballData')[1],
	).get('nextPage');
	const url = `https://www.theguardian.com/${nextPagePath}.json?dcr=true`;

	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			res.status(200).send(json);
		})
		.catch((err) => res.status(500).send(err));
};
