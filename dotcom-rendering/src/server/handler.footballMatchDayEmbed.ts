import type { RequestHandler } from 'express';
import { getParserErrorMessage, parse } from '../footballMatches';
import type { FEFootballCompetition } from '../frontend/feFootballDataPage';
import type { FEFootballMatchListPage } from '../frontend/feFootballMatchListPage';
import { validateAsFootballMatchListPage } from '../model/validate';
import type { FootballMatchListPage, Region } from '../sportDataPage';
import { sortRegionsFunction } from './handler.sportDataPage';
import { renderFootballMatchDayEmbed } from './render.footballMatchDayEmbed';

export const handleFootballMatchDayEmbed: RequestHandler = ({ body }, res) => {
	const footballDataValidated: FEFootballMatchListPage =
		validateAsFootballMatchListPage(body);

	const parsedFootballData = parseFEFootballMatchList(footballDataValidated);

	const { html } = renderFootballMatchDayEmbed(
		parsedFootballData.matchesList,
		parsedFootballData.guardianBaseURL,
		parsedFootballData.editionId,
	);
	res.status(200).send(html);
};

const parseFEFootballMatchList = (
	data: FEFootballMatchListPage,
): FootballMatchListPage => {
	const parsedMatchesList = parse(data.matchesList);

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
		kind: 'FootballLiveScores',
		nextPage: data.nextPage,
		nextPageNoJsUrl: undefined,
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
