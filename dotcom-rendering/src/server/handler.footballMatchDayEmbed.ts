import type { RequestHandler } from 'express';
import { safeParse } from 'valibot';
import type { FootballMatches } from '../footballMatches';
import { parse as parseFootballMatches } from '../footballMatches';
import { feFootballMatchDaySchema } from '../frontend/feFootballMatchDay';
import type { EditionId } from '../lib/edition';
import type { Result } from '../lib/result';
import { error, fromValibot, ok } from '../lib/result';
import { renderFootballMatchDayEmbed } from './render.footballMatchDayEmbed';

export const handleFootballMatchDayEmbed: RequestHandler = ({ body }, res) => {
	const matchDayData = parseFEFootballMatchDay(body);
	if (!matchDayData.ok) {
		throw new Error(matchDayData.error);
	}

	const { html } = renderFootballMatchDayEmbed(matchDayData.value);

	res.status(200).send(html);
};

export type MatchDayData = {
	matchesList: FootballMatches;
	guardianBaseURL: string;
	editionId: EditionId;
};

const parseFEFootballMatchDay = (
	json: unknown,
): Result<string, MatchDayData> => {
	const feData = fromValibot(safeParse(feFootballMatchDaySchema, json));

	if (!feData.ok) {
		return error('Failed to validate Match Day data');
	}

	const parsedMatches = parseFootballMatches(feData.value.matchesList);

	if (!parsedMatches.ok) {
		return error('Failed to parse Match Day match list');
	}

	return ok({
		matchesList: parsedMatches.value,
		guardianBaseURL: feData.value.guardianBaseURL,
		editionId: feData.value.editionId,
	});
};
