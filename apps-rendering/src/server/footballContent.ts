import type { FootballContent } from '@guardian/apps-rendering-api-models/footballContent';
import type { FootballTeam } from '@guardian/apps-rendering-api-models/footballTeam';
import type { Scorer } from '@guardian/apps-rendering-api-models/scorer';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import {
	fromNullable,
	map2,
	none,
	map as optMap,
	some,
} from '../../vendor/@guardian/types/index';
import type { Option } from '../../vendor/@guardian/types/index';
import { padStart } from 'date';
import { fold, pipe } from 'lib';
import type { Parser } from 'parser';
import {
	arrayParser,
	fieldParser,
	map3,
	map6,
	map7,
	numberParser,
	oneOf,
	parse,
	stringParser,
	succeed,
} from 'parser';
import { Result } from 'result';

type Teams = [string, string];

const getFootballSelector = (date: Date, [teamA, teamB]: Teams): string => {
	// MAPI sorts these by string value
	const teams = teamA < teamB ? [teamA, teamB] : [teamB, teamA];

	const d = date;
	const year = d.getUTCFullYear();
	const month = padStart(d.getUTCMonth() + 1);
	const day = padStart(d.getUTCDate());

	return `${year}-${month}-${day}_${teams[0]}_${teams[1]}`;
};

const getFootballEndpoint = (selectorId: string): string =>
	`https://mobile.guardianapis.com/sport/football/matches?selector=${selectorId}`;

const makeScorer = (
	player: string,
	timeInMinutes: number,
	additionalInfo: undefined | string,
): Scorer => ({
	player,
	timeInMinutes,
	additionalInfo,
});

const makeFootballTeam = (
	id: string,
	name: string,
	shortCode: string,
	crestUri: string,
	score: number,
	scorers: Scorer[],
): FootballTeam => ({
	id,
	name,
	shortCode,
	crestUri,
	score,
	scorers,
});

const makeFootballContent = (
	id: string,
	status: string,
	kickOff: string,
	competitionDisplayName: string,
	homeTeam: FootballTeam,
	awayTeam: FootballTeam,
	venue: string | undefined,
): FootballContent => ({
	id,
	status,
	kickOff,
	competitionDisplayName,
	homeTeam,
	awayTeam,
	venue,
});

const scorerParser: Parser<Scorer> = map3(makeScorer)(
	fieldParser('player', stringParser),
	fieldParser('timeInMinutes', numberParser),
	oneOf([fieldParser('additionalInfo', stringParser), succeed(undefined)]),
);

const footballTeamParser: Parser<FootballTeam> = map6(makeFootballTeam)(
	fieldParser('id', stringParser),
	fieldParser('name', stringParser),
	fieldParser('shortCode', stringParser),
	fieldParser('crestUri', stringParser),
	fieldParser('score', numberParser),
	oneOf([fieldParser('scorers', arrayParser(scorerParser)), succeed([])]),
);

const footballContentParser: Parser<FootballContent> = map7(
	makeFootballContent,
)(
	fieldParser('id', stringParser),
	fieldParser('status', stringParser),
	fieldParser('kickOff', stringParser),
	fieldParser('competitionDisplayName', stringParser),
	fieldParser('homeTeam', footballTeamParser),
	fieldParser('awayTeam', footballTeamParser),
	oneOf([fieldParser('venue', stringParser), succeed(undefined)]),
);

const footballContentParserFor = (
	selectorId: string,
): Parser<FootballContent> => fieldParser(selectorId, footballContentParser);

const footballErrorParser: Parser<string> = fieldParser(
	'errorMessage',
	stringParser,
);

const parseFootballResponse = async (
	response: Response,
	selectorId: string,
): Promise<Result<string, FootballContent>> => {
	if (response.status === 200) {
		const parser = footballContentParserFor(selectorId);
		return pipe(await response.json(), parse(parser));
	} else if (response.status === 400) {
		return pipe(await response.json(), parse(footballErrorParser)).flatMap(
			(error) => Result.err(error),
		);
	} else {
		return Result.err('Problem accessing PA API');
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

const getFootballContent = async (
	content: Content,
): Promise<Result<string, FootballContent>> => {
	const teams = teamsFromTags(content.tags);

	const makeDate = (s: string): Date => new Date(s);

	const date = pipe(
		content.webPublicationDate?.iso8601,
		fromNullable,
		optMap(makeDate),
	);

	const selectorId = map2(getFootballSelector)(date)(teams);

	return fold(
		async (selectorIdValue: string) => {
			const footballEndpoint = getFootballEndpoint(selectorIdValue);

			const response = await fetch(footballEndpoint);

			const footballContent = await parseFootballResponse(
				response,
				selectorIdValue,
			);

			return footballContent;
		},
		Promise.resolve(Result.err('Could not get selectorId')),
	)(selectorId);
};

export { getFootballContent };
