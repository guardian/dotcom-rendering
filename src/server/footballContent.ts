import type { FootballContent } from '@guardian/apps-rendering-api-models/footballContent';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { err, none, ok, OptionKind, ResultKind, some } from '@guardian/types';
import type { Option, Result } from '@guardian/types';
import { padZero } from 'date';
import fetch from 'node-fetch';
import type { Response } from 'node-fetch';

type Teams = [string, string];

const getFootballSelector = (
	date: Option<Date>,
	teamA: Option<string>,
	teamB: Option<string>,
): Option<string> => {
	if (
		date.kind === OptionKind.Some &&
		teamA.kind === OptionKind.Some &&
		teamB.kind === OptionKind.Some
	) {
		// MAPI sorts these by string value
		const teams =
			teamA.value < teamB.value
				? [teamA.value, teamB.value]
				: [teamB.value, teamA.value];

		const d = date.value;
		const year = d.getUTCFullYear();
		const month = padZero(d.getUTCMonth() + 1);
		const day = padZero(d.getUTCDate());

		return some(`${year}-${month}-${day}_${teams[0]}_${teams[1]}`);
	}

	return none;
};

const getFootballEndpoint = (selectorId: Option<string>): Option<string> => {
	if (selectorId.kind === OptionKind.Some) {
		return some(
			`https://mobile.guardianapis.com/sport/football/matches?selector=${selectorId.value}`,
		);
	}
	return none;
};

type FootballResponse = Record<string, FootballContent>;

interface FootballError {
	errorMessage: string;
}

const parseFootballResponse = async (
	response: Response,
	selectorId: string,
): Promise<Result<string, FootballContent>> => {
	if (response.status === 200) {
		const json: FootballResponse = await response.json();
		return ok(json[selectorId]);
	} else if (response.status === 400) {
		const json: FootballError = await response.json();
		return err(json.errorMessage);
	} else {
		return err('Problem accessing PA API');
	}
};

const teamsFromTags = (tags: Tag[]): Option<Teams> => {
	const [teamA, teamB] = tags.reduce((ids: string[], tag: Tag) => {
		const teamTag = tag.references.find((ref) =>
			ref.id.startsWith('pa-football-team'),
		);

		if (teamTag !== undefined) {
			const id = teamTag.id.split('/')[1];

			return [...ids, id];
		}

		return ids;
	}, []);

	if (teamA && teamB) {
		return some([teamA, teamB]);
	}

	return none;
};

const getFootballContent = async (content: Content) => {
	const teams = teamsFromTags(content.tags);

	if (teams.kind === OptionKind.Some) {
		const currentTeams = teams.value;
		const teamA = some(currentTeams[0]);
		const teamB = some(currentTeams[1]);

		const webPublicationDate = content.webPublicationDate?.iso8601;

		if (webPublicationDate) {
			const date = some(new Date(webPublicationDate));

			const selectorId = getFootballSelector(date, teamA, teamB);

			if (selectorId.kind === OptionKind.Some) {
				const footballEndpoint = getFootballEndpoint(selectorId);

				if (footballEndpoint.kind === OptionKind.Some) {
					const response = await fetch(footballEndpoint.value);

					const footballContent = await parseFootballResponse(
						response,
						selectorId.value,
					);

					if (footballContent.kind === ResultKind.Ok) {
						return footballContent.value;
					}
				}
			}
		}
	}
	return undefined;
};

export { getFootballContent };
